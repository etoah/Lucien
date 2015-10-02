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
    require(['app/Code', 'app/editor', 'local', 'app/config', 'app/codeList', 'app/keymapper', 'app/notice'],
        function (Code, editor, local, config, codeList, keyMap, notice) {


            //点击运行保存事件
            document.getElementById("play").addEventListener("click", function () {
                Code.save(editor);
                editors.play();
                editors.styleToggle(false);
            });

            //新建事件
            document.getElementById("newCase").addEventListener("click", function () {
                editor.newCase(true);
            });

            //列表展示事件
            document.getElementById("listGrip").addEventListener("click", function (event) {
                //codeList.togglePanel();
                codeList.showList();
                event.stopPropagation();

            });

            //删除事件
            document.getElementById("delCase").addEventListener("click", function () {

                editor.newCase();
                var timer = setTimeout(function () {
                    new Code().delete(parseInt(local(config.storeKey)) || 0).then(function () {
                        notice.success("删除成功");
                    }, function () {
                        notice.error("删除失败");
                    });
                }, 1000);

            });

            //快捷键设置
            new keyMap("#editors").keyBind(['alt', 's'], function () {
                Code.save(editor).then(function () {
                    notice.success("保存成功");
                }, function () {
                    notice.error("保存失败");
                });
            });

            new keyMap().keyBind(['alt', 'r'], function () {
                Code.save(editor);
                editors.play();
                editors.styleToggle(false);
            }).keyBind(['alt', 'z'], function () {
                codeList.showList();
            });


            require(['emmet']);


        });


});




