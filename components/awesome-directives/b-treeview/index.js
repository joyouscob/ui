/**
 * Treeview block
 */
angular.module('awesome.directives').directive('bTreeview', function factory($compile) {
    return {
        restrict: 'E',
        scope: {data:'=', parent:'='},
        compile: function (tE, tA) {
            return function (scope, iE, iA) {
                var tpl= '<a href="#">{{data.title}}</a>';
                if (angular.isArray(scope.data.nodes)) {
                    tpl += '<ul><li ng-repeat="node in data.nodes"><b-treeview data="node" parent="data.nodes"/></li></ul>';
                }
                iE.replaceWith(
                    $compile(
                        angular.element(tpl)
                    )(scope)
                )
            }
        },
    }
})