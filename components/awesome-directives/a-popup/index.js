/**
 * Activate Popup
 */
angular.module('awesome.directives').directive('aPopup', function factory() {
    return {
        restrict: 'A',
        link: function postLink(scope, iE, iA) {
            iE.bind('click', function (e) {
                e.preventDefault();
            })
        }
    }
})