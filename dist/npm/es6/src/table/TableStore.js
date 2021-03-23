"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var React = _interopRequireWildcard(require("react"));

var _libs = require("../../libs");

var _locale = _interopRequireDefault(require("../locale"));

var _TableLayout = _interopRequireDefault(require("./TableLayout"));

var _normalizeColumns = _interopRequireDefault(require("./normalizeColumns"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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

var tableIDSeed = 1;

function filterData(data, columns) {
  return columns.reduce(function (preData, column) {
    var filterable = column.filterable,
        filterMultiple = column.filterMultiple,
        filteredValue = column.filteredValue,
        filterMethod = column.filterMethod;

    if (filterable) {
      if (filterMultiple && Array.isArray(filteredValue) && filteredValue.length) {
        return preData.filter(function (_data) {
          return filteredValue.some(function (value) {
            return filterMethod(value, _data);
          });
        });
      } else if (filteredValue) {
        return preData.filter(function (_data) {
          return filterMethod(filteredValue, _data);
        });
      }
    }

    return preData;
  }, data);
}

var TableStore = /*#__PURE__*/function (_Component) {
  _inherits(TableStore, _Component);

  var _super = _createSuper(TableStore);

  function TableStore(props) {
    var _this;

    _classCallCheck(this, TableStore);

    _this = _super.call(this, props);
    _this.state = {
      fixedColumns: null,
      // left fixed columns in _columns
      rightFixedColumns: null,
      // right fixed columns in _columns
      columnRows: null,
      // columns to render header
      columns: null,
      // contain only leaf column
      isComplex: null,
      // whether some column is fixed
      expandingRows: [],
      hoverRow: null,
      currentRow: null,
      selectable: null,
      selectedRows: null,
      sortOrder: null,
      sortColumn: null
    };
    ['toggleRowSelection', 'toggleAllSelection', 'clearSelection', 'setCurrentRow'].forEach(function (fn) {
      _this[fn] = _this[fn].bind(_assertThisInitialized(_this));
    });
    _this._isMounted = false;
    return _this;
  }

  _createClass(TableStore, [{
    key: "getChildContext",
    value: function getChildContext() {
      return {
        tableStore: this
      };
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      this.updateColumns((0, _utils.getColumns)(this.props));
      this.updateData(this.props);
      this._isMounted = true;
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var data = this.props.data;
      var nextColumns = (0, _utils.getColumns)(nextProps);

      if ((0, _utils.getColumns)(this.props) !== nextColumns) {
        this.updateColumns(nextColumns);
      }

      if (data !== nextProps.data) {
        this.updateData(nextProps);
      }
    }
  }, {
    key: "isAllSelected",
    get: function get() {
      var _this$props = this.props,
          currentRowKey = _this$props.currentRowKey,
          rowKey = _this$props.rowKey;
      var _this$state = this.state,
          selectedRows = _this$state.selectedRows,
          data = _this$state.data,
          selectable = _this$state.selectable;
      var selectableData = selectable ? data.filter(function (row, index) {
        return selectable(row, index);
      }) : data;

      if (!selectableData.length) {
        return false;
      }

      if (Array.isArray(currentRowKey)) {
        return selectableData.every(function (data) {
          return currentRowKey.includes((0, _utils.getRowIdentity)(data, rowKey));
        });
      }

      return selectedRows && selectedRows.length === selectableData.length;
    } // shouldComponentUpdate(nextProps) {
    //   const propsKeys = Object.keys(this.props);
    //   const nextPropsKeys = Object.keys(nextProps);
    //
    //   if (propsKeys.length !== nextPropsKeys.length) {
    //     return true;
    //   }
    //   for (const key of propsKeys) {
    //     if (this.props[key] !== nextProps[key]) {
    //       return true;
    //     }
    //   }
    //   return false;
    // }

  }, {
    key: "updateColumns",
    value: function updateColumns(columns) {
      var _columns = (0, _normalizeColumns["default"])(columns, tableIDSeed++);

      var fixedColumns = _columns.filter(function (column) {
        return column.fixed === true || column.fixed === 'left';
      });

      var rightFixedColumns = _columns.filter(function (column) {
        return column.fixed === 'right';
      });

      var selectable;

      if (_columns[0] && _columns[0].type === 'selection') {
        selectable = _columns[0].selectable;

        if (fixedColumns.length && !_columns[0].fixed) {
          _columns[0].fixed = true;
          fixedColumns.unshift(_columns[0]);
        }
      }

      _columns = [].concat(fixedColumns, _columns.filter(function (column) {
        return !column.fixed;
      }), rightFixedColumns);
      this.setState(Object.assign(this.state || {}, {
        fixedColumns: fixedColumns,
        rightFixedColumns: rightFixedColumns,
        columnRows: (0, _utils.convertToRows)(_columns),
        columns: (0, _utils.getLeafColumns)(_columns),
        isComplex: fixedColumns.length > 0 || rightFixedColumns.length > 0,
        selectable: selectable
      }));
    }
  }, {
    key: "updateData",
    value: function updateData(props) {
      var _props$data = props.data,
          data = _props$data === void 0 ? [] : _props$data,
          defaultExpandAll = props.defaultExpandAll,
          defaultSort = props.defaultSort;
      var columns = this.state.columns;
      var filteredData = filterData(data.slice(), columns);
      var _this$state2 = this.state,
          hoverRow = _this$state2.hoverRow,
          currentRow = _this$state2.currentRow,
          selectedRows = _this$state2.selectedRows,
          expandingRows = _this$state2.expandingRows;
      hoverRow = hoverRow && data.includes(hoverRow) ? hoverRow : null;
      currentRow = currentRow && data.includes(currentRow) ? currentRow : null;

      var _columns2 = _slicedToArray(columns, 1),
          _columns2$ = _columns2[0],
          firstColumn = _columns2$ === void 0 ? {} : _columns2$;

      if (this._isMounted && data !== this.props.data && !firstColumn.reserveSelection) {
        selectedRows = [];
      } else {
        selectedRows = selectedRows && selectedRows.filter(function (row) {
          return data.includes(row);
        }) || [];
      }

      if (!this._isMounted) {
        expandingRows = defaultExpandAll ? data.slice() : [];
      } else {
        expandingRows = expandingRows.filter(function (row) {
          return data.includes(row);
        });
      }

      this.setState(Object.assign(this.state, {
        data: filteredData,
        filteredData: filteredData,
        hoverRow: hoverRow,
        currentRow: currentRow,
        expandingRows: expandingRows,
        selectedRows: selectedRows
      }));

      if ((!this._isMounted || data !== this.props.data) && defaultSort) {
        var prop = defaultSort.prop,
            _defaultSort$order = defaultSort.order,
            order = _defaultSort$order === void 0 ? 'ascending' : _defaultSort$order;
        var sortColumn = columns.find(function (column) {
          return column.property === prop;
        });
        this.changeSortCondition(sortColumn, order, false);
      } else {
        this.changeSortCondition(null, null, false);
      }
    }
  }, {
    key: "setHoverRow",
    value: function setHoverRow(index) {
      if (!this.state.isComplex) return;
      this.setState({
        hoverRow: index
      });
    }
  }, {
    key: "toggleRowExpanded",
    value: function toggleRowExpanded(row, rowKey) {
      var _this2 = this;

      var expandRowKeys = this.props.expandRowKeys;
      var expandingRows = this.state.expandingRows;

      if (expandRowKeys) {
        var isRowExpanding = expandRowKeys.includes(rowKey);
        this.dispatchEvent('onExpand', row, !isRowExpanding);
        return;
      }

      expandingRows = expandingRows.slice();
      var rowIndex = expandingRows.indexOf(row);

      if (rowIndex > -1) {
        expandingRows.splice(rowIndex, 1);
      } else {
        expandingRows.push(row);
      }

      this.setState({
        expandingRows: expandingRows
      }, function () {
        _this2.dispatchEvent('onExpand', row, rowIndex === -1);
      });
    }
  }, {
    key: "isRowExpanding",
    value: function isRowExpanding(row, rowKey) {
      var expandRowKeys = this.props.expandRowKeys;
      var expandingRows = this.state.expandingRows;

      if (expandRowKeys) {
        return expandRowKeys.includes(rowKey);
      }

      return expandingRows.includes(row);
    }
  }, {
    key: "setCurrentRow",
    value: function setCurrentRow(row) {
      var _this3 = this;

      var _this$props2 = this.props,
          currentRowKey = _this$props2.currentRowKey,
          rowKey = _this$props2.rowKey;

      if (currentRowKey && !Array.isArray(currentRowKey)) {
        this.dispatchEvent('onCurrentChange', (0, _utils.getRowIdentity)(row, rowKey), currentRowKey);
        return;
      }

      var oldRow = this.state.currentRow;
      this.setState({
        currentRow: row
      }, function () {
        _this3.dispatchEvent('onCurrentChange', row, oldRow);
      });
    }
  }, {
    key: "toggleRowSelection",
    value: function toggleRowSelection(row, isSelected) {
      var _this4 = this;

      var _this$props3 = this.props,
          currentRowKey = _this$props3.currentRowKey,
          rowKey = _this$props3.rowKey;

      if (Array.isArray(currentRowKey)) {
        var toggledRowKey = (0, _utils.getRowIdentity)(row, rowKey);
        var rowIndex = currentRowKey.indexOf(toggledRowKey);
        var newCurrentRowKey = currentRowKey.slice();

        if (isSelected !== undefined) {
          if (isSelected && rowIndex === -1) {
            newCurrentRowKey.push(toggledRowKey);
          } else if (!isSelected && rowIndex !== -1) {
            newCurrentRowKey.splice(rowIndex, 1);
          }
        } else {
          rowIndex === -1 ? newCurrentRowKey.push(toggledRowKey) : newCurrentRowKey.splice(rowIndex, 1);
        }

        this.dispatchEvent('onSelect', newCurrentRowKey, row);
        this.dispatchEvent('onSelectChange', newCurrentRowKey);
        return;
      }

      this.setState(function (state) {
        var selectedRows = state.selectedRows.slice();
        var rowIndex = selectedRows.indexOf(row);

        if (isSelected !== undefined) {
          if (isSelected) {
            rowIndex === -1 && selectedRows.push(row);
          } else {
            rowIndex !== -1 && selectedRows.splice(rowIndex, 1);
          }
        } else {
          rowIndex === -1 ? selectedRows.push(row) : selectedRows.splice(rowIndex, 1);
        }

        return {
          selectedRows: selectedRows
        };
      }, function () {
        _this4.dispatchEvent('onSelect', _this4.state.selectedRows, row);

        _this4.dispatchEvent('onSelectChange', _this4.state.selectedRows);
      });
    }
  }, {
    key: "toggleAllSelection",
    value: function toggleAllSelection() {
      var _this5 = this;

      var _this$props4 = this.props,
          currentRowKey = _this$props4.currentRowKey,
          rowKey = _this$props4.rowKey;
      var _this$state3 = this.state,
          data = _this$state3.data,
          selectedRows = _this$state3.selectedRows,
          selectable = _this$state3.selectable;
      var allSelectableRows = selectable ? data.filter(function (data, index) {
        return selectable(data, index);
      }) : data.slice();

      if (Array.isArray(currentRowKey)) {
        var newCurrentRowKey = this.isAllSelected ? [] : allSelectableRows.map(function (row) {
          return (0, _utils.getRowIdentity)(row, rowKey);
        });
        this.dispatchEvent('onSelectAll', newCurrentRowKey);
        this.dispatchEvent('onSelectChange', newCurrentRowKey);
        return;
      }

      if (this.isAllSelected) {
        selectedRows = [];
      } else {
        selectedRows = allSelectableRows;
      }

      this.setState({
        selectedRows: selectedRows
      }, function () {
        _this5.dispatchEvent('onSelectAll', selectedRows);

        _this5.dispatchEvent('onSelectChange', selectedRows);
      });
    }
  }, {
    key: "clearSelection",
    value: function clearSelection() {
      var currentRowKey = this.props.currentRowKey;
      if (Array.isArray(currentRowKey)) return;
      this.setState({
        selectedRows: []
      });
    }
  }, {
    key: "isRowSelected",
    value: function isRowSelected(row, rowKey) {
      var currentRowKey = this.props.currentRowKey;
      var selectedRows = this.state.selectedRows;

      if (Array.isArray(currentRowKey)) {
        return currentRowKey.includes(rowKey);
      }

      return selectedRows.includes(row);
    }
  }, {
    key: "changeSortCondition",
    value: function changeSortCondition(column, order) {
      var _this6 = this;

      var shouldDispatchEvent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      if (!column) {
        var _this$state4 = this.state;
        column = _this$state4.sortColumn;
        order = _this$state4.sortOrder;
      }

      var data = this.state.filteredData.slice();

      if (!column) {
        this.setState({
          data: data
        });
        return;
      }

      var _column = column,
          sortMethod = _column.sortMethod,
          property = _column.property,
          sortable = _column.sortable;
      var sortedData;

      if (!order || sortable === 'custom') {
        sortedData = data;
      } else if (sortable && sortable !== 'custom') {
        var flag = order === 'ascending' ? 1 : -1;

        if (sortMethod) {
          sortedData = data.sort(function (a, b) {
            return sortMethod(a, b) ? flag : -flag;
          });
        } else {
          sortedData = data.sort(function (a, b) {
            var aVal = (0, _utils.getValueByPath)(a, property);
            var bVal = (0, _utils.getValueByPath)(b, property);
            return aVal === bVal ? 0 : aVal > bVal ? flag : -flag;
          });
        }
      }

      var sortSet = function sortSet() {
        shouldDispatchEvent && _this6.dispatchEvent('onSortChange', column && order ? {
          column: column,
          prop: column.property,
          order: order
        } : {
          column: null,
          prop: null,
          order: null
        });
      };

      if (sortable && sortable !== 'custom') {
        this.setState({
          sortColumn: column,
          sortOrder: order,
          data: sortedData
        }, sortSet());
      } else if (sortable && sortable === 'custom') {
        this.setState({
          sortColumn: column,
          sortOrder: order
        }, sortSet());
      }
    }
  }, {
    key: "toggleFilterOpened",
    value: function toggleFilterOpened(column) {
      column.filterOpened = !column.filterOpened;
      this.forceUpdate();
    }
  }, {
    key: "changeFilteredValue",
    value: function changeFilteredValue(column, value) {
      var _this7 = this;

      column.filteredValue = value;
      var filteredData = filterData(this.props.data.slice(), this.state.columns);
      this.setState(Object.assign(this.state, {
        filteredData: filteredData
      }), function () {
        _this7.dispatchEvent('onFilterChange', _defineProperty({}, column.columnKey, value));
      });
      this.changeSortCondition(null, null, false);
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
    key: "render",
    value: function render() {
      var renderExpanded = (this.state.columns.find(function (column) {
        return column.type === 'expand';
      }) || {}).expandPannel;
      return /*#__PURE__*/React.createElement(_TableLayout["default"], _extends({}, this.props, {
        renderExpanded: renderExpanded,
        tableStoreState: this.state
      }));
    }
  }]);

  return TableStore;
}(_libs.Component);

exports["default"] = TableStore;

_defineProperty(TableStore, "propTypes", {
  style: _libs.PropTypes.object,
  columns: _libs.PropTypes.arrayOf(_libs.PropTypes.object),
  data: _libs.PropTypes.arrayOf(_libs.PropTypes.object),
  height: _libs.PropTypes.oneOfType([_libs.PropTypes.string, _libs.PropTypes.number]),
  maxHeight: _libs.PropTypes.oneOfType([_libs.PropTypes.string, _libs.PropTypes.number]),
  stripe: _libs.PropTypes.bool,
  border: _libs.PropTypes.bool,
  fit: _libs.PropTypes.bool,
  showHeader: _libs.PropTypes.bool,
  highlightCurrentRow: _libs.PropTypes.bool,
  currentRowKey: _libs.PropTypes.oneOfType([_libs.PropTypes.string, _libs.PropTypes.number, _libs.PropTypes.arrayOf(_libs.PropTypes.string)]),
  rowClassName: _libs.PropTypes.func,
  rowStyle: _libs.PropTypes.func,
  rowKey: _libs.PropTypes.oneOfType([_libs.PropTypes.func, _libs.PropTypes.string]),
  emptyText: _libs.PropTypes.string,
  defaultExpandAll: _libs.PropTypes.bool,
  expandRowKeys: _libs.PropTypes.arrayOf(_libs.PropTypes.oneOfType([_libs.PropTypes.string, _libs.PropTypes.number])),
  defaultSort: _libs.PropTypes.shape({
    prop: _libs.PropTypes.string,
    order: _libs.PropTypes.oneOf(['ascending', 'descending'])
  }),
  tooltipEffect: _libs.PropTypes.oneOf(['dark', 'light']),
  showSummary: _libs.PropTypes.bool,
  sumText: _libs.PropTypes.string,
  summaryMethod: _libs.PropTypes.func,
  onSelect: _libs.PropTypes.func,
  onSelectAll: _libs.PropTypes.func,
  onSelectChange: _libs.PropTypes.func
});

_defineProperty(TableStore, "defaultProps", {
  data: [],
  showHeader: true,
  stripe: false,
  fit: true,
  emptyText: _locale["default"].t('el.table.emptyText'),
  defaultExpandAll: false,
  highlightCurrentRow: false,
  showSummary: false,
  sumText: _locale["default"].t('el.table.sumText')
});

_defineProperty(TableStore, "childContextTypes", {
  tableStore: _libs.PropTypes.any
});