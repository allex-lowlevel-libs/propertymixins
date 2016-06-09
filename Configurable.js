module.exports = function (inheritMethods, extend) {
  'use strict';


  function check (config, f) {
    if (!config || !(f in config)) throw new Error('Missing mandatory field: '+f);
  }


  function Configurable (config) {
    this.config = extend({}, this.DEFAULT_CONFIG(),config);
    var mandatory_fields = this.MANDATORY_CONFIG_FIELDS();
    if (!mandatory_fields) return;
    mandatory_fields.forEach(check.bind(null, config));
  }
  
  Configurable.prototype.__cleanUp = function () {
    this.config = null;
  };

  Configurable.prototype.getConfigVal = function (name) {
    return this.config ? this.config[name] : null;
  };

  Configurable.prototype.configToString = function () {
    return JSON.stringify (this.config, null, 2);
  };

  Configurable.prototype.DEFAULT_CONFIG = function () {
    throw new Error('DEFAULT_CONFIG not implemented');
  };

  Configurable.prototype.MANDATORY_CONFIG_FIELDS = function () {return null;}

  Configurable.addMethods = function (chld) {
    inheritMethods(chld, Configurable, 'getConfigVal', 'configToString', 'DEFAULT_CONFIG', 'MANDATORY_CONFIG_FIELDS');
  };

  return Configurable;
};
