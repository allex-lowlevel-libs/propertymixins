module.exports = function (inheritMethods, dummyFunc) {
  'use strict';
  function Gettable(){
  }
  Gettable.prototype.__cleanUp = dummyFunc;
  Gettable.prototype.get = function(name){
    var methodname = 'get_'+name;
    var method = this[methodname];
    if(typeof method === 'function'){
      return method.call(this);
    }
    return this[name];
  };
  Gettable.get = function(obj,propname){
    var methodname = 'get_'+propname;
    if('function' === typeof obj[methodname]){
      return obj[methodname]();
    }else{
      methodname = 'get';
      if('function' === typeof obj[methodname]){
        return obj[methodname](propname);
      }else{
        return obj[propname];
      }
    }
    console.trace();
    console.log(this);
    throw 'No property named '+propname;
  };

  Gettable.addMethods = function (chld) {
    inheritMethods(chld, Gettable, 'get');
  };
  return Gettable;
};
