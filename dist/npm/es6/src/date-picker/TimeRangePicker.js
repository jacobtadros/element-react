"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _throttleDebounce = require("throttle-debounce");

var _libs = require("../../libs");

var _BasePicker2 = _interopRequireDefault(require("./BasePicker"));

var _TimeRangePanel = _interopRequireDefault(require("./panel/TimeRangePanel"));

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

var TimeRangePicker = /*#__PURE__*/function (_BasePicker) {
  _inherits(TimeRangePicker, _BasePicker);

  var _super = _createSuper(TimeRangePicker);

  function TimeRangePicker(props) {
    var _this;

    _classCallCheck(this, TimeRangePicker);

    _this = _super.call(this, props, 'timerange', {});
    _this._onSelectionChange = (0, _throttleDebounce.debounce)(200, _this.onSelectionChange.bind(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(TimeRangePicker, [{
    key: "onSelectionChange",
    value: function onSelectionChange(start, end) {
      this.refs.inputRoot.refs.input.setSelectionRange(start, end);
      this.refs.inputRoot.refs.input.focus();
    }
  }, {
    key: "getFormatSeparator",
    value: function getFormatSeparator() {
      return this.props.rangeSeparator;
    }
  }, {
    key: "pickerPanel",
    value: function pickerPanel(state, props) {
      var _this2 = this;

      return /*#__PURE__*/_react["default"].createElement(_TimeRangePanel["default"], _extends({}, props, {
        currentDates: state.value,
        onCancel: function onCancel() {
          return _this2.setState({
            pickerVisible: false
          });
        },
        onPicked: this.onPicked.bind(this),
        onSelectRangeChange: this._onSelectionChange
      }));
    }
  }], [{
    key: "propTypes",
    get: function get() {
      var result = Object.assign({}, {
        rangeSeparator: _libs.PropTypes.string
      }, _BasePicker2["default"].propTypes);
      return result;
    }
  }, {
    key: "defaultProps",
    get: function get() {
      var result = Object.assign({}, _BasePicker2["default"].defaultProps);
      return result;
    }
  }]);

  return TimeRangePicker;
}(_BasePicker2["default"]);

exports["default"] = TimeRangePicker;