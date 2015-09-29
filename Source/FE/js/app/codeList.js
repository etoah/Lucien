/**
 * Created by Lucien on 9/29/2015.
 */


define(['app/Code','app/editor'], function (Code,editor) {

    var list = document.getElementById("listPanel"),
        LI_TEMPLETA=new String("<li data-id='{0}' title='{1}'>{1}</li>"),
        ul= document.getElementById("codeUL");
    function togglePanel() {

        if (list.style.display) {

            list.style.display="";
        }
        else{
            list.style.display = "block";
        }
    }

    function registerEvent()
    {
        ul.addEventListener("click",function(event){

            var src=event.srcElement||event.target;
            if(src.nodeName&&src.nodeName==="LI")
            {
                id=parseInt(src.getAttribute("data-id"))|0;
                editor.init(id);
            }
        })
    }

    function showList()
    {
        if(!list.style.display)return;
        new Code().getAll().then(function(data){

            var listr="";
            data.forEach(function(item){
                listr+=LI_TEMPLETA.format(item.id,item.title);
            });

           ul.innerHTML=listr;
            registerEvent();
        });
    }

    return {
        'togglePanel':togglePanel,
        'showList':showList
    };

});
