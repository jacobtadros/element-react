"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _libs = require("../../libs");

var _utils = require("../table/utils");

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

var Dialog = /*#__PURE__*/function (_Component) {
  _inherits(Dialog, _Component);

  var _super = _createSuper(Dialog);

  function Dialog(props) {
    var _this;

    _classCallCheck(this, Dialog);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "state", void 0);

    _this.wrap = /*#__PURE__*/_react["default"].createRef();
    _this.state = {
      bodyOverflow: ''
    };
    return _this;
  }

  _createClass(Dialog, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var bodyOverflow = this.state.bodyOverflow;
      var _this$props = this.props,
          lockScroll = _this$props.lockScroll,
          modal = _this$props.modal;

      if (this.willOpen(this.props, nextProps)) {
        (0, _utils.cleanScrollBar)();

        if (lockScroll && document.body && document.body.style) {
          if (!bodyOverflow) {
            this.setState({
              bodyOverflow: document.body.style.overflow
            });
          }

          document.body.style.overflow = 'hidden';
        }
      }

      if (this.willClose(this.props, nextProps) && lockScroll) {
        if (modal && bodyOverflow !== 'hidden' && document.body && document.body.style) {
          document.body.style.overflow = bodyOverflow;
        }
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (this.willOpen(prevProps, this.props)) {
        this.wrap.current.focus();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var lockScroll = this.props.lockScroll;

      if (lockScroll && document.body && document.body.style) {
        document.body.style.removeProperty('overflow');
      }
    }
  }, {
    key: "onKeyDown",
    value: function onKeyDown(e) {
      var closeOnPressEscape = this.props.closeOnPressEscape;

      if (closeOnPressEscape && e.keyCode === 27) {
        this.close(e);
      }
    }
  }, {
    key: "handleWrapperClick",
    value: function handleWrapperClick(e) {
      var closeOnClickModal = this.props.closeOnClickModal;

      if (e.target instanceof HTMLDivElement) {
        if (closeOnClickModal && e.target === e.currentTarget) {
          this.close(e);
        }
      }
    }
  }, {
    key: "close",
    value: function close(e) {
      this.props.onCancel(e);
    }
  }, {
    key: "willOpen",
    value: function willOpen(prevProps, nextProps) {
      return !prevProps.visible && nextProps.visible;
    }
  }, {
    key: "willClose",
    value: function willClose(prevProps, nextProps) {
      return prevProps.visible && !nextProps.visible;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props2 = this.props,
          visible = _this$props2.visible,
          title = _this$props2.title,
          size = _this$props2.size,
          top = _this$props2.top,
          modal = _this$props2.modal,
          customClass = _this$props2.customClass,
          showClose = _this$props2.showClose,
          children = _this$props2.children;
      return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_libs.Transition, {
        name: "dialog-fade"
      }, /*#__PURE__*/_react["default"].createElement(_libs.View, {
        show: visible
      }, /*#__PURE__*/_react["default"].createElement("div", {
        ref: this.wrap,
        style: {
          zIndex: 1013
        },
        className: this.classNames('el-dialog__wrapper'),
        onClick: function onClick(e) {
          return _this2.handleWrapperClick(e);
        },
        onKeyDown: function onKeyDown(e) {
          return _this2.onKeyDown(e);
        }
      }, /*#__PURE__*/_react["default"].createElement("div", {
        ref: "dialog",
        style: this.style(size === 'full' ? {} : {
          'top': top
        }),
        className: this.className("el-dialog", "el-dialog--".concat(size), customClass)
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "el-dialog__header"
      }, /*#__PURE__*/_react["default"].createElement("span", {
        className: "el-dialog__title"
      }, title), showClose && /*#__PURE__*/_react["default"].createElement("button", {
        type: "button",
        className: "el-dialog__headerbtn",
        onClick: function onClick(e) {
          return _this2.close(e);
        }
      }, /*#__PURE__*/_react["default"].createElement("i", {
        className: "el-dialog__close el-icon el-icon-close"
      }))), children)))), modal && /*#__PURE__*/_react["default"].createElement(_libs.View, {
        show: visible
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "v-modal",
        style: {
          zIndex: 1012
        }
      })));
    }
  }]);

  return Dialog;
}(_libs.Component);

exports["default"] = Dialog;

_defineProperty(Dialog, "defaultProps", {
  visible: false,
  title: '',
  size: 'small',
  top: '15%',
  modal: true,
  lockScroll: true,
  closeOnClickModal: true,
  closeOnPressEscape: true,
  showClose: true
});

Dialog.propTypes = {
  // 控制对话框是否可见
  visible: _libs.PropTypes.bool.isRequired,
  // 标题
  title: _libs.PropTypes.string,
  // 大小 (tiny/small/large/full)
  size: _libs.PropTypes.string,
  // top 值（仅在 size 不为 full 时有效）
  top: _libs.PropTypes.string,
  // 控制遮罩层展示
  modal: _libs.PropTypes.bool,
  // Dialog 的自定义类名
  customClass: _libs.PropTypes.string,
  // 是否在 Dialog 出现时将 body 滚动锁定
  lockScroll: _libs.PropTypes.bool,
  // 是否可以通过点击 modal 关闭 Dialog
  closeOnClickModal: _libs.PropTypes.bool,
  // 是否可以通过按下 ESC 关闭 Dialog
  closeOnPressEscape: _libs.PropTypes.bool,
  // 点击遮罩层或右上角叉或取消按钮的回调
  onCancel: _libs.PropTypes.func.isRequired,
  showClose: _libs.PropTypes.bool
};