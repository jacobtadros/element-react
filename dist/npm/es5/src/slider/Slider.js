"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _libs = require("../../libs");

var _inputNumber = _interopRequireDefault(require("../input-number"));

var _Button = _interopRequireDefault(require("./Button"));

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

var Slider = /*#__PURE__*/function (_Component) {
  _inherits(Slider, _Component);

  var _super = _createSuper(Slider);

  function Slider(props) {
    var _this;

    _classCallCheck(this, Slider);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "state", void 0);

    _this.slider = /*#__PURE__*/_react["default"].createRef();
    _this.button1 = /*#__PURE__*/_react["default"].createRef();
    _this.button2 = /*#__PURE__*/_react["default"].createRef();
    _this.state = {
      firstValue: 0,
      secondValue: 0,
      oldValue: 0,
      precision: 0,
      inputValue: 0,
      dragging: false
    };
    return _this;
  }

  _createClass(Slider, [{
    key: "getChildContext",
    value: function getChildContext() {
      return {
        component: this
      };
    }
  }, {
    key: "initValue",
    get: function get() {
      var _this$props = this.props,
          value = _this$props.value,
          min = _this$props.min,
          max = _this$props.max;
      var initValue = value;

      if (typeof value !== 'number' || isNaN(value)) {
        initValue = min;
      } else {
        initValue = Math.min(max, Math.max(min, value));
      }

      return initValue;
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      var _this$props2 = this.props,
          range = _this$props2.range,
          value = _this$props2.value,
          min = _this$props2.min,
          max = _this$props2.max,
          step = _this$props2.step;
      var _this$state = this.state,
          firstValue = _this$state.firstValue,
          secondValue = _this$state.secondValue,
          oldValue = _this$state.oldValue,
          inputValue = _this$state.inputValue,
          precision = _this$state.precision;

      if (range) {
        if (Array.isArray(value)) {
          firstValue = Math.max(min, value[0]);
          secondValue = Math.min(max, value[1]);
        } else {
          firstValue = min;
          secondValue = max;
        }

        oldValue = [firstValue, secondValue];
      } else {
        firstValue = this.initValue;
        oldValue = firstValue;
      }

      var precisions = [min, max, step].map(function (item) {
        var decimal = ('' + item).split('.')[1];
        return decimal ? decimal.length : 0;
      });
      precision = Math.max.apply(null, precisions);
      inputValue = inputValue || firstValue;
      this.setState({
        firstValue: firstValue,
        secondValue: secondValue,
        oldValue: oldValue,
        inputValue: inputValue,
        precision: precision
      });
    }
  }, {
    key: "componentWillUpdate",
    value: function componentWillUpdate(props) {
      var _this$props3 = this.props,
          min = _this$props3.min,
          max = _this$props3.max,
          value = _this$props3.value,
          range = _this$props3.range;
      var dragging = this.state.dragging;

      if (props.min != min || props.max != max) {
        this.setValues();
      }

      if (props.value != value) {
        var oldValue = this.state.oldValue;

        if (dragging || Array.isArray(value) && Array.isArray(props.value) && Array.isArray(oldValue) && value.every(function (item, index) {
          return item === oldValue[index];
        })) {
          return;
        } else if (!range && typeof props.value === 'number' && !isNaN(props.value)) {
          this.setState({
            firstValue: props.value
          });
        }

        this.setValues();
      }
    }
  }, {
    key: "valueChanged",
    value: function valueChanged() {
      var range = this.props.range;
      var _this$state2 = this.state,
          firstValue = _this$state2.firstValue,
          oldValue = _this$state2.oldValue;

      if (range && Array.isArray(oldValue)) {
        return ![this.minValue(), this.maxValue()].every(function (item, index) {
          return item === oldValue[index];
        });
      } else {
        return firstValue !== oldValue;
      }
    }
  }, {
    key: "setValues",
    value: function setValues() {
      var _this2 = this;

      var _this$props4 = this.props,
          range = _this$props4.range,
          value = _this$props4.value,
          min = _this$props4.min,
          max = _this$props4.max;
      var _this$state3 = this.state,
          firstValue = _this$state3.firstValue,
          secondValue = _this$state3.secondValue,
          oldValue = _this$state3.oldValue,
          inputValue = _this$state3.inputValue;

      if (range && Array.isArray(value)) {
        if (value[1] < min) {
          inputValue = [min, min];
        } else if (value[0] > max) {
          inputValue = [max, max];
        } else if (value[0] < min) {
          inputValue = [min, value[1]];
        } else if (value[1] > max) {
          inputValue = [value[0], max];
        } else {
          firstValue = value[0];
          secondValue = value[1];

          if (this.valueChanged()) {
            this.onValueChanged([this.minValue(), this.maxValue()]);
            oldValue = value.slice();
          }
        }
      } else if (!range && typeof value === 'number' && !isNaN(value)) {
        if (this.initValue < min) {
          inputValue = min;
        } else if (this.initValue > max) {
          inputValue = max;
        } else {
          inputValue = firstValue;
          this.setState({
            firstValue: firstValue
          }, function () {
            if (_this2.valueChanged()) {
              _this2.onValueChanged(firstValue);

              _this2.setState({
                oldValue: firstValue
              });
            }
          });
        }
      }

      this.setState({
        firstValue: firstValue,
        secondValue: secondValue,
        inputValue: inputValue
      });
    }
  }, {
    key: "setPosition",
    value: function setPosition(percent) {
      var _this$props5 = this.props,
          range = _this$props5.range,
          min = _this$props5.min,
          max = _this$props5.max;
      var _this$state4 = this.state,
          firstValue = _this$state4.firstValue,
          secondValue = _this$state4.secondValue;
      var targetValue = min + percent * (max - min) / 100;

      if (!range) {
        this.button1.current.setPosition(percent);
        return;
      }

      var button;

      if (Math.abs(this.minValue() - targetValue) < Math.abs(this.maxValue() - targetValue)) {
        button = firstValue < secondValue ? 'button1' : 'button2';
      } else {
        button = firstValue > secondValue ? 'button1' : 'button2';
      }

      this[button].current.setPosition(percent);
    }
  }, {
    key: "onSliderClick",
    value: function onSliderClick(event) {
      var _this$props6 = this.props,
          disabled = _this$props6.disabled,
          dragging = _this$props6.dragging,
          vertical = _this$props6.vertical;
      if (disabled || dragging) return;

      if (vertical) {
        var sliderOffsetBottom = this.slider.current.getBoundingClientRect().bottom;
        this.setPosition((sliderOffsetBottom - event.clientY) / this.sliderSize() * 100);
      } else {
        var sliderOffsetLeft = this.slider.current.getBoundingClientRect().left;
        this.setPosition((event.clientX - sliderOffsetLeft) / this.sliderSize() * 100);
      }

      this.setValues();
    }
    /* Watched Methods */

  }, {
    key: "onValueChanged",
    value: function onValueChanged(val) {
      var onChange = this.props.onChange;
      if (onChange) onChange(val);
    }
  }, {
    key: "onInputValueChanged",
    value: function onInputValueChanged(e) {
      var _this3 = this;

      this.setState({
        inputValue: e || 0,
        firstValue: e || 0
      }, function () {
        _this3.setValues();
      });
    }
  }, {
    key: "onFirstValueChange",
    value: function onFirstValueChange(value) {
      var _this4 = this;

      var firstValue = this.state.firstValue;

      if (firstValue !== value) {
        this.setState({
          firstValue: value
        }, function () {
          return _this4.setValues();
        });
      }
    }
  }, {
    key: "onSecondValueChange",
    value: function onSecondValueChange(value) {
      var _this5 = this;

      var secondValue = this.state.secondValue;

      if (secondValue !== value) {
        this.setState({
          secondValue: value
        }, function () {
          return _this5.setValues();
        });
      }
    }
    /* Computed Methods */

  }, {
    key: "sliderSize",
    value: function sliderSize() {
      var vertical = this.props.vertical;
      return parseInt(vertical ? this.slider.current.offsetHeight : this.slider.current.offsetWidth, 10);
    }
  }, {
    key: "stops",
    value: function stops() {
      var _this6 = this;

      var _this$props7 = this.props,
          range = _this$props7.range,
          min = _this$props7.min,
          max = _this$props7.max,
          step = _this$props7.step;
      var firstValue = this.state.firstValue;
      var stopCount = (max - min) / step;
      var stepWidth = 100 * step / (max - min);
      var result = [];

      for (var i = 1; i < stopCount; i++) {
        result.push(i * stepWidth);
      }

      if (range) {
        return result.filter(function (step) {
          return step < 100 * (_this6.minValue() - min) / (max - min) || step > 100 * (_this6.maxValue() - min) / (max - min);
        });
      } else {
        return result.filter(function (step) {
          return step > 100 * (firstValue - min) / (max - min);
        });
      }
    }
  }, {
    key: "minValue",
    value: function minValue() {
      var _this$state5 = this.state,
          firstValue = _this$state5.firstValue,
          secondValue = _this$state5.secondValue;
      return Math.min(firstValue, secondValue);
    }
  }, {
    key: "maxValue",
    value: function maxValue() {
      var _this$state6 = this.state,
          firstValue = _this$state6.firstValue,
          secondValue = _this$state6.secondValue;
      return Math.max(firstValue, secondValue);
    }
  }, {
    key: "runwayStyle",
    value: function runwayStyle() {
      var _this$props8 = this.props,
          vertical = _this$props8.vertical,
          height = _this$props8.height;
      return vertical ? {
        height: height
      } : {};
    }
  }, {
    key: "barStyle",
    value: function barStyle() {
      var vertical = this.props.vertical;
      return vertical ? {
        height: this.barSize(),
        bottom: this.barStart()
      } : {
        width: this.barSize(),
        left: this.barStart()
      };
    }
  }, {
    key: "barSize",
    value: function barSize() {
      var firstValue = this.state.firstValue;
      var _this$props9 = this.props,
          range = _this$props9.range,
          max = _this$props9.max,
          min = _this$props9.min;
      return range ? "".concat(100 * (this.maxValue() - this.minValue()) / (max - min), "%") : "".concat(100 * (firstValue - min) / (max - min), "%");
    }
  }, {
    key: "barStart",
    value: function barStart() {
      var _this$props10 = this.props,
          range = _this$props10.range,
          max = _this$props10.max,
          min = _this$props10.min;
      return range ? "".concat(100 * (this.minValue() - min) / (max - min), "%") : '0%';
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props11 = this.props,
          vertical = _this$props11.vertical,
          showInput = _this$props11.showInput,
          showStops = _this$props11.showStops,
          showInputControls = _this$props11.showInputControls,
          range = _this$props11.range,
          step = _this$props11.step,
          disabled = _this$props11.disabled,
          min = _this$props11.min,
          max = _this$props11.max;
      var _this$state7 = this.state,
          inputValue = _this$state7.inputValue,
          firstValue = _this$state7.firstValue,
          secondValue = _this$state7.secondValue;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: this.className('el-slider', {
          'is-vertical': vertical,
          'el-slider--with-input': showInput
        })
      }, showInput && !range && /*#__PURE__*/_react["default"].createElement(_inputNumber["default"], {
        ref: "input",
        className: "el-slider__input",
        defaultValue: inputValue,
        value: firstValue,
        step: step,
        disabled: disabled,
        controls: showInputControls,
        min: min,
        max: max,
        size: "small",
        onChange: this.onInputValueChanged.bind(this)
      }), /*#__PURE__*/_react["default"].createElement("div", {
        ref: this.slider,
        style: this.runwayStyle(),
        className: this.classNames('el-slider__runway', {
          'show-input': showInput,
          'disabled': disabled
        }),
        onClick: this.onSliderClick.bind(this)
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "el-slider__bar",
        style: this.barStyle()
      }), /*#__PURE__*/_react["default"].createElement(_Button["default"], {
        ref: this.button1,
        vertical: vertical,
        value: firstValue,
        onChange: this.onFirstValueChange.bind(this)
      }), range && /*#__PURE__*/_react["default"].createElement(_Button["default"], {
        ref: this.button2,
        vertical: vertical,
        value: secondValue,
        onChange: this.onSecondValueChange.bind(this)
      }), showStops && this.stops().map(function (item, index) {
        return /*#__PURE__*/_react["default"].createElement("div", {
          key: index,
          className: "el-slider__stop",
          style: vertical ? {
            'bottom': item + '%'
          } : {
            'left': item + '%'
          }
        });
      })));
    }
  }]);

  return Slider;
}(_libs.Component);

exports["default"] = Slider;
Slider.childContextTypes = {
  component: _libs.PropTypes.any
};
Slider.propTypes = {
  min: _libs.PropTypes.oneOfType([_libs.PropTypes.number, _libs.PropTypes.string]),
  max: _libs.PropTypes.oneOfType([_libs.PropTypes.number, _libs.PropTypes.string]),
  step: _libs.PropTypes.oneOfType([_libs.PropTypes.number, _libs.PropTypes.string]),
  value: _libs.PropTypes.oneOfType([_libs.PropTypes.number, _libs.PropTypes.arrayOf(_libs.PropTypes.number)]),
  showInput: _libs.PropTypes.bool,
  showInputControls: _libs.PropTypes.bool,
  showTooltip: _libs.PropTypes.bool,
  showStops: _libs.PropTypes.bool,
  disabled: _libs.PropTypes.bool,
  range: _libs.PropTypes.bool,
  vertical: _libs.PropTypes.bool,
  height: _libs.PropTypes.string,
  formatTooltip: _libs.PropTypes.func,
  onChange: _libs.PropTypes.func
};
Slider.defaultProps = {
  showTooltip: true,
  showInputControls: true,
  min: 0,
  max: 100,
  step: 1,
  value: 0
};