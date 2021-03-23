"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _libs = require("../../../libs");

var _locale = _interopRequireDefault(require("../../locale"));

var _input = _interopRequireDefault(require("../../input"));

var _TimePanel = _interopRequireDefault(require("./TimePanel"));

var _MountBody = require("../MountBody");

var _utils = require("../utils");

var _basic = require("../basic");

var _PopperBase2 = require("./PopperBase");

var _constants = require("../constants");

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

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _prevYear = function prevYear(date) {
  var d = (0, _utils.toDate)(date);
  d.setFullYear(date.getFullYear() - 1);
  return d;
};

var _nextYear = function nextYear(date) {
  var d = (0, _utils.toDate)(date);
  d.setFullYear(date.getFullYear() + 1);
  return d;
};

var mapPropsToState = function mapPropsToState(props) {
  var value = props.value;
  var state = {
    rangeState: {
      endDate: null,
      selecting: false
    }
  };

  if (!value) {
    state = _objectSpread(_objectSpread({}, state), {
      minDate: null,
      maxDate: null,
      date: new Date()
    });
  } else {
    if (value[0] && value[1]) {
      state.minDate = (0, _utils.toDate)(value[0]);
      state.maxDate = (0, _utils.toDate)(value[1]);
    }

    if (value[0]) {
      state.date = (0, _utils.toDate)(value[0]);
    } else {
      state.date = new Date();
    }
  }

  return state;
};

var DateRangePanel = /*#__PURE__*/function (_PopperBase) {
  _inherits(DateRangePanel, _PopperBase);

  var _super = _createSuper(DateRangePanel);

  function DateRangePanel(props) {
    var _this;

    _classCallCheck(this, DateRangePanel);

    _this = _super.call(this, props);
    _this.state = _objectSpread(_objectSpread({}, {
      minTimePickerVisible: false,
      maxTimePickerVisible: false,
      minPickerWidth: 0,
      // not used in code right now, due to some reason, for more details see comments in DatePannel that marked with todo.
      maxPickerWidth: 0
    }), mapPropsToState(props));
    return _this;
  }

  _createClass(DateRangePanel, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      this.setState(mapPropsToState(nextProps));
    }
  }, {
    key: "handleRangePick",
    value: function handleRangePick(_ref, isClose) {
      var minDate = _ref.minDate,
          maxDate = _ref.maxDate;
      var _this$props = this.props,
          isShowTime = _this$props.isShowTime,
          onPick = _this$props.onPick;
      this.setState({
        minDate: minDate,
        maxDate: maxDate
      });
      if (!isClose) return;

      if (!isShowTime) {
        onPick([minDate, maxDate], false);
      }
    }
  }, {
    key: "prevYear",
    value: function prevYear() {
      var date = this.state.date;
      this.setState({
        date: _prevYear(date)
      });
    }
  }, {
    key: "nextYear",
    value: function nextYear() {
      var date = this.state.date;
      this.setState({
        date: _nextYear(date)
      });
    }
  }, {
    key: "prevMonth",
    value: function prevMonth() {
      this.setState({
        date: (0, _utils.prevMonth)(this.state.date)
      });
    }
  }, {
    key: "nextMonth",
    value: function nextMonth() {
      this.setState({
        date: (0, _utils.nextMonth)(this.state.date)
      });
    }
  }, {
    key: "rightDate",
    get: function get() {
      return (0, _utils.nextMonth)(this.state.date);
    } //todo: wired way to do sth like this? try to come up with a better option

  }, {
    key: "handleChangeRange",
    value: function handleChangeRange(_ref2) {
      var endDate = _ref2.endDate;
      var _this$state = this.state,
          rangeState = _this$state.rangeState,
          minDate = _this$state.minDate;
      if (endDate <= minDate) endDate = null;
      rangeState.endDate = endDate;
      this.setState({
        maxDate: endDate
      });
    }
  }, {
    key: "handleShortcutClick",
    value: function handleShortcutClick(shortcut) {
      shortcut.onClick();
    }
  }, {
    key: "minVisibleDate",
    get: function get() {
      var minDate = this.state.minDate;
      return minDate ? (0, _utils.formatDate)(minDate) : '';
    }
  }, {
    key: "maxVisibleDate",
    get: function get() {
      var _this$state2 = this.state,
          maxDate = _this$state2.maxDate,
          minDate = _this$state2.minDate;
      var d = maxDate || minDate;
      return d ? (0, _utils.formatDate)(d) : '';
    }
  }, {
    key: "minVisibleTime",
    get: function get() {
      var minDate = this.state.minDate;
      return minDate ? (0, _utils.formatDate)(minDate, 'HH:mm:ss') : '';
    }
  }, {
    key: "maxVisibleTime",
    get: function get() {
      var _this$state3 = this.state,
          maxDate = _this$state3.maxDate,
          minDate = _this$state3.minDate;
      var d = maxDate || minDate;
      return d ? (0, _utils.formatDate)(d, 'HH:mm:ss') : '';
    }
  }, {
    key: "btnDisabled",
    get: function get() {
      var _this$state4 = this.state,
          minDate = _this$state4.minDate,
          maxDate = _this$state4.maxDate,
          selecting = _this$state4.rangeState.selecting;
      return !(minDate && maxDate && !selecting);
    }
  }, {
    key: "setTime",
    value: function setTime(date, value) {
      var oldDate = new Date(date.getTime());
      var hour = value.getHours();
      var minute = value.getMinutes();
      var second = value.getSeconds();
      oldDate.setHours(hour);
      oldDate.setMinutes(minute);
      oldDate.setSeconds(second);
      return new Date(oldDate.getTime());
    }
  }, {
    key: "handleMinTimePick",
    value: function handleMinTimePick(pickedDate, isKeepPanel) {
      var minDate = this.state.minDate || new Date();

      if (pickedDate) {
        minDate = this.setTime(minDate, pickedDate);
      }

      this.setState({
        minDate: minDate,
        minTimePickerVisible: isKeepPanel
      });
    }
  }, {
    key: "handleMaxTimePick",
    value: function handleMaxTimePick(pickedDate, isKeepPanel) {
      var _this$state5 = this.state,
          minDate = _this$state5.minDate,
          maxDate = _this$state5.maxDate;

      if (!maxDate) {
        var now = new Date();

        if (now >= minDate) {
          maxDate = new Date();
        }
      }

      if (maxDate && pickedDate) {
        maxDate = this.setTime(maxDate, pickedDate);
      }

      this.setState({
        maxDate: maxDate,
        maxTimePickerVisible: isKeepPanel
      });
    }
  }, {
    key: "handleDateChange",
    value: function handleDateChange(value, type) {
      var parsedValue = (0, _utils.parseDate)(value, 'yyyy-MM-dd');
      var _this$state6 = this.state,
          minDate = _this$state6.minDate,
          maxDate = _this$state6.maxDate;

      if (parsedValue) {
        var target = new Date(type === 'min' ? minDate : maxDate);

        if (target) {
          target.setFullYear(parsedValue.getFullYear());
          target.setMonth(parsedValue.getMonth(), parsedValue.getDate());
        }

        if (type === 'min') {
          if (target < maxDate) {
            this.setState({
              minDate: new Date(target.getTime())
            });
          }
        } else {
          if (target > minDate) {
            maxDate = new Date(target.getTime());

            if (minDate && minDate > maxDate) {
              minDate = null;
            }

            this.setState({
              minDate: minDate,
              maxDate: maxDate
            });
          }
        }
      }
    }
  }, {
    key: "handleTimeChange",
    value: function handleTimeChange(value, type) {
      var parsedValue = (0, _utils.parseDate)(value, 'HH:mm:ss');

      if (parsedValue) {
        var target = new Date(type === 'min' ? this.minDate : this.maxDate);

        if (target) {
          target.setHours(parsedValue.getHours());
          target.setMinutes(parsedValue.getMinutes());
          target.setSeconds(parsedValue.getSeconds());
        }

        var _this$state7 = this.state,
            minDate = _this$state7.minDate,
            maxDate = _this$state7.maxDate;

        if (type === 'min') {
          if (target < maxDate) {
            minDate = new Date(target.getTime());
          }
        } else {
          if (target > minDate) {
            maxDate = new Date(target.getTime());
          }
        }

        this.setState(_defineProperty({
          minDate: minDate,
          maxDate: maxDate
        }, "".concat(type, "TimpickerVisisble"), false));
      }
    }
  }, {
    key: "handleClear",
    value: function handleClear() {
      var onPick = this.props.onPick;
      var minDate = null,
          maxDate = null,
          date = new Date();
      this.setState({
        minDate: minDate,
        maxDate: maxDate,
        date: date
      });
      onPick([], false);
    }
  }, {
    key: "handleConfirm",
    value: function handleConfirm() {
      var _this$state8 = this.state,
          minDate = _this$state8.minDate,
          maxDate = _this$state8.maxDate;
      this.props.onPick([minDate, maxDate], false);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props2 = this.props,
          shortcuts = _this$props2.shortcuts,
          disabledDate = _this$props2.disabledDate,
          firstDayOfWeek = _this$props2.firstDayOfWeek,
          isShowTime = _this$props2.isShowTime;
      var _this$state9 = this.state,
          date = _this$state9.date,
          rangeState = _this$state9.rangeState,
          minDate = _this$state9.minDate,
          maxDate = _this$state9.maxDate,
          minTimePickerVisible = _this$state9.minTimePickerVisible,
          maxTimePickerVisible = _this$state9.maxTimePickerVisible,
          minPickerWidth = _this$state9.minPickerWidth,
          maxPickerWidth = _this$state9.maxPickerWidth;
      var rightDate = this.rightDate;
      var t = _locale["default"].t;
      var leftLabel = "".concat(date.getFullYear(), " ").concat(t('el.datepicker.year'), " ") + t("el.datepicker.month".concat(date.getMonth() + 1));
      var rightLabel = "".concat(rightDate.getFullYear(), " ").concat(t('el.datepicker.year'), " ") + t("el.datepicker.month".concat(rightDate.getMonth() + 1));
      return /*#__PURE__*/_react["default"].createElement("div", {
        ref: "root",
        className: this.classNames('el-picker-panel el-date-range-picker', {
          'has-sidebar': shortcuts,
          'has-time': isShowTime
        })
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "el-picker-panel__body-wrapper"
      }, Array.isArray(shortcuts) && /*#__PURE__*/_react["default"].createElement("div", {
        className: "el-picker-panel__sidebar"
      }, shortcuts.map(function (e, idx) {
        return /*#__PURE__*/_react["default"].createElement("button", {
          key: idx,
          type: "button",
          className: "el-picker-panel__shortcut",
          onClick: function onClick() {
            return _this2.handleShortcutClick(e);
          }
        }, e.text);
      })), /*#__PURE__*/_react["default"].createElement("div", {
        className: "el-picker-panel__body"
      }, isShowTime && /*#__PURE__*/_react["default"].createElement("div", {
        className: "el-date-range-picker__time-header"
      }, /*#__PURE__*/_react["default"].createElement("span", {
        className: "el-date-range-picker__editors-wrap"
      }, /*#__PURE__*/_react["default"].createElement("span", {
        className: "el-date-range-picker__time-picker-wrap"
      }, /*#__PURE__*/_react["default"].createElement(_input["default"], {
        size: "small",
        ref: "minInput",
        placeholder: _locale["default"].t('el.datepicker.startDate'),
        className: "el-date-range-picker__editor",
        value: this.minVisibleDate,
        onChange: function onChange(value) {
          return _this2.handleDateChange(value, 'min');
        }
      })), /*#__PURE__*/_react["default"].createElement("span", {
        className: "el-date-range-picker__time-picker-wrap"
      }, /*#__PURE__*/_react["default"].createElement(_input["default"], {
        size: "small",
        ref: "timeIptStart",
        placeholder: _locale["default"].t('el.datepicker.startTime'),
        className: "el-date-range-picker__editor",
        value: this.minVisibleTime,
        onFocus: function onFocus() {
          _this2.setState({
            minTimePickerVisible: !minTimePickerVisible
          });
        },
        onChange: function onChange(value) {
          return _this2.handleTimeChange(value, 'min');
        }
      }), minTimePickerVisible && /*#__PURE__*/_react["default"].createElement(_MountBody.MountBody, null, /*#__PURE__*/_react["default"].createElement(_TimePanel["default"], {
        pickerWidth: minPickerWidth,
        ref: "minTimePicker",
        currentDate: minDate,
        onPicked: this.handleMinTimePick.bind(this),
        getPopperRefElement: function getPopperRefElement() {
          return _reactDom["default"].findDOMNode(_this2.refs.timeIptStart);
        },
        popperMixinOption: {
          placement: _constants.PLACEMENT_MAP[this.props.align] || _constants.PLACEMENT_MAP.left
        },
        onCancel: function onCancel() {
          return _this2.setState({
            minTimePickerVisible: false
          });
        }
      })))), /*#__PURE__*/_react["default"].createElement("span", {
        className: "el-icon-arrow-right"
      }), /*#__PURE__*/_react["default"].createElement("span", {
        className: "el-date-range-picker__editors-wrap is-right"
      }, /*#__PURE__*/_react["default"].createElement("span", {
        className: "el-date-range-picker__time-picker-wrap"
      }, /*#__PURE__*/_react["default"].createElement(_input["default"], {
        size: "small",
        placeholder: _locale["default"].t('el.datepicker.endDate'),
        className: "el-date-range-picker__editor",
        value: this.maxVisibleDate,
        readOnly: !minDate,
        onChange: function onChange(value) {
          return _this2.handleDateInput(value, 'max');
        }
      })), /*#__PURE__*/_react["default"].createElement("span", {
        className: "el-date-range-picker__time-picker-wrap"
      }, /*#__PURE__*/_react["default"].createElement(_input["default"], {
        size: "small",
        ref: "maxInput",
        placeholder: _locale["default"].t('el.datepicker.endTime'),
        className: "el-date-range-picker__editor",
        value: this.maxVisibleTime,
        onFocus: function onFocus() {
          if (minDate) {
            _this2.setState({
              maxTimePickerVisible: !maxTimePickerVisible
            });
          }
        },
        readOnly: !minDate,
        onChange: function onChange(value) {
          return _this2.handleTimeChange(value, 'max');
        }
      }), maxTimePickerVisible && /*#__PURE__*/_react["default"].createElement(_MountBody.MountBody, null, /*#__PURE__*/_react["default"].createElement(_TimePanel["default"], {
        pickerWidth: maxPickerWidth,
        ref: "maxTimePicker",
        currentDate: maxDate,
        onPicked: this.handleMaxTimePick.bind(this),
        getPopperRefElement: function getPopperRefElement() {
          return _reactDom["default"].findDOMNode(_this2.refs.maxInput);
        },
        popperMixinOption: {
          placement: _constants.PLACEMENT_MAP[this.props.align] || _constants.PLACEMENT_MAP.left
        },
        onCancel: function onCancel() {
          return _this2.setState({
            maxTimePickerVisible: false
          });
        }
      }))))), /*#__PURE__*/_react["default"].createElement("div", {
        className: "el-picker-panel__content el-date-range-picker__content is-left"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "el-date-range-picker__header"
      }, /*#__PURE__*/_react["default"].createElement("button", {
        type: "button",
        onClick: this.prevYear.bind(this),
        className: "el-picker-panel__icon-btn el-icon-d-arrow-left"
      }), /*#__PURE__*/_react["default"].createElement("button", {
        type: "button",
        onClick: this.prevMonth.bind(this),
        className: "el-picker-panel__icon-btn el-icon-arrow-left"
      }), /*#__PURE__*/_react["default"].createElement("div", null, leftLabel)), /*#__PURE__*/_react["default"].createElement(_basic.DateTable, {
        selectionMode: _utils.SELECTION_MODES.RANGE,
        date: date,
        value: minDate,
        minDate: minDate,
        maxDate: maxDate,
        rangeState: rangeState,
        disabledDate: disabledDate,
        onChangeRange: this.handleChangeRange.bind(this),
        onPick: this.handleRangePick.bind(this),
        firstDayOfWeek: firstDayOfWeek
      })), /*#__PURE__*/_react["default"].createElement("div", {
        className: "el-picker-panel__content el-date-range-picker__content is-right"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "el-date-range-picker__header"
      }, /*#__PURE__*/_react["default"].createElement("button", {
        type: "button",
        onClick: this.nextYear.bind(this),
        className: "el-picker-panel__icon-btn el-icon-d-arrow-right"
      }), /*#__PURE__*/_react["default"].createElement("button", {
        type: "button",
        onClick: this.nextMonth.bind(this),
        className: "el-picker-panel__icon-btn el-icon-arrow-right"
      }), /*#__PURE__*/_react["default"].createElement("div", null, rightLabel)), /*#__PURE__*/_react["default"].createElement(_basic.DateTable, {
        selectionMode: _utils.SELECTION_MODES.RANGE,
        date: rightDate,
        value: maxDate,
        minDate: minDate,
        maxDate: maxDate,
        rangeState: rangeState,
        disabledDate: disabledDate,
        onChangeRange: this.handleChangeRange.bind(this),
        onPick: this.handleRangePick.bind(this),
        firstDayOfWeek: firstDayOfWeek
      })))), isShowTime && /*#__PURE__*/_react["default"].createElement("div", {
        className: "el-picker-panel__footer"
      }, /*#__PURE__*/_react["default"].createElement("a", {
        className: "el-picker-panel__link-btn",
        onClick: function onClick() {
          return _this2.handleClear();
        }
      }, _locale["default"].t('el.datepicker.clear')), /*#__PURE__*/_react["default"].createElement("button", {
        type: "button",
        className: "el-picker-panel__btn",
        onClick: function onClick() {
          return _this2.handleConfirm();
        },
        disabled: this.btnDisabled
      }, _locale["default"].t('el.datepicker.confirm'))));
    }
  }], [{
    key: "propTypes",
    get: function get() {
      return Object.assign({
        // user picked date value

        /*
        value: null | [Date, null | false]
        */
        value: _libs.PropTypes.any,
        // ([value1, value2]|null, isKeepPanel)=>()
        onPick: _libs.PropTypes.func.isRequired,
        isShowTime: _libs.PropTypes.bool,
        // Array[{text: String, onClick: (picker)=>()}]
        shortcuts: _libs.PropTypes.arrayOf(_libs.PropTypes.shape({
          text: _libs.PropTypes.string.isRequired,
          // ()=>()
          onClick: _libs.PropTypes.func.isRequired
        })),
        // (Date)=>bool, if true, disabled
        disabledDate: _libs.PropTypes.func,
        firstDayOfWeek: _libs.PropTypes.range(0, 6),
        //()=>HtmlElement
        getPopperRefElement: _libs.PropTypes.func,
        popperMixinOption: _libs.PropTypes.object
      }, _PopperBase2.PopperBase.propTypes);
    }
  }]);

  return DateRangePanel;
}(_PopperBase2.PopperBase);

exports["default"] = DateRangePanel;
DateRangePanel.defaultProps = {};