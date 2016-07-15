module.exports = function (inheritlib, dummyFunc, _EventEmitter, extend, Destroyable, jsonschema, readPropertyFromDotDelimitedString, isFunction, isArray) {
  'use strict';
  var Gettable = require('./Gettable.js')(inheritlib.inheritMethods, dummyFunc),
    Settable = require('./Settable')(inheritlib.inheritMethods, dummyFunc, isFunction, Gettable),
    Changeable = require('./Changeable.js')(inheritlib.inheritMethods, isFunction, _EventEmitter, Gettable, Settable),
    Listenable = require('./Listenable')(inheritlib.inheritMethods, dummyFunc, isFunction, _EventEmitter),
    ChangeableListenable = require('./ChangeableListenable.js')(inheritlib.inherit, Gettable, Changeable, Listenable);
  return {
    Changeable : Changeable,
    Gettable:Gettable,
    Listenable:Listenable,
    Settable:Settable,
    ChangeableListenable: ChangeableListenable,
    CLDestroyable: require('./CLDestroyable.js')(inheritlib, ChangeableListenable, Destroyable, Gettable, Changeable),
    Configurable: require('./Configurable.js')(inheritlib.inheritMethods, extend, jsonschema, readPropertyFromDotDelimitedString, isArray),
    CBMapable : require('./CBMapable.js')(inheritlib.inheritMethods, isFunction)
  };
};
