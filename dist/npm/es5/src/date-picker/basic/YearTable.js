"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _libs = require("../../../libs");

var _utils = require("../utils");

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

var YearTable = /*#__PURE__*/function (_Component) {
  _inherits(YearTable, _Component);

  var _super = _createSuper(YearTable);

  function YearTable(props) {
    _classCallCheck(this, YearTable);

    return _super.call(this, props);
  }

  _createClass(YearTable, [{
    key: "getCellStyle",
    value: function getCellStyle(year) {
      var _this$props = this.props,
          disabledDate = _this$props.disabledDate,
          value = _this$props.value,
          date = _this$props.date;
      var style = {};
      var ndate = new Date(date);
      ndate.setFullYear(year);
      style.disabled = typeof disabledDate === 'function' && disabledDate(ndate, _utils.SELECTION_MODES.YEAR);
      style.current = value && (0, _utils.deconstructDate)(value).year === year;
      return style;
    }
  }, {
    key: "handleYearTableClick",
    value: function handleYearTableClick(event) {
      var target = event.target;

      if (target.tagName === 'A') {
        if ((0, _utils.hasClass)(target.parentNode, 'disabled')) return;
        var year = target.textContent || target.innerText;
        this.props.onPick(+year);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var date = this.props.date;
      var startYear = Math.floor((0, _utils.deconstructDate)(date).year / 10) * 10;
      return /*#__PURE__*/_react["default"].createElement("table", {
        onClick: this.handleYearTableClick.bind(this),
        className: "el-year-table"
      }, /*#__PURE__*/_react["default"].createElement("tbody", null, /*#__PURE__*/_react["default"].createElement("tr", null, /*#__PURE__*/_react["default"].createElement("td", {
        className: this.classNames('available', this.getCellStyle(startYear + 0))
      }, /*#__PURE__*/_react["default"].createElement("a", {
        className: "cell"
      }, startYear)), /*#__PURE__*/_react["default"].createElement("td", {
        className: this.classNames('available', this.getCellStyle(startYear + 1))
      }, /*#__PURE__*/_react["default"].createElement("a", {
        className: "cell"
      }, startYear + 1)), /*#__PURE__*/_react["default"].createElement("td", {
        className: this.classNames('available', this.getCellStyle(startYear + 2))
      }, /*#__PURE__*/_react["default"].createElement("a", {
        className: "cell"
      }, startYear + 2)), /*#__PURE__*/_react["default"].createElement("td", {
        className: this.classNames('available', this.getCellStyle(startYear + 3))
      }, /*#__PURE__*/_react["default"].createElement("a", {
        className: "cell"
      }, startYear + 3))), /*#__PURE__*/_react["default"].createElement("tr", null, /*#__PURE__*/_react["default"].createElement("td", {
        className: this.classNames('available', this.getCellStyle(startYear + 4))
      }, /*#__PURE__*/_react["default"].createElement("a", {
        className: "cell"
      }, startYear + 4)), /*#__PURE__*/_react["default"].createElement("td", {
        className: this.classNames('available', this.getCellStyle(startYear + 5))
      }, /*#__PURE__*/_react["default"].createElement("a", {
        className: "cell"
      }, startYear + 5)), /*#__PURE__*/_react["default"].createElement("td", {
        className: this.classNames('available', this.getCellStyle(startYear + 6))
      }, /*#__PURE__*/_react["default"].createElement("a", {
        className: "cell"
      }, startYear + 6)), /*#__PURE__*/_react["default"].createElement("td", {
        className: this.classNames('available', this.getCellStyle(startYear + 7))
      }, /*#__PURE__*/_react["default"].createElement("a", {
        className: "cell"
      }, startYear + 7))), /*#__PURE__*/_react["default"].createElement("tr", null, /*#__PURE__*/_react["default"].createElement("td", {
        className: this.classNames('available', this.getCellStyle(startYear + 8))
      }, /*#__PURE__*/_react["default"].createElement("a", {
        className: "cell"
      }, startYear + 8)), /*#__PURE__*/_react["default"].createElement("td", {
        className: this.classNames('available', this.getCellStyle(startYear + 9))
      }, /*#__PURE__*/_react["default"].createElement("a", {
        className: "cell"
      }, startYear + 9)), /*#__PURE__*/_react["default"].createElement("td", null), /*#__PURE__*/_react["default"].createElement("td", null))));
    }
  }]);

  return YearTable;
}(_libs.Component);

exports["default"] = YearTable;
YearTable.propTypes = {
  value: _libs.PropTypes.instanceOf(Date),
  date: _libs.PropTypes.instanceOf(Date).isRequired,
  // (year: number)=>
  onPick: _libs.PropTypes.func.isRequired,
  // (Date)=>boolean
  disabledDate: _libs.PropTypes.func
};