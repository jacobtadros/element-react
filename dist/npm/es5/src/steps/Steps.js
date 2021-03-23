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

var Steps = /*#__PURE__*/function (_Component) {
  _inherits(Steps, _Component);

  var _super = _createSuper(Steps);

  function Steps() {
    _classCallCheck(this, Steps);

    return _super.apply(this, arguments);
  }

  _createClass(Steps, [{
    key: "calcProgress",
    value: function calcProgress(status, index) {
      var step = 100;
      var style = {};
      style.transitionDelay = 150 * index + 'ms';
      var nextStatus = this.calStatus(index + 1); // 前后状态不一致时，并且当前status为完成，statusLine的长度才为50%

      if (nextStatus !== status) {
        if (status === this.props.finishStatus) {
          step = 50;
        } else if (status === 'wait') {
          step = 0;
          style.transitionDelay = -150 * index + 'ms';
        }
      }

      this.props.direction === 'vertical' ? style.height = step + '%' : style.width = step + '%';
      return style;
    }
  }, {
    key: "calStatus",
    value: function calStatus(index) {
      var _this$props = this.props,
          active = _this$props.active,
          finishStatus = _this$props.finishStatus,
          processStatus = _this$props.processStatus;
      var status = 'wait';

      if (active > index) {
        status = finishStatus;
      } else if (active === index) {
        status = processStatus;
      }

      return status;
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      var _this$props2 = this.props,
          children = _this$props2.children,
          space = _this$props2.space,
          direction = _this$props2.direction;
      return /*#__PURE__*/_react["default"].createElement("div", {
        style: this.style(),
        className: this.className('el-steps')
      }, _react["default"].Children.map(children, function (child, index) {
        var computedSpace = space ? "".concat(space, "px") : "".concat(100 / children.length, "%");
        var style = direction === 'horizontal' ? {
          width: computedSpace
        } : {
          height: index === children.length - 1 ? 'auto' : computedSpace
        };

        var status = _this.calStatus(index);

        var lineStyle = _this.calcProgress(status, index);

        return /*#__PURE__*/_react["default"].cloneElement(child, {
          style: style,
          lineStyle: lineStyle,
          direction: direction,
          status: status,
          stepNumber: index + 1
        });
      }));
    }
  }]);

  return Steps;
}(_libs.Component);

exports["default"] = Steps;

_defineProperty(Steps, "defaultProps", {
  direction: 'horizontal',
  finishStatus: 'finish',
  processStatus: 'process',
  active: 0
});

var statusMap = ['wait', 'process', 'finish', 'error', 'success'];
Steps.propTypes = {
  space: _libs.PropTypes.number,
  active: _libs.PropTypes.number,
  direction: _libs.PropTypes.oneOf(['vertical', 'horizontal']),
  finishStatus: _libs.PropTypes.oneOf(statusMap),
  processStatus: _libs.PropTypes.oneOf(statusMap)
};