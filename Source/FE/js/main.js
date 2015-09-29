/**
 * Created by Lucien on 9/20/2015.
 */


requirejs.config({
    baseUrl: 'js/lib',

    paths: {
        app: '../app'
    }
});

require(['app/editor','require','domready!'], function (editors) {



    editors.init();
    document.getElementById("play").addEventListener("click", function () {
        editors.play();
        editors.styleToggle(false);

    });



    //ясЁы╪сть
    require(['app/Code','app/editor'],function(Code,editor){



        document.getElementById("play").addEventListener("click", function () {
            new Code(editor.html.getValue(),editor.css.getValue(),editor.js.getValue()).add();
        });



        require(['emmet']);


    });

});




