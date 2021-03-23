"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _utils = require("../utils");

var _default = (0, _utils.createPropType)(function (props, propName, componentName) {
  var value = props[propName];

  if (!(value instanceof RegExp)) {
    return new Error("Invalid prop ".concat(propName, " of ").concat(componentName, ", should be valid regex."));
  }
});

exports["default"] = _default;