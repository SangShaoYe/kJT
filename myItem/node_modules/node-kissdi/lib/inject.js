(function() {
  var InjectCall, deepcopy,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  deepcopy = require("deepcopy");

  InjectCall = require("./call");

  module.exports = function(target, defaultValue) {
    var defaultValueError, firstArgumentErr, i, len, param, params;
    firstArgumentErr = new TypeError(["1st argument must be a list", "having a function as last element"].join(" "));
    defaultValueError = new TypeError(["2nd argument must be an object having", "corresponding key and value"].join(" "));
    if (!(target instanceof Array) || typeof target[target.length - 1] !== "function") {
      throw firstArgumentErr;
    }
    if (typeof defaultValue !== "object" || defaultValue instanceof Array || !defaultValue) {
      throw defaultValueError;
    }
    params = deepcopy(target).splice(0, target.length - 1);
    for (i = 0, len = params.length; i < len; i++) {
      param = params[i];
      if (typeof param !== "string") {
        throw new TypeError("Target contains non-string param(s)");
      }
      if (indexOf.call(Object.keys(defaultValue), param) < 0) {
        throw new TypeError("Unsatisfied Field: " + param);
      }
    }
    for (param in defaultValue) {
      if (indexOf.call(params, param) < 0) {
        throw new TypeError("Unexpected Field: " + param);
      }
    }
    return new InjectCall(params, target[target.length - 1], defaultValue);
  };

}).call(this);
