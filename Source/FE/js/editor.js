/**
 * Created by Lucien on 9/20/2015.
 */

define(['codemirror','local', 'htmlmixed', 'css', 'javascript', 'xml'], function (CodeMirror,local) {
    var htmlEditor = CodeMirror.fromTextArea(document.getElementById("html"), {
        mode: "htmlmixed"
    });
    var cssEditor = CodeMirror.fromTextArea(document.getElementById("css"), {
        mode: "css"
    });
    var jsEditor = CodeMirror.fromTextArea(document.getElementById("javascript"), {
        mode: "javascript"
    });
    var STATUS_KEY="isPlay";

    function play(mustRun) {
        if(!mustRun&&local(STATUS_KEY)==="true")return;
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
            head=doc.getElementsByTagName('HEAD')[0],
            i;
        style.type = 'text/css';
        style.innerHTML = css;
        var children = head.childNodes;
        for(i=0;i<children.length;i++){
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
            isReversal=local(STATUS_KEY)==="true";

        if (isInit?!isReversal:isReversal) {
            editorsStyle.display = "block";
            resultStyle.display = "none";
            playEle.className = "play";
            local(STATUS_KEY,false);
            return true;
        }
        else {
            editorsStyle.display = "none";
            resultStyle.display = "block";
            playEle.className = "stop";
            local(STATUS_KEY,true);
            return false;
        }


    }

    function init()
    {
        if (local(STATUS_KEY)==="true")
        {
            this.play(true);
            styleToggle(true);
        }
    }

    return {
        html: htmlEditor,
        css: cssEditor,
        js: jsEditor,
        'play': play,
        'styleToggle':styleToggle,
        'init':init
    }

});
