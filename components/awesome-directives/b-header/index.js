/**
 * Header block
 */
var module= angular.module('awesome.directives').directive('bHeader', function factory($compile) {
    var tpl= '<header class="b-header">'+
               '<dl class="b-header--brand" itemscope itemtype="http://schema.org/Brand">'+
                 '<dt class="b-header--title" itemprop="name"><a href="{{url}}" itemprop="url"><img class="b-header--logo" src="{{logo}}" itemprop="logo"/>{{title}}</a></dt>'+
                 '<dd class="app-header--description" itemprop="description">{{description}}</dd>'+
               '</dl>'+
             '</header>';
    return {
        restrict:'E',
        scope:{
            title:'@', url:'@', logo:'@',
            description:'@'
        },
        template:tpl, replace:true,
        compile: function (tE, tA) {
            return function (scope, iE, iA) {
            }
        }
    }
})