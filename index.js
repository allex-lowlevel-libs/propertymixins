module.exports = function (inheritlib, dummyFunc, isFunction, _EventEmitter, extend, Destroyable) {
  'use strict';
  var Gettable = require('./Gettable.js')(inheritlib.inheritMethods, dummyFunc),
    Settable = require('./Settable')(inheritlib.inheritMethods, dummyFunc, Gettable),
    Changeable = require('./Changeable.js')(inheritlib.inheritMethods, _EventEmitter, Gettable, Settable),
    Listenable = require('./Listenable')(inheritlib.inheritMethods, dummyFunc, isFunction, _EventEmitter),
    ChangeableListenable = require('./ChangeableListenable.js')(inheritlib.inherit, Gettable, Changeable, Listenable);
  return {
    Changeable : Changeable,
    Gettable:Gettable,
    Listenable:Listenable,
    Settable:Settable,
    ChangeableListenable: ChangeableListenable,
    CLDestroyable: require('./CLDestroyable.js')(inheritlib, ChangeableListenable, Destroyable, Gettable, Changeable),
    Configurable: require('./Configurable.js')(inheritlib.inheritMethods, extend),
    CBMapable : require('./CBMapable.js')(inheritlib.inheritMethods, isFunction)
  };
};
