"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _throttleDebounce = require("throttle-debounce");

var _libs = require("../../../libs");

var _utils = require("../utils");

var _scrollbar = require("../../scrollbar");

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

function range(end) {
  var r = [];

  for (var i = 0; i < end; i++) {
    r.push(i);
  }

  return r;
}

var isNumber = function isNumber(value) {
  return typeof value === 'number';
};

var validateHour = function validateHour(value) {
  return isNumber(value) && value >= 0 && value <= 23;
};

var validateMinOrSec = function validateMinOrSec(value) {
  return isNumber(value) && value >= 0 && value <= 59;
};

function propsToState(props) {
  var hours = props.hours,
      minutes = props.minutes,
      seconds = props.seconds,
      selectableRange = props.selectableRange;
  var state = {};

  var setOnValid = function setOnValid(isValid, cb) {
    return isValid && cb(state);
  };

  setOnValid(validateHour(hours), function (state) {
    return state.hours = hours;
  });
  setOnValid(validateMinOrSec(minutes), function (state) {
    return state.minutes = minutes;
  });
  setOnValid(validateMinOrSec(seconds), function (state) {
    return state.seconds = seconds;
  });
  state.hoursList = (0, _utils.getRangeHours)(selectableRange);
  state.minutesLisit = range(60);
  state.secondsList = range(60);
  return state;
}

var SCROLL_AJUST_VALUE = 85;

var calcScrollTop = function calcScrollTop(value) {
  return Math.max(0, (value - 2.5) * 32 + SCROLL_AJUST_VALUE);
};

var TimeSpinner = /*#__PURE__*/function (_Component) {
  _inherits(TimeSpinner, _Component);

  var _super = _createSuper(TimeSpinner);

  function TimeSpinner(props) {
    var _this;

    _classCallCheck(this, TimeSpinner);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "state", void 0);

    _this.state = {
      hours: 0,
      minutes: 0,
      seconds: 0
    };
    Object.assign(_this.state, propsToState(props));
    _this.ajustScrollTop = _this._ajustScrollTop.bind(_assertThisInitialized(_this));
    _this.handleScroll = (0, _throttleDebounce.debounce)(20, _this._handleScroll.bind(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(TimeSpinner, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.ajustScrollTop(this.state);
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      this.setState(propsToState(nextProps), function () {
        _this2.ajustScrollTop(_this2.state);
      });
    }
  }, {
    key: "emitSelectRange",
    value: function emitSelectRange(type) {
      var onSelectRangeChange = this.props.onSelectRangeChange;

      if (type === 'hours') {
        onSelectRangeChange(0, 3);
      } else if (type === 'minutes') {
        onSelectRangeChange(3, 5);
      } else if (type === 'seconds') {
        onSelectRangeChange(6, 9);
      }
    }
  }, {
    key: "_handleScroll",
    value: function _handleScroll(_type) {
      var value = Math.min(Math.floor((this.refs[_type].refs.wrap.scrollTop - SCROLL_AJUST_VALUE) / 32 + 3), 59);
      this.handleChange(_type, value);
    } // type: hours, minutes, seconds

  }, {
    key: "handleChange",
    value: function handleChange(type, value, disabled) {
      var _this3 = this;

      if (disabled) return;
      this.state[type] = value;
      var changed = {};
      changed[type] = value;
      this.setState({}, function () {
        _this3.ajustScrollTop(_this3.state);
      });
      this.props.onChange(changed);
    }
  }, {
    key: "_ajustScrollTop",
    value: function _ajustScrollTop(_ref) {
      var hours = _ref.hours,
          minutes = _ref.minutes,
          seconds = _ref.seconds;

      if (hours != null) {
        this.refs.hours.refs.wrap.scrollTop = calcScrollTop(hours);
      }

      if (minutes != null) {
        this.refs.minutes.refs.wrap.scrollTop = calcScrollTop(minutes);
      }

      if (this.refs.seconds && seconds != null) {
        this.refs.seconds.refs.wrap.scrollTop = calcScrollTop(seconds);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var _this$state = this.state,
          hoursList = _this$state.hoursList,
          minutesLisit = _this$state.minutesLisit,
          secondsList = _this$state.secondsList,
          hours = _this$state.hours,
          minutes = _this$state.minutes,
          seconds = _this$state.seconds;
      var isShowSeconds = this.props.isShowSeconds;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: this.classNames('el-time-spinner', {
          'has-seconds': isShowSeconds
        })
      }, /*#__PURE__*/_react["default"].createElement(_scrollbar.Scrollbar, {
        onMouseEnter: function onMouseEnter() {
          return _this4.emitSelectRange('hours');
        },
        onWheel: function onWheel() {
          _this4.handleScroll('hours');
        },
        ref: "hours",
        className: "el-time-spinner__wrapper",
        wrapStyle: {
          maxHeight: 'inherit'
        },
        viewClass: "el-time-spinner__list",
        viewComponent: "ul"
      }, hoursList.map(function (disabled, idx) {
        return /*#__PURE__*/_react["default"].createElement("li", {
          key: idx,
          onClick: function onClick() {
            return _this4.handleChange('hours', idx, disabled);
          },
          className: _this4.classNames('el-time-spinner__item', {
            active: idx === hours,
            disabled: disabled
          })
        }, idx);
      })), /*#__PURE__*/_react["default"].createElement(_scrollbar.Scrollbar, {
        onMouseEnter: function onMouseEnter() {
          return _this4.emitSelectRange('minutes');
        },
        onWheel: function onWheel() {
          return _this4.handleScroll('minutes');
        },
        ref: "minutes",
        className: "el-time-spinner__wrapper",
        wrapStyle: {
          maxHeight: 'inherit'
        },
        viewClass: "el-time-spinner__list",
        viewComponent: "ul"
      }, minutesLisit.map(function (minute) {
        return /*#__PURE__*/_react["default"].createElement("li", {
          key: minute,
          onClick: function onClick() {
            return _this4.handleChange('minutes', minute);
          },
          className: _this4.classNames('el-time-spinner__item', {
            active: minute === minutes
          })
        }, minute);
      })), isShowSeconds && /*#__PURE__*/_react["default"].createElement(_scrollbar.Scrollbar, {
        onMouseEnter: function onMouseEnter() {
          return _this4.emitSelectRange('seconds');
        },
        onWheel: function onWheel() {
          return _this4.handleScroll('seconds');
        },
        ref: "seconds",
        className: "el-time-spinner__wrapper",
        wrapStyle: {
          maxHeight: 'inherit'
        },
        viewClass: "el-time-spinner__list",
        viewComponent: "ul"
      }, secondsList.map(function (sec) {
        return /*#__PURE__*/_react["default"].createElement("li", {
          key: sec,
          onClick: function onClick() {
            return _this4.handleChange('seconds', sec);
          },
          className: _this4.classNames('el-time-spinner__item', {
            active: sec === seconds
          })
        }, sec);
      })));
    }
  }], [{
    key: "propTypes",
    get: function get() {
      return {
        hours: _libs.PropTypes.number,
        minutes: _libs.PropTypes.number,
        seconds: _libs.PropTypes.number,
        isShowSeconds: _libs.PropTypes.bool,
        //[[datefrom, dateend]...]
        selectableRange: _libs.PropTypes.arrayOf(_libs.PropTypes.arrayOf(_libs.PropTypes.instanceOf(Date))),

        /*
        type: one of [hours, minutes, seconds]
         onChange: ({type})=>()
        */
        onChange: _libs.PropTypes.func.isRequired,
        onSelectRangeChange: _libs.PropTypes.func
      };
    }
  }, {
    key: "defaultProps",
    get: function get() {
      return {
        hours: 0,
        minutes: 0,
        seconds: 0,
        isShowSeconds: true,
        onSelectRangeChange: function onSelectRangeChange() {}
      };
    }
  }]);

  return TimeSpinner;
}(_libs.Component);

exports["default"] = TimeSpinner;