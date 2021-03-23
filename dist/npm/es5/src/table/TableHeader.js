"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var React = _interopRequireWildcard(require("react"));

var _throttleDebounce = require("throttle-debounce");

var _libs = require("../../libs");

var _checkbox = _interopRequireDefault(require("../checkbox"));

var _FilterPannel = _interopRequireDefault(require("./FilterPannel"));

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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _document = document;

var TableHeader = /*#__PURE__*/function (_Component) {
  _inherits(TableHeader, _Component);

  var _super = _createSuper(TableHeader);

  function TableHeader(props) {
    var _this;

    _classCallCheck(this, TableHeader);

    _this = _super.call(this, props);
    ['handleHeaderClick', 'handleFilterClick', 'handleSortClick'].forEach(function (fn) {
      _this[fn] = (0, _throttleDebounce.throttle)(300, true, _this[fn]);
    });
    return _this;
  }

  _createClass(TableHeader, [{
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
    key: "handleMouseMove",
    value: function handleMouseMove(column, event) {
      if (!column.resizable) return;
      if (column.subColumns && column.subColumns.length) return;

      if (!this.dragging && this.props.border) {
        var target = event.target;

        while (target && target.tagName !== 'TH') {
          target = target.parentNode;
        }

        var rect = target.getBoundingClientRect();
        var bodyStyle = _document.body.style;

        if (rect.width > 12 && rect.right - event.pageX < 8) {
          bodyStyle.cursor = 'col-resize';
          this.draggingColumn = column;
        } else {
          bodyStyle.cursor = '';
          this.draggingColumn = null;
        }
      }
    }
  }, {
    key: "handleMouseDown",
    value: function handleMouseDown(column, event) {
      var _this2 = this;

      if (this.draggingColumn) {
        this.dragging = true;
        var table = this.context.table;
        var tableEl = table.el,
            resizeProxy = table.resizeProxy;
        var tableLeft = tableEl.getBoundingClientRect().left;
        var columnEl = event.target;

        while (columnEl && columnEl.tagName !== 'TH') {
          columnEl = columnEl.parentNode;
        }

        var columnRect = columnEl.getBoundingClientRect();
        var minLeft = columnRect.left - tableLeft + 30;
        columnEl.classList.add('noclick');
        var startMouseLeft = event.clientX;
        var startLeft = columnRect.right - tableLeft;
        var startColumnLeft = columnRect.left - tableLeft;
        resizeProxy.style.visibility = 'visible';
        resizeProxy.style.left = startLeft + 'px';

        _document.onselectstart = function () {
          return false;
        };

        _document.ondragstart = function () {
          return false;
        };

        var handleMouseMove = function handleMouseMove(event) {
          var deltaLeft = event.clientX - startMouseLeft;
          var proxyLeft = startLeft + deltaLeft;
          resizeProxy.style.left = Math.max(minLeft, proxyLeft) + 'px';
        };

        var handleMouseUp = function handleMouseUp(event) {
          if (_this2.dragging) {
            var finalLeft = parseInt(resizeProxy.style.left, 10);
            var columnWidth = finalLeft - startColumnLeft;
            var oldWidth = column.realWidth;
            column.width = column.realWidth = columnWidth;
            _this2.dragging = false;
            _this2.draggingColumn = null;
            _document.body.style.cursor = '';
            resizeProxy.style.visibility = 'hidden';

            _document.removeEventListener('mousemove', handleMouseMove);

            _document.removeEventListener('mouseup', handleMouseUp);

            _document.onselectstart = null;
            _document.ondragstart = null;
            setTimeout(function () {
              columnEl.classList.remove('noclick');
            });

            _this2.context.layout.scheduleLayout();

            _this2.dispatchEvent('onHeaderDragEnd', columnWidth, oldWidth, column, event);
          }
        };

        _document.addEventListener('mousemove', handleMouseMove);

        _document.addEventListener('mouseup', handleMouseUp);
      }
    }
  }, {
    key: "handleMouseOut",
    value: function handleMouseOut() {
      _document.body.style.cursor = "";
    }
  }, {
    key: "handleHeaderClick",
    value: function handleHeaderClick(column, event) {
      if (column.sortable && !column.filters) {
        this.handleSortClick(column, null, event);
      } else if (column.filters && !column.sortable) {
        this.handleFilterClick(column, event);
      } else {
        this.dispatchEvent('onHeaderClick', column, event);
      }
    }
  }, {
    key: "handleSortClick",
    value: function handleSortClick(column, givenOrder, event) {
      event.stopPropagation();
      event.nativeEvent.stopImmediatePropagation();
      var target = event.target;

      while (target && target.tagName !== 'TH') {
        target = target.parentNode;
      }

      if (target.classList.contains('noclick')) return;
      var order;

      if (givenOrder) {
        order = givenOrder;
      } else {
        var _this$props$tableStor = this.props.tableStoreState,
            sortColumn = _this$props$tableStor.sortColumn,
            sortOrder = _this$props$tableStor.sortOrder;

        if (column === sortColumn) {
          if (!sortOrder) {
            order = 'ascending';
          } else {
            order = sortOrder === 'ascending' ? 'descending' : null;
          }
        } else {
          order = 'ascending';
        }
      }

      this.context.tableStore.changeSortCondition(column, order);
      this.dispatchEvent('onHeaderClick', column, event);
    }
  }, {
    key: "handleFilterClick",
    value: function handleFilterClick(column, event) {
      if (event) {
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();
      }

      this.context.tableStore.toggleFilterOpened(column);
      event && this.dispatchEvent('onHeaderClick', column, event);
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
    key: "changeFilteredValue",
    value: function changeFilteredValue(column, value) {
      this.context.tableStore.changeFilteredValue(column, value);
    }
  }, {
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
    key: "renderHeader",
    value: function renderHeader(column) {
      var type = column.type;

      if (type === 'expand') {
        return column.label || '';
      }

      if (type === 'index') {
        return column.label || '#';
      }

      if (type === 'selection') {
        return /*#__PURE__*/React.createElement(_checkbox["default"], {
          checked: this.context.tableStore.isAllSelected,
          onChange: this.context.tableStore.toggleAllSelection
        });
      }

      return column.renderHeader ? column.renderHeader(column) : column.label;
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props = this.props,
          tableStoreState = _this$props.tableStoreState,
          layout = _this$props.layout,
          fixed = _this$props.fixed;
      return /*#__PURE__*/React.createElement("table", {
        className: "el-table__header",
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
      }), !fixed && /*#__PURE__*/React.createElement("col", {
        width: layout.scrollY ? layout.gutterWidth : 0,
        style: {
          width: layout.scrollY ? layout.gutterWidth : 0
        }
      })), /*#__PURE__*/React.createElement("thead", null, tableStoreState.columnRows.map(function (columns, rowIndex) {
        return /*#__PURE__*/React.createElement("tr", {
          key: rowIndex
        }, columns.map(function (column, cellIndex) {
          return /*#__PURE__*/React.createElement("th", {
            colSpan: column.colSpan,
            rowSpan: column.rowSpan,
            className: _this3.className(tableStoreState.sortColumn === column && tableStoreState.sortOrder, column.headerAlign, column.className, column.labelClassName, column.columnKey, {
              'is-hidden': rowIndex === 0 && _this3.isCellHidden(cellIndex, columns),
              'is-leaf': !column.subColumns,
              'is-sortable': column.sortable
            }),
            onMouseMove: _this3.handleMouseMove.bind(_this3, column),
            onMouseDown: _this3.handleMouseDown.bind(_this3, column),
            onMouseOut: _this3.handleMouseOut,
            onClick: _this3.handleHeaderClick.bind(_this3, column),
            key: cellIndex
          }, /*#__PURE__*/React.createElement("div", {
            className: "cell"
          }, _this3.renderHeader(column), column.sortable && /*#__PURE__*/React.createElement("span", {
            className: "caret-wrapper",
            onClick: _this3.handleSortClick.bind(_this3, column, null)
          }, /*#__PURE__*/React.createElement("i", {
            className: "sort-caret ascending",
            onClick: _this3.handleSortClick.bind(_this3, column, 'ascending')
          }), /*#__PURE__*/React.createElement("i", {
            className: "sort-caret descending",
            onClick: _this3.handleSortClick.bind(_this3, column, 'descending')
          })), column.filterable && /*#__PURE__*/React.createElement(_FilterPannel["default"], {
            visible: column.filterOpened,
            multiple: column.filterMultiple,
            filters: column.filters,
            filteredValue: column.filteredValue,
            placement: column.filterPlacement,
            onFilterChange: _this3.changeFilteredValue.bind(_this3, column),
            toggleFilter: _this3.handleFilterClick.bind(_this3, column)
          }, /*#__PURE__*/React.createElement("span", {
            className: "el-table__column-filter-trigger",
            onClick: _this3.handleFilterClick.bind(_this3, column)
          }, /*#__PURE__*/React.createElement("i", {
            className: _this3.classNames('el-icon-arrow-down', {
              'el-icon-arrow-up': column.filterOpened
            })
          })))));
        }), !fixed && /*#__PURE__*/React.createElement("th", {
          className: "gutter",
          style: {
            width: layout.scrollY ? layout.gutterWidth : 0
          }
        }));
      })));
    }
  }]);

  return TableHeader;
}(_libs.Component);

exports["default"] = TableHeader;

_defineProperty(TableHeader, "contextTypes", {
  tableStore: _libs.PropTypes.any,
  layout: _libs.PropTypes.any,
  table: _libs.PropTypes.any
});