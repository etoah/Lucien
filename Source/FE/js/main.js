/**
 * Created by Lucien on 9/20/2015.
 */





require(['editor','domready!'], function (editors,doc){
    document.getElementById("play").addEventListener("click",function(){
        editors.play(editors);
        editors.styleToggle();

    })



});



