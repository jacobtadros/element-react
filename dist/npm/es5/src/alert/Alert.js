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

var TYPE_CLASSES_MAP = {
  'success': 'el-icon-circle-check',
  'warning': 'el-icon-warning',
  'error': 'el-icon-circle-cross'
};

var Alert = /*#__PURE__*/function (_Component) {
  _inherits(Alert, _Component);

  var _super = _createSuper(Alert);

  function Alert(props) {
    var _this;

    _classCallCheck(this, Alert);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "state", void 0);

    _this.state = {
      visible: true
    };
    return _this;
  }

  _createClass(Alert, [{
    key: "close",
    value: function close() {
      this.setState({
        visible: false
      });
    }
  }, {
    key: "onAfterLeave",
    value: function onAfterLeave() {
      if (this.props.onClose) {
        this.props.onClose();
      }
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react["default"].createElement(_libs.Transition, {
        name: "el-alert-fade",
        onAfterLeave: this.onAfterLeave.bind(this)
      }, /*#__PURE__*/_react["default"].createElement(_libs.View, {
        show: this.state.visible
      }, /*#__PURE__*/_react["default"].createElement("div", {
        style: this.style(),
        className: this.className('el-alert', "el-alert--".concat(this.props.type))
      }, this.props.showIcon && /*#__PURE__*/_react["default"].createElement("i", {
        className: this.classNames('el-alert__icon', TYPE_CLASSES_MAP[this.props.type] || 'el-icon-information', {
          'is-big': this.props.description
        })
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: "el-alert__content"
      }, this.props.title && /*#__PURE__*/_react["default"].createElement("span", {
        className: this.classNames('el-alert__title', {
          'is-bold': this.props.description
        })
      }, this.props.title), this.props.description && /*#__PURE__*/_react["default"].createElement("p", {
        className: "el-alert__description"
      }, this.props.description), /*#__PURE__*/_react["default"].createElement(_libs.View, {
        show: this.props.closable
      }, /*#__PURE__*/_react["default"].createElement("i", {
        className: this.classNames('el-alert__closebtn', this.props.closeText ? 'is-customed' : 'el-icon-close'),
        onClick: this.close.bind(this)
      }, this.props.closeText))))));
    }
  }]);

  return Alert;
}(_libs.Component);

exports["default"] = Alert;
Alert.propTypes = {
  onClose: _libs.PropTypes.func,
  title: _libs.PropTypes.string.isRequired,
  description: _libs.PropTypes.string,
  type: _libs.PropTypes.string,
  closable: _libs.PropTypes.bool,
  closeText: _libs.PropTypes.string,
  showIcon: _libs.PropTypes.bool
};
Alert.defaultProps = {
  type: 'info',
  closable: true
};