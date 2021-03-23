"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _libs = require("../../libs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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

var Rate = /*#__PURE__*/function (_Component) {
  _inherits(Rate, _Component);

  var _super = _createSuper(Rate);

  function Rate(props) {
    var _this;

    _classCallCheck(this, Rate);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "state", void 0);

    _defineProperty(_assertThisInitialized(_this), "classMap", void 0);

    _defineProperty(_assertThisInitialized(_this), "colorMap", void 0);

    _this.state = {
      pointerAtLeftHalf: false,
      currentValue: _this.props.value - 1,
      hoverIndex: -1,
      value: -1
    };
    var _this$props = _this.props,
        iconClasses = _this$props.iconClasses,
        voidIconClass = _this$props.voidIconClass,
        disabledVoidIconClass = _this$props.disabledVoidIconClass,
        colors = _this$props.colors,
        voidColor = _this$props.voidColor,
        disabledVoidColor = _this$props.disabledVoidColor;
    _this.classMap = {
      lowClass: iconClasses[0],
      mediumClass: iconClasses[1],
      highClass: iconClasses[2],
      voidClass: voidIconClass,
      disabledVoidClass: disabledVoidIconClass
    };
    _this.colorMap = {
      lowColor: colors[0],
      mediumColor: colors[1],
      highColor: colors[2],
      voidColor: voidColor,
      disabledVoidColor: disabledVoidColor
    };
    return _this;
  }

  _createClass(Rate, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.value && nextProps.value !== this.props.value) {
        this.setState({
          value: nextProps.value
        });
      }
    }
  }, {
    key: "hasClass",
    value: function hasClass(target, classname) {
      return target.classList.contains(classname);
    }
  }, {
    key: "setCurrentValue",
    value: function setCurrentValue(e, value) {
      var _this$props2 = this.props,
          disabled = _this$props2.disabled,
          allowHalf = _this$props2.allowHalf;
      var _this$state = this.state,
          pointerAtLeftHalf = _this$state.pointerAtLeftHalf,
          currentValue = _this$state.currentValue,
          hoverIndex = _this$state.hoverIndex;

      if (disabled) {
        return;
      }
      /* istanbul ignore if */


      if (allowHalf) {
        e.persist();
        var target = e.target;

        if (this.hasClass(target, 'el-rate__item')) {
          target = target.querySelector('.el-rate__icon');
        }

        if (this.hasClass(target, 'el-rate__decimal')) {
          target = target.parentNode;
        }

        this.setState({
          pointerAtLeftHalf: (e.clientX - target.getBoundingClientRect().left) * 2 <= target.clientWidth,
          currentValue: (e.clientX - target.getBoundingClientRect().left) * 2 <= target.clientWidth ? value - 0.5 : value
        });
      } else {
        this.setState({
          currentValue: value
        });
      }

      this.setState({
        hoverIndex: value
      });
    }
  }, {
    key: "getValueFromMap",
    value: function getValueFromMap(value, map) {
      var _this$props3 = this.props,
          lowThreshold = _this$props3.lowThreshold,
          highThreshold = _this$props3.highThreshold;
      var result = '';

      if (value <= lowThreshold - 1) {
        result = map.lowColor || map.lowClass;
      } else if (value >= highThreshold - 1) {
        result = map.highColor || map.highClass;
      } else {
        result = map.mediumColor || map.mediumClass;
      }

      return result;
    }
  }, {
    key: "getIconStyle",
    value: function getIconStyle(item) {
      var disabled = this.props.disabled;
      var currentValue = this.state.currentValue;
      var voidColor = disabled ? this.colorMap.disabledVoidColor : this.colorMap.voidColor;
      return {
        color: item <= currentValue ? this.activeColor() : voidColor
      };
    }
  }, {
    key: "showDecimalIcon",
    value: function showDecimalIcon(item) {
      var _this$props4 = this.props,
          disabled = _this$props4.disabled,
          allowHalf = _this$props4.allowHalf,
          value = _this$props4.value;
      var _this$state2 = this.state,
          pointerAtLeftHalf = _this$state2.pointerAtLeftHalf,
          currentValue = _this$state2.currentValue;
      var showWhenDisabled = disabled && this.valueDecimal() > 0 && item - 1 < value - 1 && item > value - 1;
      /* istanbul ignore next */

      var showWhenAllowHalf = allowHalf && pointerAtLeftHalf && (item - 0.5).toFixed(1) === currentValue.toFixed(1);
      return showWhenDisabled || showWhenAllowHalf;
    }
  }, {
    key: "classes",
    value: function classes() {
      var currentValue = this.state.currentValue;
      var _this$props5 = this.props,
          allowHalf = _this$props5.allowHalf,
          max = _this$props5.max;
      var result = [];
      var i = 0;
      var threshold = currentValue;

      if (allowHalf && currentValue !== Math.floor(currentValue)) {
        threshold;
      }

      for (; i <= threshold; i++) {
        result.push(this.activeClass());
      }

      for (; i < max; i++) {
        result.push(this.voidClass());
      }

      return result;
    }
  }, {
    key: "valueDecimal",
    value: function valueDecimal() {
      var value = this.props.value;
      return value * 100 - Math.floor(value) * 100;
    }
  }, {
    key: "decimalIconClass",
    value: function decimalIconClass() {
      return this.getValueFromMap(this.props.value, this.classMap);
    }
  }, {
    key: "voidClass",
    value: function voidClass() {
      return this.props.disabled ? this.classMap.disabledVoidClass : this.classMap.voidClass;
    }
  }, {
    key: "activeClass",
    value: function activeClass() {
      return this.getValueFromMap(this.state.currentValue, this.classMap);
    }
  }, {
    key: "activeColor",
    value: function activeColor() {
      return this.getValueFromMap(this.state.currentValue, this.colorMap);
    }
  }, {
    key: "selectValue",
    value: function selectValue(value) {
      var _this$props6 = this.props,
          disabled = _this$props6.disabled,
          allowHalf = _this$props6.allowHalf,
          onChange = _this$props6.onChange;
      var _this$state3 = this.state,
          pointerAtLeftHalf = _this$state3.pointerAtLeftHalf,
          currentValue = _this$state3.currentValue;

      if (disabled) {
        return;
      }

      if (allowHalf && pointerAtLeftHalf) {
        // this.$emit('input', this.currentValue);
        this.setState({
          value: currentValue
        }, function () {
          onChange && onChange(currentValue + 1);
        });
      } else {
        this.setState({
          currentValue: value,
          value: value
        }, function () {
          onChange && onChange(value + 1);
        });
      }
    }
  }, {
    key: "decimalStyle",
    value: function decimalStyle() {
      var _this$props7 = this.props,
          disabled = _this$props7.disabled,
          allowHalf = _this$props7.allowHalf;
      var width = '';

      if (disabled) {
        width = "".concat(this.valueDecimal() < 50 ? 0 : 50, "%");
      }

      if (allowHalf) {
        width = '50%';
      }

      return {
        color: this.activeColor(),
        width: width
      };
    }
  }, {
    key: "showText",
    value: function showText() {
      var _this$props8 = this.props,
          disabled = _this$props8.disabled,
          texts = _this$props8.texts,
          textTemplate = _this$props8.textTemplate,
          value = _this$props8.value;
      var currentValue = this.state.currentValue;
      var result = '';

      if (disabled) {
        result = textTemplate.replace(/\{\s*value\s*\}/, value);
      } else {
        result = texts[Math.ceil(currentValue)];
      }

      return result;
    }
  }, {
    key: "resetCurrentValue",
    value: function resetCurrentValue() {
      var _this$props9 = this.props,
          disabled = _this$props9.disabled,
          allowHalf = _this$props9.allowHalf;
      var value = this.state.value;

      if (disabled) {
        return;
      }

      if (allowHalf) {
        this.setState({
          pointerAtLeftHalf: value !== Math.floor(value)
        });
      }

      this.setState({
        currentValue: value,
        hoverIndex: -1
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props10 = this.props,
          showText = _this$props10.showText,
          textColor = _this$props10.textColor,
          disabled = _this$props10.disabled,
          max = _this$props10.max;
      var hoverIndex = this.state.hoverIndex;
      return /*#__PURE__*/_react["default"].createElement("div", {
        style: this.style(),
        className: this.className('el-rate')
      }, _toConsumableArray(Array(max)).map(function (v, k) {
        return /*#__PURE__*/_react["default"].createElement("span", {
          className: "el-rate__item",
          style: {
            cursor: disabled ? 'auto' : 'pointer'
          },
          onClick: function onClick() {
            return _this2.selectValue(k);
          },
          onMouseMove: function onMouseMove(e) {
            return _this2.setCurrentValue(e, k);
          },
          onMouseLeave: function onMouseLeave() {
            return _this2.resetCurrentValue();
          },
          key: k
        }, /*#__PURE__*/_react["default"].createElement("i", {
          style: _this2.getIconStyle(k),
          className: hoverIndex === k ? "hover el-rate__icon ".concat(_this2.classes()[k]) : "el-rate__icon ".concat(_this2.classes()[k])
        }, _this2.showDecimalIcon(k) ? /*#__PURE__*/_react["default"].createElement("i", {
          style: _this2.decimalStyle(),
          className: "el-rate__decimal ".concat(_this2.decimalIconClass())
        }) : null));
      }), showText ? /*#__PURE__*/_react["default"].createElement("span", {
        className: "el-rate__text",
        style: {
          color: textColor
        }
      }, this.showText()) : null);
    }
  }]);

  return Rate;
}(_libs.Component);

exports["default"] = Rate;
Rate.propTypes = {
  colors: _libs.PropTypes.array,
  texts: _libs.PropTypes.array,
  showText: _libs.PropTypes.bool,
  textColor: _libs.PropTypes.string,
  disabled: _libs.PropTypes.bool,
  value: _libs.PropTypes.number,
  onChange: _libs.PropTypes.func,
  textTemplate: _libs.PropTypes.string,
  lowThreshold: _libs.PropTypes.number,
  highThreshold: _libs.PropTypes.number,
  max: _libs.PropTypes.number,
  voidColor: _libs.PropTypes.string,
  disabledVoidColor: _libs.PropTypes.string,
  iconClasses: _libs.PropTypes.array,
  voidIconClass: _libs.PropTypes.string,
  disabledVoidIconClass: _libs.PropTypes.string,
  allowHalf: _libs.PropTypes.bool
};
Rate.defaultProps = {
  colors: ['#F7BA2A', '#F7BA2A', '#F7BA2A'],
  // icon 的颜色数组，共有 3 个元素，为 3 个分段所对应的颜色
  texts: ['极差', '失望', '一般', '满意', '惊喜'],
  // 辅助文字数组
  showText: false,
  // 是否显示辅助文字
  textColor: '#1F2D3D',
  //   辅助文字的颜色
  disabled: false,
  // 是否为只读
  value: 0,
  // 星级
  lowThreshold: 2,
  // 低分和中等分数的界限值，值本身被划分在低分中
  highThreshold: 4,
  // 高分和中等分数的界限值，值本身被划分在高分中
  max: 5,
  voidColor: '#C6D1DE',
  disabledVoidColor: '#EFF2F7',
  iconClasses: ['el-icon-star-on', 'el-icon-star-on', 'el-icon-star-on'],
  voidIconClass: 'el-icon-star-off',
  disabledVoidIconClass: 'el-icon-star-on',
  allowHalf: false,
  textTemplate: '{value}'
};