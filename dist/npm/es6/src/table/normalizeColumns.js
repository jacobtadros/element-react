"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = normalizeColumns;

var React = _interopRequireWildcard(require("react"));

var _utils = require("./utils");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function defaultRender(row, column) {
  return (0, _utils.getValueByPath)(row, column.property);
}

var defaults = {
  "default": {
    order: ''
  },
  selection: {
    width: 48,
    minWidth: 48,
    realWidth: 48,
    className: 'el-table-column--selection'
  },
  expand: {
    width: 48,
    minWidth: 48,
    realWidth: 48
  },
  index: {
    width: 48,
    minWidth: 48,
    realWidth: 48
  }
};
var forced = {
  expand: {
    sortable: false,
    resizable: false,
    className: 'el-table__expand-column'
  },
  index: {
    sortable: false
  },
  selection: {
    sortable: false,
    resizable: false
  }
};
var columnIDSeed = 1;

function normalizeColumns(columns, tableIDSeed) {
  return columns.map(function (column) {
    var _column;

    if (column.subColumns) {
      // renderHeader
      _column = Object.assign({}, column);
      _column.subColumns = normalizeColumns(column.subColumns, tableIDSeed);
    } else {
      var width = column.width,
          minWidth = column.minWidth;

      if (width !== undefined) {
        width = parseInt(width, 10);

        if (isNaN(width)) {
          width = null;
        }
      }

      if (minWidth !== undefined) {
        minWidth = parseInt(minWidth, 10);

        if (isNaN(minWidth)) {
          minWidth = 80;
        }
      } else {
        minWidth = 80;
      }

      var id = "el-table_".concat(tableIDSeed, "_column_").concat(columnIDSeed++);
      _column = Object.assign({
        id: id,
        sortable: false,
        resizable: true,
        showOverflowTooltip: false,
        align: 'left',
        filterMultiple: true
      }, column, {
        columnKey: column.columnKey || id,
        width: width,
        minWidth: minWidth,
        realWidth: width || minWidth,
        property: column.prop || column.property,
        render: column.render || defaultRender,
        align: column.align ? 'is-' + column.align : null,
        headerAlign: column.headerAlign ? 'is-' + column.headerAlign : column.align ? 'is-' + column.align : null,
        filterable: column.filters && column.filterMethod,
        filterOpened: false,
        filteredValue: column.filteredValue || null,
        filterPlacement: column.filterPlacement || 'bottom'
      }, defaults[column.type || 'default'], forced[column.type]);
    }

    return _column;
  });
}