"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

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

var CarouselItem = /*#__PURE__*/function (_Component) {
  _inherits(CarouselItem, _Component);

  var _super = _createSuper(CarouselItem);

  function CarouselItem(props) {
    var _this;

    _classCallCheck(this, CarouselItem);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "state", void 0);

    _this.state = {
      hover: false,
      translate: 0,
      scale: 1,
      active: false,
      ready: false,
      inStage: false,
      animating: false
    };
    return _this;
  }

  _createClass(CarouselItem, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.parent().addItem(this);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.parent().removeItem(this);
    }
  }, {
    key: "isFlat",
    get: function get() {
      return this.parent().props.type === 'flatcard';
    }
  }, {
    key: "CARD_SCALE",
    get: function get() {
      return this.isFlat ? 1 : 0.83;
    }
  }, {
    key: "calculateWidth",
    get: function get() {
      if (this.isFlat) {
        return parseInt(100 / 3) + '%';
      }
    }
  }, {
    key: "processIndex",
    value: function processIndex(index, activeIndex, length) {
      if (activeIndex === 0 && index === length - 1) {
        return -1;
      } else if (activeIndex === length - 1 && index === 0) {
        return length;
      } else if (index < activeIndex - 1 && activeIndex - index >= length / 2) {
        return length + 1;
      } else if (index > activeIndex + 1 && index - activeIndex >= length / 2) {
        return -2;
      }

      return index;
    }
  }, {
    key: "calculateTranslate",
    value: function calculateTranslate(index, activeIndex, parentWidth) {
      var denominator = this.isFlat ? 3 : 4;

      if (this.state.inStage) {
        return parentWidth * ((2 - this.CARD_SCALE) * (index - activeIndex) + 1) / denominator;
      } else if (index < activeIndex) {
        return -(1 + this.CARD_SCALE) * parentWidth / denominator;
      } else {
        return (denominator - 1 + this.CARD_SCALE) * parentWidth / denominator;
      }
    }
  }, {
    key: "translateItem",
    value: function translateItem(index, activeIndex, oldIndex) {
      var parent = _reactDom["default"].findDOMNode(this.parent());

      var parentWidth = parent.offsetWidth;
      var length = this.parent().state.items.length;

      if (!this.parent().iscard && oldIndex !== undefined) {
        this.state.animating = index === activeIndex || index === oldIndex;
      }

      if (index !== activeIndex && length > 2) {
        index = this.processIndex(index, activeIndex, length);
      }

      if (this.parent().iscard) {
        this.state.inStage = Math.round(Math.abs(index - activeIndex)) <= 1;
        this.state.active = index === activeIndex;
        this.state.translate = this.calculateTranslate(index, activeIndex, parentWidth);
        this.state.scale = this.state.active ? 1 : this.CARD_SCALE;
      } else {
        this.state.active = index === activeIndex;
        this.state.translate = parentWidth * (index - activeIndex);
      }

      this.state.ready = true;
      this.forceUpdate();
    }
  }, {
    key: "handleItemClick",
    value: function handleItemClick() {
      if (this.parent().iscard) {
        var index = this.parent().state.items.indexOf(this);
        this.parent().setActiveItem(index);
      }
    }
  }, {
    key: "parent",
    value: function parent() {
      return this.context.component;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state = this.state,
          hover = _this$state.hover,
          translate = _this$state.translate,
          scale = _this$state.scale,
          active = _this$state.active,
          ready = _this$state.ready,
          inStage = _this$state.inStage,
          animating = _this$state.animating;
      return /*#__PURE__*/_react["default"].createElement(_libs.View, {
        show: ready
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: this.className('el-carousel__item', {
          'is-active': active,
          'el-carousel__item--card': this.parent().iscard,
          'is-in-stage': inStage,
          'is-hover': hover,
          'is-animating': animating
        }),
        onClick: this.handleItemClick.bind(this),
        style: {
          msTransform: "translateX(".concat(translate, "px) scale(").concat(scale, ")"),
          WebkitTransform: "translateX(".concat(translate, "px) scale(").concat(scale, ")"),
          transform: "translateX(".concat(translate, "px) scale(").concat(scale, ")")
        }
      }, this.parent().iscard && /*#__PURE__*/_react["default"].createElement(_libs.View, {
        show: !active
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "el-carousel__mask"
      })), this.props.children));
    }
  }]);

  return CarouselItem;
}(_libs.Component);

exports["default"] = CarouselItem;
CarouselItem.contextTypes = {
  component: _libs.PropTypes.any
};