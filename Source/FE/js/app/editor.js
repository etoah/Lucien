/**
 * Created by Lucien on 9/20/2015.
 */

define(['codemirror', 'local','app/Code','app/config', 'htmlmixed', 'xml', 'css', 'javascript'], function (CodeMirror, local,Code,config) {
    var htmlEditor = CodeMirror.fromTextArea(document.getElementById("html"), {
        mode: "text/html",
        profile: 'xhtml'
    });
    var cssEditor = CodeMirror.fromTextArea(document.getElementById("css"), {
        mode: "css",
        profile:"css"
    });
    var jsEditor = CodeMirror.fromTextArea(document.getElementById("javascript"), {
        mode: "javascript"
    });
    var STATUS_KEY = "isPlay";


    window["CodeMirror"]=CodeMirror;//emmet 插件需要全局的变量

    function play(mustRun) {
        if (!mustRun && local(STATUS_KEY) === "true")return;
        var html = this.html.getValue(),
            css = this.css.getValue(),
            js = this.js.getValue(),
            resultDoc = window.frames[0].document;
        resultDoc.querySelector("body").innerHTML = html;
        appendStyle(resultDoc, css);
        appendScript(resultDoc, js);
    }

    function appendStyle(doc, css) {
        var style = doc.createElement('style'),
            head = doc.getElementsByTagName('HEAD')[0],
            i;
        style.type = 'text/css';
        style.innerHTML = css;
        var children = head.childNodes;
        for (i = 0; i < children.length; i++) {
            head.removeChild(children[i]);
        }
        head.appendChild(style);
    }

    function appendScript(doc, js) {
        var script = doc.createElement('script');
        script.type = "text/javascript";
        script.innerHTML = js;
        doc.querySelector("body").appendChild(script);
    }

    function styleToggle(isInit) {
        var editorsStyle = document.getElementById('editors').style,
            resultStyle = document.getElementById('result').style,
            playEle = document.getElementById('play'),
            isReversal = local(STATUS_KEY) === "true";

        if (isInit ? !isReversal : isReversal) {
            editorsStyle.display = "block";
            resultStyle.display = "none";
            playEle.className = "play";
            local(STATUS_KEY, false);
            return true;
        }
        else {
            editorsStyle.display = "none";
            resultStyle.display = "block";
            playEle.className = "stop";
            local(STATUS_KEY, true);
            return false;
        }


    }

    function init(id) {

        new Code().get(id||parseInt(local(config.storeKey))||0).then((function(that){
                return function(entity){
                    if(entity)
                    {
                        that.html.setValue(entity.html);
                        that.css.setValue(entity.css);
                        that.js.setValue(entity.js);
                        local(config.storeKey,entity.id);
                    }


                }
        })(this));

        if (local(STATUS_KEY) === "true") {
            this.play(true);
            styleToggle(true);
        }
    }


    return {
        html: htmlEditor,
        css: cssEditor,
        js: jsEditor,
        'play': play,
        'styleToggle': styleToggle,
        'init': init,
        newCase:function(isClearKey){
            !isClearKey||local(config.storeKey, 'null');
            this.html.setValue("");
            this.css.setValue("");
            this.js.setValue("");
        }
    }

});
