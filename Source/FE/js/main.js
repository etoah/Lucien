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
            editor.newCase(true);
        });

        //列表展示事件
        document.getElementById("listGrip").addEventListener("click", function (event) {
            codeList.togglePanel();
            codeList.showList();
            event.stopPropagation();

        });

        //删除事件
        document.getElementById("delCase").addEventListener("click", function () {

            editor.newCase();
            var timer= setTimeout(function(){
                new Code().delete(parseInt(local(config.storeKey))||0).then(function(){
                    console.log("删除成功");
                },function(){
                    console.log("删除成功");
                });
            },1000);

        });





        require(['emmet']);


    });

});




