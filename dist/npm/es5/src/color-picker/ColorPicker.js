"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactClickOutside = _interopRequireDefault(require("react-click-outside"));

var _libs = require("../../libs");

var _PickerDropdown = _interopRequireDefault(require("./components/PickerDropdown"));

var _color = _interopRequireDefault(require("./color"));

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

var ColorPicker = /*#__PURE__*/function (_Component) {
  _inherits(ColorPicker, _Component);

  var _super = _createSuper(ColorPicker);

  function ColorPicker(props) {
    var _this;

    _classCallCheck(this, ColorPicker);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "state", void 0);

    var color = new _color["default"]({
      enableAlpha: _this.props.showAlpha,
      format: _this.props.colorFormat
    });
    _this.state = {
      value: _this.props.value,
      color: color,
      showPicker: false,
      showPanelColor: false
    };
    return _this;
  }

  _createClass(ColorPicker, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$state = this.state,
          value = _this$state.value,
          color = _this$state.color;

      if (value) {
        color.fromString(value);
        this.setState({
          color: color
        });
      }

      this.popperElm = this.refs.dropdown;
    }
  }, {
    key: "getChildContext",
    value: function getChildContext() {
      return {
        onChange: this.handleChange.bind(this)
      };
    }
  }, {
    key: "handleChange",
    value: function handleChange(color) {
      this.setState({
        value: color.value,
        color: color
      });
    }
  }, {
    key: "confirmValue",
    value: function confirmValue() {
      var value = this.state.value;
      var onChange = this.props.onChange;
      this.setState({
        showPicker: false
      }, function () {
        return onChange(value);
      });
    }
  }, {
    key: "clearValue",
    value: function clearValue() {
      var _this2 = this;

      this.setState({
        showPicker: false,
        showPanelColor: false,
        value: null
      }, function () {
        _this2.props.onChange(null);

        _this2.resetColor();
      });
    }
  }, {
    key: "hide",
    value: function hide() {
      var _this3 = this;

      this.setState({
        showPicker: false
      }, function () {
        return _this3.resetColor();
      });
    }
  }, {
    key: "resetColor",
    value: function resetColor() {
      var _this$state2 = this.state,
          value = _this$state2.value,
          color = _this$state2.color;

      if (value) {
        color.fromString(value);
        this.setState({
          color: color
        });
      }
    }
  }, {
    key: "handleClickOutside",
    value: function handleClickOutside() {
      this.setState({
        showPicker: false
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var showAlpha = this.props.showAlpha;
      var _this$state3 = this.state,
          value = _this$state3.value,
          color = _this$state3.color,
          showPicker = _this$state3.showPicker,
          showPanelColor = _this$state3.showPanelColor;
      var displayedColor;

      if (!value && !showPanelColor) {
        displayedColor = 'transparent';
      } else {
        var _color$toRgb = color.toRgb(),
            r = _color$toRgb.r,
            g = _color$toRgb.g,
            b = _color$toRgb.b;

        var alpha = color.get('alpha');

        if (typeof alpha === 'number') {
          displayedColor = showAlpha ? "rgba(".concat(r, ", ").concat(g, ", ").concat(b, ", ").concat(alpha / 100, ")") : "rgb(".concat(r, ", ").concat(g, ", ").concat(b, ")");
        }
      }

      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "el-color-picker"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "el-color-picker__trigger",
        onClick: function onClick() {
          return _this4.setState({
            showPicker: !showPicker
          });
        }
      }, /*#__PURE__*/_react["default"].createElement("span", {
        className: this.classNames({
          'el-color-picker__color': true,
          'is-alpha': showAlpha
        })
      }, /*#__PURE__*/_react["default"].createElement("span", {
        className: "el-color-picker__color-inner",
        style: {
          backgroundColor: displayedColor
        }
      }), !value && !showPanelColor && /*#__PURE__*/_react["default"].createElement("span", {
        className: "el-color-picker__empty el-icon-close"
      })), /*#__PURE__*/_react["default"].createElement("span", {
        className: "el-color-picker__icon el-icon-caret-bottom"
      })), /*#__PURE__*/_react["default"].createElement(_PickerDropdown["default"], {
        ref: "dropdown",
        showPicker: showPicker,
        color: color,
        onPick: function onPick() {
          return _this4.confirmValue();
        },
        onClear: function onClear() {
          return _this4.clearValue();
        },
        showAlpha: showAlpha
      }));
    }
  }]);

  return ColorPicker;
}(_libs.Component);

_defineProperty(ColorPicker, "defaultProps", {
  onChange: function onChange() {}
});

ColorPicker.childContextTypes = {
  onChange: _libs.PropTypes.func
};
ColorPicker.propTypes = {
  value: _libs.PropTypes.string,
  showAlpha: _libs.PropTypes.bool,
  colorFormat: _libs.PropTypes.string,
  onChange: _libs.PropTypes.func
};

var _default = (0, _reactClickOutside["default"])(ColorPicker);

exports["default"] = _default;