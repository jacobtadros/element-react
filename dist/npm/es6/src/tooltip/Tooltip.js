"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _popper = _interopRequireDefault(require("popper.js"));

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

var Tooltip = /*#__PURE__*/function (_Component) {
  _inherits(Tooltip, _Component);

  var _super = _createSuper(Tooltip);

  function Tooltip(props) {
    var _this;

    _classCallCheck(this, Tooltip);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "state", void 0);

    _this.state = {
      showPopper: false
    };
    return _this;
  }

  _createClass(Tooltip, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(props) {
      if (props.visible !== this.props.visible) {
        this.setState({
          showPopper: props.visible
        });
      }
    }
  }, {
    key: "showPopper",
    value: function showPopper() {
      var _this2 = this;

      if (!this.props.manual) {
        this.timeout = setTimeout(function () {
          _this2.setState({
            showPopper: true
          });
        }, this.props.openDelay);
      }
    }
  }, {
    key: "hidePopper",
    value: function hidePopper() {
      if (!this.props.manual) {
        clearTimeout(this.timeout);
        this.setState({
          showPopper: false
        });
      }
    }
  }, {
    key: "onEnter",
    value: function onEnter() {
      var _this$refs = this.refs,
          popper = _this$refs.popper,
          reference = _this$refs.reference,
          arrow = _this$refs.arrow;

      if (arrow) {
        arrow.setAttribute('x-arrow', '');
      }

      this.popperJS = new _popper["default"](reference, popper, {
        placement: this.props.placement,
        modifiers: {
          computeStyle: {
            gpuAcceleration: false
          }
        }
      });
    }
  }, {
    key: "onAfterLeave",
    value: function onAfterLeave() {
      this.popperJS.destroy();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          effect = _this$props.effect,
          content = _this$props.content,
          disabled = _this$props.disabled,
          transition = _this$props.transition,
          visibleArrow = _this$props.visibleArrow;
      return /*#__PURE__*/_react["default"].createElement("div", {
        style: this.style(),
        className: this.className('el-tooltip'),
        onMouseEnter: this.showPopper.bind(this),
        onMouseLeave: this.hidePopper.bind(this)
      }, /*#__PURE__*/_react["default"].createElement("div", {
        ref: "reference",
        className: "el-tooltip__rel"
      }, /*#__PURE__*/_react["default"].createElement("div", null, this.props.children)), !disabled && /*#__PURE__*/_react["default"].createElement(_libs.Transition, {
        name: transition,
        onEnter: this.onEnter.bind(this),
        onAfterLeave: this.onAfterLeave.bind(this)
      }, /*#__PURE__*/_react["default"].createElement(_libs.View, {
        show: this.state.showPopper
      }, /*#__PURE__*/_react["default"].createElement("div", {
        ref: "popper",
        className: this.classNames("el-tooltip__popper", "is-".concat(effect))
      }, /*#__PURE__*/_react["default"].createElement("div", null, content), visibleArrow && /*#__PURE__*/_react["default"].createElement("div", {
        ref: "arrow",
        className: "popper__arrow"
      })))));
    }
  }]);

  return Tooltip;
}(_libs.Component);

exports["default"] = Tooltip;

_defineProperty(Tooltip, "defaultProps", {
  effect: "dark",
  placement: "bottom",
  disabled: false,
  transition: "fade-in-linear",
  visibleArrow: true,
  openDelay: 0,
  manual: false
});

Tooltip.propTypes = {
  // 默认提供的主题: dark, light
  effect: _libs.PropTypes.string,
  // 显示的内容，也可以通过 slot#content 传入 DOM
  content: _libs.PropTypes.oneOfType([_libs.PropTypes.node, _libs.PropTypes.string]),
  // Tooltip 的出现位置 [top, top-start, top-end, bottom, bottom-start, bottom-end, left, left-start, left-end, right, right-start, right-end]
  placement: _libs.PropTypes.oneOf(['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end', 'right', 'right-start', 'right-end']),
  // 状态是否可用
  disabled: _libs.PropTypes.bool,
  // 渐变动画定义
  transition: _libs.PropTypes.string,
  // 是否显示 Tooltip 箭头
  visibleArrow: _libs.PropTypes.bool,
  // 延迟出现(单位: 毫秒)
  openDelay: _libs.PropTypes.number,
  // 手动控制模式，设置为 true 后，mouseenter 和 mouseleave 事件将不会生效
  manual: _libs.PropTypes.bool,
  // 手动控制状态的展示
  visible: _libs.PropTypes.bool
};