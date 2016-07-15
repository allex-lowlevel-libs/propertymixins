module.exports = function (inheritMethods, dummyFunc, isFunction, Gettable) {
  'use strict';

  function Settable(){
  }
  Settable.prototype.destroy = 
  Settable.prototype.__cleanUp = dummyFunc;
  Settable.prototype.set = function(name,val){
    return Settable.set(name, val, this);
  };

  ///signature kind of optimized for array forEach and similar methods (for easy bind ...)
  Settable.set = function (name, val, obj) {
    var origval = Gettable.get(obj,name),methodname = 'get_'+name;
    if(origval===val){return false;}
    methodname = 'set_'+name;
    var changed = false;
    if(isFunction(obj[methodname])){
      changed = obj[methodname].call(obj,val);
      if (!isFunction(changed.done)) {
        changed = (changed!==false);
      }
    }else{
      if (!(name in obj)) {
        console.warn ('EVO PROBLEMA',name, obj);
        console.trace();
        throw 'Name '+name+' in obj '+obj;
      }
      changed = true;
      obj[name] = val;
    }
    return changed;

  };

  Settable.addMethods = function (chld) {
    inheritMethods(chld, Settable, 'set');
  };
  return Settable;
};
