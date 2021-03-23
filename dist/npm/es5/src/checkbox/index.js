"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _CheckBox = _interopRequireDefault(require("./CheckBox"));

var _CheckBoxGroup = _interopRequireDefault(require("./CheckBoxGroup"));

var _CheckBoxButton = _interopRequireDefault(require("./CheckBoxButton"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_CheckBox["default"].Group = _CheckBoxGroup["default"];
_CheckBox["default"].Button = _CheckBoxButton["default"];
var _default = _CheckBox["default"];
exports["default"] = _default;