"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _libs = require("../../libs");

var _MixinComponent2 = _interopRequireDefault(require("./MixinComponent"));

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

var SubMenu = /*#__PURE__*/function (_MixinComponent) {
  _inherits(SubMenu, _MixinComponent);

  var _super = _createSuper(SubMenu);

  function SubMenu(props) {
    var _this;

    _classCallCheck(this, SubMenu);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "state", void 0);

    _defineProperty(_assertThisInitialized(_this), "instanceType", void 0);

    _this.instanceType = 'SubMenu';
    _this.state = {
      active: false
    };
    return _this;
  }

  _createClass(SubMenu, [{
    key: "getChildContext",
    value: function getChildContext() {
      return {
        component: this
      };
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.rootMenu().state.submenus[this.props.index] = this;
      this.initEvents();
    }
  }, {
    key: "onItemSelect",
    value: function onItemSelect(index, indexPath) {
      this.setState({
        active: indexPath.indexOf(this.props.index) !== -1
      });
    }
  }, {
    key: "handleClick",
    value: function handleClick() {
      this.rootMenu().handleSubmenuClick(this.props.index, this.indexPath());
    }
  }, {
    key: "handleMouseenter",
    value: function handleMouseenter() {
      var _this2 = this;

      clearTimeout(this.timeout);
      this.timeout = setTimeout(function () {
        _this2.rootMenu().openMenu(_this2.props.index, _this2.indexPath());
      }, 300);
    }
  }, {
    key: "handleMouseleave",
    value: function handleMouseleave() {
      var _this3 = this;

      clearTimeout(this.timeout);
      this.timeout = setTimeout(function () {
        _this3.rootMenu().closeMenu(_this3.props.index, _this3.indexPath());
      }, 300);
    }
  }, {
    key: "initEvents",
    value: function initEvents() {
      if (this.rootMenu().props.mode === 'horizontal' && this.rootMenu().props.menuTrigger === 'hover') {
        var triggerElm = _reactDom["default"].findDOMNode(this);

        triggerElm.addEventListener('mouseenter', this.handleMouseenter.bind(this));
        triggerElm.addEventListener('mouseleave', this.handleMouseleave.bind(this));
      } else {
        var _triggerElm = this.refs['submenu-title'];

        _triggerElm.addEventListener('click', this.handleClick.bind(this));
      }
    }
  }, {
    key: "opened",
    value: function opened() {
      return this.rootMenu().state.openedMenus.indexOf(this.props.index) !== -1;
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react["default"].createElement("li", {
        style: this.style(),
        className: this.className('el-submenu', {
          'is-active': this.state.active,
          'is-opened': this.opened()
        })
      }, /*#__PURE__*/_react["default"].createElement("div", {
        ref: "submenu-title",
        className: "el-submenu__title"
      }, this.props.title, /*#__PURE__*/_react["default"].createElement("i", {
        className: this.classNames('el-submenu__icon-arrow', {
          'el-icon-arrow-down': this.rootMenu().props.mode === 'vertical',
          'el-icon-caret-bottom': this.rootMenu().props.mode === 'horizontal'
        })
      })), this.rootMenu().props.mode === 'horizontal' ? /*#__PURE__*/_react["default"].createElement(_libs.Transition, {
        name: "el-zoom-in-top"
      }, /*#__PURE__*/_react["default"].createElement(_libs.View, {
        show: this.opened()
      }, /*#__PURE__*/_react["default"].createElement("ul", {
        className: "el-menu"
      }, this.props.children))) : /*#__PURE__*/_react["default"].createElement(_libs.CollapseTransition, {
        isShow: this.opened()
      }, /*#__PURE__*/_react["default"].createElement("ul", {
        className: "el-menu"
      }, this.props.children)));
    }
  }]);

  return SubMenu;
}(_MixinComponent2["default"]);

exports["default"] = SubMenu;
SubMenu.childContextTypes = {
  component: _libs.PropTypes.any
};
SubMenu.propTypes = {
  index: _libs.PropTypes.string.isRequired
};