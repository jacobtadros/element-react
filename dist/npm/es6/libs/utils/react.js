"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.firstChild = firstChild;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function firstChild(props) {
  var childrenArray = _react["default"].Children.toArray(props.children);

  return childrenArray[0] || null;
}