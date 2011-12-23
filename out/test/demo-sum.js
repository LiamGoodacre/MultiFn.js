(function() {
  var sum,
    __hasProp = Object.prototype.hasOwnProperty;

  sum = new MultiFn({
    "default": function() {
      return 0;
    },
    "Number": function(_args) {
      return _args[0];
    },
    "String": function(_args) {
      return parseInt(_args[0], 10);
    },
    "Boolean": function(_args) {
      return (_args[0] && 1) || 0;
    },
    "Array": function(_args) {
      var total, value, _i, _len, _ref;
      total = 0;
      _ref = _args[0];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        value = _ref[_i];
        total += sum(value);
      }
      return total;
    },
    "Object": function(_args) {
      var key, total, value, _ref;
      total = 0;
      _ref = _args[0];
      for (key in _ref) {
        if (!__hasProp.call(_ref, key)) continue;
        value = _ref[key];
        total += sum(value);
      }
      return total;
    }
  });

  /*
   * Tests
  */

  console.log(sum());

  console.log(sum(false));

  console.log(sum(true));

  console.log(sum(42));

  console.log(sum("13"));

  console.log(sum([true, "2", 3, 4]));

  console.log(sum({
    a: 1,
    b: 2,
    c: 3,
    d: 10
  }));

}).call(this);
