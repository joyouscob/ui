var Assets= require('some-assets')

Assets('./', {
    path: './components/awesome',
}, {

    'awesome.css': Assets.Css('css/awesome.css', {
        path: 'components/index.less',
    }),

}).make(function (err, assets) {
    console.log('ассеты собраны', assets)
})