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


    //ясЁы╪сть
    require(['app/Code', 'app/editor', 'local', 'app/config'], function (Code, editor, local,config) {


        document.getElementById("play").addEventListener("click", function () {
            new Code(editor.html.getValue(), editor.css.getValue(), editor.js.getValue()).add();
        });

        document.getElementById("newCase").addEventListener("click", function () {
            local(config.storeKey, 'null');
            editor.html.setValue("");
            editor.css.setValue("");
            editor.js.setValue("");
        });


        require(['emmet']);


    });

});




