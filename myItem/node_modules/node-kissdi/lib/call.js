(function() {
  var InjectCall, deepcopy,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  deepcopy = require("deepcopy");

  InjectCall = (function() {
    function InjectCall(params, _function, defaultValues) {
      this.params = params;
      this["function"] = _function;
      this.defaultValues = defaultValues;
      this["invoke"] = bind(this["invoke"], this);
    }

    InjectCall.prototype["invoke"] = function(factor) {
      var fn, fn1, key, paramValues, ref, v, value;
      paramValues = (function() {
        var i, len, ref, results;
        ref = this.params;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          v = ref[i];
          results.push(void 0);
        }
        return results;
      }).call(this);
      ref = this.defaultValues;
      fn = (function(_this) {
        return function(key, value) {
          return paramValues[_this.params.indexOf(key)] = value;
        };
      })(this);
      for (key in ref) {
        value = ref[key];
        fn(key, value);
      }
      fn1 = (function(_this) {
        return function(key, value) {
          return paramValues[_this.params.indexOf(key)] = value;
        };
      })(this);
      for (key in factor) {
        value = factor[key];
        fn1(key, value);
      }
      return this["function"].apply(this["function"], paramValues);
    };

    return InjectCall;

  })();

  module.exports = InjectCall;

}).call(this);
