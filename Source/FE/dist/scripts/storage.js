/**
 * Created by Lucien on 9/21/2015.
 */


define(function () {


    return function Storage(key, value, isDel, storage) {

        if (isDel === false) {
            return storage.removeItem(key);
        }
        if (value === undefined) {
            return storage.getItem(key);
        }
        else {
            return storage.setItem(key, value);
        }

    }
});
