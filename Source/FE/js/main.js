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
    document.getElementById("play").addEventListener("click", function () {
        editors.play();
        editors.styleToggle(false);

    });


    //延迟加载
    require(['app/Code', 'app/editor', 'local', 'app/config','app/codeList'], function (Code, editor, local,config,codeList) {


        //点击运行保存事件
        document.getElementById("play").addEventListener("click", function () {
            new Code(editor.html.getValue(), editor.css.getValue(), editor.js.getValue()).add();
        });

        //新建事件
        document.getElementById("newCase").addEventListener("click", function () {
            local(config.storeKey, 'null');
            editor.html.setValue("");
            editor.css.setValue("");
            editor.js.setValue("");
        });

        //列表展示事件
        document.getElementById("listGrip").addEventListener("click", function () {
            codeList.togglePanel();
            codeList.showList();

        });


        require(['emmet']);


    });

});




