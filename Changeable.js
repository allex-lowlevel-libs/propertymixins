module.exports = function (inheritMethods, isFunction, _EventEmitter, Gettable, Settable) {
  'use strict';

  function Changeable(){
    this.changed = new _EventEmitter();
  }
  Changeable.prototype.destroy = 
  Changeable.prototype.__cleanUp = function(){
    this.changed.destruct();
    this.changed = null;
  };
  function fire_er(chng, name) {
    chng.fireEvent(name, Gettable.prototype.get.call(chng, name));
  }
  Changeable.prototype.set = function(name,val){
    var setresult = Settable.prototype.set.call(this,name,val);
    if(setresult){
      if (isFunction(setresult.done)) {
        setresult.done(fire_er.bind(null, this, name));
      } else {
        this.fireEvent(name, Gettable.prototype.get.call(this, name));
      }
      return true;
    }
    return false;
  };
  Changeable.prototype.fireEvent = function(){
    this.changed && this.changed.fire.apply(this.changed,arguments);
  };

  Changeable.addMethods = function (chld){
    inheritMethods(chld, Changeable, 'fireEvent', 'set');
  }
  return Changeable;
};
