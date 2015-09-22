/**
 * Created by Lucien on 9/20/2015.
 */


require(['codemirror', 'htmlmixed', 'xml', 'css', 'javascript','emmet','domready!'], function (CodeMirror,a,b,c,d,emmetCodeMirror){

    var editor = CodeMirror.fromTextArea(document.getElementById("code"), {
        mode : "text/html",
        lineNumbers : true,
        profile: 'xhtml' /* define Emmet output profile */
    });
    emmetCodeMirror(editor);

});




//
//require(['editor','domready!'], function (editors,doc){
//
//    editors.init();
//    document.getElementById("play").addEventListener("click",function(){
//        editors.play();
//        editors.styleToggle(false);
//
//    })
//
//
//
//});



