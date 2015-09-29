/**
 * Created by Lucien on 9/23/2015.
 */
/**
 * Created by Lucien on 9/23/2015.
 */
define(['idbstore'], function (IDBStore) {

    function DBready(storeName) {
        return new Promise(function (resolve, reject) {
            new IDBStore({
                storePrefix: '',
                dbVersion: '1',
                storeName: storeName,
                keyPath: 'id',
                autoIncrement: true
            }, resolve);//'this' is IDBStore
        });
    }

    function add(storeName, value) {

        return DBready(storeName).then(function (factory) {

            return new Promise(function (resolve, reject) {

                factory.put(value, resolve, reject)
            })
        });
    }


    function update(storeName, value) {
        if (value.id === null || value.id === undefined) {
            throw("id undefined");
        }
        return add(storeName, value);
    }


    function _delete(storeName, id) {
        return DBready(storeName).then(function (factory) {
            return new Promise(function (resolve, reject) {
                factory.remove(id, resolve, reject);
            });
        });

    }

    function get(storeName, id) {
        return DBready(storeName).then(function (factory) {
            return new Promise(function (resolve, reject) {
                factory.get(id, resolve, reject);
            });
        });
    }


    function getAll(storeName) {

        return DBready(storeName).then(function (factory) {
            return new Promise(function (resolve, reject) {
                factory.getAll(resolve, reject);
            });
        });
    }


    function deleteDB(storeName) {
        return DBready(storeName).then(function (factory) {
                return new Promise(function (resolve, reject) {
                    factory.deleteDatabase(resolve, reject)
                });
            }
        )
    }

    return {
        'read': DBready,
        'add': add,
        'delete': _delete,
        'get': get,
        'getAll': getAll,
        'update': update,
        'deleteDB':deleteDB
    }

});