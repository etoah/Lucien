/**
 * Created by Lucien on 9/23/2015.
 */
define(['Entity','storage','app/config'],function(Entity,storage,config){


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


    Code.prototype.add=function(onsuccess, onerror){


        this.entity.synctime=new Date();

        this.factory.put(this.entity, function(event){

            storage[config.storeKey]=event.target.result.id;

        }, onerror)


    };
    return Code;
});