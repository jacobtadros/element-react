"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _range = _interopRequireDefault(require("./range"));

var _regex = _interopRequireDefault(require("./regex"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_propTypes["default"].range = _range["default"];
_propTypes["default"].regex = _regex["default"];
var _default = _propTypes["default"];
exports["default"] = _default;