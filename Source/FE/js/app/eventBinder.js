/**
 * Created by Lucien on 10/7/2015.
 */


require(['app/Code', 'app/editor', 'local', 'app/config', 'app/codeList', 'app/keymapper', 'app/notice', 'Util'],
    function (Code, editor, local, config, codeList, keyMap, notice, util) {


        var handlerMap = {
            play: function () {
                Code.save(editor);
                editor.play();
                editor.styleToggle(false);
                var triggerElement=event.type==="click"?event.srcElement:document.querySelector('[data-action="play"]');
                switchTrigger(triggerElement);
            },
            newCase: function () {
                editor.newCase(true);
            },
            copy: function () {
                editor.copy();
                notice.success("已复制，并新建文档");
            },
            toggle: function (event, argu) {
                editor.toggle(argu,event.srcElement);
                var triggerElement=event.type==="click"?event.srcElement:document.querySelector('[data-action="toggle"][data-argu="'+argu+'"]');
                switchTrigger(triggerElement);
            },
            listGrip: function (event) {
                codeList.showList();
                event.stopPropagation();
            },
            configGrip:(function(){

                var configPanel = document.getElementById("configPanel");
                configPanel.addEventListener('click',function(event){event.stopPropagation();});
                function hidePanel(){
                    configPanel.style.display = "";
                }
                return function(e){
                    if (configPanel.style.display) {
                        configPanel.style.display = "";
                        document.removeEventListener("click", hidePanel);
                    }
                    else {
                        configPanel.style.display = "block";
                        document.addEventListener("click", hidePanel);
                    }
                    e.stopPropagation();
                }
            })(),
            delCase: function () {
                notice.confirm(function () {
                    editor.newCase();
                    new Code().delete(parseInt(local(config.storeKey)) || 0);
                }, "删除成功", 5500);
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
                i = -1,
                action = null,
                argu = null,
                keys = null,
                keyM = new keyMap();
            while (++i < len) {
                action = nodeList[i].getAttribute("data-action");
                argu = nodeList[i].getAttribute("data-argu");
                if (!action)continue;
                (function (action, argu) {
                    nodeList[i].addEventListener("click", function (event) {
                        event.srcElement = event.srcElement || event.target;
                        handlerMap[action](event, argu);
                    });
                    keys = nodeList[i].getAttribute("data-keymap");
                    if (keys) {
                        keyM.keyBind(keys.split('+'), function (e) {
                            handlerMap[action](e, argu);
                        });
                    }
                })(action, argu);

            }
        }

        function switchTrigger(triggerElement)
        {
            if(triggerElement.getAttribute("data-on")!=="true")
            {
                triggerElement.setAttribute("data-on","true");
            }
            else{
                triggerElement.setAttribute("data-on","false");
            }

        }

        binder();

        new keyMap().keyBind(['alt', 'z'], function () {
            handlerMap.listGrip();
        });//=alt+l方便单手操作


    });
