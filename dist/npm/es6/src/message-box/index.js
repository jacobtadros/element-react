"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _MessageBox = _interopRequireDefault(require("./MessageBox"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function alert(message, title, props) {
  if (_typeof(title) === 'object') {
    props = title;
  }

  props = Object.assign({
    title: title,
    message: message,
    modal: 'alert',
    closeOnPressEscape: false,
    closeOnClickModal: false
  }, props);
  return next(props);
}

function confirm(message, title, props) {
  if (_typeof(title) === 'object') {
    props = title;
  }

  props = Object.assign({
    title: title,
    message: message,
    modal: 'confirm',
    showCancelButton: true
  }, props);
  return next(props);
}

function prompt(message, title, props) {
  if (_typeof(title) === 'object') {
    props = title;
  }

  props = Object.assign({
    title: title,
    message: message,
    modal: 'prompt',
    showCancelButton: true,
    showInput: true
  }, props);
  return next(props);
}

function msgbox(props) {
  return next(props);
}

function next(props) {
  return new Promise(function (resolve, reject) {
    var div = document.createElement('div');
    document.body.appendChild(div);

    if (props.lockScroll != false) {
      document.body.style.setProperty('overflow', 'hidden');
    }

    var component = /*#__PURE__*/_react["default"].createElement(_MessageBox["default"], Object.assign({}, props, {
      promise: {
        resolve: resolve,
        reject: reject
      },
      willUnmount: function willUnmount() {
        _reactDom["default"].unmountComponentAtNode(div);

        document.body.removeChild(div);
        document.body.style.removeProperty('overflow');
      }
    }));

    _reactDom["default"].render(component, div);
  });
}

var _default = {
  alert: alert,
  confirm: confirm,
  prompt: prompt,
  msgbox: msgbox
};
exports["default"] = _default;