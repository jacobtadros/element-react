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

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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

var TableBody = /*#__PURE__*/function (_Component) {
  _inherits(TableBody, _Component);

  var _super = _createSuper(TableBody);

  function TableBody(props) {
    var _this;

    _classCallCheck(this, TableBody);

    _this = _super.call(this, props);
    ['handleMouseLeave'].forEach(function (fn) {
      _this[fn] = _this[fn].bind(_assertThisInitialized(_this));
    });
    return _this;
  }

  _createClass(TableBody, [{
    key: "handleMouseEnter",
    value: function handleMouseEnter(index) {
      this.context.tableStore.setHoverRow(index);
    }
  }, {
    key: "handleMouseLeave",
    value: function handleMouseLeave() {
      this.context.tableStore.setHoverRow(null);
    }
  }, {
    key: "handleCellMouseEnter",
    value: function handleCellMouseEnter(row, column, event) {
      this.dispatchEvent('onCellMouseEnter', row, column, event.currentTarget, event);
    }
  }, {
    key: "handleCellMouseLeave",
    value: function handleCellMouseLeave(row, column, event) {
      this.dispatchEvent('onCellMouseLeave', row, column, event.currentTarget, event);
    }
  }, {
    key: "handleCellClick",
    value: function handleCellClick(row, column, event) {
      this.dispatchEvent('onCellClick', row, column, event.currentTarget, event);
      this.dispatchEvent('onRowClick', row, event, column);
    }
  }, {
    key: "handleCellDbClick",
    value: function handleCellDbClick(row, column, event) {
      this.dispatchEvent('onCellDbClick', row, column, event.currentTarget, event);
      this.dispatchEvent('onRowDbClick', row, column);
    }
  }, {
    key: "handleRowContextMenu",
    value: function handleRowContextMenu(row, event) {
      this.dispatchEvent('onRowContextMenu', row, event);
    }
  }, {
    key: "dispatchEvent",
    value: function dispatchEvent(name) {
      var fn = this.props[name];

      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      fn && fn.apply(void 0, args);
    }
  }, {
    key: "isColumnHidden",
    value: function isColumnHidden(index) {
      var _this$props = this.props,
          tableStoreState = _this$props.tableStoreState,
          layout = _this$props.layout,
          props = _objectWithoutProperties(_this$props, ["tableStoreState", "layout"]);

      if (props.fixed === true || props.fixed === 'left') {
        return index >= this.leftFixedCount;
      } else if (props.fixed === 'right') {
        return index < this.columnsCount - this.rightFixedCount;
      } else {
        return index < this.leftFixedCount || index >= this.columnsCount - this.rightFixedCount;
      }
    }
  }, {
    key: "getRowStyle",
    value: function getRowStyle(row, index) {
      var rowStyle = this.props.rowStyle;

      if (typeof rowStyle === 'function') {
        return rowStyle.call(null, row, index);
      }

      return rowStyle;
    }
  }, {
    key: "getKeyOfRow",
    value: function getKeyOfRow(row, index) {
      var rowKey = this.props.rowKey;

      if (rowKey) {
        return (0, _utils.getRowIdentity)(row, rowKey);
      }

      return index;
    } // getRowClass(row, index) {
    //   const { rowClassName, stripe } = this.props;
    //
    // }

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
    key: "handleExpandClick",
    value: function handleExpandClick(row, rowKey) {
      this.context.tableStore.toggleRowExpanded(row, rowKey);
    }
  }, {
    key: "handleClick",
    value: function handleClick(row) {
      this.context.tableStore.setCurrentRow(row);
    }
  }, {
    key: "renderCell",
    value: function renderCell(row, column, index, rowKey) {
      var _this2 = this;

      var type = column.type,
          selectable = column.selectable;

      if (type === 'expand') {
        return /*#__PURE__*/React.createElement("div", {
          className: this.classNames('el-table__expand-icon ', {
            'el-table__expand-icon--expanded': this.context.tableStore.isRowExpanding(row, rowKey)
          }),
          onClick: this.handleExpandClick.bind(this, row, rowKey)
        }, /*#__PURE__*/React.createElement("i", {
          className: "el-icon el-icon-arrow-right"
        }));
      }

      if (type === 'index') {
        return /*#__PURE__*/React.createElement("div", null, index + 1);
      }

      if (type === 'selection') {
        var isSelected = this.context.tableStore.isRowSelected(row, rowKey);
        return /*#__PURE__*/React.createElement(_checkbox["default"], {
          checked: isSelected,
          disabled: selectable && !selectable(row, index),
          onChange: function onChange() {
            _this2.context.tableStore.toggleRowSelection(row, !isSelected);
          }
        });
      }

      return column.render(row, column, index);
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props2 = this.props,
          tableStoreState = _this$props2.tableStoreState,
          layout = _this$props2.layout,
          props = _objectWithoutProperties(_this$props2, ["tableStoreState", "layout"]);

      var columnsHidden = tableStoreState.columns.map(function (column, index) {
        return _this3.isColumnHidden(index);
      });
      return /*#__PURE__*/React.createElement("table", {
        className: "el-table__body",
        cellPadding: 0,
        cellSpacing: 0,
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
      })), /*#__PURE__*/React.createElement("tbody", null, tableStoreState.data.map(function (row, rowIndex) {
        var rowKey = _this3.getKeyOfRow(row, rowIndex);

        return [/*#__PURE__*/React.createElement("tr", {
          key: rowKey,
          style: _this3.getRowStyle(row, rowIndex),
          className: _this3.className('el-table__row', {
            'el-table__row--striped': props.stripe && rowIndex % 2 === 1,
            'hover-row': tableStoreState.hoverRow === rowIndex,
            'current-row': props.highlightCurrentRow && (props.currentRowKey === rowKey || tableStoreState.currentRow === row)
          }, typeof props.rowClassName === 'string' ? props.rowClassName : typeof props.rowClassName === 'function' && props.rowClassName(row, rowIndex)),
          onMouseEnter: _this3.handleMouseEnter.bind(_this3, rowIndex),
          onMouseLeave: _this3.handleMouseLeave,
          onClick: _this3.handleClick.bind(_this3, row),
          onContextMenu: _this3.handleRowContextMenu.bind(_this3, row)
        }, tableStoreState.columns.map(function (column, cellIndex) {
          return /*#__PURE__*/React.createElement("td", {
            key: cellIndex,
            className: _this3.classNames(column.className, column.align, column.columnKey, {
              'is-hidden': columnsHidden[cellIndex]
            }),
            onMouseEnter: _this3.handleCellMouseEnter.bind(_this3, row, column),
            onMouseLeave: _this3.handleCellMouseLeave.bind(_this3, row, column),
            onClick: _this3.handleCellClick.bind(_this3, row, column),
            onDoubleClick: _this3.handleCellDbClick.bind(_this3, row, column)
          }, /*#__PURE__*/React.createElement("div", {
            className: "cell"
          }, _this3.renderCell(row, column, rowIndex, rowKey)));
        }), !props.fixed && layout.scrollY && !!layout.gutterWidth && /*#__PURE__*/React.createElement("td", {
          className: "gutter"
        })), _this3.context.tableStore.isRowExpanding(row, rowKey) && /*#__PURE__*/React.createElement("tr", {
          key: "".concat(rowKey, "Expanded")
        }, /*#__PURE__*/React.createElement("td", {
          colSpan: tableStoreState.columns.length,
          className: "el-table__expanded-cell"
        }, typeof props.renderExpanded === 'function' && props.renderExpanded(row, rowIndex)))];
      })));
    }
  }]);

  return TableBody;
}(_libs.Component);

exports["default"] = TableBody;

_defineProperty(TableBody, "contextTypes", {
  tableStore: _libs.PropTypes.any,
  layout: _libs.PropTypes.any
});