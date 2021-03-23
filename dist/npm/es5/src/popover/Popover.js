"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

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

var Popover = /*#__PURE__*/function (_Component) {
  _inherits(Popover, _Component);

  var _super = _createSuper(Popover);

  function Popover(props) {
    var _this;

    _classCallCheck(this, Popover);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "state", void 0);

    _this.state = {
      showPopper: false
    };
    return _this;
  }

  _createClass(Popover, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var trigger = this.props.trigger,
          popper = this.refs.popper;
      this.element = _reactDom["default"].findDOMNode(this);
      this.reference = _reactDom["default"].findDOMNode(this.refs.reference);
      if (this.reference === null) return;

      if (trigger === 'click') {
        this.reference.addEventListener('click', function () {
          _this2.setState({
            showPopper: !_this2.state.showPopper
          });
        });
        document.addEventListener('click', function (e) {
          if (!_this2.element || _this2.element.contains(e.target) || !_this2.reference || _this2.reference.contains(e.target) || !popper || popper.contains(e.target)) return;

          _this2.setState({
            showPopper: false
          });
        });
      } else if (trigger === 'hover') {
        this.reference.addEventListener('mouseenter', this.handleMouseEnter.bind(this));
        this.reference.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
        popper.addEventListener('mouseenter', this.handleMouseEnter.bind(this));
        popper.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
      } else if (trigger === 'manual') {
        this.setState({
          showPopper: this.props.visible
        });
      } else {
        if (this.reference.nodeName === 'INPUT' || this.reference.nodeName === 'TEXTAREA') {
          this.reference.addEventListener('focus', function () {
            _this2.setState({
              showPopper: true
            });
          });
          this.reference.addEventListener('blur', function () {
            _this2.setState({
              showPopper: false
            });
          });
        } else {
          this.reference.addEventListener('mousedown', function () {
            _this2.setState({
              showPopper: true
            });
          });
          this.reference.addEventListener('mouseup', function () {
            _this2.setState({
              showPopper: false
            });
          });
        }
      }
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(props) {
      if (props.visible !== this.props.visible) {
        this.setState({
          showPopper: props.visible
        });
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.reference.parentNode.replaceChild(this.reference.cloneNode(true), this.reference);
    }
  }, {
    key: "handleMouseEnter",
    value: function handleMouseEnter() {
      clearTimeout(this.timer);
      this.setState({
        showPopper: true
      });
    }
  }, {
    key: "handleMouseLeave",
    value: function handleMouseLeave() {
      var _this3 = this;

      this.timer = setTimeout(function () {
        _this3.setState({
          showPopper: false
        });
      }, 200);
    }
  }, {
    key: "onEnter",
    value: function onEnter() {
      if (this.refs.arrow) {
        this.refs.arrow.setAttribute('x-arrow', '');
      }

      this.popperJS = new _popper["default"](this.reference, this.refs.popper, {
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
          transition = _this$props.transition,
          popperClass = _this$props.popperClass,
          width = _this$props.width,
          title = _this$props.title,
          content = _this$props.content,
          visibleArrow = _this$props.visibleArrow;
      return /*#__PURE__*/_react["default"].createElement("span", null, /*#__PURE__*/_react["default"].createElement(_libs.Transition, {
        name: transition,
        onEnter: this.onEnter.bind(this),
        onAfterLeave: this.onAfterLeave.bind(this)
      }, /*#__PURE__*/_react["default"].createElement(_libs.View, {
        show: this.state.showPopper
      }, /*#__PURE__*/_react["default"].createElement("div", {
        ref: "popper",
        className: this.className('el-popover', popperClass),
        style: this.style({
          width: Number(width)
        })
      }, title && /*#__PURE__*/_react["default"].createElement("div", {
        className: "el-popover__title"
      }, title), content, visibleArrow && /*#__PURE__*/_react["default"].createElement("div", {
        ref: "arrow",
        className: "popper__arrow"
      })))), /*#__PURE__*/_react["default"].cloneElement(_react["default"].Children.only(this.props.children), {
        ref: 'reference'
      }));
    }
  }]);

  return Popover;
}(_libs.Component);

exports["default"] = Popover;

_defineProperty(Popover, "defaultProps", {
  visibleArrow: true,
  transition: 'fade-in-linear',
  trigger: 'click',
  placement: 'bottom',
  width: 150
});

Popover.propTypes = {
  width: _libs.PropTypes.oneOfType([_libs.PropTypes.number, _libs.PropTypes.string]),
  placement: _libs.PropTypes.oneOf(['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end', 'right', 'right-start', 'right-end']),
  trigger: _libs.PropTypes.oneOf(['click', 'focus', 'hover', 'manual']),
  title: _libs.PropTypes.string,
  content: _libs.PropTypes.oneOfType([_libs.PropTypes.node, _libs.PropTypes.string]),
  popperClass: _libs.PropTypes.string,
  transition: _libs.PropTypes.string,
  visible: _libs.PropTypes.bool,
  visibleArrow: _libs.PropTypes.bool
};