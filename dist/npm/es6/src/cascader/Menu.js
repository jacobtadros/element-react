"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _libs = require("../../libs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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

var CascaderMenu = /*#__PURE__*/function (_Component) {
  _inherits(CascaderMenu, _Component);

  var _super = _createSuper(CascaderMenu);

  function CascaderMenu(props) {
    var _this;

    _classCallCheck(this, CascaderMenu);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "state", void 0);

    _this.state = {
      inputWidth: 0,
      options: [],
      props: {},
      visible: false,
      activeValue: [],
      value: [],
      expandTrigger: 'click',
      changeOnSelect: false,
      popperClass: ''
    };
    return _this;
  }

  _createClass(CascaderMenu, [{
    key: "parent",
    value: function parent() {
      return this.context.component;
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.parent().initMenu(this);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(props, state) {
      if (state.value !== this.state.value || state.visible !== this.state.visible) {
        this.setState({
          activeValue: this.state.value
        });
      }
    }
  }, {
    key: "select",
    value: function select(item, menuIndex) {
      var activeValue = this.state.activeValue;

      if (item.__IS__FLAT__OPTIONS) {
        activeValue = item.value;
      } else {
        if (!menuIndex) {
          activeValue = [item.value];
        } else {
          activeValue.splice(menuIndex, activeValue.length - 1, item.value);
        }
      }

      this.forceUpdate();
      this.parent().handlePick(activeValue);
    }
  }, {
    key: "handleMenuLeave",
    value: function handleMenuLeave() {}
  }, {
    key: "activeItem",
    value: function activeItem(item, menuIndex) {
      var activeOptions = this.activeOptions();
      this.state.activeValue.splice(menuIndex, activeOptions.length, item.value);
      this.forceUpdate();

      if (this.parent().props.changeOnSelect) {
        this.parent().handlePick(this.state.activeValue, false);
      } else {
        this.parent().handleActiveItemChange(this.state.activeValue);
      }
    }
    /* Computed Methods */

  }, {
    key: "activeOptions",
    value: function activeOptions() {
      var _this2 = this;

      var activeValue = this.state.activeValue;
      var configurableProps = ['label', 'value', 'children', 'disabled'];

      var formatOptions = function formatOptions(options) {
        options.forEach(function (option) {
          if (option.__IS__FLAT__OPTIONS) return;
          configurableProps.forEach(function (prop) {
            var value = option[_this2.parent().props.props[prop] || prop];
            if (value) option[prop] = value;
          });

          if (Array.isArray(option.children)) {
            formatOptions(option.children);
          }
        });
      };

      var loadActiveOptions = function loadActiveOptions(options) {
        var activeOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
        var level = activeOptions.length;
        activeOptions[level] = options;
        var active = activeValue[level];

        if (active) {
          options = options.filter(function (option) {
            return option.value === active;
          })[0];

          if (options && options.children) {
            loadActiveOptions(options.children, activeOptions);
          }
        }

        return activeOptions;
      };

      formatOptions(this.state.options);
      return loadActiveOptions(this.state.options);
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$parent$props = this.parent().props,
          expandTrigger = _this$parent$props.expandTrigger,
          popperClass = _this$parent$props.popperClass;
      var _this$state = this.state,
          activeValue = _this$state.activeValue,
          visible = _this$state.visible;
      var activeOptions = this.activeOptions();
      var menus = activeOptions.map(function (menu, menuIndex) {
        var isFlat = false;
        var items = menu.map(function (item, index) {
          var events = {};
          if (item.__IS__FLAT__OPTIONS) isFlat = true;

          if (!item.disabled) {
            if (item.children) {
              var triggerEvent = {
                click: 'onClick',
                hover: 'onMouseEnter'
              }[expandTrigger];

              events[triggerEvent] = function () {
                _this3.activeItem(item, menuIndex);
              };
            } else {
              events.onClick = function () {
                _this3.select(item, menuIndex);
              };
            }
          }

          return /*#__PURE__*/_react["default"].createElement("li", _extends({
            key: index,
            className: _this3.classNames({
              'el-cascader-menu__item': true,
              'el-cascader-menu__item--extensible': item.children,
              'is-active': item.value === activeValue[menuIndex],
              'is-disabled': item.disabled
            })
          }, events), item.label);
        });
        var menuStyle = {};

        if (isFlat) {
          menuStyle.minWidth = _this3.inputWidth + 'px';
        }

        return /*#__PURE__*/_react["default"].createElement("ul", {
          key: menuIndex,
          className: _this3.classNames({
            'el-cascader-menu': true,
            'el-cascader-menu--flexible': isFlat
          }),
          style: menuStyle
        }, items);
      });
      return /*#__PURE__*/_react["default"].createElement(_libs.Transition, {
        name: "el-zoom-in-top"
      }, /*#__PURE__*/_react["default"].createElement(_libs.View, {
        show: visible
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: this.classNames('el-cascader-menus', popperClass)
      }, menus)));
    }
  }]);

  return CascaderMenu;
}(_libs.Component);

exports["default"] = CascaderMenu;
CascaderMenu.contextTypes = {
  component: _libs.PropTypes.any
};