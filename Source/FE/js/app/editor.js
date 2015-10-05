/**
 * Created by Lucien on 9/20/2015.
 */

define(['codemirror', 'local', 'app/Code', 'app/config', 'htmlmixed', 'xml', 'css', 'javascript', 'closebrackets', 'closetag'],
    function (CodeMirror, local, Code, config) {
        var html_template = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Demo</title><style>{1}</style></head><body>{0}<script>{2}</script></body></html>',
            html_e = document.getElementById("html"),
            css_e = document.getElementById("css"),
            js_e = document.getElementById("javascript"),
            STATUS_KEY = "isPlay";
        var htmlEditor = CodeMirror.fromTextArea(html_e, {
            mode: "text/html",
            profile: 'xhtml',
            theme: 'pastel-on-dark',
            autoCloseTags: true,
            matchTags: {bothTags: true},
            extraKeys: {"Ctrl-J": "toMatchingTag"}

            //theme:"xq-light"
        });
        var cssEditor = CodeMirror.fromTextArea(css_e, {
            mode: "css",
            //profile:"css",
            theme: 'pastel-on-dark',
            autoCloseBrackets: true,
            extraKeys: {"Tab": "autocomplete"}
            //theme:"xq-light"
        });
        var jsEditor = CodeMirror.fromTextArea(js_e, {
            mode: {name: "javascript", globalVars: true},
            theme: 'pastel-on-dark',
            autoCloseBrackets: true,
            extraKeys: {"Tab": "autocomplete"}
            // theme:"xq-light"
        });


        window["CodeMirror"] = CodeMirror;//emmet 插件需要全局的变量

        function play(mustRun) {
            if (!mustRun && local(STATUS_KEY) === "true")return;
            var resultDoc = window.frames[0].document;

            resultDoc.open();
            resultDoc.write(this.getCode());
            resultDoc.close();
        };
        function getCode() {
            var html = this.html.getValue(),
                css = this.css.getValue(),
                js = this.js.getValue();
            return html_template.format(html, css, js);

        }

        function styleToggle(isInit) {
            var editorsStyle = document.getElementById('editors').style,
                resultStyle = document.getElementById('result').style,
                playEle = document.querySelector('[data-action="play"]'),
                isReversal = local(STATUS_KEY) === "true";

            if (isInit ? !isReversal : isReversal) {
                editorsStyle.display = "flex";
                resultStyle.display = "none";
                //playEle.className = "play";
                local(STATUS_KEY, false);
                return true;
            }
            else {
                editorsStyle.display = "none";
                resultStyle.display = "block";
                // playEle.className = "stop";
                local(STATUS_KEY, true);
                return false;
            }


        }

        function init(id) {

            new Code().get(id || parseInt(local(config.storeKey)) || 0).then((function (that) {
                return function (entity) {
                    if (entity) {
                        that.html.setValue(entity.html);
                        that.css.setValue(entity.css);
                        that.js.setValue(entity.js);
                        local(config.storeKey, entity.id);
                    }


                }
            })(this));

            if (local(STATUS_KEY) === "true") {
                this.play(true);
                styleToggle(true);
            }
        }

        function format(editor) {
            CodeMirror.commands["selectAll"](editor);
            editor.autoFormatRange(editor.getCursor(true), editor.getCursor(false));
            return this;
        }

        function toggle(type) {
            var element;
            if (type === "html") {
                element = html_e;
            }
            else if (type === "css") {
                element = css_e;
            }
            else {
                element = js_e;
            }
            if (element.parentNode.style.display != "none") {
                element.parentNode.style.display = "none";


            }
            else {

                element.parentNode.style.display = "block";
            }

        }

        return {
            html: htmlEditor,
            css: cssEditor,
            js: jsEditor,
            'play': play,
            'styleToggle': styleToggle,
            'init': init,
            'toggle': toggle,
            'format': format,
            'getCode':getCode,
            newCase: function (isClearKey) {
                !isClearKey || local(config.storeKey, 'null');
                this.html.setValue("");
                this.css.setValue("");
                this.js.setValue("");
            }
        }

    });
