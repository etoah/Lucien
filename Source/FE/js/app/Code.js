/**
 * Created by Lucien on 9/23/2015.
 */
define(['Entity', 'local', 'app/config', 'Util'], function (Entity, local, config) {


    var STORE_NAME = 'Code';

    function Code(html, css, js, tag) {

        Entity.call(this, STORE_NAME);

        this.entity.html = html;
        this.entity.css = css;
        this.entity.js = js;
        this.entity.tag = tag;

    }

    Code.prototype = new Entity();
    Code.prototype.constructor = Code;

    Code.prototype.add = function (onsuccess, onerror) {


        this.entity.synctime = new Date().format("yyyyMMddhhmmss");


        if (local(config.storeKey)) {
            this.factory.put(local(config.storeKey), this.entity, function (data) {

                local(config.storeKey, data);
                onsuccess&&onsuccess(data);

            }, function (data) {

                onerror&&onerror(data);
                console.log("IndexedDB error: " + evt.target.errorCode);

            });
            return;
        }
        else {

            this.factory.put(this.entity, function (data) {

                local(config.storeKey, data);
                console.log("key:" + data + " saved");
                onsuccess&&onsuccess(data);

            }, function (evt) {

                onerror&&onerror(data);
                console.log("IndexedDB error: " + evt.target.errorCode);

            })

        }
    };

    Code.prototype.get = function (id, onsuccess, onerror) {

        this.factory.get(id, function (data) {
            this.entity = data;
            onsuccess&&onsuccess(this.entity);
        }, function (data) {
            this.entity = null;
            onerror&&onerror(data)
        });

    };

    Code.prototype.getLatest = function (onsuccess) {
        this.get(parseInt(local(config.storeKey)),onsuccess);
    };
    return Code;
});