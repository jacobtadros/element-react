"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var React = _interopRequireWildcard(require("react"));

var _libs = require("../../libs");

var _utils = require("./utils");

var _checkbox = _interopRequireDefault(require("../checkbox"));

var _tag = _interopRequireDefault(require("../tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

var TableFooter = /*#__PURE__*/function (_Component) {
  _inherits(TableFooter, _Component);

  var _super = _createSuper(TableFooter);

  function TableFooter() {
    _classCallCheck(this, TableFooter);

    return _super.apply(this, arguments);
  }

  _createClass(TableFooter, [{
    key: "isCellHidden",
    value: function isCellHidden(index, columns) {
      var fixed = this.props.fixed;

      if (fixed === true || fixed === 'left') {
        return index >= this.leftFixedCount;
      } else if (fixed === 'right') {
        var before = 0;

        for (var i = 0; i < index; i++) {
          before += columns[i].colSpan;
        }

        return before < this.columnsCount - this.rightFixedCount;
      } else {
        return index < this.leftFixedCount || index >= this.columnsCount - this.rightFixedCount;
      }
    }
  }, {
    key: "columnsCount",
    get: function get() {
      return this.props.tableStoreState.columns.length;
    }
  }, {
    key: "leftFixedCount",
    get: function get() {
      return this.props.tableStoreState.fixedColumns.length;
    }
  }, {
    key: "rightFixedCount",
    get: function get() {
      return this.props.tableStoreState.rightFixedColumns.length;
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      var _this$props = this.props,
          tableStoreState = _this$props.tableStoreState,
          layout = _this$props.layout,
          fixed = _this$props.fixed,
          summaryMethod = _this$props.summaryMethod,
          sumText = _this$props.sumText;
      var sums = summaryMethod ? summaryMethod(tableStoreState.columns, tableStoreState.data) : tableStoreState.columns.map(function (column, index) {
        if (index === 0) {
          return sumText;
        }

        var result = tableStoreState.data.reduce(function (pre, data) {
          return pre + parseFloat((0, _utils.getValueByPath)(data, column.property));
        }, 0);
        return isNaN(result) ? '' : result;
      });
      return /*#__PURE__*/React.createElement("table", {
        className: "el-table__footer",
        cellSpacing: "0",
        cellPadding: "0",
        style: this.style({
          borderSpacing: 0,
          border: 0
        })
      }, /*#__PURE__*/React.createElement("colgroup", null, tableStoreState.columns.map(function (column, index) {
        return /*#__PURE__*/React.createElement("col", {
          width: column.realWidth,
          style: {
            width: column.realWidth
          },
          key: index
        });
      }), !fixed && /*#__PURE__*/React.createElement("col", {
        width: layout.scrollY ? layout.gutterWidth : 0,
        style: {
          width: layout.scrollY ? layout.gutterWidth : 0
        }
      })), /*#__PURE__*/React.createElement("tbody", null, /*#__PURE__*/React.createElement("tr", null, tableStoreState.columns.map(function (column, index) {
        return /*#__PURE__*/React.createElement("td", {
          key: index,
          colSpan: column.colSpan,
          rowSpan: column.rowSpan,
          className: _this.className(column.headerAlign, column.className, column.labelClassName, column.columnKey, {
            'is-hidden': _this.isCellHidden(index, tableStoreState.columns),
            'is-leaf': !column.subColumns
          })
        }, /*#__PURE__*/React.createElement("div", {
          className: "cell"
        }, sums[index]));
      }), !fixed && /*#__PURE__*/React.createElement("td", {
        className: "gutter",
        style: {
          width: layout.scrollY ? layout.gutterWidth : 0
        }
      }))));
    }
  }]);

  return TableFooter;
}(_libs.Component);

exports["default"] = TableFooter;