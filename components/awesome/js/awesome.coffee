app= angular.module 'awesome', ['ngAnimate', 'ngResource', 'ngRoute']



app.provider 'AppService', ->

    AppService=
        App: class AwesomeApp
        AppDialog: class AwesomeAppDialog
        AppNotify: class AwesomeAppNotify
        AppRouter: class AwesomeAppRouter

    AppServiceProvider=
        Route: class AwesomeAppRouteServiceProvider
            @factory: (name, type, config) ->
                config.name= name
                config.type= type
                config

        $get: () ->
            console.log 'construct AppService', AppService
            AppService



app.config ($routeProvider, AppServiceProvider) ->

    $routeProvider.otherwise
        redirectTo: '/'



app.factory 'App', (AppService) -> class App extends AppService.App
    constructor: (version, $rootScope, $log, debug) ->

        if debug then debug.groupCollapsed 'App constructor'
        if debug then debug.log @, $rootScope
        if debug then debug.log 'listen scope'
        if debug then debug.groupEnd()

        @version= version

        @pathPrefix= @prefix= '#'
        @path= ''

        @route= null
        $rootScope.$on '$routeChangeStart', (evt, route) =>
            if route.name
                if $log
                    $log.info 'App#onRouteChangeStart: change to named route -', route.name, route
                @route= route

        @state= null

app.factory 'AppDialog', (AppService) -> class AppDialog extends AppService.AppDialog
    constructor: (app, $location, $route, $rootScope, $log, debug) ->

        if debug then debug.groupCollapsed 'AppDialog#constructor...'
        if debug then debug.log 'dialog', @
        if debug then debug.log 'dialog app', app
        if debug then debug.log '$rootScope', $rootScope

        @overlay= null

        if debug then debug.log 'define scope properties...'

        $rootScope.showViewDialog= (args...) =>
            @show args...

        $rootScope.hideViewDialog= () ->
            $location.path (app.route and app.route.originalPath) or '/'

        if debug then debug.log 'listen scope...'

        route= $route.current
        $rootScope.$on '$locationChangeSuccess', (evt) =>
            if 'dialog' == $route.current.type
                if $log
                    $log.info 'App#onLocationChangeSuccess: change to dialog route -', $route.current.type

                if debug then debug.log 'location changed to dialog route', $route.current.params.dialog, $route.current
                if debug then debug.log 'overlayed route', $rootScope.app.route

                switch $route.current.params.dialog
                    when 'login'
                        if 'login' == @overlay # openned dialog
                            console.log 'openned', @
                            @show 'login', $route.current.params
                        else
                            console.log 'open', @
                            @show 'login', $route.current.params
                        $route.current= route
            else
                if @overlay # hide openned dialog
                    console.log 'hide openned', @
                    @hide()

        if debug then debug.groupEnd()

    show: (type, params) ->
        @overlay= type
        @tab= params.tab

    hide: () ->
        @overlay= null

app.factory 'AppNotify', (AppService) -> class AppNotify extends AppService.AppNotify
    constructor: (app, $location, $route, $rootScope, $log, debug) ->

        if debug then debug.groupCollapsed 'AppNotify#constructor...'
        if debug then debug.log 'notification', @
        if debug then debug.log 'notification app', app
        if debug then debug.log '$rootScope', $rootScope

        @notifications= []

        if debug then debug.log 'define scope properties...'

        $rootScope.notify= (args...) =>
            @notify args...

        if debug then debug.groupEnd()

    notify: (type, data) ->
        @notifications.push
            type: type
            data: data

app.factory '$app', (App, AppDialog, AppNotify) ->
    $app=
        App: App
        AppDialog: AppDialog
        AppNotify: AppNotify



app.factory 'CurrentUser', ($resource) ->
    $resource '/api/v1/user/:action', {},
        login:
            method: 'post'
            params:
                action: 'login'

        logout:
            method: 'post'
            params:
                action: 'logout'





app.controller 'AppCtrl', (version, $app, $rootScope, $scope, $route, $location, $http, $window, CurrentUser, $log) ->
    console.log 'AppCtrl', $app
    $rootScope.app= new $app.App version, $rootScope, $log, console
    $rootScope.app.dialog= new $app.AppDialog $rootScope.app, $location, $route, $rootScope, $log, console
    $rootScope.app.notify= new $app.AppNotify $rootScope.app, $location, $route, $rootScope, $log, console

    $rootScope.app.ready= null
    $rootScope.app.error= null

    $rootScope.referer= do $location.absUrl

    $rootScope.view= $rootScope.app



app.controller 'ViewCtrl', ($scope, $rootScope, $route) ->
    console.log 'ViewCtrl'



app.controller 'LoginAppDialogCtrl', ($rootScope, $scope, CurrentUser, $window) ->
    console.log 'LoginAppDialogCtrl'

    if not $rootScope.user
        $rootScope.user= new CurrentUser

    console.log 'CurrentUser', $scope.user
    $scope.login= (loginForm) ->
        console.log 'login', arguments
        $scope.user.$login (user) ->
            #user.pass= loginForm.password.$modelValue
            $window.location.href= 'project/'
            $scope.notify 'done', 'authentication'
        , (err) ->
            $scope.user.pass= ''
            $scope.notify 'error', err
