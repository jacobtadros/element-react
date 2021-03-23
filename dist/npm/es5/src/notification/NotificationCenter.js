"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = NotificationCenter;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _Notification = _interopRequireDefault(require("./Notification"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var className = '.el-notification';

function NotificationCenter() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var type = arguments.length > 1 ? arguments[1] : undefined;
  var div = document.createElement('div');
  document.body.appendChild(div);

  if (typeof props === 'string' || /*#__PURE__*/_react["default"].isValidElement(props)) {
    props = {
      message: props
    };
  }

  if (type) {
    props.type = type;
  }

  if (!props.offset) {
    props.offset = 0;
  }

  var instances = document.querySelectorAll(className);
  var lastInstance = instances[instances.length - 1];
  props.top = (lastInstance ? parseInt(lastInstance.style.top) + lastInstance.offsetHeight : props.offset) + 16;

  var element = /*#__PURE__*/_react["default"].createElement(_Notification["default"], Object.assign({}, props, {
    willUnmount: function willUnmount(height, top) {
      setTimeout(function () {
        return document.body.removeChild(div);
      });
      requestAnimationFrame(function () {
        var instances = document.querySelectorAll(className);
        var len = instances.length;

        for (var i = 0; i < len; i++) {
          var _element = instances[i];
          var elementTop = parseInt(_element.style.top);

          if (elementTop > top) {
            _element.style.top = "".concat(elementTop - height - 16, "px");
          }
        }
      });
    }
  }));

  _reactDom["default"].render(element, div);
}
/* eslint-disable */


['success', 'warning', 'info', 'error'].forEach(function (type) {
  NotificationCenter[type] = function () {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return NotificationCenter(options, type);
  };
});
/* eslint-enable */