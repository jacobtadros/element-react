"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _throttleDebounce = require("throttle-debounce");

var _libs = require("../../libs");

var _resizeEvent = require("../../libs/utils/resize-event");

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

var Carousel = /*#__PURE__*/function (_Component) {
  _inherits(Carousel, _Component);

  var _super = _createSuper(Carousel);

  function Carousel(props) {
    var _this;

    _classCallCheck(this, Carousel);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "state", void 0);

    _defineProperty(_assertThisInitialized(_this), "throttledArrowClick", void 0);

    _defineProperty(_assertThisInitialized(_this), "throttledIndicatorHover", void 0);

    _this.state = {
      items: [],
      activeIndex: -1,
      containerWidth: 0,
      timer: null,
      hover: false
    };
    _this.throttledArrowClick = (0, _throttleDebounce.throttle)(300, true, function (index) {
      _this.setActiveItem(index);
    });
    _this.throttledIndicatorHover = (0, _throttleDebounce.throttle)(300, function (index) {
      _this.handleIndicatorHover(index);
    });
    _this.resetItemPosition = _this._resetItemPosition.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Carousel, [{
    key: "getChildContext",
    value: function getChildContext() {
      return {
        component: this
      };
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.initialIndex < this.state.items.length && this.props.initialIndex >= 0) {
        this.setState({
          activeIndex: this.props.initialIndex
        });
      }

      this.startTimer();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(props, state) {
      (0, _resizeEvent.addResizeListener)(this.refs.root, this.resetItemPosition);

      if (state.activeIndex != this.state.activeIndex) {
        this.resetItemPosition(state.activeIndex);

        if (this.props.onChange) {
          this.props.onChange(this.state.activeIndex, state.activeIndex);
        }
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      (0, _resizeEvent.removeResizeListener)(this.refs.root, this.resetItemPosition);
      this.pauseTimer();
    }
  }, {
    key: "handleMouseEnter",
    value: function handleMouseEnter() {
      this.setState({
        hover: true
      });
      this.pauseTimer();
    }
  }, {
    key: "handleMouseLeave",
    value: function handleMouseLeave() {
      this.setState({
        hover: false
      });
      this.startTimer();
    }
  }, {
    key: "itemInStage",
    value: function itemInStage(item, index) {
      var length = this.state.items.length;

      if (index === length - 1 && item.state.inStage && this.state.items[0].state.active || item.state.inStage && this.state.items[index + 1] && this.state.items[index + 1].state.active) {
        return 'left';
      } else if (index === 0 && item.state.inStage && this.state.items[length - 1].state.active || item.state.inStage && this.state.items[index - 1] && this.state.items[index - 1].state.active) {
        return 'right';
      }

      return false;
    }
  }, {
    key: "handleButtonEnter",
    value: function handleButtonEnter(arrow) {
      var _this2 = this;

      this.state.items.forEach(function (item, index) {
        if (arrow === _this2.itemInStage(item, index)) {
          item.setState({
            hover: true
          });
        }
      });
    }
  }, {
    key: "handleButtonLeave",
    value: function handleButtonLeave() {
      this.state.items.forEach(function (item) {
        item.setState({
          hover: false
        });
      });
    }
  }, {
    key: "_resetItemPosition",
    value: function _resetItemPosition(oldIndex) {
      var _this3 = this;

      this.state.items.forEach(function (item, index) {
        item.translateItem(index, _this3.state.activeIndex, oldIndex);
      });
    }
  }, {
    key: "playSlides",
    value: function playSlides() {
      var activeIndex = this.state.activeIndex;

      if (activeIndex < this.state.items.length - 1) {
        activeIndex++;
      } else {
        activeIndex = 0;
      }

      this.setState({
        activeIndex: activeIndex
      });
    }
  }, {
    key: "pauseTimer",
    value: function pauseTimer() {
      clearInterval(this.timer);
    }
  }, {
    key: "startTimer",
    value: function startTimer() {
      if (this.props.interval <= 0 || !this.props.autoplay) return;
      this.timer = setInterval(this.playSlides.bind(this), Number(this.props.interval));
    }
  }, {
    key: "addItem",
    value: function addItem(item) {
      this.state.items.push(item);
      this.setActiveItem(0);
    }
  }, {
    key: "removeItem",
    value: function removeItem(item) {
      this.state.items.splice(this.state.items.indexOf(item), 1);
      this.setActiveItem(0);
    }
  }, {
    key: "setActiveItem",
    value: function setActiveItem(index) {
      var activeIndex = this.state.activeIndex;

      if (typeof index === 'string') {
        var filteredItems = this.state.items.filter(function (item) {
          return item.props.name === index;
        });

        if (filteredItems.length > 0) {
          index = this.state.items.indexOf(filteredItems[0]);
        }
      }

      index = Number(index);

      if (isNaN(index) || index !== Math.floor(index)) {
        process.env.NODE_ENV !== 'production' && console.warn('[Element Warn][Carousel]index must be an integer.');
        return;
      }

      var length = this.state.items.length;

      if (index < 0) {
        activeIndex = length - 1;
      } else if (index >= length) {
        activeIndex = 0;
      } else {
        activeIndex = index;
      }

      this.setState({
        activeIndex: activeIndex
      });
    }
  }, {
    key: "prev",
    value: function prev() {
      this.setActiveItem(this.state.activeIndex - 1);
    }
  }, {
    key: "next",
    value: function next() {
      this.setActiveItem(this.state.activeIndex + 1);
    }
  }, {
    key: "handleIndicatorClick",
    value: function handleIndicatorClick(index) {
      this.setState({
        activeIndex: index
      });
    }
  }, {
    key: "handleIndicatorHover",
    value: function handleIndicatorHover(index) {
      if (this.props.trigger === 'hover' && index !== this.state.activeIndex) {
        this.setState({
          activeIndex: index
        });
      }
    }
  }, {
    key: "iscard",
    get: function get() {
      var type = this.props.type;

      if (type) {
        return type === 'card' || type === 'flatcard';
      }

      return false;
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var _this$props = this.props,
          height = _this$props.height,
          arrow = _this$props.arrow,
          indicatorPosition = _this$props.indicatorPosition;
      var _this$state = this.state,
          hover = _this$state.hover,
          activeIndex = _this$state.activeIndex,
          items = _this$state.items;
      return /*#__PURE__*/_react["default"].createElement("div", {
        ref: "root",
        className: this.className('el-carousel', {
          'el-carousel--card': this.iscard
        }),
        onMouseEnter: this.handleMouseEnter.bind(this),
        onMouseLeave: this.handleMouseLeave.bind(this)
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "el-carousel__container",
        style: {
          height: height
        }
      }, /*#__PURE__*/_react["default"].createElement(_libs.Transition, {
        name: "carousel-arrow-left"
      }, arrow !== 'never' && /*#__PURE__*/_react["default"].createElement(_libs.View, {
        show: arrow === 'always' || hover
      }, /*#__PURE__*/_react["default"].createElement("button", {
        className: "el-carousel__arrow el-carousel__arrow--left",
        onMouseEnter: this.handleButtonEnter.bind(this, 'left'),
        onMouseLeave: this.handleButtonLeave.bind(this),
        onClick: this.throttledArrowClick.bind(this, activeIndex - 1)
      }, /*#__PURE__*/_react["default"].createElement("i", {
        className: "el-icon-arrow-left"
      })))), /*#__PURE__*/_react["default"].createElement(_libs.Transition, {
        name: "carousel-arrow-right"
      }, arrow !== 'never' && /*#__PURE__*/_react["default"].createElement(_libs.View, {
        show: arrow === 'always' || hover
      }, /*#__PURE__*/_react["default"].createElement("button", {
        className: "el-carousel__arrow el-carousel__arrow--right",
        onMouseEnter: this.handleButtonEnter.bind(this, 'right'),
        onMouseLeave: this.handleButtonLeave.bind(this),
        onClick: this.throttledArrowClick.bind(this, activeIndex + 1)
      }, /*#__PURE__*/_react["default"].createElement("i", {
        className: "el-icon-arrow-right"
      })))), this.props.children), indicatorPosition !== 'none' && /*#__PURE__*/_react["default"].createElement("ul", {
        className: this.classNames('el-carousel__indicators', {
          'el-carousel__indicators--outside': indicatorPosition === 'outside' || this.iscard
        })
      }, items.map(function (item, index) {
        return /*#__PURE__*/_react["default"].createElement("li", {
          key: index,
          className: _this4.classNames('el-carousel__indicator', {
            'is-active': index === activeIndex
          }),
          onMouseEnter: _this4.throttledIndicatorHover.bind(_this4, index),
          onClick: _this4.handleIndicatorClick.bind(_this4, index)
        }, /*#__PURE__*/_react["default"].createElement("button", {
          className: "el-carousel__button"
        }));
      })));
    }
  }]);

  return Carousel;
}(_libs.Component);

exports["default"] = Carousel;
Carousel.childContextTypes = {
  component: _libs.PropTypes.any
};
Carousel.propTypes = {
  initialIndex: _libs.PropTypes.number,
  height: _libs.PropTypes.string,
  trigger: _libs.PropTypes.string,
  autoplay: _libs.PropTypes.bool,
  interval: _libs.PropTypes.oneOfType([_libs.PropTypes.number, _libs.PropTypes.string]),
  indicatorPosition: _libs.PropTypes.string,
  indicator: _libs.PropTypes.bool,
  arrow: _libs.PropTypes.string,
  type: _libs.PropTypes.oneOf(['card', 'flatcard']),
  onChange: _libs.PropTypes.func
};
Carousel.defaultProps = {
  initialIndex: 0,
  trigger: 'hover',
  autoplay: true,
  interval: 3000,
  indicator: true,
  arrow: 'hover'
};