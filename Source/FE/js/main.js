/**
 * Created by Lucien on 9/20/2015.
 */


requirejs.config({
    baseUrl: 'js/lib',

    paths: {
        app: '../app'
    }
});

require(['app/editor', 'require', 'domready!'], function (editors) {


    editors.init();
    document.getElementById("play").addEventListener("click", function () {
        editors.play();
        editors.styleToggle(false);

    });


    //�ӳټ���
    require(['app/Code', 'app/editor', 'local', 'app/config','app/codeList'], function (Code, editor, local,config,codeList) {


        //������б����¼�
        document.getElementById("play").addEventListener("click", function () {
            new Code(editor.html.getValue(), editor.css.getValue(), editor.js.getValue()).add();
        });

        //�½��¼�
        document.getElementById("newCase").addEventListener("click", function () {
            editor.newCase(true);
        });

        //�б�չʾ�¼�
        document.getElementById("listGrip").addEventListener("click", function (event) {
            codeList.togglePanel();
            codeList.showList();
            event.stopPropagation();

        });

        //ɾ���¼�
        document.getElementById("delCase").addEventListener("click", function () {

            editor.newCase();
            var timer= setTimeout(function(){
                new Code().delete(parseInt(local(config.storeKey))||0).then(function(){
                    console.log("ɾ���ɹ�");
                },function(){
                    console.log("ɾ���ɹ�");
                });
            },1000);

        });





        require(['emmet']);


    });

});




