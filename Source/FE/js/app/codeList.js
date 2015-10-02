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
        }
        else {
            listPanel.style.display = "block";
            document.addEventListener("click", hidePanel);
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
                editor.init(id);
            }
            event.stopPropagation();
        });


    }

    function hidePanel() {
        listPanel.style.display = "";
    }

    function showList() {
        togglePanel();//Todo:���Ż� ������reflow��repaint
        if (!listPanel.style.display)return;
       return new Code().getAll().then(function (data) {

            var listr = "";
            data.forEach(function (item) {
                listr += LI_TEMPLETA.format(item.id, item.title,item.id==local(config.storeKey)?"list-active":"");
            });

            ul.innerHTML = listr;
            registerEvent();

        });
    }

    return {
        'showList': showList
    };

});
