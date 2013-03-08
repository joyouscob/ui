/**
 * Widget block
 */
var module= angular.module('awesome.directives').directive('bWidget', function factory($compile) {
    var tpl= '<div class="widget">'+
               '<div class="widget-head">'+
                 '<h3 class="widget-title">{{title}}</h3>'+
               '</div>'+
               '<div class="widget-body" ng-transclude />'+
             '</div>';
    return {
        restrict:'E',
        scope:{
            title:'@'
        },
        template:tpl, replace:true,
        transclude:true,
        compile: function (tE, tA, transclude) {
            //transclude(tE, function(content, widget) {
            //    console.log('transclude content', content, 'to', widget)
            //    widget.append(content)
            //})
            return function (scope, iE, iA) {
            }
        }
    }
})