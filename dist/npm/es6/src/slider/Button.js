"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _libs = require("../../libs");

var _tooltip = _interopRequireDefault(require("../tooltip"));

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

var SliderButton = /*#__PURE__*/function (_Component) {
  _inherits(SliderButton, _Component);

  var _super = _createSuper(SliderButton);

  function SliderButton(props) {
    var _this;

    _classCallCheck(this, SliderButton);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "state", void 0);

    _this.state = {
      hovering: false,
      dragging: false,
      startX: 0,
      startY: 0,
      currentX: 0,
      currentY: 0,
      startPosition: 0,
      newPosition: 0
    };
    return _this;
  }

  _createClass(SliderButton, [{
    key: "parent",
    value: function parent() {
      return this.context.component;
    }
  }, {
    key: "handleMouseEnter",
    value: function handleMouseEnter() {
      this.setState({
        hovering: true
      });
    }
  }, {
    key: "handleMouseLeave",
    value: function handleMouseLeave() {
      this.setState({
        hovering: false
      });
    }
  }, {
    key: "onButtonDown",
    value: function onButtonDown(event) {
      if (this.disabled()) return;
      this.onDragStart(event);
      window.addEventListener('mousemove', this.onDragging.bind(this));
      window.addEventListener('mouseup', this.onDragEnd.bind(this));
      window.addEventListener('contextmenu', this.onDragEnd.bind(this));
    }
  }, {
    key: "onDragStart",
    value: function onDragStart(event) {
      this.setState({
        dragging: true,
        startX: event.clientX,
        startY: event.clientY,
        startPosition: parseInt(this.currentPosition(), 10)
      });
    }
  }, {
    key: "onDragging",
    value: function onDragging(event) {
      var _this2 = this;

      var _this$state = this.state,
          dragging = _this$state.dragging,
          startY = _this$state.startY,
          currentY = _this$state.currentY,
          currentX = _this$state.currentX,
          startX = _this$state.startX,
          startPosition = _this$state.startPosition,
          newPosition = _this$state.newPosition;
      var vertical = this.props.vertical;

      if (dragging) {
        this.setState({
          currentX: event.clientX,
          currentY: event.clientY
        }, function () {
          var diff;

          if (vertical) {
            diff = (startY - currentY) / _this2.parent().sliderSize() * 100;
          } else {
            diff = (currentX - startX) / _this2.parent().sliderSize() * 100;
          }

          _this2.state.newPosition = startPosition + diff;

          _this2.setPosition(newPosition);
        });
      }
    }
  }, {
    key: "onDragEnd",
    value: function onDragEnd() {
      var _this3 = this;

      var _this$state2 = this.state,
          dragging = _this$state2.dragging,
          newPosition = _this$state2.newPosition;

      if (dragging) {
        /*
         * 防止在 mouseup 后立即触发 click，导致滑块有几率产生一小段位移
         * 不使用 preventDefault 是因为 mouseup 和 click 没有注册在同一个 DOM 上
         */
        setTimeout(function () {
          _this3.setState({
            dragging: false
          }, function () {
            _this3.setPosition(newPosition);
          });
        }, 0);
        window.removeEventListener('mousemove', this.onDragging.bind(this));
        window.removeEventListener('mouseup', this.onDragEnd.bind(this));
        window.removeEventListener('contextmenu', this.onDragEnd.bind(this));
      }
    }
  }, {
    key: "setPosition",
    value: function setPosition(newPosition) {
      if (newPosition < 0) {
        newPosition = 0;
      } else if (newPosition > 100) {
        newPosition = 100;
      }

      var lengthPerStep = 100 / ((this.max() - this.min()) / this.step());
      var steps = Math.round(newPosition / lengthPerStep);
      var value = steps * lengthPerStep * (this.max() - this.min()) * 0.01 + this.min();
      this.props.onChange(parseFloat(value.toFixed(this.precision())));
    }
    /* Computed Methods */

  }, {
    key: "formatValue",
    value: function formatValue() {
      var formatTooltip = this.parent().props.formatTooltip;

      if (formatTooltip instanceof Function) {
        return formatTooltip(this.props.value);
      }

      return this.props.value;
    }
  }, {
    key: "disabled",
    value: function disabled() {
      return this.parent().props.disabled;
    }
  }, {
    key: "max",
    value: function max() {
      return this.parent().props.max;
    }
  }, {
    key: "min",
    value: function min() {
      return this.parent().props.min;
    }
  }, {
    key: "step",
    value: function step() {
      return this.parent().props.step;
    }
  }, {
    key: "precision",
    value: function precision() {
      return this.parent().state.precision;
    }
  }, {
    key: "currentPosition",
    value: function currentPosition() {
      return "".concat((this.props.value - this.min()) / (this.max() - this.min()) * 100, "%");
    }
  }, {
    key: "wrapperStyle",
    value: function wrapperStyle() {
      return this.props.vertical ? {
        bottom: this.currentPosition()
      } : {
        left: this.currentPosition()
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state3 = this.state,
          hovering = _this$state3.hovering,
          dragging = _this$state3.dragging;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: this.classNames('el-slider__button-wrapper', {
          'hover': hovering,
          'dragging': dragging
        }),
        style: this.wrapperStyle(),
        onMouseEnter: this.handleMouseEnter.bind(this),
        onMouseLeave: this.handleMouseLeave.bind(this),
        onMouseDown: this.onButtonDown.bind(this)
      }, /*#__PURE__*/_react["default"].createElement(_tooltip["default"], {
        placement: "top",
        content: /*#__PURE__*/_react["default"].createElement("span", null, this.formatValue()),
        disabled: !this.parent().props.showTooltip
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: this.classNames('el-slider__button', {
          'hover': hovering,
          'dragging': dragging
        })
      })));
    }
  }]);

  return SliderButton;
}(_libs.Component);

exports["default"] = SliderButton;

_defineProperty(SliderButton, "defaultProps", {
  value: 0
});

SliderButton.contextTypes = {
  component: _libs.PropTypes.any
};
SliderButton.propTypes = {
  onChange: _libs.PropTypes.func.isRequired,
  value: _libs.PropTypes.number,
  vertical: _libs.PropTypes.bool
};