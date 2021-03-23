"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _libs = require("../../../libs");

var _dom = require("../../../libs/utils/dom");

var _scrollbar = require("../../scrollbar");

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

var TimeSelectPanel = /*#__PURE__*/function (_PopperBase) {
  _inherits(TimeSelectPanel, _PopperBase);

  var _super = _createSuper(TimeSelectPanel);

  function TimeSelectPanel(props) {
    _classCallCheck(this, TimeSelectPanel);

    return _super.call(this, props);
  }

  _createClass(TimeSelectPanel, [{
    key: "handleClick",
    value: function handleClick(item) {
      var _this$props = this.props,
          onPicked = _this$props.onPicked,
          dateParser = _this$props.dateParser;

      if (!item.disabled) {
        onPicked(dateParser(item.value));
      }
    }
  }, {
    key: "items",
    value: function items() {
      return TimeSelectPanel.items(this.props);
    }
  }, {
    key: "scrollToOption",
    value: function scrollToOption() {
      var className = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'selected';
      var menu = this.refs.root.querySelector('.el-picker-panel__content');
      (0, _dom.scrollIntoView)(menu, menu.getElementsByClassName(className)[0]);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.scrollToOption();
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var _this = this;

      clearTimeout(this._timer);

      if (nextProps.value !== this.props.value) {
        this._timer = setTimeout(function () {
          return _this.scrollToOption();
        }, 0);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var value = this.props.value;
      return /*#__PURE__*/_react["default"].createElement("div", {
        ref: "root",
        className: "el-picker-panel time-select"
      }, /*#__PURE__*/_react["default"].createElement(_scrollbar.Scrollbar, {
        wrapClass: "el-picker-panel__content",
        noresize: true
      }, this.items().map(function (item, idx) {
        return /*#__PURE__*/_react["default"].createElement("div", {
          key: idx,
          className: _this2.classNames('time-select-item', {
            selected: value === item.value,
            disabled: item.disabled
          }),
          disabled: item.disabled,
          onClick: function onClick() {
            return _this2.handleClick(item);
          }
        }, item.value);
      })));
    }
  }], [{
    key: "propTypes",
    get: function get() {
      return Object.assign({
        start: _libs.PropTypes.string,
        end: _libs.PropTypes.string,
        step: _libs.PropTypes.string,
        minTime: _libs.PropTypes.string,
        maxTime: _libs.PropTypes.string,
        value: _libs.PropTypes.string,
        onPicked: _libs.PropTypes.func,
        //(string)=>date
        dateParser: _libs.PropTypes.func.isRequired,
        //()=>HtmlElement
        getPopperRefElement: _libs.PropTypes.func,
        popperMixinOption: _libs.PropTypes.object
      }, _PopperBase2.PopperBase.propTypes);
    }
  }]);

  return TimeSelectPanel;
}(_PopperBase2.PopperBase);

exports["default"] = TimeSelectPanel;

TimeSelectPanel.isValid = function (value, _ref) {
  var start = _ref.start,
      end = _ref.end,
      step = _ref.step,
      minTime = _ref.minTime,
      maxTime = _ref.maxTime;
  var items = TimeSelectPanel.items({
    start: start,
    end: end,
    step: step,
    minTime: minTime,
    maxTime: maxTime
  });
  return !!items.filter(function (e) {
    return !e.disabled;
  }).find(function (e) {
    return e.value === value;
  });
};

TimeSelectPanel.items = function (_ref2) {
  var start = _ref2.start,
      end = _ref2.end,
      step = _ref2.step,
      minTime = _ref2.minTime,
      maxTime = _ref2.maxTime;
  var result = [];

  if (start && end && step) {
    var current = start;

    while (compareTime(current, end) <= 0) {
      result.push({
        value: current,
        disabled: compareTime(current, minTime || '-1:-1') <= 0 || compareTime(current, maxTime || '100:100') >= 0
      });
      current = nextTime(current, step);
    }
  }

  return result;
};

TimeSelectPanel.defaultProps = {
  start: '09:00',
  end: '18:00',
  step: '00:30',
  minTime: '',
  onPicked: function onPicked() {},
  popperMixinOption: {}
};

var parseTime = function parseTime(time) {
  var values = (time || '').split(':');

  if (values.length >= 2) {
    var hours = parseInt(values[0], 10);
    var minutes = parseInt(values[1], 10);
    return {
      hours: hours,
      minutes: minutes
    };
  }
  /* istanbul ignore next */


  return null;
};

var compareTime = function compareTime(time1, time2) {
  var value1 = parseTime(time1);
  var value2 = parseTime(time2);
  var minutes1 = value1.minutes + value1.hours * 60;
  var minutes2 = value2.minutes + value2.hours * 60;

  if (minutes1 === minutes2) {
    return 0;
  }

  return minutes1 > minutes2 ? 1 : -1;
};

var formatTime = function formatTime(time) {
  return (time.hours < 10 ? '0' + time.hours : time.hours) + ':' + (time.minutes < 10 ? '0' + time.minutes : time.minutes);
};

var nextTime = function nextTime(time, step) {
  var timeValue = parseTime(time);
  var stepValue = parseTime(step);
  var next = {
    hours: timeValue.hours,
    minutes: timeValue.minutes
  };
  next.minutes += stepValue.minutes;
  next.hours += stepValue.hours;
  next.hours += Math.floor(next.minutes / 60);
  next.minutes = next.minutes % 60;
  return formatTime(next);
};