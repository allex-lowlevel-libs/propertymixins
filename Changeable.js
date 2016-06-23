module.exports = function (inheritMethods, _EventEmitter, Gettable, Settable) {
  'use strict';

  function Changeable(){
    this.changed = new _EventEmitter();
  }
  Changeable.prototype.destroy = 
  Changeable.prototype.__cleanUp = function(){
    this.changed.destruct();
    this.changed = null;
  };
  Changeable.prototype.set = function(name,val){
    if(Settable.prototype.set.call(this,name,val)){
      this.fireEvent(name, Gettable.prototype.get.call(this, name));
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
