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

var Checkbox = /*#__PURE__*/function (_Component) {
  _inherits(Checkbox, _Component);

  var _super = _createSuper(Checkbox);

  function Checkbox(props) {
    var _this;

    _classCallCheck(this, Checkbox);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "state", void 0);

    _this.state = {
      checked: props.checked,
      focus: props.focus,
      label: _this.getLabel(props)
    };
    return _this;
  }

  _createClass(Checkbox, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      this.setState({
        checked: nextProps.checked,
        focus: nextProps.focus,
        label: this.getLabel(nextProps)
      });
    }
  }, {
    key: "onFocus",
    value: function onFocus() {
      this.setState({
        focus: true
      });
    }
  }, {
    key: "onBlur",
    value: function onBlur() {
      this.setState({
        focus: false
      });
    }
  }, {
    key: "onChange",
    value: function onChange(e) {
      var _this2 = this;

      if (e.target instanceof HTMLInputElement) {
        var label = this.state.label;
        var _this$props = this.props,
            trueLabel = _this$props.trueLabel,
            falseLabel = _this$props.falseLabel;
        var checked = e.target.checked;
        var group = this.context.ElCheckboxGroup;

        if (group) {
          var length = group.state.options.length + (checked ? 1 : -1);

          if (group.props.min !== undefined && length < group.props.min) {
            return;
          }

          if (group.props.max !== undefined && length > group.props.max) {
            return;
          }
        }

        var newLabel = label;

        if (this.props.trueLabel || this.props.falseLabel) {
          newLabel = checked ? trueLabel : falseLabel;
        }

        this.setState({
          checked: checked,
          label: newLabel
        }, function () {
          if (_this2.props.onChange) {
            _this2.props.onChange(checked);
          }
        });
      }
    }
  }, {
    key: "getLabel",
    value: function getLabel(props) {
      if (props.trueLabel || props.falseLabel) {
        return props.checked ? props.trueLabel : props.falseLabel;
      } else {
        return props.label;
      }
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react["default"].createElement("label", {
        style: this.style(),
        className: this.className('el-checkbox')
      }, /*#__PURE__*/_react["default"].createElement("span", {
        className: this.classNames('el-checkbox__input', {
          'is-disabled': this.props.disabled,
          'is-checked': this.state.checked,
          'is-indeterminate': this.props.indeterminate,
          'is-focus': this.state.focus
        })
      }, /*#__PURE__*/_react["default"].createElement("span", {
        className: "el-checkbox__inner"
      }), /*#__PURE__*/_react["default"].createElement("input", {
        className: "el-checkbox__original",
        type: "checkbox",
        checked: this.state.checked,
        disabled: this.props.disabled,
        onFocus: this.onFocus.bind(this),
        onBlur: this.onBlur.bind(this),
        onChange: this.onChange.bind(this)
      })), /*#__PURE__*/_react["default"].createElement("span", {
        className: "el-checkbox__label"
      }, this.props.children || this.state.label));
    }
  }]);

  return Checkbox;
}(_libs.Component);

exports["default"] = Checkbox;

_defineProperty(Checkbox, "elementType", 'Checkbox');

Checkbox.contextTypes = {
  ElCheckboxGroup: _libs.PropTypes.any
};
Checkbox.propTypes = {
  label: _libs.PropTypes.string,
  trueLabel: _libs.PropTypes.oneOfType([_libs.PropTypes.string, _libs.PropTypes.number]),
  falseLabel: _libs.PropTypes.oneOfType([_libs.PropTypes.string, _libs.PropTypes.number]),
  disabled: _libs.PropTypes.bool,
  checked: _libs.PropTypes.bool,
  indeterminate: _libs.PropTypes.bool,
  focus: _libs.PropTypes.bool,
  onChange: _libs.PropTypes.func
};
Checkbox.defaultProps = {
  checked: false,
  focus: false
};