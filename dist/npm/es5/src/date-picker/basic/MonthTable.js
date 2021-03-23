"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _libs = require("../../../libs");

var _utils = require("../utils");

var _locale = _interopRequireDefault(require("../../locale"));

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

var MonthTable = /*#__PURE__*/function (_Component) {
  _inherits(MonthTable, _Component);

  var _super = _createSuper(MonthTable);

  function MonthTable(props) {
    _classCallCheck(this, MonthTable);

    return _super.call(this, props);
  }

  _createClass(MonthTable, [{
    key: "getCellStyle",
    value: function getCellStyle(month) {
      var _this$props = this.props,
          date = _this$props.date,
          disabledDate = _this$props.disabledDate,
          value = _this$props.value;
      var style = {};
      var ndate = new Date(date);
      ndate.setMonth(month); // in the element repo, you could see the original code that only disable current month only when all days contains in this month are disabled
      // which i don't think is a good design, so i changed disabledDate callback with an additional type param to solve this kind issue.
      // so the caller can handle different picker views on each switch arm condition.

      style.disabled = typeof disabledDate === 'function' && disabledDate(ndate, _utils.SELECTION_MODES.MONTH);
      style.current = value && (0, _utils.deconstructDate)(value).month === month;
      return style;
    }
  }, {
    key: "handleMonthTableClick",
    value: function handleMonthTableClick(event) {
      var target = event.target;
      if (target.tagName !== 'A') return;
      if ((0, _utils.hasClass)(target.parentNode, 'disabled')) return;
      var column = target.parentNode.cellIndex;
      var row = target.parentNode.parentNode.rowIndex;
      var month = row * 4 + column;
      this.props.onPick(month);
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      var $t = _locale["default"].t;
      var months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
      return /*#__PURE__*/_react["default"].createElement("table", {
        onClick: this.handleMonthTableClick.bind(this),
        className: "el-month-table"
      }, /*#__PURE__*/_react["default"].createElement("tbody", null, months.map(function (key, idx) {
        return /*#__PURE__*/_react["default"].createElement("td", {
          className: _this.classNames(_this.getCellStyle(idx)),
          key: idx
        }, /*#__PURE__*/_react["default"].createElement("a", {
          className: "cell"
        }, $t("el.datepicker.months.".concat(key))));
      }).reduce(function (col, item) {
        var tararr;

        if (!(Array.isArray(col[0]) && col[0].length !== 4)) {
          col.unshift([]);
        }

        tararr = col[0];
        tararr.push(item);
        return col;
      }, []).reverse().map(function (e, idx) {
        return /*#__PURE__*/_react["default"].createElement("tr", {
          key: idx
        }, e);
      })));
    }
  }]);

  return MonthTable;
}(_libs.Component);

exports["default"] = MonthTable;
MonthTable.propTypes = {
  // current date, specific to view
  date: _libs.PropTypes.instanceOf(Date).isRequired,
  // user picked value, value: Date|null
  value: _libs.PropTypes.instanceOf(Date),
  onPick: _libs.PropTypes.func.isRequired,
  // (Date)=>boolean
  disabledDate: _libs.PropTypes.func
};