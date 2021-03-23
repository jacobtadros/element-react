"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Radio = _interopRequireDefault(require("./Radio"));

var _RadioButton = _interopRequireDefault(require("./RadioButton"));

var _RadioGroup = _interopRequireDefault(require("./RadioGroup"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_Radio["default"].Button = _RadioButton["default"];
_Radio["default"].Group = _RadioGroup["default"];
var _default = _Radio["default"];
exports["default"] = _default;