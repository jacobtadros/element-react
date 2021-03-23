"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _libs = require("../../libs");

var _assets = _interopRequireDefault(require("./assets"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

var Toast = /*#__PURE__*/function (_Component) {
  _inherits(Toast, _Component);

  var _super = _createSuper(Toast);

  function Toast(props) {
    var _this;

    _classCallCheck(this, Toast);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "state", void 0);

    _this.state = {
      visible: false
    };
    return _this;
  }

  _createClass(Toast, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.setState({
        visible: true
      });
      this.startTimer();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.stopTimer();
    }
  }, {
    key: "onClose",
    value: function onClose() {
      this.stopTimer();
      this.setState({
        visible: false
      });
    }
  }, {
    key: "startTimer",
    value: function startTimer() {
      var _this2 = this;

      if (this.props.duration > 0) {
        this.timeout = setTimeout(function () {
          _this2.onClose();
        }, this.props.duration);
      }
    }
  }, {
    key: "stopTimer",
    value: function stopTimer() {
      clearTimeout(this.timeout);
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props = this.props,
          iconClass = _this$props.iconClass,
          customClass = _this$props.customClass;
      return /*#__PURE__*/_react["default"].createElement(_libs.Transition, {
        name: "el-message-fade",
        onAfterLeave: function onAfterLeave() {
          _this3.props.willUnmount();
        }
      }, /*#__PURE__*/_react["default"].createElement(_libs.View, {
        show: this.state.visible
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: this.classNames('el-message', customClass),
        onMouseEnter: this.stopTimer.bind(this),
        onMouseLeave: this.startTimer.bind(this)
      }, !iconClass && /*#__PURE__*/_react["default"].createElement("img", {
        className: "el-message__img",
        src: _assets["default"][this.props.type]
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: this.classNames('el-message__group', {
          'is-with-icon': iconClass
        })
      }, iconClass && /*#__PURE__*/_react["default"].createElement("i", {
        className: this.classNames('el-message__icon', iconClass)
      }), /*#__PURE__*/_react["default"].createElement("p", null, this.props.message), this.props.showClose && /*#__PURE__*/_react["default"].createElement("div", {
        className: "el-message__closeBtn el-icon-close",
        onClick: this.onClose.bind(this)
      })))));
    }
  }]);

  return Toast;
}(_libs.Component);

exports["default"] = Toast;
Toast.propTypes = {
  type: _libs.PropTypes.oneOf(['success', 'warning', 'info', 'error']),
  message: _libs.PropTypes.oneOfType([_libs.PropTypes.string, _libs.PropTypes.element]).isRequired,
  duration: _libs.PropTypes.number,
  showClose: _libs.PropTypes.bool,
  customClass: _libs.PropTypes.string,
  iconClass: _libs.PropTypes.string
};
Toast.defaultProps = {
  type: 'info',
  duration: 3000,
  showClose: false
};