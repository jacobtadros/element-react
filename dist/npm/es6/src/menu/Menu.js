"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

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

var Menu = /*#__PURE__*/function (_Component) {
  _inherits(Menu, _Component);

  var _super = _createSuper(Menu);

  function Menu(props) {
    var _this;

    _classCallCheck(this, Menu);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "state", void 0);

    _defineProperty(_assertThisInitialized(_this), "instanceType", void 0);

    _this.instanceType = 'Menu';
    _this.state = {
      activeIndex: props.defaultActive,
      openedMenus: props.defaultOpeneds ? props.defaultOpeneds.slice(0) : [],
      menuItems: {},
      submenus: {}
    };
    return _this;
  }

  _createClass(Menu, [{
    key: "getChildContext",
    value: function getChildContext() {
      return {
        component: this
      };
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.openActiveItemMenus();
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(props) {
      if (props.defaultActive != this.props.defaultActive || props.defaultActive != this.state.activeIndex) {
        this.defaultActiveChanged(props.defaultActive);
      }

      if (props.defaultOpeneds != this.props.defaultOpeneds) {
        this.defaultOpenedsChanged(props.defaultOpeneds);
      }
    }
  }, {
    key: "openMenu",
    value: function openMenu(index, indexPath) {
      var openedMenus = this.state.openedMenus;
      if (openedMenus.indexOf(index) !== -1) return; // 将不在该菜单路径下的其余菜单收起

      if (this.props.uniqueOpened) {
        openedMenus = openedMenus.filter(function (index) {
          return indexPath.indexOf(index) !== -1;
        });
      }

      openedMenus.push(index);
      this.setState({
        openedMenus: openedMenus
      });
    }
  }, {
    key: "closeMenu",
    value: function closeMenu(index) {
      var openedMenus = this.state.openedMenus;
      openedMenus.splice(openedMenus.indexOf(index), 1);
      this.setState({
        openedMenus: openedMenus
      });
    }
  }, {
    key: "handleSubmenuClick",
    value: function handleSubmenuClick(index, indexPath) {
      var isOpened = this.state.openedMenus.indexOf(index) !== -1;

      if (isOpened) {
        this.closeMenu(index);

        if (this.props.onClose) {
          this.props.onClose(index, indexPath);
        }
      } else {
        this.openMenu(index, indexPath);

        if (this.props.onOpen) {
          this.props.onOpen(index, indexPath);
        }
      }
    }
  }, {
    key: "handleSelect",
    value: function handleSelect(index, indexPath, instance) {
      var _this2 = this;

      var _this$state = this.state,
          activeIndex = _this$state.activeIndex,
          openedMenus = _this$state.openedMenus,
          submenus = _this$state.submenus;
      activeIndex = index;

      if (this.props.onSelect) {
        this.props.onSelect(index, indexPath, instance);
      }

      if (this.props.mode === 'horizontal') {
        for (var key in submenus) {
          submenus[key].onItemSelect(index, indexPath);
        }

        openedMenus = [];
      }

      this.setState({
        activeIndex: activeIndex,
        openedMenus: openedMenus
      }, function () {
        if (_this2.props.mode === 'vertical') {
          _this2.openActiveItemMenus();
        }
      });
    }
  }, {
    key: "openActiveItemMenus",
    value: function openActiveItemMenus() {
      var _this3 = this;

      var _this$state2 = this.state,
          activeIndex = _this$state2.activeIndex,
          menuItems = _this$state2.menuItems,
          submenus = _this$state2.submenus;
      if (!menuItems[activeIndex]) return;

      if (activeIndex && this.props.mode === 'vertical') {
        var indexPath = menuItems[activeIndex].indexPath(); // 展开该菜单项的路径上所有子菜单

        indexPath.forEach(function (index) {
          var submenu = submenus[index];
          submenu && _this3.openMenu(index, submenu.indexPath());
        });
      }
    }
  }, {
    key: "defaultActiveChanged",
    value: function defaultActiveChanged(value) {
      var _this4 = this;

      var menuItems = this.state.menuItems;
      this.setState({
        activeIndex: value
      }, function () {
        if (!menuItems[value]) return;
        var menuItem = menuItems[value];
        var indexPath = menuItem.indexPath();

        _this4.handleSelect(value, indexPath, menuItem);
      });
    }
  }, {
    key: "defaultOpenedsChanged",
    value: function defaultOpenedsChanged(value) {
      this.setState({
        openedMenus: value
      });
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react["default"].createElement("ul", {
        style: this.style(),
        className: this.className("el-menu", {
          'el-menu--horizontal': this.props.mode === 'horizontal',
          'el-menu--dark': this.props.theme === 'dark'
        })
      }, this.props.children);
    }
  }]);

  return Menu;
}(_libs.Component);

exports["default"] = Menu;
Menu.childContextTypes = {
  component: _libs.PropTypes.any
};
Menu.propTypes = {
  mode: _libs.PropTypes.string,
  defaultActive: _libs.PropTypes.string,
  defaultOpeneds: _libs.PropTypes.arrayOf(_libs.PropTypes.any),
  theme: _libs.PropTypes.string,
  uniqueOpened: _libs.PropTypes.bool,
  menuTrigger: _libs.PropTypes.string,
  onSelect: _libs.PropTypes.func,
  onOpen: _libs.PropTypes.func,
  onClose: _libs.PropTypes.func
};
Menu.defaultProps = {
  mode: 'vertical',
  theme: 'light',
  menuTrigger: 'hover'
};