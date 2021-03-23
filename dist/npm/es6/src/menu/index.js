"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Menu = _interopRequireDefault(require("./Menu"));

var _SubMenu = _interopRequireDefault(require("./SubMenu"));

var _MenuItem = _interopRequireDefault(require("./MenuItem"));

var _MenuItemGroup = _interopRequireDefault(require("./MenuItemGroup"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_Menu["default"].SubMenu = _SubMenu["default"];
_Menu["default"].Item = _MenuItem["default"];
_Menu["default"].ItemGroup = _MenuItemGroup["default"];
var _default = _Menu["default"];
exports["default"] = _default;