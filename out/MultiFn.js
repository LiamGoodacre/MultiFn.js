
/*!
 * MultiFn.js JavaScript Utility v2.0.0
 * http://github.com/LiamGoodacre/MultiFn.js
 * 
 * Copyright 2011, Liam Goodacre
 * 
 * Author : Liam Goodacre
 * Author URL : http://liamgoodacre.com
 * GitHub : https://github.com/LiamGoodacre/MultiFn.js
 * Date : 2011_12_23
*/

(function() {
  var __slice = Array.prototype.slice;

  this.MultiFn || (this.MultiFn = (function() {
    var $api, $ui, __toString;
    __toString = Object.prototype.toString;
    $api = {
      Type: function(_value) {
        return __toString.call(_value).slice(8, -1);
      },
      IsFunction: function(_value) {
        return $api.Type(_value) === "Function";
      },
      Matcher: function(_signature) {
        var dat;
        dat = _signature.split(/\s+/);
        return function(_args) {
          var index, item_type, _len;
          if (_args && _args.length === dat.length) {
            for (index = 0, _len = dat.length; index < _len; index++) {
              item_type = dat[index];
              if (_args && !$api.Type(_args[index]).match(item_type)) return false;
            }
            return true;
          }
          return false;
        };
      },
      Fn: function(signature, fn) {
        var matcher;
        matcher = new $api.Matcher(signature);
        return {
          signature: signature,
          matcher: matcher,
          fn: fn
        };
      },
      MultiFn: function(_dat) {
        var data, data_default, key, result, value;
        data = [];
        data_default = _dat["default"];
        if (!$api.IsFunction(data_default)) data_default = (function() {});
        for (key in _dat) {
          value = _dat[key];
          if (key !== "default") data.push($api.Fn('' + key, value));
        }
        result = function() {
          var _base;
          return typeof (_base = result.lookup.apply(result, arguments)) === "function" ? _base.apply(null, arguments) : void 0;
        };
        result.lookup = function() {
          return $api.lookup.apply($api, [result, data, data_default].concat(__slice.call(arguments)));
        };
        result.add = function(signature, fn) {
          return data.push($api.Fn(signature, fn));
        };
        return result;
      },
      lookup: function() {
        var fn, item, _args, _dat, _default, _fn, _i, _len;
        _fn = arguments[0], _dat = arguments[1], _default = arguments[2], _args = 4 <= arguments.length ? __slice.call(arguments, 3) : [];
        fn = _default;
        for (_i = 0, _len = _dat.length; _i < _len; _i++) {
          item = _dat[_i];
          if (!(item.matcher(_args))) continue;
          fn = item.fn;
          break;
        }
        return fn;
      }
    };
    $ui = function(_dat) {
      return $api.MultiFn(_dat);
    };
    return $ui;
  })());

}).call(this);
