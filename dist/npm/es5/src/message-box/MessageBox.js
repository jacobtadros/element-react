"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _libs = require("../../libs");

var _utils = require("../table/utils");

var _button = _interopRequireDefault(require("../button"));

var _input = _interopRequireDefault(require("../input"));

var _locale = _interopRequireDefault(require("../locale"));

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

var typeMap = {
  success: 'circle-check',
  info: 'information',
  warning: 'warning',
  error: 'circle-cross'
};

var MessageBox = /*#__PURE__*/function (_Component) {
  _inherits(MessageBox, _Component);

  var _super = _createSuper(MessageBox);

  function MessageBox(props) {
    var _this;

    _classCallCheck(this, MessageBox);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "state", void 0);

    _this.state = {
      visible: false,
      inputValue: props.inputValue
    };
    return _this;
  }

  _createClass(MessageBox, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      (0, _utils.cleanScrollBar)();
      this.setState({
        visible: true
      });
      document.activeElement && document.activeElement.blur();
    }
  }, {
    key: "confirmButtonText",
    value: function confirmButtonText() {
      return this.props.confirmButtonText || _locale["default"].t('el.messagebox.confirm');
    }
  }, {
    key: "cancelButtonText",
    value: function cancelButtonText() {
      return this.props.cancelButtonText || _locale["default"].t('el.messagebox.cancel');
    }
  }, {
    key: "onChange",
    value: function onChange(value) {
      this.setState({
        inputValue: value
      });
      this.validate(value);
    }
  }, {
    key: "typeClass",
    value: function typeClass() {
      return this.props.type && typeMap[this.props.type] && "el-icon-".concat(typeMap[this.props.type]);
    }
  }, {
    key: "validate",
    value: function validate(value) {
      var _this$props = this.props,
          inputPattern = _this$props.inputPattern,
          inputValidator = _this$props.inputValidator,
          inputErrorMessage = _this$props.inputErrorMessage;
      var editorErrorMessage;

      if (inputPattern && !inputPattern.test(value)) {
        editorErrorMessage = inputErrorMessage || _locale["default"].t('el.messagebox.error');
      }

      if (typeof inputValidator === 'function') {
        var validateResult = inputValidator(value);

        if (validateResult === false) {
          editorErrorMessage = inputErrorMessage || _locale["default"].t('el.messagebox.error');
        }

        if (typeof validateResult === 'string') {
          editorErrorMessage = validateResult;
        }
      }

      this.setState({
        editorErrorMessage: editorErrorMessage
      });
      return !editorErrorMessage;
    }
  }, {
    key: "handleAction",
    value: function handleAction(action) {
      var _this$props2 = this.props,
          modal = _this$props2.modal,
          promise = _this$props2.promise,
          showInput = _this$props2.showInput;

      if (modal) {
        switch (action) {
          case 'cancel':
            promise.reject();
            break;

          case 'confirm':
            if (modal === 'prompt') {
              if (this.validate(this.state.inputValue || '')) {
                if (showInput) {
                  promise.resolve({
                    value: this.state.inputValue,
                    action: action
                  });
                } else {
                  promise.resolve(action);
                }
              } else {
                return;
              }
            } else {
              promise.resolve();
            }

            break;

          default:
            break;
        }
      } else {
        promise.resolve(action);
      }

      this.close();
    }
  }, {
    key: "close",
    value: function close() {
      this.setState({
        visible: false
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          willUnmount = _this$props3.willUnmount,
          title = _this$props3.title,
          showClose = _this$props3.showClose,
          message = _this$props3.message,
          showInput = _this$props3.showInput,
          inputPlaceholder = _this$props3.inputPlaceholder,
          showCancelButton = _this$props3.showCancelButton,
          cancelButtonClass = _this$props3.cancelButtonClass,
          showConfirmButton = _this$props3.showConfirmButton,
          confirmButtonClass = _this$props3.confirmButtonClass,
          customClass = _this$props3.customClass,
          inputType = _this$props3.inputType;
      var _this$state = this.state,
          visible = _this$state.visible,
          editorErrorMessage = _this$state.editorErrorMessage;
      return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", {
        style: {
          position: 'absolute',
          zIndex: 2001
        }
      }, /*#__PURE__*/_react["default"].createElement(_libs.Transition, {
        name: "msgbox-fade",
        onAfterLeave: function onAfterLeave() {
          willUnmount && willUnmount();
        }
      }, /*#__PURE__*/_react["default"].createElement(_libs.View, {
        show: visible
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: this.classNames('el-message-box__wrapper', customClass)
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "el-message-box"
      }, title && /*#__PURE__*/_react["default"].createElement("div", {
        className: "el-message-box__header"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "el-message-box__title"
      }, title), showClose && /*#__PURE__*/_react["default"].createElement("button", {
        type: "button",
        className: "el-message-box__headerbtn",
        "aria-label": "Close",
        onClick: this.handleAction.bind(this, 'cancel')
      }, /*#__PURE__*/_react["default"].createElement("i", {
        className: "el-message-box__close el-icon-close"
      }))), message && /*#__PURE__*/_react["default"].createElement("div", {
        className: "el-message-box__content"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: this.classNames('el-message-box__status', this.typeClass())
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: "el-message-box__message",
        style: {
          marginLeft: this.typeClass() ? '50px' : '0'
        }
      }, /*#__PURE__*/_react["default"].createElement("div", null, message)), /*#__PURE__*/_react["default"].createElement(_libs.View, {
        show: showInput
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "el-message-box__input"
      }, /*#__PURE__*/_react["default"].createElement(_input["default"], {
        className: this.classNames({
          'invalid': editorErrorMessage
        }),
        type: inputType,
        value: this.state.inputValue,
        placeholder: inputPlaceholder,
        onChange: this.onChange.bind(this)
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: "el-message-box__errormsg",
        style: {
          visibility: editorErrorMessage ? 'visible' : 'hidden'
        }
      }, editorErrorMessage)))), /*#__PURE__*/_react["default"].createElement("div", {
        className: "el-message-box__btns"
      }, /*#__PURE__*/_react["default"].createElement(_libs.View, {
        show: showCancelButton
      }, /*#__PURE__*/_react["default"].createElement(_button["default"], {
        className: cancelButtonClass,
        onClick: this.handleAction.bind(this, 'cancel')
      }, this.cancelButtonText())), /*#__PURE__*/_react["default"].createElement(_libs.View, {
        show: showConfirmButton
      }, /*#__PURE__*/_react["default"].createElement(_button["default"], {
        className: this.classNames('el-button--primary', confirmButtonClass),
        onClick: this.handleAction.bind(this, 'confirm')
      }, this.confirmButtonText())))))))), /*#__PURE__*/_react["default"].createElement(_libs.Transition, {
        name: "v-modal"
      }, /*#__PURE__*/_react["default"].createElement(_libs.View, {
        show: visible
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "v-modal",
        style: {
          zIndex: 1006
        }
      }))));
    }
  }]);

  return MessageBox;
}(_libs.Component);

exports["default"] = MessageBox;
MessageBox.propTypes = {
  modal: _libs.PropTypes.oneOf(['alert', 'confirm', 'prompt']),
  type: _libs.PropTypes.oneOf(['success', 'warning', 'info', 'error']),
  title: _libs.PropTypes.string,
  message: _libs.PropTypes.oneOfType([_libs.PropTypes.string, _libs.PropTypes.element]),
  showInput: _libs.PropTypes.bool,
  showClose: _libs.PropTypes.bool,
  showCancelButton: _libs.PropTypes.bool,
  showConfirmButton: _libs.PropTypes.bool,
  confirmButtonText: _libs.PropTypes.string,
  cancelButtonText: _libs.PropTypes.string,
  cancelButtonClass: _libs.PropTypes.string,
  confirmButtonClass: _libs.PropTypes.string,
  customClass: _libs.PropTypes.string,
  inputPlaceholder: _libs.PropTypes.string,
  inputPattern: _libs.PropTypes.regex,
  inputValidator: _libs.PropTypes.func,
  inputErrorMessage: _libs.PropTypes.string,
  inputValue: _libs.PropTypes.any,
  inputType: _libs.PropTypes.string,
  promise: _libs.PropTypes.object,
  onClose: _libs.PropTypes.func
};
MessageBox.defaultProps = {
  title: '提示',
  showInput: false,
  showClose: true,
  showCancelButton: false,
  showConfirmButton: true
};