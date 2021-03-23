"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _libs = require("../../libs");

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

var Switch = /*#__PURE__*/function (_Component) {
  _inherits(Switch, _Component);

  var _super = _createSuper(Switch);

  function Switch(props) {
    var _this;

    _classCallCheck(this, Switch);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "state", void 0);

    _this.state = {
      value: props.value,
      coreWidth: props.width,
      buttonStyle: {
        transform: ''
      }
    };
    return _this;
  }

  _createClass(Switch, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.width === 0) {
        this.state.coreWidth = this.hasText() ? 58 : 46;
      }

      this.updateSwitch();
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(props) {
      var _this2 = this;

      this.setState({
        value: props.value
      }, function () {
        _this2.updateSwitch();
      });

      if (props.width) {
        this.setState({
          coreWidth: props.width
        });
      }
    }
  }, {
    key: "updateSwitch",
    value: function updateSwitch() {
      this.handleButtonTransform();

      if (this.props.onColor || this.props.offColor) {
        this.setBackgroundColor();
      }
    }
  }, {
    key: "hasText",
    value: function hasText() {
      return this.props.onText || this.props.offText;
    }
  }, {
    key: "setBackgroundColor",
    value: function setBackgroundColor() {
      var newColor = this.state.value === this.props.onValue ? this.props.onColor : this.props.offColor;
      this.refs.core.style.borderColor = newColor;
      this.refs.core.style.backgroundColor = newColor;
    }
  }, {
    key: "setFocus",
    value: function setFocus() {
      if (this.props.allowFocus) {
        this.refs.input.focus();
      }
    }
  }, {
    key: "handleFocus",
    value: function handleFocus(e) {
      if (this.props.allowFocus) {
        this.props.onFocus(e);
      }
    }
  }, {
    key: "handleBlur",
    value: function handleBlur(e) {
      if (this.props.allowFocus) {
        this.props.onBlur(e);
      }
    }
  }, {
    key: "handleChange",
    value: function handleChange(e) {
      var _this3 = this;

      this.setState({
        value: e.target.checked ? this.props.onValue : this.props.offValue
      }, function () {
        _this3.updateSwitch();

        if (_this3.props.onChange) {
          _this3.props.onChange(_this3.state.value);
        }
      });
    }
  }, {
    key: "handleButtonTransform",
    value: function handleButtonTransform() {
      var _this$state = this.state,
          value = _this$state.value,
          coreWidth = _this$state.coreWidth,
          buttonStyle = _this$state.buttonStyle;
      buttonStyle.transform = value === this.props.onValue ? "translate(".concat(coreWidth - 20, "px, 2px)") : 'translate(2px, 2px)';
      this.setState({
        buttonStyle: buttonStyle
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          name = _this$props.name,
          disabled = _this$props.disabled,
          onText = _this$props.onText,
          offText = _this$props.offText,
          onValue = _this$props.onValue,
          onIconClass = _this$props.onIconClass,
          offIconClass = _this$props.offIconClass,
          allowFocus = _this$props.allowFocus;
      var _this$state2 = this.state,
          value = _this$state2.value,
          coreWidth = _this$state2.coreWidth,
          buttonStyle = _this$state2.buttonStyle;
      return /*#__PURE__*/_react["default"].createElement("label", {
        style: this.style(),
        className: this.className('el-switch', {
          'is-disabled': disabled,
          'el-switch--wide': this.hasText(),
          'is-checked': value === onValue
        })
      }, /*#__PURE__*/_react["default"].createElement(_libs.View, {
        show: disabled
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "el-switch__mask"
      })), /*#__PURE__*/_react["default"].createElement("input", {
        className: this.className('el-switch__input', {
          'allow-focus': allowFocus
        }),
        type: "checkbox",
        checked: value === onValue,
        name: name,
        ref: "input",
        disabled: disabled,
        onChange: this.handleChange.bind(this),
        onFocus: this.handleFocus.bind(this),
        onBlur: this.handleBlur.bind(this)
      }), /*#__PURE__*/_react["default"].createElement("span", {
        className: "el-switch__core",
        ref: "core",
        style: {
          'width': coreWidth + 'px'
        }
      }, /*#__PURE__*/_react["default"].createElement("span", {
        className: "el-switch__button",
        style: Object.assign({}, buttonStyle),
        onClick: this.setFocus.bind(this)
      })), /*#__PURE__*/_react["default"].createElement(_libs.Transition, {
        name: "label-fade"
      }, /*#__PURE__*/_react["default"].createElement(_libs.View, {
        show: value === onValue
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "el-switch__label el-switch__label--left",
        style: {
          'width': coreWidth + 'px'
        }
      }, onIconClass && /*#__PURE__*/_react["default"].createElement("i", {
        className: onIconClass
      }), !onIconClass && onText && /*#__PURE__*/_react["default"].createElement("span", null, onText)))), /*#__PURE__*/_react["default"].createElement(_libs.Transition, {
        name: "label-fade"
      }, /*#__PURE__*/_react["default"].createElement(_libs.View, {
        show: value !== onValue
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "el-switch__label el-switch__label--right",
        style: {
          'width': coreWidth + 'px'
        }
      }, offIconClass && /*#__PURE__*/_react["default"].createElement("i", {
        className: offIconClass
      }), !offIconClass && offText && /*#__PURE__*/_react["default"].createElement("span", null, offText)))));
    }
  }]);

  return Switch;
}(_libs.Component);

exports["default"] = Switch;
Switch.propTypes = {
  value: _libs.PropTypes.oneOfType([_libs.PropTypes.number, _libs.PropTypes.string, _libs.PropTypes.bool]),
  disabled: _libs.PropTypes.bool,
  width: _libs.PropTypes.number,
  onIconClass: _libs.PropTypes.string,
  offIconClass: _libs.PropTypes.string,
  onText: _libs.PropTypes.string,
  offText: _libs.PropTypes.string,
  onColor: _libs.PropTypes.string,
  offColor: _libs.PropTypes.string,
  onValue: _libs.PropTypes.oneOfType([_libs.PropTypes.number, _libs.PropTypes.string, _libs.PropTypes.bool]),
  offValue: _libs.PropTypes.oneOfType([_libs.PropTypes.number, _libs.PropTypes.string, _libs.PropTypes.bool]),
  name: _libs.PropTypes.string,
  onChange: _libs.PropTypes.func,
  onBlur: _libs.PropTypes.func,
  onFocus: _libs.PropTypes.func,
  allowFocus: _libs.PropTypes.bool
};
Switch.defaultProps = {
  value: true,
  disabled: false,
  width: 0,
  onIconClass: '',
  offIconClass: '',
  onText: 'ON',
  offText: 'OFF',
  onValue: true,
  offValue: false,
  onColor: '',
  offColor: '',
  name: '',
  allowFocus: false
};