module.exports = function (inheritMethods, dummyFunc, isFunction, _EventEmitter) {
  'use strict';
  function filterEvent(cb,targetpropname,propname,propval){
    if(targetpropname===propname){
      cb(propval);
    }
  }
  function Listenable(){
  }
  Listenable.prototype.attachListener = function(evntname,cborpropname,cb){
    var evnt = this[evntname];
    if(!(evnt instanceof _EventEmitter)){
      return;
    }
    if(typeof cborpropname === 'string'){
      evntname = cborpropname+'_'+evntname;
      if(this[evntname] instanceof _EventEmitter){
        evnt = this[evntname];
      }
      if(isFunction(cb)){
        return evnt.attach(filterEvent.bind(null,cb,cborpropname));
      }
    }
    if(isFunction(cborpropname)){
      return evnt.attach(cborpropname);
    }
  };
  Listenable.prototype.destroy =
  Listenable.prototype.__cleanUp = dummyFunc;

  Listenable.addMethods = function (chld) {
    inheritMethods(chld, Listenable, 'attachListener');
  };
  return Listenable;
};
