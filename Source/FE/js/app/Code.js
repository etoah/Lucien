/**
 * Created by Lucien on 9/23/2015.
 */
define(['entity', 'local', 'app/config', 'Util'], function (Entity, local, config) {


    var STORE_NAME = 'Code';

    function Code(html, css, js, tag,id) {
        this.entity={};
        this.entity.html = html;
        this.entity.css = css;
        this.entity.js = js;
        this.entity.tag = tag;
        this.entity.id=id;

    }


    Code.prototype.add = function () {
        this.entity.synctime = new Date().format("yyyyMMddhhmmss");
        this.entity.id=parseInt(local(config.storeKey))||null;
        return Entity.add(STORE_NAME,this.entity).then(function(data){

             return new Promise(function(resolve, reject){
                 local(config.storeKey,data);
                 this.entity.id=data;
                 resolve(this.entity);
             });

        });
    };

    Code.prototype.get = function (id) {
        return Entity.get(STORE_NAME,id||this.entity.id).then(function(data){

            return new Promise(function(resolve, reject){
                this.entity=data;
                resolve(this.entity);
            });

        });
    };

    Code.prototype.getLatest = function () {
       return this.get(parseInt(local(config.storeKey))||0);
    };


    return Code;
});