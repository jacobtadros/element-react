"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getScrollBarWidth = getScrollBarWidth;
exports.getValueByPath = getValueByPath;
exports.getRowIdentity = getRowIdentity;
exports.getLeafColumns = getLeafColumns;
exports.getColumns = getColumns;
exports.convertToRows = convertToRows;
exports.checkType = exports.deepCompare = exports.cleanScrollBar = void 0;

var React = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var _document = document;
var scrollBarWidth;

var cleanScrollBar = function cleanScrollBar() {
  document.querySelectorAll('.el-table__body-wrapper').forEach(function (el) {
    setTimeout(function () {
      el.style.overflow = 'hidden';
      setTimeout(function () {
        return el.style.overflow = 'auto';
      });
    });
  });
};

exports.cleanScrollBar = cleanScrollBar;

function getScrollBarWidth() {
  if (scrollBarWidth !== undefined) return scrollBarWidth;

  var dom = _document.createElement('div');

  var body = _document.body || dom;
  dom.style.visibility = 'hidden';
  dom.style.width = '100px';
  dom.style.position = 'absolute';
  dom.style.top = '-9999px';
  dom.style.overflow = 'scroll';
  body.appendChild(dom);
  var totalWidth = dom.offsetWidth;
  var widthWithoutScroll = dom.clientWidth;
  body.removeChild(dom);
  return totalWidth - widthWithoutScroll;
}

function getValueByPath(data, path) {
  if (typeof path !== 'string') return null;
  return path.split('.').reduce(function (pre, cur) {
    return (pre || {})[cur];
  }, data);
}

function getRowIdentity(row, rowKey) {
  if (typeof rowKey === 'string') {
    return getValueByPath(row, rowKey);
  } else if (typeof rowKey === 'function') {
    return rowKey(row);
  }
}

function getLeafColumns(columns) {
  var result = [];
  columns.forEach(function (column) {
    if (column.subColumns) {
      result.push.apply(result, _toConsumableArray(getLeafColumns(column.subColumns)));
    } else {
      result.push(column);
    }
  });
  return result;
}

function convertChildrenToColumns(children) {
  return React.Children.map(children, function (child) {
    if (child.type.typeName !== 'TableColumn') {
      console.warn("Table component's children must be TableColumn, but received ".concat(child.type));
      return {};
    }

    var column = Object.assign({}, child.props);

    if (column.children) {
      column.subColumns = convertChildrenToColumns(column.children);
      delete column.children;
    }

    return column;
  });
}

function getColumns(props) {
  return props.children ? convertChildrenToColumns(props.children) : props.columns || [];
}

function convertToRows(columns) {
  var maxLevel = 1;

  function traverse(column, parent) {
    if (parent) {
      column.level = parent.level + 1;

      if (maxLevel < column.level) {
        maxLevel = column.level;
      }
    } else {
      column.level = 1;
    }

    if (column.subColumns) {
      var colSpan = 0;
      column.subColumns.forEach(function (subColumn) {
        traverse(subColumn, column);
        colSpan += subColumn.colSpan;
      });
      column.colSpan = colSpan;
    } else {
      column.colSpan = 1;
    }
  }

  columns.forEach(function (column) {
    traverse(column);
  });
  var rows = [];

  for (var i = 0; i < maxLevel; i++) {
    rows.push([]);
  }

  var allColumns = [];
  var queue = columns.slice();

  for (var _i = 0; queue[_i]; _i++) {
    allColumns.push(queue[_i]);
    if (queue[_i].subColumns) queue.push.apply(queue, _toConsumableArray(queue[_i].subColumns));
  }

  allColumns.forEach(function (column) {
    if (!column.subColumns) {
      column.rowSpan = maxLevel - column.level + 1;
    } else {
      column.rowSpan = 1;
    }

    rows[column.level - 1].push(column);
  });
  return rows;
}

var checkType = function checkType(data) {
  return Object.prototype.toString.call(data).toLowerCase().slice(8, -1);
};

exports.checkType = checkType;

var deepCompare = function deepCompare(obj1, obj2) {
  var obj1Type = checkType(obj1);
  var obj2Type = checkType(obj2);
  if (obj1Type !== obj2Type) return false;

  if (obj1Type === 'array' && obj1.length === obj2.length) {
    return obj1.every(function (value, key) {
      return deepCompare(value, obj2[key]);
    });
  }

  if (obj1Type === 'object') {
    for (var key in obj1) {
      if (!Object.keys(obj2).includes(key)) return false;
      return deepCompare(obj1[key], obj2[key]);
    }

    return false;
  }

  return Object.is(obj1, obj2);
};

exports.deepCompare = deepCompare;