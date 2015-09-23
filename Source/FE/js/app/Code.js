/**
 * Created by Lucien on 9/23/2015.
 */
define(['Entity'],function(Entity){


    var STORE_NAME='Code';

    function Code(html,css,js,tag)
    {

        Entity.call(this,STORE_NAME);

        this.entity.html=html;
        this.entity.css=css;
        this.entity.js=js;
        this.entity.tag=tag;


    }

    Code.prototype=new Entity();
    Code.prototype.constructor=Code;

    //
    //Code.prototype.put=function(){
    //    var f= this.prototype.put;
    //    this.entity.synctime=new Date();
    //    f.apply(this,arguments);
    //
    //};
    return Code;
});