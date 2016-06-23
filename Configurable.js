module.exports = function (inheritMethods, extend, jsonschema, readPropertyFromDotDelimitedString, isArray) {
  'use strict';


  function check (config, f) {
    if (!config || !(f in config)) throw new Error('Missing mandatory field: '+f);
  }

  function checkFieldsSchema (config, fs) {
    if (!fs) return; //nothing to be done ...
    if (isArray(fs)) {
      fs.forEach(check.bind(null, config));
      return;
    }
    var validate = require('jsonschema').validate,
      result = validate(config, fs, {throwError: true});
  }

  function Configurable (config) {
    this.config = extend({}, this.DEFAULT_CONFIG(),config);
    checkFieldsSchema(config, this.CONFIG_SCHEMA());
  }
  
  Configurable.prototype.destroy = 
  Configurable.prototype.__cleanUp = function () {
    this.config = null;
  };

  Configurable.prototype.getConfigVal = function (name) {
    try {
      return readPropertyFromDotDelimitedString(this.config, name);
    }catch (e) {
      return null;
    }
  };

  Configurable.prototype.configToString = function () {
    return JSON.stringify (this.config, null, 2);
  };

  Configurable.prototype.DEFAULT_CONFIG = function () {
    throw new Error('DEFAULT_CONFIG not implemented');
  };

  Configurable.prototype.CONFIG_SCHEMA = function () {
    //provide MANDATORY_CONFIG_FIELDS for mandatory fields list ... for more complex config validation override CONFIG_SCHEMA
    return this.MANDATORY_CONFIG_FIELDS ? this.MANDATORY_CONFIG_FIELDS() : null;
  };

  Configurable.addMethods = function (chld) {
    inheritMethods(chld, Configurable, 'getConfigVal', 'configToString', 'DEFAULT_CONFIG', 'CONFIG_SCHEMA');
  };

  return Configurable;
};
