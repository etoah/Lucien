/**
 * Created by Lucien on 9/29/2015.
 */


define(['app/Code', 'app/editor',"local","app/config"], function (Code, editor,local,config) {

    var listPanel = document.getElementById("listPanel"),
        LI_TEMPLETA = "<li data-id='{0}' title='{1}' class='{2}'>{1}</li>",
        ul = document.getElementById("codeUL");


    function togglePanel() {

        if (listPanel.style.display) {
            listPanel.style.display = "";
            document.removeEventListener("click", hidePanel);
            window.frames[0].document.removeEventListener("click", hidePanel);
        }
        else {
            listPanel.style.display = "block";
            document.addEventListener("click", hidePanel);
            window.frames[0].document.addEventListener("click", hidePanel);
        }
    }

    function registerEvent() {
        listPanel.addEventListener("click", function (event) {

            var src = event.srcElement || event.target,
             ele=this.querySelector("[class='list-active']");
            if (src.nodeName && src.nodeName === "LI") {
                ele&&(ele.className="");
                src.className="list-active";
                id = parseInt(src.getAttribute("data-id")) || 0;
                editor.init(id).then(function(){
                    window.frames[0].document.addEventListener("click", hidePanel);
                });

            }
            event.stopPropagation();
        });


    }

    function hidePanel() {
        listPanel.style.display = "";
    }

    function showList() {
        togglePanel();//Todo:需优化 会引起reflow，repaint
        if (!listPanel.style.display)return;
       return new Code().getAll().then(function (data) {

            var listr = "";
            data.forEach(function (item) {
                listr += LI_TEMPLETA.format(item.id, item.title,item.id==local(config.storeKey)?"list-active":"");
            });

            ul.innerHTML = listr;
            registerEvent();//Todo:事件只需注册一次

        });
    }

    return {
        'showList': showList
    };

});
