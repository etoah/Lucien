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

            var handerMap={
                play:function(){
                    Code.save(editor);
                    editors.play();
                    editors.styleToggle(false);
                },
                newCase:function(){
                    editor.newCase(true);
                },
                toggle:function(event,src)
                {
                    editor.toggle(src.getAttribute("data-target"));
                },
                listGrip:function()
                {
                    codeList.showList();
                    event.stopPropagation();
                },
                delCase:function()
                {
                    editor.newCase();
                    var timer = setTimeout(function () {
                        new Code().delete(parseInt(local(config.storeKey)) || 0).then(function () {
                            notice.success("删除成功");
                        }, function () {
                            notice.error("删除失败");
                        });
                    }, 1000);
                },
                save:function(){
                    Code.save(editor).then(function () {
                        notice.success("保存成功");
                    }, function () {
                        notice.error("保存失败");
                    });
                },
                format:function(event,src)
                {
                    editor.format(editor[src.getAttribute("data-editor")]);
                }
            }


            document.getElementById("nav_js").addEventListener("click",function(event){

                var src = event.srcElement || event.target,
                    action=src.getAttribute("data-action");
                if(!action)return;

                handerMap[action](event,src);
            })
            document.getElementById("editors").addEventListener("click",function(event){

                var src = event.srcElement || event.target,
                    action=src.getAttribute("data-action");
                if(!action)return;

                handerMap[action](event,src);
            })

            document.getElementById("listGrip").addEventListener("click",function(event){

                handerMap['listGrip']();
            })


            //快捷键设置
            new keyMap("#editors").keyBind(['alt', 's'], function () {
                handerMap.save();
            });

            new keyMap().keyBind(['alt', 'r'], function () {
                handerMap.play();
            }).keyBind(['alt', 'z'], function () {
                handerMap.listGrip();
            }).keyBind(['alt','h'],function(){
                editor.toggle("html");
            }).keyBind(['alt','c'],function(){
                editor.toggle("css");
            }).keyBind(['alt','j'],function(){
                editor.toggle("js");
            }).keyBind(['ctrl','alt','f'],function(){
                editor.format(editor.html)
                    .format(editor.css)
                    .format(editor.js);
            });

            require(['emmet','show-hint','javascript-hint','anyword-hint','formatting','matchtags']);

            window.onbeforeunload = function(){
                    return "如果没有保存，您将丢失更改，您确认关闭吗?";
            };


        });


});




