angular.module('b.directives').directive('bButton', ['b', 'button', function factory(b, button) {
    return {
        restrict:'A',
        compile: function (el, attr) {
            el.addClass(b.class).addClass(button.class);
            return function (scope, el, attr) { }
        }
    }
}])