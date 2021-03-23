"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _libs = require("../../libs");

var _Radio2 = _interopRequireDefault(require("./Radio"));

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

var RadioButton = /*#__PURE__*/function (_Radio) {
  _inherits(RadioButton, _Radio);

  var _super = _createSuper(RadioButton);

  function RadioButton() {
    _classCallCheck(this, RadioButton);

    return _super.apply(this, arguments);
  }

  _createClass(RadioButton, [{
    key: "parent",
    value: function parent() {
      return this.context.component;
    }
  }, {
    key: "size",
    value: function size() {
      return this.parent().props.size;
    }
  }, {
    key: "isDisabled",
    value: function isDisabled() {
      return this.props.disabled || this.parent().props.disabled;
    }
  }, {
    key: "activeStyle",
    value: function activeStyle() {
      return {
        backgroundColor: this.parent().props.fill || '',
        borderColor: this.parent().props.fill || '',
        color: this.parent().props.textColor || ''
      };
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react["default"].createElement("label", {
        style: this.style(),
        className: this.className('el-radio-button', this.props.size && "el-radio-button--".concat(this.size()), {
          'is-active': this.state.checked
        })
      }, /*#__PURE__*/_react["default"].createElement("input", {
        type: "radio",
        className: "el-radio-button__orig-radio",
        checked: this.state.checked,
        disabled: this.isDisabled(),
        onChange: this.onChange.bind(this)
      }), /*#__PURE__*/_react["default"].createElement("span", {
        className: "el-radio-button__inner",
        style: this.state.checked ? this.activeStyle() : {}
      }, this.props.children || this.props.value));
    }
  }]);

  return RadioButton;
}(_Radio2["default"]);

exports["default"] = RadioButton;

_defineProperty(RadioButton, "elementType", 'RadioButton');

RadioButton.contextTypes = {
  component: _libs.PropTypes.any
};
RadioButton.propTypes = {
  value: _libs.PropTypes.oneOfType([_libs.PropTypes.string, _libs.PropTypes.number]),
  disabled: _libs.PropTypes.bool,
  name: _libs.PropTypes.string
};