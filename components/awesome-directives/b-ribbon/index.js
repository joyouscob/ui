/**
 * Ribbon block
 */
var module= angular.module('awesome.directives').directive('bRibbon', function factory($compile) {
    var tpl= '<nav/>';
    return {
        restrict:'EA',
        scope:{
            options:'=',
            tabs:'=',
        },
        template:tpl, replace:true,
        controller: function Ribbon($scope) {
            $scope.defaults= {
                class:'b-ribbon',
                tabs: {
                    class:'b-ribbon--tabs',
                },
                content: {
                    class:'b-ribbon--content',
                },
                pane: {
                    class:'b-ribbon--pane',
                }
            };
        },
        compile: function (tE, tA, transclude) {
            return function (scope, iE, iA) {
                var options= {}
                angular.extend(options,
                    scope.defaults, scope.options
                );

                iE.addClass(options.class);

                var tabs= angular.element(
                    '<ul/>'
                );
                tabs.addClass(options.tabs.class);
                iE.append(
                    tabs
                );

                var tab= angular.element(
                    '<li ng-repeat="tab in tabs" ng-class="{active:tab.active}"><a href="#" data-toggle="tab" data-target="#{{tab.id}}">{{tab.title}}</a></li>'
                );
                tabs.append(
                    tab= $compile(
                        tab
                    )(scope)
                );

                var content= angular.element(
                    '<div/>'
                );
                content.addClass(options.content.class);
                iE.append(
                    content
                );

                var pane= angular.element(
                    '<div ng-repeat="tab in tabs" ng-class="{active:tab.active}" id="{{tab.id}}">{{tab.content}}</div>'
                );
                pane.addClass(options.pane.class);
                content.append(
                    pane= $compile(
                        pane
                    )(scope)
                );
            }
        }
    }
})