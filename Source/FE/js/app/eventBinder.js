/**
 * Created by Lucien on 10/7/2015.
 */


require(['app/Code', 'app/editor', 'local', 'app/config', 'app/codeList', 'app/keymapper', 'app/notice', 'Util', 'app/eventBinder'],
    function (Code, editor, local, config, codeList, keyMap, notice, util, eventBinder) {


        var handlerMap = {
            play: function () {
                Code.save(editor);
                editor.play();
                editor.styleToggle(false);
            },
            newCase: function () {
                editor.newCase(true);
            },
            toggle: function (event, argu) {
                editor.toggle(argu);
            },
            listGrip: function () {
                codeList.showList();
                event.stopPropagation();
            },
            delCase: function () {
                notice.confirm(function () {
                    editor.newCase();
                    new Code().delete(parseInt(local(config.storeKey)) || 0);
                }, "删除成功", 3000);
            },
            save: function () {
                Code.save(editor).then(function () {
                    notice.success("保存成功");
                }, function () {
                    notice.error("保存失败");
                });
            },
            format: function (event, argu) {
                editor.format(editor[argu]);
            },
            export: function () {
                util.export("export.html", editor.getCode());
            }
        };


        function binder() {
            var nodeList = document.querySelectorAll('[data-action]'),
                len = nodeList.length,
                i = -1;
            while (++i < len) {
                nodeList[i].addEventListener("click", function (event) {

                    event.srcElement = event.srcElement || event.target;
                    var action = event.srcElement.getAttribute("data-action"),
                        argu = event.srcElement.getAttribute("data-action-argu");
                    if (!action)return;

                    handlerMap[action](event, argu);
                })
            }
        }

        binder();

        new keyMap().keyBind(['alt', 's'], function () {
            handlerMap.save();
        }).keyBind(['alt', 'r'], function () {
            handlerMap.play();
        }).keyBind(['alt', 'z'], function () {
            handlerMap.listGrip();
        }).keyBind(['alt', 'h'], function () {
            editor.toggle("html");
        }).keyBind(['alt', 'c'], function () {
            editor.toggle("css");
        }).keyBind(['alt', 'j'], function () {
            editor.toggle("js");
        }).keyBind(['ctrl', 'alt', 'f'], function () {
            editor.format(editor.html)
                .format(editor.css)
                .format(editor.js);
        });


    });
