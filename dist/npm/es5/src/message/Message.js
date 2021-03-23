"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Message;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _Toast = _interopRequireDefault(require("./Toast"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function Message() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var type = arguments.length > 1 ? arguments[1] : undefined;
  var div = document.createElement('div');
  var messageBox = document.getElementsByClassName('el-message-content')[0];

  if (messageBox) {
    messageBox.appendChild(div);
    document.body.appendChild(messageBox);
  } else {
    var _messageBox = document.createElement('div');

    _messageBox.className = "el-message-content";

    _messageBox.appendChild(div);

    document.body.appendChild(_messageBox);
  }

  if (typeof props === 'string' || /*#__PURE__*/_react["default"].isValidElement(props)) {
    props = {
      message: props
    };
  }

  if (type) {
    props.type = type;
  }

  var component = /*#__PURE__*/_react["default"].createElement(_Toast["default"], Object.assign(props, {
    willUnmount: function willUnmount() {
      var messageBox = document.getElementsByClassName('el-message-content')[0];

      _reactDom["default"].unmountComponentAtNode(div);

      messageBox.removeChild(div);

      if (props.onClose instanceof Function) {
        props.onClose();
      }
    }
  }));

  _reactDom["default"].render(component, div);
}
/* eslint-disable */


['success', 'warning', 'info', 'error'].forEach(function (type) {
  Message[type] = function () {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return Message(options, type);
  };
});
/* eslint-enable */