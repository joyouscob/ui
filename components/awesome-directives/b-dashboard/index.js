/**
 * Dashboard block
 */
var module= angular.module('awesome.directives')

var options= {
    class:'dashboard',
};

module.directive('bDashboard', function factory($compile) {
    return {
        restrict:'A',
        scope: {
            options:'='
        },
        controller: function bDashboard($scope) {
            var options= angular.extend({}, defaults, $scope.options);

            if (!$scope.hasOwnProperty('groups')) {
                $scope.groups= {}
            }
            var groups= $scope.groups

            this.addGroup= function (el) {
                var id= el.attr('id');
                var group;
                if (groups.hasOwnProperty(id)) {
                    group= groups[id];
                } else {
                    group= {
                        id: id,
                        widgets: {},
                        widgetsOrder: []
                    }
                    groups[id]= group;
                }
                group.el= el;
                return group;
            }

            this.addWidget= function (group, el) {
                var id= el.attr('id');
                var widget;
                if (group.widgets.hasOwnProperty(id)) {
                    widget= group.widgets[id];
                } else {
                    widget= {
                        id: id
                    };
                    group.widgets[id]= widget;
                    group.widgetsOrder.push(id);
                }
                widget.el= el;
                return widget;
            }
        },
        compile: function (tE, tA, transclude) {
            return function (scope, iE, iA) {
            }
        }
    }
})

module.directive('bDashboardCol', function factory($compile) {

    var equalize= function equalize(e) {
        var iE= $(e);
        iE.css({
            'min-height': iE.parent().innerHeight()
        });
    }
    var release= function release(e) {
        var iE= $(e);
        iE.css({
            'min-height':'auto'
        });
    }

    return {
        restrict:'A',
        require:'^bDashboard',
        compile: function (tE, tA, transclude) {
            return function (scope, iE, iA, bDashboard) {

                // Add Group to Dashboard
                var group= bDashboard.addGroup(iE);

                // Add each Widget to Group
                angular.forEach(iE.find('.widget'), function (el) {
                    var widget= bDashboard.addWidget(group,
                        angular.element(el)
                    );
                    widget.el.remove();
                })

                // Add each Widget by order
                angular.forEach(group.widgetsOrder, function (id) {
                    iE.append(
                        group.widgets[id].el
                    );
                })

                iE.sortable({
                    connectWith:'.dashboard-col',
                    handle:'.widget-head',
                    placeholder:'widget-placeholder', forcePlaceholderSize:true,
                    tolerance:'pointer',
                    cursor:'move',
                })

                var iDashboard= iE.closest('.dashboard');
                var iDashboardCol= iDashboard.find('.dashboard-col');
                iE.bind('sortstart', function (e, ui) {
                    iDashboardCol.each(function(i, e) {
                        equalize(e);
                    })
                });
                iE.bind('sortstop', function (e, ui) {
                    iDashboardCol.each(function(i, e) {
                        release(e);
                    })
                });

                iE.bind('sortupdate', function (e, ui) {
                    var order= iE.sortable('toArray');
                    group.widgetsOrder= order;
                });
            }
        }
    }
})