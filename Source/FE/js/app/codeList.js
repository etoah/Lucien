/**
 * Created by Lucien on 9/29/2015.
 */


define(['app/Code', 'app/editor'], function (Code, editor) {

    var listPanel = document.getElementById("listPanel"),
        LI_TEMPLETA = "<li data-id='{0}' title='{1}'>{1}</li>",
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

            var src = event.srcElement || event.target;
            if (src.nodeName && src.nodeName === "LI") {
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
        if (!listPanel.style.display)return;
        new Code().getAll().then(function (data) {

            var listr = "";
            data.forEach(function (item) {
                listr += LI_TEMPLETA.format(item.id, item.title);
            });

            ul.innerHTML = listr;
            registerEvent();
        });
    }

    return {
        'togglePanel': togglePanel,
        'showList': showList
    };

});
