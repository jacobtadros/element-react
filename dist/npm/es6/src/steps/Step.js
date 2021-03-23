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

var Step = /*#__PURE__*/function (_Component) {
  _inherits(Step, _Component);

  var _super = _createSuper(Step);

  function Step(props) {
    _classCallCheck(this, Step);

    return _super.call(this, props);
  }

  _createClass(Step, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          title = _this$props.title,
          icon = _this$props.icon,
          description = _this$props.description,
          status = _this$props.status,
          direction = _this$props.direction,
          style = _this$props.style,
          lineStyle = _this$props.lineStyle,
          stepNumber = _this$props.stepNumber;
      var directionClass = "is-".concat(direction);
      var statusClass = "is-".concat(status);
      var iconNode = icon ? /*#__PURE__*/_react["default"].createElement("i", {
        className: "el-icon-".concat(icon)
      }) : /*#__PURE__*/_react["default"].createElement("div", null, stepNumber);
      return /*#__PURE__*/_react["default"].createElement("div", {
        style: this.style(style),
        className: this.className('el-step', directionClass)
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: this.classNames('el-step__head', statusClass, {
          'is-text': !icon
        })
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: this.classNames('el-step__line', directionClass, {
          'is-icon': icon
        })
      }, /*#__PURE__*/_react["default"].createElement("i", {
        className: "el-step__line-inner",
        style: lineStyle
      })), /*#__PURE__*/_react["default"].createElement("span", {
        className: "el-step__icon"
      }, status !== 'success' && status !== 'error' ? iconNode : /*#__PURE__*/_react["default"].createElement("i", {
        className: 'el-icon-' + (status === 'success' ? 'check' : 'close')
      }))), /*#__PURE__*/_react["default"].createElement("div", {
        className: "el-step__main"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        ref: "title",
        className: this.classNames('el-step__title', statusClass)
      }, title), /*#__PURE__*/_react["default"].createElement("div", {
        className: this.classNames('el-step__description', statusClass)
      }, description)));
    }
  }]);

  return Step;
}(_libs.Component);

exports["default"] = Step;

_defineProperty(Step, "defaultProps", {
  status: 'wait'
});

Step.propTypes = {
  title: _libs.PropTypes.string,
  icon: _libs.PropTypes.string,
  description: _libs.PropTypes.oneOfType([_libs.PropTypes.string, _libs.PropTypes.node]),
  status: _libs.PropTypes.string,
  direction: _libs.PropTypes.string,
  style: _libs.PropTypes.object,
  lineStyle: _libs.PropTypes.object,
  stepNumber: _libs.PropTypes.number
};