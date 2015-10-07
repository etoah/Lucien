/**
 * Created by Lucien on 9/20/2015.
 */


requirejs.config({
    baseUrl: 'js/lib',

    paths: {
        app: '../app'
    }
});

require(['app/editor', 'require', 'domready!'], function (editors) {
    editors.init();
//延迟加载
    require(['app/eventBinder'],
        function () {

            require(['emmet','show-hint','javascript-hint','anyword-hint','formatting','matchtags']);

            //window.onbeforeunload = function(){
            //        return "如果没有保存，您将丢失更改，您确认关闭吗?";
            //};


        });


});




