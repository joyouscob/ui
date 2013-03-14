angular.module('b.options', [])
angular.module('b.directives', ['b.options'])
angular.module('b', ['b.directives', 'b.options'])

angular.module('b.options').value('b', {
    class:'b'
})