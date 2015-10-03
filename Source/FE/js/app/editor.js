/**
 * Created by Lucien on 9/20/2015.
 */

define(['codemirror', 'local','app/Code','app/config', 'htmlmixed', 'xml', 'css', 'javascript'], function (CodeMirror, local,Code,config) {
    var html_template='<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Demo</title><style>{1}</style></head><body>{0}<script>{2}</script></body></html>',
        html_e=document.getElementById("html"),
        css_e=document.getElementById("css"),
        js_e=document.getElementById("javascript");
    var htmlEditor = CodeMirror.fromTextArea(html_e, {
        mode: "text/html",
        profile: 'xhtml',
        theme:'pastel-on-dark'
        //theme:"xq-light"
    });
    var cssEditor = CodeMirror.fromTextArea(css_e, {
        mode: "css",
        profile:"css",
        theme:'pastel-on-dark'
        //theme:"xq-light"
    });
    var jsEditor = CodeMirror.fromTextArea(js_e, {
        mode: "javascript",
        theme:'pastel-on-dark'
       // theme:"xq-light"
    });
    var STATUS_KEY = "isPlay";


    window["CodeMirror"]=CodeMirror;//emmet 插件需要全局的变量

    function play(mustRun) {
        if (!mustRun && local(STATUS_KEY) === "true")return;
        var html = this.html.getValue(),
            css = this.css.getValue(),
            js = this.js.getValue(),
            resultDoc = window.frames[0].document;

        resultDoc.open();
        resultDoc.write(html_template.format(html,css,js));
        resultDoc.close();
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


    function toggle(type)
    {
        var element;
        if(type==="html")
        {
            element=html_e;
        }
        else if(type==="css"){
            element=css_e;
        }
        else{
            element=js_e;
        }
        if(element.parentNode.style.display!="none")
        {
            element.parentNode.style.display="none";


        }
        else{

            element.parentNode.style.display="block";
        }

    }

    return {
        html: htmlEditor,
        css: cssEditor,
        js: jsEditor,
        'play': play,
        'styleToggle': styleToggle,
        'init': init,
        'toggle':toggle,
        newCase:function(isClearKey){
            !isClearKey||local(config.storeKey, 'null');
            this.html.setValue("");
            this.css.setValue("");
            this.js.setValue("");
        }
    }

});
