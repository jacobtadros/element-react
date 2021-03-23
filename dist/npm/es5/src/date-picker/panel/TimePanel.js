"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _libs = require("../../../libs");

var _utils = require("../utils");

var _TimeSpinner = _interopRequireDefault(require("../basic/TimeSpinner"));

var _locale = _interopRequireDefault(require("../../locale"));

var _PopperBase2 = require("./PopperBase");

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

var mapPropsToState = function mapPropsToState(props) {
  var state = {
    format: props.format || 'HH:mm:ss',
    currentDate: props.currentDate || new Date()
  };
  state.isShowSeconds = (state.format || '').indexOf('ss') !== -1;
  return state;
};

var TimePanel = /*#__PURE__*/function (_PopperBase) {
  _inherits(TimePanel, _PopperBase);

  var _super = _createSuper(TimePanel);

  function TimePanel(props) {
    var _this;

    _classCallCheck(this, TimePanel);

    _this = _super.call(this, props);
    _this.state = mapPropsToState(props);
    return _this;
  }

  _createClass(TimePanel, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      this.setState(mapPropsToState(nextProps));
    } // type: string,  one of [hours, minutes, seconds]
    // date: {type: number}

  }, {
    key: "handleChange",
    value: function handleChange(date) {
      var currentDate = this.state.currentDate;

      if (date.hours !== undefined) {
        currentDate.setHours(date.hours);
      }

      if (date.minutes !== undefined) {
        currentDate.setMinutes(date.minutes);
      }

      if (date.seconds !== undefined) {
        currentDate.setSeconds(date.seconds);
      }

      this.setState({});
      this.handleConfirm(true);
    }
  }, {
    key: "handleConfirm",
    value: function handleConfirm() {
      var isKeepPannelOpen = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var currentDate = this.state.currentDate;
      var _this$props = this.props,
          onPicked = _this$props.onPicked,
          selectableRange = _this$props.selectableRange;
      var date = new Date((0, _utils.limitRange)(currentDate, selectableRange, 'HH:mm:ss'));
      onPicked(date, isKeepPannelOpen);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state = this.state,
          isShowSeconds = _this$state.isShowSeconds,
          currentDate = _this$state.currentDate;
      var _this$props2 = this.props,
          onSelectRangeChange = _this$props2.onSelectRangeChange,
          selectableRange = _this$props2.selectableRange;
      var hours = currentDate.getHours();
      var minutes = currentDate.getMinutes();
      var seconds = currentDate.getSeconds();
      var $t = _locale["default"].t;
      return /*#__PURE__*/_react["default"].createElement("div", {
        ref: "root",
        className: "el-time-panel"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: this.classNames('el-time-panel__content', {
          'has-seconds': isShowSeconds
        })
      }, /*#__PURE__*/_react["default"].createElement(_TimeSpinner["default"], {
        ref: "spinner",
        onChange: this.handleChange.bind(this),
        isShowSeconds: isShowSeconds,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
        selectableRange: selectableRange,
        onSelectRangeChange: onSelectRangeChange
      })), /*#__PURE__*/_react["default"].createElement("div", {
        className: "el-time-panel__footer"
      }, /*#__PURE__*/_react["default"].createElement("button", {
        type: "button",
        className: "el-time-panel__btn cancel",
        onClick: function onClick() {
          return _this2.props.onCancel();
        }
      }, $t('el.datepicker.cancel')), /*#__PURE__*/_react["default"].createElement("button", {
        type: "button",
        className: "el-time-panel__btn confirm",
        onClick: function onClick() {
          return _this2.handleConfirm();
        }
      }, $t('el.datepicker.confirm'))));
    }
  }], [{
    key: "propTypes",
    get: function get() {
      return Object.assign({}, {
        selectableRange: _TimeSpinner["default"].propTypes.selectableRange,
        onSelectRangeChange: _TimeSpinner["default"].propTypes.onSelectRangeChange
      }, {
        pickerWidth: _libs.PropTypes.number,
        currentDate: _libs.PropTypes.instanceOf(Date),

        /*
        onPicked: (value, isKeepPannelOpen)=>()
         @param value: Date|null
        @param isKeepPannelOpen:boolean, should parent close the pannel
        */
        onPicked: _libs.PropTypes.func.isRequired,
        // cancel btn is clicked
        //()=>()
        onCancel: _libs.PropTypes.func.isRequired
      }, _PopperBase2.PopperBase.propTypes);
    }
  }, {
    key: "defaultProps",
    get: function get() {
      return {
        popperMixinOption: {}
      };
    }
  }]);

  return TimePanel;
}(_PopperBase2.PopperBase);

exports["default"] = TimePanel;