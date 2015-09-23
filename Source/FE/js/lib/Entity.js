/**
 * Created by Lucien on 9/23/2015.
 */
/**
 * Created by Lucien on 9/23/2015.
 */
define(['idbstore'],function(IDBStore){



    function Entity(storeName)
    {
        this.entity={

        };

        this.factory = new IDBStore({
            storePrefix:'',
            dbVersion:'0.0.1',
            storeName: storeName,
            keyPath: 'id',
            autoIncrement: true
        });
    }

    Entity.prototype={
        constructor:Entity,
        add:function(onsuccess, onerror)
        {
            this.factory.put(this.entity, onsuccess, onerror)
        },
        update:function(onsuccess, onerror)
        {
            if(this.entity.id===null||this.entity.id===undefined)
            {
                throw("id undefined");
            }
            else{
                this.factory.put(this.entity, onsuccess, onerror);
            }

        },
        delete:function(id,onsuccess, onerror)
        {
            var key=id||this.entity.id;
            this.factory.remove(key, onsuccess, onerror);
        },
        get:function(id, onsuccess, onerror){
            var f=onsuccess;
            onsuccess=function(entity){

                this.entity=entity;
                f(enntiy);
            };
            this.factory.get(id, onsuccess, onerror);
        },
        getAll:function(onsuccess, onerror){
            this.factory.getAll(onsuccess, onerror);
        }

    };


    return Entity;
});