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

var Tabs = /*#__PURE__*/function (_Component) {
  _inherits(Tabs, _Component);

  var _super = _createSuper(Tabs);

  function Tabs(props) {
    var _this;

    _classCallCheck(this, Tabs);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "props", void 0);

    _defineProperty(_assertThisInitialized(_this), "state", void 0);

    var children = props.children,
        activeName = props.activeName,
        value = props.value;
    children = _react["default"].Children.toArray(children);
    _this.state = {
      children: children,
      currentName: value || activeName || children[0].props.name,
      barStyle: {},
      navStyle: {
        transform: ''
      },
      scrollable: false,
      scrollNext: false,
      scrollPrev: false
    };
    return _this;
  }

  _createClass(Tabs, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.calcBarStyle(true);
      this.update();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevState.scrollable !== this.state.scrollable) {
        this.scrollToActiveTab();
      }
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      if (nextProps.activeName !== this.props.activeName) {
        this.setState({
          currentName: nextProps.activeName
        }, function () {
          return _this2.calcBarStyle();
        });
      }

      if (nextProps.value !== this.props.value) {
        this.setState({
          currentName: nextProps.value
        }, function () {
          return _this2.calcBarStyle();
        });
      }

      if (nextProps.children !== this.props.children) {
        this.setState({
          children: _react["default"].Children.toArray(nextProps.children)
        }, function () {
          _this2.update();

          _this2.calcBarStyle();
        });
      }
    }
  }, {
    key: "handleTabAdd",
    value: function handleTabAdd() {
      var _this$props = this.props,
          onTabAdd = _this$props.onTabAdd,
          onTabEdit = _this$props.onTabEdit;
      onTabEdit && onTabEdit('add');
      onTabAdd && onTabAdd();
    }
  }, {
    key: "handleTabRemove",
    value: function handleTabRemove(tab, index, e) {
      var _this$state = this.state,
          children = _this$state.children,
          currentName = _this$state.currentName;
      var _this$props2 = this.props,
          onTabRemove = _this$props2.onTabRemove,
          onTabEdit = _this$props2.onTabEdit;
      e.stopPropagation();

      if (children[index].props.name === currentName) {
        var nextChild = children[index + 1];
        var prevChild = children[index - 1];
        this.setState({
          currentName: nextChild ? nextChild.props.name : prevChild ? prevChild.props.name : '-1'
        });
      }

      children.splice(index, 1);
      this.setState({
        children: children
      }, function () {
        onTabEdit && onTabEdit('remove', tab);
        onTabRemove && onTabRemove(tab, e);
      });
    }
  }, {
    key: "handleTabClick",
    value: function handleTabClick(tab, e) {
      var _this3 = this;

      if (tab.props.disabled) {
        return false;
      }

      this.setState({
        currentName: tab.props.name
      }, function () {
        var onTabClick = _this3.props.onTabClick;

        _this3.calcBarStyle();

        _this3.scrollToActiveTab();

        onTabClick && onTabClick(tab, e);
      });
    }
  }, {
    key: "calcBarStyle",
    value: function calcBarStyle(firstRendering) {
      var _this4 = this;

      if (this.props.type || !this.tabs.length) return {};
      var style = {};
      var offset = 0;
      var tabWidth = 0;
      var children = this.state.children instanceof Array ? this.state.children : [this.state.children];
      children.every(function (item, index) {
        var $el = _this4.tabs[index];

        if (item.props.name !== _this4.state.currentName) {
          offset += $el.clientWidth;
          return true;
        } else {
          tabWidth = $el.clientWidth;
          return false;
        }
      });
      style.width = tabWidth + 'px';
      style.transform = "translateX(".concat(offset, "px)");

      if (!firstRendering) {
        style.transition = 'transform .3s cubic-bezier(.645,.045,.355,1), -webkit-transform .3s cubic-bezier(.645,.045,.355,1)';
      }

      this.setState({
        barStyle: style
      });
    }
  }, {
    key: "scrollPrev",
    value: function scrollPrev() {
      var containerWidth = this.refs.navScroll.offsetWidth;
      var currentOffset = this.getCurrentScrollOffset();
      if (!currentOffset) return;
      var newOffset = currentOffset > containerWidth ? currentOffset - containerWidth : 0;
      this.setOffset(newOffset);
    }
  }, {
    key: "scrollNext",
    value: function scrollNext() {
      var navWidth = this.refs.nav.offsetWidth;
      var containerWidth = this.refs.navScroll.offsetWidth;
      var currentOffset = this.getCurrentScrollOffset();
      if (navWidth - currentOffset <= containerWidth) return;
      var newOffset = navWidth - currentOffset > containerWidth * 2 ? currentOffset + containerWidth : navWidth - containerWidth;
      this.setOffset(newOffset);
    }
  }, {
    key: "scrollToActiveTab",
    value: function scrollToActiveTab() {
      if (!this.state.scrollable) return;
      var nav = this.refs.nav;
      var activeTab = nav.querySelector('.is-active');
      var navScroll = this.refs.navScroll;
      var activeTabBounding = activeTab.getBoundingClientRect();
      var navScrollBounding = navScroll.getBoundingClientRect();
      var navBounding = nav.getBoundingClientRect();
      var currentOffset = this.getCurrentScrollOffset();
      var newOffset = currentOffset;

      if (activeTabBounding.left < navScrollBounding.left) {
        newOffset = currentOffset - (navScrollBounding.left - activeTabBounding.left);
      }

      if (activeTabBounding.right > navScrollBounding.right) {
        newOffset = currentOffset + activeTabBounding.right - navScrollBounding.right;
      }

      if (navBounding.right < navScrollBounding.right) {
        newOffset = nav.offsetWidth - navScrollBounding.width;
      }

      this.setOffset(Math.max(newOffset, 0));
    }
  }, {
    key: "getCurrentScrollOffset",
    value: function getCurrentScrollOffset() {
      var navStyle = this.state.navStyle;
      return navStyle.transform ? Number(navStyle.transform.match(/translateX\(-(\d+(\.\d+)*)px\)/)[1]) : 0;
    }
  }, {
    key: "setOffset",
    value: function setOffset(value) {
      this.setState({
        navStyle: {
          transform: "translateX(-".concat(value, "px)")
        }
      });
    }
  }, {
    key: "update",
    value: function update() {
      var navWidth = this.refs.nav.offsetWidth;
      var containerWidth = this.refs.navScroll.offsetWidth;
      var currentOffset = this.getCurrentScrollOffset();

      if (containerWidth < navWidth) {
        var _currentOffset = this.getCurrentScrollOffset();

        this.setState({
          scrollable: true,
          scrollablePrev: _currentOffset,
          scrollableNext: _currentOffset + containerWidth < navWidth
        });

        if (navWidth - _currentOffset < containerWidth) {
          this.setOffset(navWidth - containerWidth);
        }
      } else {
        this.setState({
          scrollable: false
        });

        if (currentOffset > 0) {
          this.setOffset(0);
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;

      var _this$state2 = this.state,
          children = _this$state2.children,
          currentName = _this$state2.currentName,
          barStyle = _this$state2.barStyle,
          navStyle = _this$state2.navStyle,
          scrollable = _this$state2.scrollable,
          scrollNext = _this$state2.scrollNext,
          scrollPrev = _this$state2.scrollPrev;
      var _this$props3 = this.props,
          type = _this$props3.type,
          addable = _this$props3.addable,
          closable = _this$props3.closable,
          editable = _this$props3.editable;
      var tabsCls = this.classNames({
        'el-tabs': true,
        'el-tabs--card': type === 'card',
        'el-tabs--border-card': type === 'border-card'
      });
      var addButton = editable || addable ? /*#__PURE__*/_react["default"].createElement("span", {
        className: "el-tabs__new-tab",
        onClick: function onClick() {
          return _this5.handleTabAdd();
        }
      }, /*#__PURE__*/_react["default"].createElement("i", {
        className: "el-icon-plus"
      })) : null;
      var scrollBtn = scrollable ? [/*#__PURE__*/_react["default"].createElement("span", {
        key: "el-tabs__nav-prev",
        className: scrollPrev ? 'el-tabs__nav-prev' : 'el-tabs__nav-prev is-disabled',
        onClick: function onClick() {
          return _this5.scrollPrev();
        }
      }, /*#__PURE__*/_react["default"].createElement("i", {
        className: "el-icon-arrow-left"
      })), /*#__PURE__*/_react["default"].createElement("span", {
        key: "el-tabs__nav-next",
        className: scrollNext ? 'el-tabs__nav-next' : 'el-tabs__nav-next is-disabled',
        onClick: function onClick() {
          return _this5.scrollNext();
        }
      }, /*#__PURE__*/_react["default"].createElement("i", {
        className: "el-icon-arrow-right"
      }))] : null;
      this.tabs = [];
      return /*#__PURE__*/_react["default"].createElement("div", {
        style: this.style(),
        className: this.className(tabsCls)
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "el-tabs__header"
      }, addButton, /*#__PURE__*/_react["default"].createElement("div", {
        className: scrollable ? 'el-tabs__nav-wrap is-scrollable' : 'el-tabs__nav-wrap'
      }, scrollBtn, /*#__PURE__*/_react["default"].createElement("div", {
        className: "el-tabs__nav-scroll",
        ref: "navScroll"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "el-tabs__nav",
        ref: "nav",
        style: navStyle
      }, _react["default"].Children.map(children, function (item, index) {
        var _item$props = item.props,
            name = _item$props.name,
            label = _item$props.label,
            disabled = _item$props.disabled;

        var tabCls = _this5.classNames({
          'el-tabs__item': true,
          'is-active': name === currentName,
          'is-disabled': disabled,
          'is-closable': closable || item.props.closable
        });

        return /*#__PURE__*/_react["default"].createElement("div", {
          key: "el-tabs__item-".concat(index),
          ref: function ref(tab) {
            return tab && _this5.tabs.push(tab);
          },
          name: name,
          className: tabCls,
          onClick: function onClick(e) {
            return _this5.handleTabClick(item, e);
          }
        }, label, /*#__PURE__*/_react["default"].createElement(_libs.View, {
          show: editable || closable || item.props.closable
        }, /*#__PURE__*/_react["default"].createElement("span", {
          className: "el-icon-close",
          onClick: function onClick(e) {
            return _this5.handleTabRemove(item, index, e);
          }
        })));
      }), /*#__PURE__*/_react["default"].createElement(_libs.View, {
        show: !type
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "el-tabs__active-bar",
        style: barStyle
      })))))), /*#__PURE__*/_react["default"].createElement("div", {
        className: "el-tabs__content"
      }, _react["default"].Children.map(children, function (item) {
        var name = item.props.name; // let transitionName = '';
        //
        // if (name === currentName) {
        //   transitionName = 'slideInRight';
        // }

        return /*#__PURE__*/_react["default"].createElement(_libs.View, {
          show: name === currentName
        }, item);
      })));
    }
  }]);

  return Tabs;
}(_libs.Component);

exports["default"] = Tabs;
Tabs.propTypes = {
  type: _libs.PropTypes.oneOf(['card', 'border-card']),
  activeName: _libs.PropTypes.string,
  value: _libs.PropTypes.string,
  closable: _libs.PropTypes.bool,
  addable: _libs.PropTypes.bool,
  editable: _libs.PropTypes.bool,
  onTabClick: _libs.PropTypes.func,
  onTabRemove: _libs.PropTypes.func,
  onTabAdd: _libs.PropTypes.func,
  onTabEdit: _libs.PropTypes.func
};
Tabs.defaultProps = {
  closable: false,
  addable: false,
  edidable: false
};