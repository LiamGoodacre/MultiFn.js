(function() {
  var sum,
    __hasProp = Object.prototype.hasOwnProperty;

  sum = new MultiFn({
    "default": function() {
      return 0;
    },
    "Number": function(_val) {
      return _val;
    },
    "String": function(_str) {
      return parseInt(_str, 10);
    },
    "Boolean": function(_bln) {
      return (_bln && 1) || 0;
    },
    "Array": function(_arr) {
      var total, value, _i, _len;
      total = 0;
      for (_i = 0, _len = _arr.length; _i < _len; _i++) {
        value = _arr[_i];
        total += sum(value);
      }
      return total;
    },
    "Object": function(_obj) {
      var key, total, value;
      total = 0;
      for (key in _obj) {
        if (!__hasProp.call(_obj, key)) continue;
        value = _obj[key];
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
