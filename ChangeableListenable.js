module.exports = function (inherit, Gettable, Changeable, Listenable) {
  'use strict';

  function ChangeableListenable () {
    Changeable.call(this);
    Listenable.call(this);
  }
  inherit(ChangeableListenable, Changeable);
  ChangeableListenable.prototype.__cleanUp = function () {
    Changeable.prototype.__cleanUp.call(this);
    Listenable.prototype.__cleanUp.call(this);
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
