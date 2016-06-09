module.exports = function (inheritlib, ChangeableListenable, Destroyable, Gettable, Changeable) {
  function CLDestroyable () {
    ChangeableListenable.call(this);
    Destroyable.call(this);
  }
  inheritlib.inherit (CLDestroyable, Destroyable);
  inheritlib.inheritMethods(CLDestroyable, Gettable, 'get');
  inheritlib.inheritMethods(CLDestroyable, ChangeableListenable, 'attachListener');
  inheritlib.inheritMethods(CLDestroyable, Changeable, 'set', 'fireEvent');

  CLDestroyable.prototype.__cleanUp = function () {
    ChangeableListenable.prototype.__cleanUp.call(this);
    Destroyable.prototype.__cleanUp.call(this);
  };
  return CLDestroyable;
}
