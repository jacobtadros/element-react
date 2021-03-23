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

var PICKER_VIEWS = {
  YEAR: 'year',
  MONTH: 'month',
  DATE: 'date'
};

var DatePanel = /*#__PURE__*/function (_PopperBase) {
  _inherits(DatePanel, _PopperBase);

  var _super = _createSuper(DatePanel);

  function DatePanel(props) {
    var _this;

    _classCallCheck(this, DatePanel);

    _this = _super.call(this, props);
    var currentView = PICKER_VIEWS.DATE;

    switch (props.selectionMode) {
      case _utils.SELECTION_MODES.MONTH:
        currentView = PICKER_VIEWS.MONTH;
        break;

      case _utils.SELECTION_MODES.YEAR:
        currentView = PICKER_VIEWS.YEAR;
        break;
    }

    _this.state = {
      currentView: currentView,
      timePickerVisible: false,
      pickerWidth: 0,
      date: new Date() // current view's date

    };

    if (props.value) {
      _this.state.date = new Date(props.value);
    }

    return _this;
  }

  _createClass(DatePanel, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var date = new Date();

      if (nextProps.value) {
        date = (0, _utils.toDate)(nextProps.value);
      }

      this.setState({
        date: date
      });
    }
  }, {
    key: "resetDate",
    value: function resetDate() {
      this.date = new Date(this.date);
    }
  }, {
    key: "showMonthPicker",
    value: function showMonthPicker() {
      this.setState({
        currentView: PICKER_VIEWS.MONTH
      });
    }
  }, {
    key: "showYearPicker",
    value: function showYearPicker() {
      this.setState({
        currentView: PICKER_VIEWS.YEAR
      });
    }
  }, {
    key: "prevMonth",
    value: function prevMonth() {
      var _this2 = this;

      this.updateState(function () {
        var date = _this2.state.date;

        var _deconstructDate = (0, _utils.deconstructDate)(date),
            month = _deconstructDate.month,
            year = _deconstructDate.year;

        date.setMonth(month, 1);

        if (month == 0) {
          date.setFullYear(year - 1);
          date.setMonth(11);
        } else {
          date.setMonth(month - 1);
        }
      });
    }
  }, {
    key: "nextMonth",
    value: function nextMonth() {
      var _this3 = this;

      this.updateState(function () {
        var date = _this3.state.date;

        var _deconstructDate2 = (0, _utils.deconstructDate)(date),
            month = _deconstructDate2.month,
            year = _deconstructDate2.year;

        date.setMonth(month, 1);

        if (month == 11) {
          date.setFullYear(year + 1);
          date.setMonth(0);
        } else {
          date.setMonth(month + 1);
        }
      });
    }
  }, {
    key: "nextYear",
    value: function nextYear() {
      var _this4 = this;

      this.updateState(function () {
        var _this4$state = _this4.state,
            date = _this4$state.date,
            currentView = _this4$state.currentView;

        var _deconstructDate3 = (0, _utils.deconstructDate)(date),
            year = _deconstructDate3.year;

        if (currentView === 'year') {
          date.setFullYear(year + 10);
        } else {
          date.setFullYear(year + 1);
        }
      });
    }
  }, {
    key: "updateState",
    value: function updateState(cb) {
      cb(this.state);
      this.setState({});
    }
  }, {
    key: "prevYear",
    value: function prevYear() {
      var _this5 = this;

      this.updateState(function () {
        var _this5$state = _this5.state,
            date = _this5$state.date,
            currentView = _this5$state.currentView;

        var _deconstructDate4 = (0, _utils.deconstructDate)(date),
            year = _deconstructDate4.year;

        if (currentView === 'year') {
          date.setFullYear(year - 10);
        } else {
          date.setFullYear(year - 1);
        }
      });
    }
  }, {
    key: "handleShortcutClick",
    value: function handleShortcutClick(shortcut) {
      shortcut.onClick();
    }
  }, {
    key: "handleTimePick",
    value: function handleTimePick(pickedDate, isKeepPanel) {
      this.updateState(function (state) {
        if (pickedDate) {
          var oldDate = state.date;
          oldDate.setHours(pickedDate.getHours());
          oldDate.setMinutes(pickedDate.getMinutes());
          oldDate.setSeconds(pickedDate.getSeconds());
        }

        state.timePickerVisible = isKeepPanel;
      });
    }
  }, {
    key: "handleMonthPick",
    value: function handleMonthPick(month) {
      var _this6 = this;

      this.updateState(function (state) {
        var date = state.date;
        var selectionMode = _this6.props.selectionMode;

        var _deconstructDate5 = (0, _utils.deconstructDate)(date),
            year = _deconstructDate5.year;

        if (selectionMode !== _utils.SELECTION_MODES.MONTH) {
          date.setMonth(month);
          state.currentView = PICKER_VIEWS.DATE;
        } else {
          date.setMonth(month);
          date.setFullYear(year);

          _this6.props.onPick(new Date(year, month, 1));
        }
      });
    }
  }, {
    key: "handleDatePick",
    value: function handleDatePick(value) {
      var _this7 = this;

      this.updateState(function (state) {
        var date = state.date;
        var _this7$props = _this7.props,
            selectionMode = _this7$props.selectionMode,
            isShowTime = _this7$props.isShowTime,
            onPick = _this7$props.onPick;
        var pdate = value.date;

        if (selectionMode === _utils.SELECTION_MODES.DAY) {
          if (!isShowTime) {
            onPick(new Date(pdate.getTime()));
          }

          date.setTime(pdate.getTime());
        } else if (selectionMode === _utils.SELECTION_MODES.WEEK) {
          onPick(pdate);
        }
      });
    }
  }, {
    key: "handleYearPick",
    value: function handleYearPick(year) {
      var _this8 = this;

      this.updateState(function (state) {
        var _this8$props = _this8.props,
            onPick = _this8$props.onPick,
            selectionMode = _this8$props.selectionMode;
        var date = state.date;
        date.setFullYear(year);

        if (selectionMode === _utils.SELECTION_MODES.YEAR) {
          onPick(new Date(year, 0));
        } else {
          state.currentView = PICKER_VIEWS.MONTH;
        }
      });
    }
  }, {
    key: "changeToNow",
    value: function changeToNow() {
      var now = new Date();
      this.props.onPick(now);
      this.setState({
        date: now
      });
    }
  }, {
    key: "confirm",
    value: function confirm() {
      this.props.onPick(new Date(this.state.date.getTime()));
    }
  }, {
    key: "resetView",
    value: function resetView() {
      var selectionMode = this.props.selectionMode;
      this.updateState(function (state) {
        if (selectionMode === _utils.SELECTION_MODES.MONTH) {
          state.currentView = PICKER_VIEWS.MONTH;
        } else if (selectionMode === _utils.SELECTION_MODES.YEAR) {
          state.currentView = PICKER_VIEWS.YEAR;
        } else {
          state.currentView = PICKER_VIEWS.DATE;
        }
      });
    }
  }, {
    key: "yearLabel",
    value: function yearLabel() {
      var _this$state = this.state,
          currentView = _this$state.currentView,
          date = _this$state.date;

      var _deconstructDate6 = (0, _utils.deconstructDate)(date),
          year = _deconstructDate6.year;

      var yearTranslation = _locale["default"].t('el.datepicker.year');

      if (currentView === 'year') {
        var startYear = Math.floor(year / 10) * 10;

        if (yearTranslation) {
          return startYear + ' ' + yearTranslation + '-' + (startYear + 9) + ' ' + yearTranslation;
        }

        return startYear + ' - ' + (startYear + 9);
      }

      return year + ' ' + yearTranslation;
    }
  }, {
    key: "visibleTime",
    get: function get() {
      return (0, _utils.formatDate)(this.state.date, this.timeFormat);
    },
    set: function set(val) {
      if (val) {
        var ndate = (0, _utils.parseDate)(val, this.timeFormat);
        var date = this.state.date;

        if (ndate) {
          ndate.setFullYear(date.getFullYear());
          ndate.setMonth(date.getMonth());
          ndate.setDate(date.getDate());
          this.setState({
            date: ndate,
            timePickerVisible: false
          });
        }
      }
    }
  }, {
    key: "visibleDate",
    get: function get() {
      return (0, _utils.formatDate)(this.state.date, this.dateFormat);
    },
    set: function set(val) {
      var ndate = (0, _utils.parseDate)(val, this.dateFormat);

      if (!ndate) {
        return;
      }

      var disabledDate = this.props.disabledDate;
      var date = this.state.date;

      if (typeof disabledDate === 'function' && disabledDate(ndate)) {
        return;
      }

      ndate.setHours(date.getHours());
      ndate.setMinutes(date.getMinutes());
      ndate.setSeconds(date.getSeconds());
      this.setState({
        date: ndate
      });
      this.resetView();
    }
  }, {
    key: "timeFormat",
    get: function get() {
      var format = this.props.format;

      if (format && format.indexOf('ss') === -1) {
        return 'HH:mm';
      } else {
        return 'HH:mm:ss';
      }
    }
  }, {
    key: "dateFormat",
    get: function get() {
      if (this.props.format) return this.props.format.replace('HH:mm', '').replace(':ss', '').trim();else return 'yyyy-MM-dd';
    } // end: ------ public methods

  }, {
    key: "_pickerContent",
    value: function _pickerContent() {
      var _this$props = this.props,
          value = _this$props.value,
          selectionMode = _this$props.selectionMode,
          disabledDate = _this$props.disabledDate,
          showWeekNumber = _this$props.showWeekNumber,
          firstDayOfWeek = _this$props.firstDayOfWeek;
      var date = this.state.date;
      var currentView = this.state.currentView;
      var result = null;

      switch (currentView) {
        case PICKER_VIEWS.DATE:
          result = /*#__PURE__*/_react["default"].createElement(_basic.DateTable, {
            onPick: this.handleDatePick.bind(this),
            date: date,
            value: value,
            selectionMode: selectionMode,
            disabledDate: disabledDate,
            showWeekNumber: showWeekNumber,
            firstDayOfWeek: firstDayOfWeek
          });
          break;

        case PICKER_VIEWS.YEAR:
          result = /*#__PURE__*/_react["default"].createElement(_basic.YearTable, {
            ref: "yearTable",
            value: value,
            date: date,
            onPick: this.handleYearPick.bind(this),
            disabledDate: disabledDate
          });
          break;

        case PICKER_VIEWS.MONTH:
          result = /*#__PURE__*/_react["default"].createElement(_basic.MonthTable, {
            value: value,
            date: date,
            onPick: this.handleMonthPick.bind(this),
            disabledDate: disabledDate
          });
          break;

        default:
          throw new Error('invalid currentView value');
      }

      return result;
    }
  }, {
    key: "render",
    value: function render() {
      var _this9 = this;

      var _this$props2 = this.props,
          isShowTime = _this$props2.isShowTime,
          shortcuts = _this$props2.shortcuts;
      var _this$state2 = this.state,
          currentView = _this$state2.currentView,
          date = _this$state2.date,
          pickerWidth = _this$state2.pickerWidth,
          timePickerVisible = _this$state2.timePickerVisible;

      var _deconstructDate7 = (0, _utils.deconstructDate)(date),
          month = _deconstructDate7.month;

      var t = _locale["default"].t;
      return /*#__PURE__*/_react["default"].createElement("div", {
        ref: "root",
        className: this.classNames('el-picker-panel el-date-picker', {
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
            return _this9.handleShortcutClick(e);
          }
        }, e.text);
      })), /*#__PURE__*/_react["default"].createElement("div", {
        className: "el-picker-panel__body"
      }, isShowTime && /*#__PURE__*/_react["default"].createElement("div", {
        className: "el-date-picker__time-header"
      }, /*#__PURE__*/_react["default"].createElement("span", {
        className: "el-date-picker__editor-wrap"
      }, /*#__PURE__*/_react["default"].createElement(_input["default"], {
        placeholder: t('el.datepicker.selectDate'),
        value: this.visibleDate,
        size: "small",
        onChange: function onChange(date) {
          return _this9.visibleDate = date;
        }
      })), /*#__PURE__*/_react["default"].createElement("span", {
        className: "el-date-picker__editor-wrap"
      }, /*#__PURE__*/_react["default"].createElement(_input["default"], {
        ref: "input",
        onFocus: function onFocus() {
          return _this9.setState({
            timePickerVisible: !_this9.state.timePickerVisible
          });
        },
        placeholder: t('el.datepicker.selectTime'),
        value: this.visibleTime,
        size: "small",
        onChange: function onChange(date) {
          return _this9.visibleDate = date;
        }
      }), timePickerVisible && /*#__PURE__*/_react["default"].createElement(_MountBody.MountBody, null, /*#__PURE__*/_react["default"].createElement(_TimePanel["default"], {
        ref: "timepicker",
        currentDate: new Date(date.getTime())
        /* should i dont mutate date directly here ? */
        ,
        pickerWidth: pickerWidth
        /*
        todo: pickerWidth? in original elmenent repo, this width is set by getting input with using getClientRect() method
        but it seems work even though I purposely leave this logic unimplemented. To be honest it would require some hack to get
        this actually done, since I can't do any setState method on componentDidUpdate method.
        DateRangePicker has same issue
        */
        ,
        onPicked: this.handleTimePick.bind(this),
        format: this.timeFormat,
        getPopperRefElement: function getPopperRefElement() {
          return _reactDom["default"].findDOMNode(_this9.refs.input);
        },
        popperMixinOption: {
          placement: _constants.PLACEMENT_MAP[this.props.align] || _constants.PLACEMENT_MAP.left
        },
        onCancel: function onCancel() {
          return _this9.setState({
            timePickerVisible: false
          });
        }
      })))), currentView !== 'time' && /*#__PURE__*/_react["default"].createElement("div", {
        className: "el-date-picker__header"
      }, /*#__PURE__*/_react["default"].createElement("button", {
        type: "button",
        onClick: this.prevYear.bind(this),
        className: "el-picker-panel__icon-btn el-date-picker__prev-btn el-icon-d-arrow-left"
      }), currentView === PICKER_VIEWS.DATE && /*#__PURE__*/_react["default"].createElement("button", {
        type: "button",
        onClick: this.prevMonth.bind(this),
        className: "el-picker-panel__icon-btn el-date-picker__prev-btn el-icon-arrow-left"
      }), /*#__PURE__*/_react["default"].createElement("span", {
        onClick: this.showYearPicker.bind(this),
        className: "el-date-picker__header-label"
      }, this.yearLabel()), currentView === PICKER_VIEWS.DATE && /*#__PURE__*/_react["default"].createElement("span", {
        onClick: this.showMonthPicker.bind(this),
        className: this.classNames('el-date-picker__header-label', {
          active: currentView === 'month'
        })
      }, t("el.datepicker.month".concat(month + 1))), /*#__PURE__*/_react["default"].createElement("button", {
        type: "button",
        onClick: this.nextYear.bind(this),
        className: "el-picker-panel__icon-btn el-date-picker__next-btn el-icon-d-arrow-right"
      }), currentView === PICKER_VIEWS.DATE && /*#__PURE__*/_react["default"].createElement("button", {
        type: "button",
        onClick: this.nextMonth.bind(this),
        className: "el-picker-panel__icon-btn el-date-picker__next-btn el-icon-arrow-right"
      })), /*#__PURE__*/_react["default"].createElement("div", {
        className: "el-picker-panel__content"
      }, this._pickerContent()))), isShowTime && currentView === PICKER_VIEWS.DATE && /*#__PURE__*/_react["default"].createElement("div", {
        className: "el-picker-panel__footer"
      }, /*#__PURE__*/_react["default"].createElement("a", {
        href: "JavaScript:",
        className: "el-picker-panel__link-btn",
        onClick: this.changeToNow.bind(this)
      }, t('el.datepicker.now')), /*#__PURE__*/_react["default"].createElement("button", {
        type: "button",
        className: "el-picker-panel__btn",
        onClick: function onClick() {
          return _this9.confirm();
        }
      }, t('el.datepicker.confirm'))));
    }
  }], [{
    key: "propTypes",
    get: function get() {
      return Object.assign({
        // user picked date value
        // value: Date | null
        value: _libs.PropTypes.instanceOf(Date),
        // (Date)=>void
        onPick: _libs.PropTypes.func.isRequired,
        isShowTime: _libs.PropTypes.bool,
        showWeekNumber: _libs.PropTypes.bool,
        format: _libs.PropTypes.string,
        // Array[{text: String, onClick: (picker)=>()}]
        shortcuts: _libs.PropTypes.arrayOf(_libs.PropTypes.shape({
          text: _libs.PropTypes.string.isRequired,
          // ()=>()
          onClick: _libs.PropTypes.func.isRequired
        })),
        selectionMode: _libs.PropTypes.oneOf(Object.keys(_utils.SELECTION_MODES).map(function (e) {
          return _utils.SELECTION_MODES[e];
        })),
        // (Date)=>bool, if true, disabled
        disabledDate: _libs.PropTypes.func,
        firstDayOfWeek: _libs.PropTypes.range(0, 6)
      }, _PopperBase2.PopperBase.propTypes);
    }
  }]);

  return DatePanel;
}(_PopperBase2.PopperBase);

exports["default"] = DatePanel;
DatePanel.defaultProps = {
  isShowTime: false,
  selectionMode: _utils.SELECTION_MODES.DAY
};