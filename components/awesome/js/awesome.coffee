app= angular.module 'awesome', ['ngAnimate', 'ngResource', 'ngRoute']

app.constant 'debug', undefined


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

        $get: () -> AppService



app.config ($routeProvider, AppServiceProvider) ->

    $routeProvider.otherwise
        redirectTo: '/'



app.factory 'App', (AppService) -> class App extends AppService.App
    constructor: (version, $rootScope, debug) ->

        if debug then debug.groupCollapsed('App#constructor...', @)
        if debug then debug.log('$rootScope', $rootScope)

        @version= version

        @pathPrefix= @prefix= '#'
        @path= ''

        @route= null
        $rootScope.$on '$routeChangeStart', (evt, route) =>
            if route.name
                if debug then debug.log('App#onRouteChangeStart: change to named route -', route.name, route)
                @route= route

        @state= null

        if debug then debug.groupEnd()

app.factory 'AppDialog', (AppService) -> class AppDialog extends AppService.AppDialog
    constructor: (app, $location, $route, $rootScope, debug) ->

        if debug then debug.groupCollapsed('AppDialog#constructor...', @, app)
        if debug then debug.log('$rootScope', $rootScope)

        @overlay= null

        if debug then debug.log('define scope properties...')

        $rootScope.showViewDialog= (args...) =>
            @show args...

        $rootScope.hideViewDialog= () ->
            $location.path app.location or '/'

        if debug then debug.log('listen scope...')

        route= $route.current
        $rootScope.$on '$locationChangeSuccess', (evt) =>
            currentRoute= $route.current
            if 'dialog' == currentRoute.type

                dialog= currentRoute.params.dialog or currentRoute.name

                if debug then debug.log('App#onLocationChangeSuccess: change to dialog route -', dialog, currentRoute)

                if dialog == @overlay # openned dialog
                    if debug then debug.log('App#onLocationChangeSuccess: openned dialog...', @, currentRoute.params)
                    @show dialog, currentRoute.params
                else
                    if currentRoute.templateUrl # open dialog
                        @templateUrl= currentRoute.templateUrl
                    if debug then debug.log('App#onLocationChangeSuccess: open dialog...', @, currentRoute.params)
                    @show dialog, currentRoute.params

                if route # prevent route change
                    if debug then debug.log('App#onLocationChangeSuccess: replace route...', @, currentRoute, route)
                    $route.current= route

            else
                app.location= $location.path()
                if @overlay # hide openned dialog
                    if debug then debug.log('App#onLocationChangeSuccess: hide dialog...', @)
                    @hide()

        if debug then debug.groupEnd()

    show: (type, params) ->
        @overlay= type
        @tab= params.tab

    hide: () ->
        @overlay= null

app.factory 'AppNotify', (AppService) -> class AppNotify extends AppService.AppNotify
    constructor: (app, $location, $route, $rootScope, debug) ->

        if debug then debug.groupCollapsed('AppNotify#constructor...', @, app)
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





app.controller 'AppCtrl', (version, $app, $rootScope, $scope, $route, $location, debug) ->
    if debug then debug.log('AppCtrl', $app, $rootScope)

    $rootScope.app= new $app.App version, $rootScope, debug
    $rootScope.app.dialog= new $app.AppDialog $rootScope.app, $location, $route, $rootScope, debug
    $rootScope.app.notify= new $app.AppNotify $rootScope.app, $location, $route, $rootScope, debug

    $rootScope.app.ready= null
    $rootScope.app.error= null

    $rootScope.referer= do $location.absUrl

    $rootScope.view= $rootScope.app



app.controller 'ViewCtrl', ($scope, $rootScope, $route, debug) ->
    if debug then debug.log('ViewCtrl')
