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


    //�ӳټ���
    require(['app/Code', 'app/editor', 'local', 'app/config','app/codeList','app/keymapper'],
        function (Code, editor, local,config,codeList,keyMap) {


        //������б����¼�
        document.getElementById("play").addEventListener("click", function () {
            Code.save(editor);
            editors.play();
            editors.styleToggle(false);
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
                    console.log("success");
                },function(){
                    console.log("failed");
                });
            },1000);

        });

        //��ݼ�����
        new keyMap("#editors").keyBind(['alt','s'],function(){
            Code.save(editor);
        });

        new keyMap().keyBind(['alt','r'],function(){
                Code.save(editor);
                editors.play();
                editors.styleToggle(false);
            }).keyBind(['alt','z'],function(){
            codeList.togglePanel();
            codeList.showList();
        });





        require(['emmet','xml-fold','matchtags']);


    });

});




