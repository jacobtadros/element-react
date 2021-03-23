"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _reactClickOutside = _interopRequireDefault(require("react-click-outside"));

var _libs = require("../../libs");

var _button = _interopRequireDefault(require("../button"));

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

var Dropdown = /*#__PURE__*/function (_Component) {
  _inherits(Dropdown, _Component);

  var _super = _createSuper(Dropdown);

  function Dropdown(props) {
    var _this;

    _classCallCheck(this, Dropdown);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "state", void 0);

    _this.state = {
      visible: false
    };
    return _this;
  }

  _createClass(Dropdown, [{
    key: "getChildContext",
    value: function getChildContext() {
      return {
        component: this
      };
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.initEvent();
    }
  }, {
    key: "componentWillUpdate",
    value: function componentWillUpdate(props, state) {
      if (state.visible != this.state.visible) {
        this.refs.dropdown.onVisibleChange(state.visible);

        if (this.props.onVisibleChange) {
          this.props.onVisibleChange(state.visible);
        }
      }
    }
  }, {
    key: "handleClickOutside",
    value: function handleClickOutside() {
      if (this.state.visible) {
        this.setState({
          visible: false
        });
      }
    }
  }, {
    key: "show",
    value: function show() {
      var _this2 = this;

      clearTimeout(this.timeout);
      this.timeout = setTimeout(function () {
        return _this2.setState({
          visible: true
        });
      }, 250);
    }
  }, {
    key: "hide",
    value: function hide() {
      var _this3 = this;

      clearTimeout(this.timeout);
      this.timeout = setTimeout(function () {
        return _this3.setState({
          visible: false
        });
      }, 150);
    }
  }, {
    key: "handleClick",
    value: function handleClick() {
      this.setState({
        visible: !this.state.visible
      });
    }
  }, {
    key: "initEvent",
    value: function initEvent() {
      var _this$props = this.props,
          trigger = _this$props.trigger,
          splitButton = _this$props.splitButton;

      var triggerElm = _reactDom["default"].findDOMNode(splitButton ? this.refs.trigger : this.refs["default"]);

      if (trigger === 'hover') {
        triggerElm.addEventListener('mouseenter', this.show.bind(this));
        triggerElm.addEventListener('mouseleave', this.hide.bind(this));

        var dropdownElm = _reactDom["default"].findDOMNode(this.refs.dropdown);

        dropdownElm.addEventListener('mouseenter', this.show.bind(this));
        dropdownElm.addEventListener('mouseleave', this.hide.bind(this));
      } else if (trigger === 'click') {
        triggerElm.addEventListener('click', this.handleClick.bind(this));
      }
    }
  }, {
    key: "handleMenuItemClick",
    value: function handleMenuItemClick(command, instance) {
      var _this4 = this;

      if (this.props.hideOnClick) {
        this.setState({
          visible: false
        });
      }

      if (this.props.onCommand) {
        setTimeout(function () {
          _this4.props.onCommand(command, instance);
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          splitButton = _this$props2.splitButton,
          type = _this$props2.type,
          size = _this$props2.size,
          menu = _this$props2.menu;
      return /*#__PURE__*/_react["default"].createElement("div", {
        style: this.style(),
        className: this.className('el-dropdown')
      }, splitButton ? /*#__PURE__*/_react["default"].createElement(_button["default"].Group, null, /*#__PURE__*/_react["default"].createElement(_button["default"], {
        type: type,
        size: size,
        onClick: this.props.onClick.bind(this)
      }, this.props.children), /*#__PURE__*/_react["default"].createElement(_button["default"], {
        ref: "trigger",
        type: type,
        size: size,
        className: "el-dropdown__caret-button"
      }, /*#__PURE__*/_react["default"].createElement("i", {
        className: "el-dropdown__icon el-icon-caret-bottom"
      }))) : /*#__PURE__*/_react["default"].cloneElement(this.props.children, {
        ref: 'default'
      }), /*#__PURE__*/_react["default"].cloneElement(menu, {
        ref: 'dropdown'
      }));
    }
  }]);

  return Dropdown;
}(_libs.Component);

Dropdown.childContextTypes = {
  component: _libs.PropTypes.any
};
Dropdown.propTypes = {
  menu: _libs.PropTypes.node.isRequired,
  type: _libs.PropTypes.string,
  size: _libs.PropTypes.string,
  trigger: _libs.PropTypes.oneOf(['hover', 'click']),
  menuAlign: _libs.PropTypes.oneOf(['start', 'end']),
  splitButton: _libs.PropTypes.bool,
  hideOnClick: _libs.PropTypes.bool,
  onClick: _libs.PropTypes.func,
  onCommand: _libs.PropTypes.func,
  onVisibleChange: _libs.PropTypes.func
};
Dropdown.defaultProps = {
  hideOnClick: true,
  trigger: 'hover',
  menuAlign: 'end'
};

var _default = (0, _reactClickOutside["default"])(Dropdown);

exports["default"] = _default;