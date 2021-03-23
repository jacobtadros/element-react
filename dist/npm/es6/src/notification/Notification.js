"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var React = _interopRequireWildcard(require("react"));

var _libs = require("../../libs");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Transition = _libs.Animate.Transition;
var typeMap = {
  success: 'circle-check',
  info: 'information',
  warning: 'warning',
  error: 'circle-cross'
};

var Notification = /*#__PURE__*/function (_Component) {
  _inherits(Notification, _Component);

  var _super = _createSuper(Notification);

  function Notification(props) {
    var _this;

    _classCallCheck(this, Notification);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "state", void 0);

    _this.state = {
      visible: true
    };
    return _this;
  }

  _createClass(Notification, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.startTimer();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.stopTimer();
    }
  }, {
    key: "onClick",
    value: function onClick() {
      if (this.props.onClick) {
        this.props.onClick();
      }
    }
  }, {
    key: "onClose",
    value: function onClose() {
      var _this2 = this;

      this.setState({
        visible: false
      }, function () {
        return _this2.stopTimer();
      });
    }
  }, {
    key: "startTimer",
    value: function startTimer() {
      var _this3 = this;

      var duration = this.props.duration;

      if (duration) {
        this.timeout = setTimeout(function () {
          return _this3.onClose();
        }, duration);
      }
    }
  }, {
    key: "stopTimer",
    value: function stopTimer() {
      clearTimeout(this.timeout);
    }
  }, {
    key: "typeClass",
    value: function typeClass() {
      var type = this.props.type;
      return type && typeMap[type] ? "el-icon-".concat(typeMap[type]) : '';
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var visible = this.state.visible;
      var _this$props = this.props,
          _this$props$onClose = _this$props.onClose,
          onClose = _this$props$onClose === void 0 ? function () {
        return false;
      } : _this$props$onClose,
          willUnmount = _this$props.willUnmount,
          duration = _this$props.duration,
          top = _this$props.top,
          type = _this$props.type,
          iconClass = _this$props.iconClass,
          title = _this$props.title,
          message = _this$props.message;
      return /*#__PURE__*/React.createElement(Transition, {
        unmountOnExit: true,
        transitionClass: {
          exiting: 'el-notification-fade-leave-active',
          exited: 'el-notification-fade-enter'
        },
        "in": visible,
        onEnter: function onEnter() {
          _this4.offsetHeight = _this4.rootDOM.offsetHeight;
        },
        onExit: function onExit() {
          return willUnmount(_this4.offsetHeight, parseInt(_this4.rootDOM.style.top));
        },
        onExited: function onExited() {
          return onClose();
        }
      }, /*#__PURE__*/React.createElement(_libs.View, {
        show: visible
      }, /*#__PURE__*/React.createElement("div", {
        ref: function ref(ele) {
          _this4.rootDOM = ele;
        },
        className: "el-notification",
        style: {
          top: top,
          zIndex: 9999
        },
        onMouseEnter: this.stopTimer.bind(this),
        onMouseLeave: this.startTimer.bind(this),
        onClick: this.onClick.bind(this)
      }, type && /*#__PURE__*/React.createElement("i", {
        className: this.classNames('el-notification__icon', this.typeClass(), iconClass)
      }), /*#__PURE__*/React.createElement("div", {
        className: this.classNames('el-notification__group', {
          'is-with-icon': this.typeClass() || iconClass
        })
      }, /*#__PURE__*/React.createElement("h2", {
        className: "el-notification__title"
      }, title), /*#__PURE__*/React.createElement("div", {
        className: "el-notification__content"
      }, message), /*#__PURE__*/React.createElement("div", {
        className: "el-notification__closeBtn el-icon-close",
        onClick: this.onClose.bind(this)
      })))));
    }
  }]);

  return Notification;
}(_libs.Component);

exports["default"] = Notification;
Notification.propTypes = {
  type: _libs.PropTypes.oneOf(['success', 'warning', 'info', 'error']),
  title: _libs.PropTypes.string,
  message: _libs.PropTypes.oneOfType([_libs.PropTypes.string, _libs.PropTypes.element]),
  duration: _libs.PropTypes.number,
  iconClass: _libs.PropTypes.string,
  onClick: _libs.PropTypes.func,
  top: _libs.PropTypes.number
};
Notification.defaultProps = {
  duration: 4500,
  top: 16
};