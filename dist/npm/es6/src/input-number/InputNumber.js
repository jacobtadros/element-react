"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _libs = require("../../libs");

var _input = _interopRequireDefault(require("../input"));

var _util = require("./util");

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

var InputNumber = /*#__PURE__*/function (_Component) {
  _inherits(InputNumber, _Component);

  var _super = _createSuper(InputNumber);

  function InputNumber(props) {
    var _this;

    _classCallCheck(this, InputNumber);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "state", void 0);

    _this.state = {
      value: props.defaultValue,
      inputActive: false
    };
    return _this;
  }

  _createClass(InputNumber, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(props) {
      if (props.value != this.props.value) {
        this.setState({
          value: props.value
        });
      }
    }
  }, {
    key: "onKeyDown",
    value: function onKeyDown(e) {
      switch (e.keyCode) {
        case 38:
          // KeyUp
          e.preventDefault();
          this.increase();
          break;

        case 40:
          // KeyDown
          e.preventDefault();
          this.decrease();
          break;

        default:
          break;
      }
    }
  }, {
    key: "onBlur",
    value: function onBlur() {
      var value = this.state.value;

      if (this.isValid) {
        value = Number(value);

        if (value > this.props.max) {
          value = Number(this.props.max);
        } else if (value < this.props.min) {
          value = Number(this.props.min);
        }
      } else {
        value = undefined;
      }

      this.setState({
        value: value
      }, this.onChange);
    }
  }, {
    key: "onInput",
    value: function onInput(value) {
      var _this2 = this;

      this.setState({
        value: value
      }, function () {
        clearTimeout(_this2.timeout);
        _this2.timeout = setTimeout(function () {
          _this2.onBlur();
        }, 750);
      });
    }
  }, {
    key: "onChange",
    value: function onChange() {
      if (this.props.onChange) {
        this.props.onChange(this.state.value);
      }
    }
  }, {
    key: "isValid",
    get: function get() {
      return this.state.value !== '' && !isNaN(Number(this.state.value));
    }
  }, {
    key: "minDisabled",
    get: function get() {
      return !this.isValid || this.state.value - Number(this.props.step) < this.props.min;
    }
  }, {
    key: "maxDisabled",
    get: function get() {
      return !this.isValid || this.state.value + Number(this.props.step) > this.props.max;
    }
  }, {
    key: "increase",
    value: function increase() {
      var _this$props = this.props,
          step = _this$props.step,
          max = _this$props.max,
          disabled = _this$props.disabled,
          min = _this$props.min;
      var _this$state = this.state,
          value = _this$state.value,
          inputActive = _this$state.inputActive;

      if (this.maxDisabled) {
        inputActive = false;
      } else {
        if (value + Number(step) > max || disabled) return;
        if (value + Number(step) < min) value = min - Number(step);
        value = (0, _util.accAdd)(step, value);
      }

      this.setState({
        value: value,
        inputActive: inputActive
      }, this.onChange);
    }
  }, {
    key: "decrease",
    value: function decrease() {
      var _this$props2 = this.props,
          step = _this$props2.step,
          min = _this$props2.min,
          disabled = _this$props2.disabled,
          max = _this$props2.max;
      var _this$state2 = this.state,
          value = _this$state2.value,
          inputActive = _this$state2.inputActive;

      if (this.minDisabled) {
        inputActive = false;
      } else {
        if (value - Number(step) < min || disabled) return;
        if (value - Number(step) > max) value = Number(max) + Number(step);
        value = (0, _util.accSub)(value, step);
      }

      this.setState({
        value: value,
        inputActive: inputActive
      }, this.onChange);
    }
  }, {
    key: "activeInput",
    value: function activeInput(disabled) {
      if (!this.props.disabled && !disabled) {
        this.setState({
          inputActive: true
        });
      }
    }
  }, {
    key: "inactiveInput",
    value: function inactiveInput(disabled) {
      if (!this.props.disabled && !disabled) {
        this.setState({
          inputActive: false
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          controls = _this$props3.controls,
          disabled = _this$props3.disabled,
          size = _this$props3.size;
      var _this$state3 = this.state,
          value = _this$state3.value,
          inputActive = _this$state3.inputActive;
      return /*#__PURE__*/_react["default"].createElement("div", {
        style: this.style(),
        className: this.className('el-input-number', size && "el-input-number--".concat(size), {
          'is-disabled': disabled,
          'is-without-controls': !controls
        })
      }, controls && /*#__PURE__*/_react["default"].createElement("span", {
        className: this.classNames("el-input-number__decrease", {
          'is-disabled': this.minDisabled
        }),
        onClick: this.decrease.bind(this)
      }, /*#__PURE__*/_react["default"].createElement("i", {
        className: "el-icon-minus"
      })), controls && /*#__PURE__*/_react["default"].createElement("span", {
        className: this.classNames("el-input-number__increase", {
          'is-disabled': this.maxDisabled
        }),
        onClick: this.increase.bind(this)
      }, /*#__PURE__*/_react["default"].createElement("i", {
        className: "el-icon-plus"
      })), /*#__PURE__*/_react["default"].createElement(_input["default"], {
        ref: "input",
        className: this.classNames({
          'is-active': inputActive
        }),
        value: value,
        disabled: disabled,
        size: size,
        onChange: this.onInput.bind(this),
        onKeyDown: this.onKeyDown.bind(this),
        onBlur: this.onBlur.bind(this)
      }));
    }
  }]);

  return InputNumber;
}(_libs.Component);

exports["default"] = InputNumber;
InputNumber.propTypes = {
  defaultValue: _libs.PropTypes.number,
  value: _libs.PropTypes.number,
  step: _libs.PropTypes.oneOfType([_libs.PropTypes.number, _libs.PropTypes.string]),
  max: _libs.PropTypes.oneOfType([_libs.PropTypes.number, _libs.PropTypes.string]),
  min: _libs.PropTypes.oneOfType([_libs.PropTypes.number, _libs.PropTypes.string]),
  disabled: _libs.PropTypes.bool,
  controls: _libs.PropTypes.bool,
  size: _libs.PropTypes.string,
  onChange: _libs.PropTypes.func
};
InputNumber.defaultProps = {
  step: 1,
  controls: true,
  max: Infinity,
  min: 0
};