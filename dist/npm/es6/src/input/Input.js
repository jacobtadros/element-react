"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _libs = require("../../libs");

var _calcTextareaHeight = _interopRequireDefault(require("./calcTextareaHeight"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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

var Input = /*#__PURE__*/function (_Component) {
  _inherits(Input, _Component);

  var _super = _createSuper(Input);

  function Input(props) {
    var _this;

    _classCallCheck(this, Input);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "state", void 0);

    _this.state = {
      textareaStyle: {
        resize: props.resize
      }
    };
    return _this;
  }

  _createClass(Input, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.resizeTextarea();
    }
    /* <Instance Methods */

  }, {
    key: "focus",
    value: function focus() {
      var _this2 = this;

      setTimeout(function () {
        (_this2.refs.input || _this2.refs.textarea).focus();
      });
    }
  }, {
    key: "blur",
    value: function blur() {
      var _this3 = this;

      setTimeout(function () {
        (_this3.refs.input || _this3.refs.textarea).blur();
      });
    }
    /* Instance Methods> */

  }, {
    key: "fixControlledValue",
    value: function fixControlledValue(value) {
      if (typeof value === 'undefined' || value === null) {
        return '';
      }

      return value;
    }
  }, {
    key: "handleChange",
    value: function handleChange(e) {
      var onChange = this.props.onChange;

      if (onChange) {
        onChange(e.target.value);
      }

      this.resizeTextarea();
    }
  }, {
    key: "handleFocus",
    value: function handleFocus(e) {
      var onFocus = this.props.onFocus;
      if (onFocus) onFocus(e);
    }
  }, {
    key: "handleBlur",
    value: function handleBlur(e) {
      var onBlur = this.props.onBlur;
      if (this.props.trim) this.handleTrim();
      if (onBlur) onBlur(e);
    }
  }, {
    key: "handleTrim",
    value: function handleTrim() {
      this.refs.input.value = this.refs.input.value.trim();

      if (this.props.onChange) {
        // this's for controlled components
        this.props.onChange(this.refs.input.value.trim());
      }
    }
  }, {
    key: "handleIconClick",
    value: function handleIconClick(e) {
      if (this.props.onIconClick) {
        this.props.onIconClick(e);
      }
    }
  }, {
    key: "resizeTextarea",
    value: function resizeTextarea() {
      var _this$props = this.props,
          autosize = _this$props.autosize,
          type = _this$props.type;

      if (!autosize || type !== 'textarea') {
        return;
      }

      var minRows = autosize.minRows;
      var maxRows = autosize.maxRows;
      var textareaCalcStyle = (0, _calcTextareaHeight["default"])(this.refs.textarea, minRows, maxRows);
      this.setState({
        textareaStyle: Object.assign({}, this.state.textareaStyle, textareaCalcStyle)
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          type = _this$props2.type,
          size = _this$props2.size,
          prepend = _this$props2.prepend,
          append = _this$props2.append,
          icon = _this$props2.icon,
          autoComplete = _this$props2.autoComplete,
          validating = _this$props2.validating,
          rows = _this$props2.rows,
          onMouseEnter = _this$props2.onMouseEnter,
          onMouseLeave = _this$props2.onMouseLeave,
          trim = _this$props2.trim,
          otherProps = _objectWithoutProperties(_this$props2, ["type", "size", "prepend", "append", "icon", "autoComplete", "validating", "rows", "onMouseEnter", "onMouseLeave", "trim"]);

      var classname = this.classNames(type === 'textarea' ? 'el-textarea' : 'el-input', size && "el-input--".concat(size), {
        'is-disabled': this.props.disabled,
        'el-input-group': prepend || append,
        'el-input-group--append': !!append,
        'el-input-group--prepend': !!prepend
      });

      if ('value' in this.props) {
        otherProps.value = this.fixControlledValue(this.props.value);
        delete otherProps.defaultValue;
      }

      delete otherProps.resize;
      delete otherProps.style;
      delete otherProps.autosize;
      delete otherProps.onIconClick;

      if (type === 'textarea') {
        return /*#__PURE__*/_react["default"].createElement("div", {
          style: this.style(),
          className: this.className(classname)
        }, /*#__PURE__*/_react["default"].createElement("textarea", _extends({}, otherProps, {
          ref: "textarea",
          className: "el-textarea__inner",
          style: this.state.textareaStyle,
          rows: rows,
          onChange: this.handleChange.bind(this),
          onFocus: this.handleFocus.bind(this),
          onBlur: this.handleBlur.bind(this)
        })));
      } else {
        return /*#__PURE__*/_react["default"].createElement("div", {
          style: this.style(),
          className: this.className(classname),
          onMouseEnter: onMouseEnter,
          onMouseLeave: onMouseLeave
        }, prepend && /*#__PURE__*/_react["default"].createElement("div", {
          className: "el-input-group__prepend"
        }, prepend), typeof icon === 'string' ? /*#__PURE__*/_react["default"].createElement("i", {
          className: "el-input__icon el-icon-".concat(icon),
          onClick: this.handleIconClick.bind(this)
        }, prepend) : icon, /*#__PURE__*/_react["default"].createElement("input", _extends({}, otherProps, {
          ref: "input",
          type: type,
          className: "el-input__inner",
          autoComplete: autoComplete,
          onChange: this.handleChange.bind(this),
          onFocus: this.handleFocus.bind(this),
          onBlur: this.handleBlur.bind(this)
        })), validating && /*#__PURE__*/_react["default"].createElement("i", {
          className: "el-input__icon el-icon-loading"
        }), append && /*#__PURE__*/_react["default"].createElement("div", {
          className: "el-input-group__append"
        }, append));
      }
    }
  }]);

  return Input;
}(_libs.Component);

exports["default"] = Input;

_defineProperty(Input, "defaultProps", {
  type: 'text',
  autosize: false,
  rows: 2,
  trim: false,
  autoComplete: 'off'
});

Input.propTypes = {
  // base
  type: _libs.PropTypes.string,
  icon: _libs.PropTypes.oneOfType([_libs.PropTypes.element, _libs.PropTypes.string]),
  disabled: _libs.PropTypes.bool,
  name: _libs.PropTypes.string,
  placeholder: _libs.PropTypes.string,
  readOnly: _libs.PropTypes.bool,
  autoFocus: _libs.PropTypes.bool,
  maxLength: _libs.PropTypes.number,
  minLength: _libs.PropTypes.number,
  defaultValue: _libs.PropTypes.any,
  value: _libs.PropTypes.any,
  trim: _libs.PropTypes.bool,
  // type !== 'textarea'
  size: _libs.PropTypes.oneOf(['large', 'small', 'mini']),
  prepend: _libs.PropTypes.node,
  append: _libs.PropTypes.node,
  // type === 'textarea'
  autosize: _libs.PropTypes.oneOfType([_libs.PropTypes.bool, _libs.PropTypes.object]),
  rows: _libs.PropTypes.number,
  resize: _libs.PropTypes.oneOf(['none', 'both', 'horizontal', 'vertical']),
  // event
  onFocus: _libs.PropTypes.func,
  onBlur: _libs.PropTypes.func,
  onChange: _libs.PropTypes.func,
  onIconClick: _libs.PropTypes.func,
  onMouseEnter: _libs.PropTypes.func,
  onMouseLeave: _libs.PropTypes.func,
  // autoComplete
  autoComplete: _libs.PropTypes.string,
  inputSelect: _libs.PropTypes.func,
  // form related
  form: _libs.PropTypes.string,
  validating: _libs.PropTypes.bool
};