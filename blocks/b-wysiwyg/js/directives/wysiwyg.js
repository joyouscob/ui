angular.module('b.directives')

.directive('bWysiwyg', ['wysiwyg', '$compile', function factory(options, $compile) {
    return {
        restrict:'A',
        scope: {
            options:'='
        },
        controller: function ($scope) {
            $scope.blocks= {

            }
        },
        compile: function (el, attr) {
            el.addClass(options.class);
            console.log('компиляция визуального редактора, смоделировать дочерние блоки', el)
            var elements= el.find(options.blocks.selector).
                prepend('<b-wysiwyg-block/>')
            ;
            console.log('elements', elements)
            return function (scope, el, attr) {
                //var elements= el.find(options.blocks.selector).
                //    attr('b-wysiwyg-wrapper', 'blocks')
                //;
                //console.log('elements', elements)
            }
        }
    }
}])

.directive('bWysiwygBlock', ['wysiwyg.block', function factory(options) {
    return {
        restrict:'EA',
        compile: function (el, attr) {
            return function (scope, el, attr) {
                var block= {
                    element: el.parent(),
                    padding: {},
                    margin: {}
                };
                block.padding.top= parseInt(block.element.css('padding-top'));
                block.padding.right= parseInt(block.element.css('padding-right'));
                block.padding.bottom= parseInt(block.element.css('padding-bottom'));
                block.padding.left= parseInt(block.element.css('padding-left'));
                block.margin.top= parseInt(block.element.css('margin-top'));
                block.margin.right= parseInt(block.element.css('margin-right'));
                block.margin.bottom= parseInt(block.element.css('margin-bottom'));
                block.margin.left= parseInt(block.element.css('margin-left'));
                if ('static' === block.element.css('position')) {
                    block.element.css('position','relative')
                }
                console.log(block.padding.bottom)
                var bound= {
                    element: $('<span/>').
                        addClass(options.class).css({
                            'display':'block',
                            'position':'absolute', 'top':0, 'right':0, 'bottom':0, 'left':0
                        }).
                        append($('<span/>').addClass(options.grip.class).addClass('margin').css({
                                'display':'block', 'position':'absolute', 'top':-7, 'right':-7, 'bottom':-7, 'left':-7
                            }).
                            append($('<span/>').addClass('grip').addClass('grip-top').css({
                                    'display':'block', 'position':'absolute', 'top':0, 'left':0,
                                    'width':'100%', 'height':7
                                })
                                
                            ).
                            append($('<span/>').addClass('grip').addClass('grip-right').css({
                                    'display':'block', 'position':'absolute', 'top':0, 'right':0,
                                    'width':7, 'height':'100%'
                                })
                            ).
                            append($('<span/>').addClass('grip').addClass('grip-bottom').css({
                                    'display':'block', 'position':'absolute', 'left':0, 'bottom':0,
                                    'width':'100%', 'height':7
                                }).on('drag', function (e, ui) {
                                    var padding= block.padding.bottom + (ui.position.top - ui.originalPosition.top)
                                    console.log(padding)
                                    block.element.css('padding-bottom', padding)
                                }).draggable({
                                    'axis':'y'
                                })
                            ).
                            append($('<span/>').addClass('grip').addClass('grip-left').css({
                                    'display':'block', 'position':'absolute', 'top':0, 'left':0,
                                    'width':7, 'height':'100%'
                                })
                            ).
                            append($('<span/>').addClass(options.grip.class).addClass('padding').css({
                                    'display':'block', 'position':'absolute',
                                    'top':7, 
                                    'right':7,
                                    'bottom':7,
                                    'left':7
                                }).
                                append($('<span/>').addClass('grip').addClass('grip-top').css({
                                        'display':'block', 'position':'absolute', 'top':0, 'left':0,
                                        'width':'100%', 'height':7
                                    })
                                ).
                                append($('<span/>').addClass('grip').addClass('grip-right').css({
                                        'display':'block', 'position':'absolute', 'top':0, 'right':0,
                                        'width':7, 'height':'100%'
                                    })
                                ).
                                append($('<span/>').addClass('grip').addClass('grip-bottom').css({
                                        'display':'block', 'position':'absolute', 'left':0, 'bottom':0,
                                        'width':'100%', 'height':7
                                    })
                                ).
                                append($('<span/>').addClass('grip').addClass('grip-left').css({
                                        'display':'block', 'position':'absolute', 'top':0, 'left':0,
                                        'width':7, 'height':'100%'
                                    })
                                )
                            )
                        )
                    ,
                }
                el.replaceWith(bound.element)
            }
        }
    }
}])