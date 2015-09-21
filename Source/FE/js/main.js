/**
 * Created by Lucien on 9/20/2015.
 */





require(['editor','domready!'], function (editors,doc){

    editors.init();
    document.getElementById("play").addEventListener("click",function(){
        editors.play();
        editors.styleToggle(false);

    })



});



