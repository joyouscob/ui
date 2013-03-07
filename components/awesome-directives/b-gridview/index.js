/**
 * Gridview block
 */
var module= angular.module('awesome.directives')

module.directive('bGridview', function factory($compile) {
    var tpl= '<table class="table datatable"></table>';
    return {
        restrict:'E',
        scope:{
            cols:'=', rows:'=', order:'='
        },
        template:tpl, replace:true,
        compile: function (tE, tA) {
            return function (scope, iE, iA) {
                var head
                iE.append(
                    head= $compile(
                        angular.element(
                            $("<thead><tr><td ng-repeat=\"col in cols\" ng-class=\"{'flex':col.flex}\" style=\"padding:0;\" b-gridview-col data-col=\"col\" data-order=\"order\"/></tr></thead>")
                        )
                    )(scope)
                )

                $(head).bind('mousedown', '.grip', function (e) {
                    e.stopPropagation()
                    var target= $(e.target)
                    var sel= target.closest('td')
                    var selWidth= sel.width()
                    var sib, dir
                    if (target.hasClass('l')) {
                        dir='l'
                        sib= sel.prev()
                    }
                    if (target.hasClass('r')) {
                        dir='r'
                        sib= sel.next()
                    }
                    var sibWidth= sib.width()
                    var resize= function (offset) {
                        if ('r' === dir) {
                            offset= 0-offset
                        }
                        if (sel && !sel.hasClass('flex')) {
                            sel.addClass('resized')
                            sel.css({
                                'width': selWidth+offset,
                                'min-width': selWidth+offset,
                                'max-width': selWidth+offset,
                                'overflow':'hidden'
                            })
                        }
                        if (sib && !sib.hasClass('flex')) {
                            sib.addClass('resized')
                            sib.css({
                                'width': sibWidth-offset,
                                'min-width': sibWidth-offset,
                                'max-width': sibWidth-offset,
                                'overflow':'hidden'
                            })
                        }
                    }
                    var start= e.clientX
                    var area= $(e.target.ownerDocument.documentElement)
                    area.css({
                        '-webkit-user-select':'none'
                    })
                    area.on('mousemove.col-resize.datatable', function (e) {
                        var offset= start - e.clientX
                        resize(offset)
                    })
                    area.on('mouseup.col-resize.datatable', function (e) {
                        var offset= start - e.clientX
                        area.off('.col-resize.datatable')
                        area.css({
                            '-webkit-user-select':'initial'
                        })
                    })
                })

                var body
                iE.append(
                    body= $compile(
                        angular.element(
                            $("<tbody><tr ng-repeat=\"row in rows | orderBy:order.by:order.reverse\" b-gridview-row data-cols=\"cols\" data-row=\"row\"/></tbody>")
                        )
                    )(scope)
                )
            }
        }
    }
})

module.directive('bGridviewCol', function factory($compile) {
    return {
        restrict:'EA',
        scope:{
            col:'=', order:'='
        },
        compile: function (tE, tA) {
            return function (scope, iE, iA) {
                var e
                iE.append(
                    e= $compile(
                        angular.element(
                            $("<div class=\"table--col table--col-sortable\" ng-click=\"order.by=col.id; order.reverse=!order.reverse;\" ng-class=\"{'sorted':order.by==col.id, 'reversed':order.by==col.id&&order.reverse}\"><span class=\"grip l\"></span>{{col.title}}<span class=\"grip r\"></span></div>")
                        )
                    )(scope)
                )
            }
        }
    }
})

module.directive('bGridviewRow', function factory($compile, $filter) {
    return {
        restrict:'EA',
        scope:{
            cols:'=', row:'='
        },
        compile: function (tE, tA) {
            return function (scope, iE, iA) {
                scope.filter= function(t, v) {
                    if ('datetime' === t) {
                        return $filter('date')(v, 'dd.MM.yyyy H:mm')
                    }
                    return v
                }
                var e
                iE.append(
                    e= $compile(
                        angular.element(
                            $("<td ng-repeat=\"col in cols\">{{ filter(col.type, row[col.id]) }}</td>")
                        )
                    )(scope)
                )
            }
        }
    }
})