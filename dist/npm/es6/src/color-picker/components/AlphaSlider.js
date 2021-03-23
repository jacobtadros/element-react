"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _libs = require("../../../libs");

var _draggable = _interopRequireDefault(require("../draggable"));

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

var AlphaSlider = /*#__PURE__*/function (_Component) {
  _inherits(AlphaSlider, _Component);

  var _super = _createSuper(AlphaSlider);

  function AlphaSlider(props) {
    var _this;

    _classCallCheck(this, AlphaSlider);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "state", void 0);

    _this.state = {
      thumbLeft: 0,
      thumbTop: 0,
      background: null
    };
    return _this;
  }

  _createClass(AlphaSlider, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var _this$refs = this.refs,
          bar = _this$refs.bar,
          thumb = _this$refs.thumb;
      var dragConfig = {
        drag: function drag(event) {
          _this2.handleDrag(event);
        },
        end: function end(event) {
          _this2.handleDrag(event);
        }
      };
      (0, _draggable["default"])(bar, dragConfig);
      (0, _draggable["default"])(thumb, dragConfig);
      this.update();
    }
  }, {
    key: "handleClick",
    value: function handleClick(event) {
      var thumb = this.refs.thumb;
      var target = event.target;

      if (target !== thumb) {
        this.handleDrag(event);
      }
    }
  }, {
    key: "handleDrag",
    value: function handleDrag(event) {
      var _this$props = this.props,
          vertical = _this$props.vertical,
          color = _this$props.color;
      var onChange = this.context.onChange;
      var rect = this.$el.getBoundingClientRect();
      var thumb = this.refs.thumb;

      if (!vertical) {
        var left = event.clientX - rect.left;
        left = Math.max(thumb.offsetWidth / 2, left);
        left = Math.min(left, rect.width - thumb.offsetWidth / 2);
        color.set('alpha', Math.round((left - thumb.offsetWidth / 2) / (rect.width - thumb.offsetWidth) * 100));
      } else {
        var top = event.clientY - rect.top;
        top = Math.max(thumb.offsetHeight / 2, top);
        top = Math.min(top, rect.height - thumb.offsetHeight / 2);
        color.set('alpha', Math.round((top - thumb.offsetHeight / 2) / (rect.height - thumb.offsetHeight) * 100));
      }

      this.update();
      onChange(color);
    }
  }, {
    key: "getThumbLeft",
    value: function getThumbLeft() {
      var _this$props2 = this.props,
          vertical = _this$props2.vertical,
          color = _this$props2.color;
      if (vertical) return 0;
      var el = this.$el;
      var alpha = color._alpha;
      if (!el) return 0;
      var thumb = this.refs.thumb;
      return Math.round(alpha * (el.offsetWidth - thumb.offsetWidth / 2) / 100);
    }
  }, {
    key: "getThumbTop",
    value: function getThumbTop() {
      var _this$props3 = this.props,
          vertical = _this$props3.vertical,
          color = _this$props3.color;
      if (!vertical) return 0;
      var el = this.$el;
      var alpha = color._alpha;
      if (!el) return 0;
      var thumb = this.refs.thumb;
      return Math.round(alpha * (el.offsetHeight - thumb.offsetHeight / 2) / 100);
    }
  }, {
    key: "getBackground",
    value: function getBackground() {
      var color = this.props.color;

      if (color && color.value) {
        var _color$toRgb = color.toRgb(),
            r = _color$toRgb.r,
            g = _color$toRgb.g,
            b = _color$toRgb.b;

        return "linear-gradient(to right, rgba(".concat(r, ", ").concat(g, ", ").concat(b, ", 0) 0%, rgba(").concat(r, ", ").concat(g, ", ").concat(b, ", 1) 100%)");
      }

      return null;
    }
  }, {
    key: "update",
    value: function update() {
      this.setState({
        thumbLeft: this.getThumbLeft(),
        thumbTop: this.getThumbTop(),
        background: this.getBackground()
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var vertical = this.props.vertical;
      var _this$state = this.state,
          thumbLeft = _this$state.thumbLeft,
          thumbTop = _this$state.thumbTop,
          background = _this$state.background;
      return /*#__PURE__*/_react["default"].createElement("div", {
        ref: function ref(el) {
          return _this3.$el = el;
        },
        className: this.classNames({
          'el-color-alpha-slider': true,
          'is-vertical': vertical
        })
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "el-color-alpha-slider__bar",
        onClick: function onClick(e) {
          return _this3.handleClick(e);
        },
        ref: "bar",
        style: {
          background: background
        }
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: "el-color-alpha-slider__thumb",
        ref: "thumb",
        style: {
          left: thumbLeft + 'px',
          top: thumbTop + 'px'
        }
      }));
    }
  }]);

  return AlphaSlider;
}(_libs.Component);

exports["default"] = AlphaSlider;
AlphaSlider.contextTypes = {
  onChange: _libs.PropTypes.func
};
AlphaSlider.propTypes = {
  color: _libs.PropTypes.object.isRequired,
  vertical: _libs.PropTypes.bool
};