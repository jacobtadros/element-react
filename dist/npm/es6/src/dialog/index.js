"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _DialogBody = _interopRequireDefault(require("./DialogBody"));

var _DialogFooter = _interopRequireDefault(require("./DialogFooter"));

var _Dialog = _interopRequireDefault(require("./Dialog"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_Dialog["default"].Body = _DialogBody["default"];
_Dialog["default"].Footer = _DialogFooter["default"];
var _default = _Dialog["default"];
exports["default"] = _default;