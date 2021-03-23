"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _asyncValidator = _interopRequireDefault(require("async-validator"));

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

var FormItem = /*#__PURE__*/function (_Component) {
  _inherits(FormItem, _Component);

  var _super = _createSuper(FormItem);

  function FormItem(props) {
    var _this;

    _classCallCheck(this, FormItem);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "state", void 0);

    _this.state = {
      error: '',
      valid: false,
      validating: false
    };
    return _this;
  }

  _createClass(FormItem, [{
    key: "getChildContext",
    value: function getChildContext() {
      return {
        form: this
      };
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var prop = this.props.prop;

      if (prop) {
        this.parent().addField(this);
        this.initialValue = this.getInitialValue();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.parent().removeField(this);
    }
  }, {
    key: "parent",
    value: function parent() {
      return this.context.component;
    }
  }, {
    key: "isRequired",
    value: function isRequired() {
      var rules = this.getRules();
      var isRequired = false;

      if (rules && rules.length) {
        rules.every(function (rule) {
          if (rule.required) {
            isRequired = true;
            return false;
          }

          return true;
        });
      }

      return isRequired;
    }
  }, {
    key: "onFieldBlur",
    value: function onFieldBlur() {
      this.validate('blur');
    }
  }, {
    key: "onFieldChange",
    value: function onFieldChange() {
      var _this2 = this;

      if (this.validateDisabled) {
        this.validateDisabled = false;
        return;
      }

      setTimeout(function () {
        _this2.validate('change');
      });
    }
  }, {
    key: "validate",
    value: function validate(trigger, cb) {
      var _this3 = this;

      var rules = this.getFilteredRule(trigger);

      if (!rules || rules.length === 0) {
        if (cb instanceof Function) {
          cb();
        }

        return true;
      }

      this.setState({
        validating: true
      });

      var descriptor = _defineProperty({}, this.props.prop, rules);

      var validator = new _asyncValidator["default"](descriptor);

      var model = _defineProperty({}, this.props.prop, this.fieldValue());

      validator.validate(model, {
        firstFields: true
      }, function (errors) {
        _this3.setState({
          error: errors ? errors[0].message : '',
          validating: false,
          valid: !errors
        }, function () {
          if (cb instanceof Function) {
            cb(errors);
          }
        });
      });
    }
  }, {
    key: "getInitialValue",
    value: function getInitialValue() {
      var value = this.parent().props.model[this.props.prop];

      if (value === undefined) {
        return value;
      } else {
        return JSON.parse(JSON.stringify(value));
      }
    }
  }, {
    key: "resetField",
    value: function resetField() {
      var _this$state = this.state,
          valid = _this$state.valid,
          error = _this$state.error;
      valid = true;
      error = '';
      this.setState({
        valid: valid,
        error: error
      });
      var value = this.fieldValue();

      if (Array.isArray(value) && value.length > 0) {
        this.validateDisabled = true;
        this.parent().props.model[this.props.prop] = [];
      } else if (value) {
        this.validateDisabled = true;
        this.parent().props.model[this.props.prop] = this.initialValue;
      }
    }
  }, {
    key: "getRules",
    value: function getRules() {
      var formRules = this.parent().props.rules;
      var selfRuels = this.props.rules;
      formRules = formRules ? formRules[this.props.prop] : [];
      return [].concat(selfRuels || formRules || []);
    }
  }, {
    key: "getFilteredRule",
    value: function getFilteredRule(trigger) {
      var rules = this.getRules();
      return rules.filter(function (rule) {
        if (!rule.trigger || trigger === '') return true;

        if (Array.isArray(rule.trigger)) {
          return rule.trigger.indexOf(trigger) > -1;
        } else {
          return rule.trigger === trigger;
        }
      }).map(function (rule) {
        return Object.assign({}, rule);
      });
    }
  }, {
    key: "labelStyle",
    value: function labelStyle() {
      var ret = {};
      if (this.parent().props.labelPosition === 'top') return ret;
      var labelWidth = this.props.labelWidth || this.parent().props.labelWidth;

      if (labelWidth) {
        ret.width = parseInt(labelWidth);
      }

      return ret;
    }
  }, {
    key: "contentStyle",
    value: function contentStyle() {
      var ret = {};
      if (this.parent().props.labelPosition === 'top' || this.parent().props.inline) return ret;
      var labelWidth = this.props.labelWidth || this.parent().props.labelWidth;

      if (labelWidth) {
        ret.marginLeft = parseInt(labelWidth);
      }

      return ret;
    }
  }, {
    key: "fieldValue",
    value: function fieldValue() {
      var model = this.parent().props.model;

      if (!model || !this.props.prop) {
        return;
      }

      var temp = this.props.prop.split(':');
      return temp.length > 1 ? model[temp[0]][temp[1]] : model[this.props.prop];
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state2 = this.state,
          error = _this$state2.error,
          validating = _this$state2.validating;
      var _this$props = this.props,
          label = _this$props.label,
          required = _this$props.required;
      return /*#__PURE__*/_react["default"].createElement("div", {
        style: this.style(),
        className: this.className('el-form-item', {
          'is-error': error !== '',
          'is-validating': validating,
          'is-required': this.isRequired() || required
        }),
        onBlur: this.onFieldBlur.bind(this),
        onChange: this.onFieldChange.bind(this)
      }, label && /*#__PURE__*/_react["default"].createElement("label", {
        className: "el-form-item__label",
        style: this.labelStyle()
      }, typeof label === 'string' ? label + this.parent().props.labelSuffix : label), /*#__PURE__*/_react["default"].createElement("div", {
        className: "el-form-item__content",
        style: this.contentStyle()
      }, this.props.children, /*#__PURE__*/_react["default"].createElement(_libs.Transition, {
        name: "el-zoom-in-top"
      }, error && /*#__PURE__*/_react["default"].createElement("div", {
        className: "el-form-item__error"
      }, error))));
    }
  }]);

  return FormItem;
}(_libs.Component);

exports["default"] = FormItem;
FormItem.contextTypes = {
  component: _libs.PropTypes.any
};
FormItem.childContextTypes = {
  form: _libs.PropTypes.any
};
FormItem.propTypes = {
  label: _libs.PropTypes.oneOfType([_libs.PropTypes.string, _libs.PropTypes.node]),
  labelWidth: _libs.PropTypes.oneOfType([_libs.PropTypes.string, _libs.PropTypes.number]),
  prop: _libs.PropTypes.string,
  required: _libs.PropTypes.bool,
  rules: _libs.PropTypes.oneOfType([_libs.PropTypes.object, _libs.PropTypes.array])
};