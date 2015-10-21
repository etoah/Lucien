/**
 * Created by Lucien on 9/20/2015.
 */


requirejs.config({
    baseUrl: 'js/lib',

    paths: {
        app: '../app'
    }
});

require(['app/editor', 'require', 'domready!'/*TODO：后面可延迟加载*/,
    'app/eventBinder','show-hint','javascript-hint','anyword-hint','formatting','matchtags','session','emmet'], function (editors) {
    editors.init();
    window.onbeforeunload = function(){
        return "如果没有保存，您将丢失更改，您确认关闭吗?";
    };
});




