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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MIN_TIME = (0, _utils.parseDate)('00:00:00', 'HH:mm:ss');
var MAX_TIME = (0, _utils.parseDate)('23:59:59', 'HH:mm:ss');

var isDisabled = function isDisabled(minTime, maxTime) {
  var minValue = minTime.getHours() * 3600 + minTime.getMinutes() * 60 + minTime.getSeconds();
  var maxValue = maxTime.getHours() * 3600 + maxTime.getMinutes() * 60 + maxTime.getSeconds();
  return minValue > maxValue;
};

var calcTime = function calcTime(time) {
  time = Array.isArray(time) ? time : [time];
  var minTime = time[0] || new Date();
  var date = new Date();
  date.setHours(date.getHours() + 1);
  var maxTime = time[1] || date;
  if (minTime > maxTime) return calcTime();
  return {
    minTime: minTime,
    maxTime: maxTime
  };
};

var mapPropsToState = function mapPropsToState(props) {
  var currentDates = props.currentDates,
      format = props.format;

  var _calcTime = calcTime(currentDates),
      minTime = _calcTime.minTime,
      maxTime = _calcTime.maxTime;

  var state = {
    format: format || 'HH:mm:ss',
    minTime: minTime,
    maxTime: maxTime,
    minSelectableRange: [[MIN_TIME, maxTime]],
    maxSelectableRange: [[minTime, MAX_TIME]],
    btnDisabled: isDisabled(minTime, maxTime)
  };
  state.isShowSeconds = (state.format || '').indexOf('ss') !== -1;
  return state;
};

var TimeRangePanel = /*#__PURE__*/function (_PopperBase) {
  _inherits(TimeRangePanel, _PopperBase);

  var _super = _createSuper(TimeRangePanel);

  function TimeRangePanel(props) {
    var _this;

    _classCallCheck(this, TimeRangePanel);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "state", void 0);

    _this.state = Object.assign({
      visible: false,
      width: 0
    }, mapPropsToState(props));
    return _this;
  }

  _createClass(TimeRangePanel, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      this.setState(mapPropsToState(nextProps));
    } // type = hours | minutes | seconds
    // date: {type: number}

  }, {
    key: "handleChange",
    value: function handleChange(date, field) {
      var ndate = this.state[field];

      if (date.hours !== undefined) {
        ndate.setHours(date.hours);
      }

      if (date.minutes !== undefined) {
        ndate.setMinutes(date.minutes);
      }

      if (date.seconds !== undefined) {
        ndate.setSeconds(date.seconds);
      }

      var state = _defineProperty({}, field, ndate);

      this.setState(state);
      this.handleConfirm(true);
    }
  }, {
    key: "handleConfirm",
    value: function handleConfirm() {
      var isKeepPannelOpen = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var _this$state = this.state,
          minTime = _this$state.minTime,
          maxTime = _this$state.maxTime;
      var onPicked = this.props.onPicked;
      onPicked([minTime, maxTime], isKeepPannelOpen);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state2 = this.state,
          isShowSeconds = _this$state2.isShowSeconds,
          minTime = _this$state2.minTime,
          maxTime = _this$state2.maxTime,
          btnDisabled = _this$state2.btnDisabled,
          minSelectableRange = _this$state2.minSelectableRange,
          maxSelectableRange = _this$state2.maxSelectableRange;
      var _onSelectRangeChange = this.props.onSelectRangeChange;
      var $t = _locale["default"].t;
      var maxHours = maxTime.getHours();
      var maxMinutes = maxTime.getMinutes();
      var maxSeconds = maxTime.getSeconds();
      var minHours = minTime.getHours();
      var minMinutes = minTime.getMinutes();
      var minSeconds = minTime.getSeconds();
      return /*#__PURE__*/_react["default"].createElement("div", {
        ref: "root",
        className: "el-time-range-picker el-picker-panel",
        style: {
          minWidth: '330px'
        }
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "el-time-range-picker__content"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "el-time-range-picker__cell"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "el-time-range-picker__header"
      }, $t('el.datepicker.startTime')), /*#__PURE__*/_react["default"].createElement("div", {
        className: this.classNames('el-time-range-picker__body el-time-panel__content', {
          'has-seconds': isShowSeconds
        })
      }, /*#__PURE__*/_react["default"].createElement(_TimeSpinner["default"], {
        ref: "minSpinner",
        onChange: function onChange(date) {
          return _this2.handleChange(date, 'minTime');
        },
        isShowSeconds: isShowSeconds,
        hours: minHours,
        minutes: minMinutes,
        seconds: minSeconds,
        selectableRange: minSelectableRange,
        onSelectRangeChange: _onSelectRangeChange
      }))), /*#__PURE__*/_react["default"].createElement("div", {
        className: "el-time-range-picker__cell"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "el-time-range-picker__header"
      }, $t('el.datepicker.endTime')), /*#__PURE__*/_react["default"].createElement("div", {
        className: this.classNames('el-time-range-picker__body el-time-panel__content', {
          'has-seconds': isShowSeconds
        })
      }, /*#__PURE__*/_react["default"].createElement(_TimeSpinner["default"], {
        ref: "maxSpinner",
        onChange: function onChange(date) {
          return _this2.handleChange(date, 'maxTime');
        },
        isShowSeconds: isShowSeconds,
        hours: maxHours,
        minutes: maxMinutes,
        seconds: maxSeconds,
        selectableRange: maxSelectableRange,
        onSelectRangeChange: function onSelectRangeChange(start, end) {
          return _onSelectRangeChange(start + 11, end + 11);
        }
      })))), /*#__PURE__*/_react["default"].createElement("div", {
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
        },
        disabled: btnDisabled
      }, $t('el.datepicker.confirm'))));
    }
  }], [{
    key: "propTypes",
    get: function get() {
      return Object.assign({
        pickerWidth: _libs.PropTypes.number,
        currentDates: _libs.PropTypes.arrayOf(_libs.PropTypes.instanceOf(Date)),

        /*
        onPicked: (value, isKeepPannelOpen)=>()
         @param value: Date| Date[] |null
        @param isKeepPannelOpen:boolean, should parent close the pannel
        */
        onPicked: _libs.PropTypes.func.isRequired,
        // cancel btn is clicked
        //()=>()
        onCancel: _libs.PropTypes.func.isRequired,
        // (start, end)=>(), index range indicate which field [hours, minutes, seconds] changes
        onSelectRangeChange: _TimeSpinner["default"].propTypes.onSelectRangeChange
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

  return TimeRangePanel;
}(_PopperBase2.PopperBase);

exports["default"] = TimeRangePanel;