"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _SvPanel = _interopRequireDefault(require("./SvPanel"));

var _HueSlider = _interopRequireDefault(require("./HueSlider"));

var _AlphaSlider = _interopRequireDefault(require("./AlphaSlider"));

var _libs = require("../../../libs");

var _locale = _interopRequireDefault(require("../../locale"));

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

var PickerDropdown = /*#__PURE__*/function (_Component) {
  _inherits(PickerDropdown, _Component);

  var _super = _createSuper(PickerDropdown);

  function PickerDropdown(props) {
    _classCallCheck(this, PickerDropdown);

    return _super.call(this, props);
  }

  _createClass(PickerDropdown, [{
    key: "render",
    value: function render() {
      var _this = this;

      var _this$props = this.props,
          color = _this$props.color,
          showAlpha = _this$props.showAlpha,
          onPick = _this$props.onPick,
          onClear = _this$props.onClear,
          showPicker = _this$props.showPicker;
      var currentColor = color.value;
      return /*#__PURE__*/_react["default"].createElement(_libs.Transition, {
        name: "el-zoom-in-top"
      }, /*#__PURE__*/_react["default"].createElement(_libs.View, {
        show: showPicker
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "el-color-dropdown el-color-picker__panel"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "el-color-dropdown__main-wrapper"
      }, /*#__PURE__*/_react["default"].createElement(_HueSlider["default"], {
        ref: "hue",
        color: color,
        vertical: true,
        onChange: function onChange(color) {
          return _this.props.onChange(color);
        }
      }), /*#__PURE__*/_react["default"].createElement(_SvPanel["default"], {
        ref: "sl",
        color: color,
        onChange: function onChange(color) {
          return _this.props.onChange(color);
        }
      })), showAlpha && /*#__PURE__*/_react["default"].createElement(_AlphaSlider["default"], {
        ref: "alpha",
        color: color
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: "el-color-dropdown__btns"
      }, /*#__PURE__*/_react["default"].createElement("span", {
        className: "el-color-dropdown__value"
      }, currentColor), /*#__PURE__*/_react["default"].createElement("a", {
        href: "JavaScript:",
        className: "el-color-dropdown__link-btn",
        onClick: function onClick() {
          return onClear();
        }
      }, _locale["default"].t('el.colorpicker.clear')), /*#__PURE__*/_react["default"].createElement("button", {
        className: "el-color-dropdown__btn",
        onClick: function onClick() {
          return onPick();
        }
      }, _locale["default"].t('el.colorpicker.confirm'))))));
    }
  }]);

  return PickerDropdown;
}(_libs.Component);

exports["default"] = PickerDropdown;
PickerDropdown.propTypes = {
  color: _libs.PropTypes.object.isRequired,
  showPicker: _libs.PropTypes.bool,
  showAlpha: _libs.PropTypes.bool,
  onPick: _libs.PropTypes.func,
  onClear: _libs.PropTypes.func,
  onChange: _libs.PropTypes.func
};
PickerDropdown.defaultProps = {
  onPick: function onPick() {},
  onClear: function onClear() {},
  onChange: function onChange() {}
};