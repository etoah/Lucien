/**
 * Created by Lucien on 9/21/2015.
 */

define(['storage'],function(storage){
    return function(key, value, isDel){
       return storage(key, value, isDel,sessionStorage);
    }

});
