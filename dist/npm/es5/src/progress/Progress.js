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

var Progress = /*#__PURE__*/function (_Component) {
  _inherits(Progress, _Component);

  var _super = _createSuper(Progress);

  function Progress(props) {
    _classCallCheck(this, Progress);

    return _super.call(this, props);
  }

  _createClass(Progress, [{
    key: "relativeStrokeWidth",
    value: function relativeStrokeWidth() {
      var _this$props = this.props,
          strokeWidth = _this$props.strokeWidth,
          width = _this$props.width;
      return (strokeWidth / width * 100).toFixed(1);
    }
  }, {
    key: "trackPath",
    value: function trackPath() {
      var radius = parseInt(50 - parseFloat(this.relativeStrokeWidth()) / 2, 10);
      return "M 50 50 m 0 -".concat(radius, " a ").concat(radius, " ").concat(radius, " 0 1 1 0 ").concat(radius * 2, " a ").concat(radius, " ").concat(radius, " 0 1 1 0 -").concat(radius * 2);
    }
  }, {
    key: "perimeter",
    value: function perimeter() {
      var radius = 50 - parseFloat(this.relativeStrokeWidth()) / 2;
      return 2 * Math.PI * radius;
    }
  }, {
    key: "circlePathStyle",
    value: function circlePathStyle() {
      var perimeter = this.perimeter();
      return {
        strokeDasharray: "".concat(perimeter, "px,").concat(perimeter, "px"),
        strokeDashoffset: (1 - this.props.percentage / 100) * perimeter + 'px',
        transition: 'stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease'
      };
    }
  }, {
    key: "stroke",
    value: function stroke() {
      var ret;

      switch (this.props.status) {
        case 'success':
          ret = '#13ce66';
          break;

        case 'exception':
          ret = '#ff4949';
          break;

        default:
          ret = '#20a0ff';
      }

      return ret;
    }
  }, {
    key: "iconClass",
    value: function iconClass() {
      var _this$props2 = this.props,
          type = _this$props2.type,
          status = _this$props2.status;
      return type === 'line' ? status === 'success' ? 'el-icon-circle-check' : 'el-icon-circle-cross' : status === 'success' ? 'el-icon-check' : 'el-icon-close';
    }
  }, {
    key: "progressTextSize",
    value: function progressTextSize() {
      var _this$props3 = this.props,
          type = _this$props3.type,
          strokeWidth = _this$props3.strokeWidth,
          width = _this$props3.width;
      return type === 'line' ? 12 + strokeWidth * 0.4 : width * 0.111111 + 2;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$className;

      var _this$props4 = this.props,
          type = _this$props4.type,
          percentage = _this$props4.percentage,
          status = _this$props4.status,
          strokeWidth = _this$props4.strokeWidth,
          textInside = _this$props4.textInside,
          width = _this$props4.width,
          showText = _this$props4.showText;
      var progress;

      if (type === 'line') {
        progress = /*#__PURE__*/_react["default"].createElement("div", {
          className: "el-progress-bar"
        }, /*#__PURE__*/_react["default"].createElement("div", {
          className: "el-progress-bar__outer",
          style: {
            height: "".concat(strokeWidth, "px")
          }
        }, /*#__PURE__*/_react["default"].createElement("div", {
          className: "el-progress-bar__inner",
          style: {
            width: "".concat(percentage, "%")
          }
        }, showText && textInside && /*#__PURE__*/_react["default"].createElement("div", {
          className: "el-progress-bar__innerText"
        }, "".concat(percentage, "%")))));
      } else {
        progress = /*#__PURE__*/_react["default"].createElement("div", {
          className: "el-progress-circle",
          style: {
            height: "".concat(width, "px"),
            width: "".concat(width, "px")
          }
        }, /*#__PURE__*/_react["default"].createElement("svg", {
          viewBox: "0 0 100 100"
        }, /*#__PURE__*/_react["default"].createElement("path", {
          className: "el-progress-circle__track",
          d: this.trackPath(),
          stroke: "#e5e9f2",
          strokeWidth: this.relativeStrokeWidth(),
          fill: "none"
        }), /*#__PURE__*/_react["default"].createElement("path", {
          className: "el-progress-circle__path",
          d: this.trackPath(),
          strokeLinecap: "round",
          stroke: this.stroke(),
          strokeWidth: this.relativeStrokeWidth(),
          fill: "none",
          style: this.circlePathStyle()
        })));
      }

      var progressInfo = showText && !textInside && /*#__PURE__*/_react["default"].createElement("div", {
        className: "el-progress__text",
        style: {
          fontSize: "".concat(this.progressTextSize(), "px")
        }
      }, status ? /*#__PURE__*/_react["default"].createElement("i", {
        className: this.iconClass()
      }) : "".concat(percentage, "%"));

      return /*#__PURE__*/_react["default"].createElement("div", {
        style: this.style(),
        className: this.className('el-progress', "el-progress--".concat(type), (_this$className = {}, _defineProperty(_this$className, "is-".concat(status), !!status), _defineProperty(_this$className, 'el-progress--without-text', !showText), _defineProperty(_this$className, 'el-progress--text-inside', textInside), _this$className))
      }, progress, progressInfo);
    }
  }]);

  return Progress;
}(_libs.Component);

exports["default"] = Progress;

_defineProperty(Progress, "defaultProps", {
  type: 'line',
  percentage: 0,
  strokeWidth: 6,
  width: 126,
  showText: true,
  textInside: false
});

Progress.propTypes = {
  type: _libs.PropTypes.oneOf(['line', 'circle']),
  percentage: _libs.PropTypes.range(0, 100).isRequired,
  status: _libs.PropTypes.string,
  strokeWidth: _libs.PropTypes.number,
  width: _libs.PropTypes.number,
  textInside: _libs.PropTypes.bool,
  showText: _libs.PropTypes.bool
};