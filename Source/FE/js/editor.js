/**
 * Created by Lucien on 9/20/2015.
 */

define(['codemirror','htmlmixed','css','javascript','xml'], function (CodeMirror){
    var htmlEditor = CodeMirror.fromTextArea(document.getElementById("html"),{
        mode:  "htmlmixed"
    });
    var cssEditor = CodeMirror.fromTextArea(document.getElementById("css"),{
        mode:  "css"
    });
    var jsEditor = CodeMirror.fromTextArea(document.getElementById("javascript"),{
        mode:  "javascript"
    });

    function play(){
        var html=document.getElementById("html").value,
            css=document.getElementById("css").value,
            js=document.getElementById("javascript").value,
            result=window.frames[0].document;
        result.querySelector("body").innerHTML=html;

        var style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML=css;
        result.getElementsByTagName('HEAD').item(0).appendChild(style);




    }

    return {html:htmlEditor,css:cssEditor,js:jsEditor,'play':play}

});
