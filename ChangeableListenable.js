module.exports = function (inherit, Gettable, Changeable, Listenable) {
  'use strict';

  function ChangeableListenable () {
    Changeable.call(this);
    Listenable.call(this);
  }
  inherit(ChangeableListenable, Changeable);
  ChangeableListenable.prototype.destroy = 
  ChangeableListenable.prototype.__cleanUp = function () {
    Changeable.prototype.destroy.call(this);
    Listenable.prototype.destroy.call(this);
  };

  ChangeableListenable.prototype.attachListener = function (cborpropname, cb) {
    var ret = Listenable.prototype.attachListener.call(this, 'changed', cborpropname, cb);
    cb (Gettable.get(this, cborpropname));
    return ret;
  };

  ChangeableListenable.addMethods = function (chld) {
    Changeable.addMethods(chld);
    Listenable.addMethods(chld);
  };


  return ChangeableListenable;
};
