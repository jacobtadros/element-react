"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  watchPropertyChange: true,
  createPropType: true,
  hashCode: true,
  pick: true,
  range: true,
  require_condition: true,
  ReactUtils: true,
  Errors: true,
  DateUtils: true,
  IDGenerator: true
};
exports.watchPropertyChange = watchPropertyChange;
exports.createPropType = createPropType;
exports.hashCode = hashCode;
exports.pick = pick;
exports.range = range;
Object.defineProperty(exports, "require_condition", {
  enumerable: true,
  get: function get() {
    return _assert.require_condition;
  }
});
Object.defineProperty(exports, "DateUtils", {
  enumerable: true,
  get: function get() {
    return _date["default"];
  }
});
Object.defineProperty(exports, "IDGenerator", {
  enumerable: true,
  get: function get() {
    return _IDGenerator.IDGenerator;
  }
});
exports.Errors = exports.ReactUtils = void 0;

var _assert = require("./assert");

var ReactUtils = _interopRequireWildcard(require("./react"));

exports.ReactUtils = ReactUtils;

var Errors = _interopRequireWildcard(require("./errors"));

exports.Errors = Errors;

var _date = _interopRequireDefault(require("./date"));

var _popperMixins = require("./popper-mixins");

Object.keys(_popperMixins).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _popperMixins[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _popperMixins[key];
    }
  });
});

var _IDGenerator = require("./IDGenerator");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function watchPropertyChange(target, property, cb) {
  (0, _assert.require_condition)(target != null && typeof property === 'string' && typeof cb === 'function', 'invalid arguments');
  var cache = null;

  if (!target.__watch_cache) {
    target.__watch_cache = {};
  }

  cache = target.__watch_cache;
  (0, _assert.require_condition)(cache[property] == null, "duplicated watch on ".concat(target, " 's ").concat(property));
  cache[property] = cb;
  var origin = target[property];
  Object.defineProperty(target, property, {
    configurable: true,
    get: function get() {
      return origin;
    },
    set: function set(value) {
      origin = value;

      if (cache[property]) {
        cache[property](origin);
      }
    }
  });
  return function () {
    if (target.__watch_cache && target.__watch_cache[property]) {
      delete target.__watch_cache[property];
      delete target[property];
      target[property] = origin;
    }
  };
}

function createPropType(validate) {
  // Chainable isRequired
  function checkType(isRequired, props, propName, componentName) {
    componentName = componentName || '<<anonymous>>';

    if (props[propName] == null) {
      if (isRequired) {
        return new Error("Required `" + propName + "` was not specified in " + ("`" + componentName + "`."));
      }

      return null;
    } else {
      return validate(props, propName, componentName);
    }
  }

  var chainedCheckType = checkType.bind(null, false);
  chainedCheckType.isRequired = checkType.bind(null, true);
  return chainedCheckType;
} // take from :  http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/


function hashCode(str) {
  if (str == null || str.length === 0) return 0;
  var hash = 0;

  for (var i = 0; i < str.length; i++) {
    var _char = str.charCodeAt(i);

    hash = (hash << 5) - hash + _char;
    hash = hash & hash; // Convert to 32bit integer
  }

  return hash;
}

function pick(obj, keys) {
  (0, _assert.require_condition)(obj != null && Array.isArray(keys));
  var r = {};
  keys.forEach(function (e) {
    return r[e] = obj[e];
  });
  return r;
}

function range(start, stop, step) {
  if (stop == null) {
    stop = start || 0;
    start = 0;
  }

  if (!step) {
    step = stop < start ? -1 : 1;
  }

  var length = Math.max(Math.ceil((stop - start) / step), 0);
  var range = Array(length);

  for (var idx = 0; idx < length; idx++, start += step) {
    range[idx] = start;
  }

  return range;
}