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

var SvPanel = /*#__PURE__*/function (_Component) {
  _inherits(SvPanel, _Component);

  var _super = _createSuper(SvPanel);

  function SvPanel(props) {
    var _this;

    _classCallCheck(this, SvPanel);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "state", void 0);

    _this.state = {
      cursorTop: 0,
      cursorLeft: 0,
      background: 'hsl(0, 100%, 50%)'
    };
    return _this;
  }

  _createClass(SvPanel, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var dragConfig = {
        drag: function drag(event) {
          _this2.handleDrag(event);
        },
        end: function end(event) {
          _this2.handleDrag(event);
        }
      };
      (0, _draggable["default"])(this.$el, dragConfig);
      this.update();
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var background = this.state.background;
      var newBackground = 'hsl(' + nextProps.color.get('hue') + ', 100%, 50%)';

      if (newBackground !== background) {
        this.update(nextProps);
      }
    }
  }, {
    key: "update",
    value: function update(props) {
      var _ref = props || this.props,
          color = _ref.color;

      var saturation = color.get('saturation');
      var value = color.get('value');
      var el = this.$el;

      var _el$getBoundingClient = el.getBoundingClientRect(),
          width = _el$getBoundingClient.width,
          height = _el$getBoundingClient.height;

      if (!height) height = width * 3 / 4;
      this.setState({
        cursorLeft: saturation * width / 100,
        cursorTop: (100 - value) * height / 100,
        background: 'hsl(' + color.get('hue') + ', 100%, 50%)'
      });
    }
  }, {
    key: "handleDrag",
    value: function handleDrag(event) {
      var color = this.props.color;
      var onChange = this.context.onChange;
      var el = this.$el;
      var rect = el.getBoundingClientRect();
      var left = event.clientX - rect.left;
      var top = event.clientY - rect.top;
      left = Math.max(0, left);
      left = Math.min(left, rect.width);
      top = Math.max(0, top);
      top = Math.min(top, rect.height);
      this.setState({
        cursorLeft: left,
        cursorTop: top,
        background: 'hsl(' + color.get('hue') + ', 100%, 50%)'
      }, function () {
        color.set({
          saturation: left / rect.width * 100,
          value: 100 - top / rect.height * 100
        });
        onChange(color);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$state = this.state,
          cursorTop = _this$state.cursorTop,
          cursorLeft = _this$state.cursorLeft,
          background = _this$state.background;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "el-color-svpanel",
        style: {
          backgroundColor: background
        },
        ref: function ref(el) {
          return _this3.$el = el;
        }
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "el-color-svpanel__white"
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: "el-color-svpanel__black"
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: "el-color-svpanel__cursor",
        style: {
          top: cursorTop + 'px',
          left: cursorLeft + 'px'
        }
      }, /*#__PURE__*/_react["default"].createElement("div", null)));
    }
  }]);

  return SvPanel;
}(_libs.Component);

exports["default"] = SvPanel;
SvPanel.contextTypes = {
  onChange: _libs.PropTypes.func
};
SvPanel.propTypes = {
  color: _libs.PropTypes.object.isRequired
};