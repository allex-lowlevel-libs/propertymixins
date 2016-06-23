module.exports = function (inheritMethods, isFunction) {
  'use strict';

  function CBMapable (cbmap) {
    this._cbmap = cbmap;
  }

  CBMapable.prototype.destroy = 
  CBMapable.prototype.__cleanUp = function () {
    this._cbmap = null;
  };

  CBMapable.prototype.call_cb = function (name, args) {
    if (!this._cbmap || !this._cbmap[name]) return;
    var f = this._cbmap[name];
    if (!isFunction(f)) return;
    return f.apply(null, args);
  };

  CBMapable.addMethods = function (chld) {
    inheritMethods(chld, CBMapable, 'call_cb');
  };

  return CBMapable;
};
