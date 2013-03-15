angular.module('b.options')
.value('wysiwyg', {
    class:'b-wysiwyg',
    blocks: {
        selector:'.b'
    }
})
.value('wysiwyg.block', {
    class:'b-wysiwyg--block',
    grip: {
        class:'b-wysiwyg--block-grip'
    }
})