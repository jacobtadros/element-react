"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _TableStore = _interopRequireDefault(require("./TableStore"));

var _TableColumn = _interopRequireDefault(require("./TableColumn"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_TableStore["default"].Column = _TableColumn["default"];
var _default = _TableStore["default"];
exports["default"] = _default;