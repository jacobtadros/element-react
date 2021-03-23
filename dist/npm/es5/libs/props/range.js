"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _utils = require("../utils");

function _default(min, max) {
  return (0, _utils.createPropType)(function (props, propName, componentName) {
    var value = props[propName];

    if (value < min || value > max) {
      return new Error("Invalid prop ".concat(propName, " of ").concat(componentName, ", should between ").concat(min, " and ").concat(max, "."));
    }
  });
}