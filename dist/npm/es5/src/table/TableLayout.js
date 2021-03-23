"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var React = _interopRequireWildcard(require("react"));

var _throttleDebounce = require("throttle-debounce");

var _libs = require("../../libs");

var _resizeEvent = require("../../libs/utils/resize-event");

var _Table = _interopRequireDefault(require("./Table"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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

var TableLayout = /*#__PURE__*/function (_Component) {
  _inherits(TableLayout, _Component);

  var _super = _createSuper(TableLayout);

  function TableLayout(props) {
    var _this;

    _classCallCheck(this, TableLayout);

    _this = _super.call(this, props);
    _this.state = {
      height: props.height || props.maxHeight || null,
      // Table's height or maxHeight prop
      gutterWidth: (0, _utils.getScrollBarWidth)(),
      // scrollBar width
      tableHeight: null,
      // Table's real height
      headerHeight: null,
      // header's height of Table
      bodyHeight: null,
      // body's height of Table
      footerHeight: null,
      // footer's height of Table
      fixedBodyHeight: null,
      // fixed body's height of Table
      viewportHeight: null,
      // Table's real height without y scroll bar height
      scrollX: null,
      // has x scroll bar
      scrollY: null // has y scroll bar

    };
    _this.resizeListener = (0, _throttleDebounce.throttle)(50, function () {
      _this.scheduleLayout();
    });
    return _this;
  }

  _createClass(TableLayout, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.el = this.table.el;
      this.scheduleLayout();
      (0, _resizeEvent.addResizeListener)(this.el, this.resizeListener);
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var preHeight = this.props.height || this.props.maxHeight;
      var nextHeight = nextProps.height || nextProps.maxHeight;

      if (preHeight !== nextHeight) {
        this.setState({
          height: nextHeight
        });
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(preProps) {
      var _this2 = this;

      if (this.isPropChanged('columns', preProps) || this.isPropChanged('style', preProps) || this.isPropChanged('className', preProps)) {
        this.scheduleLayout();
        return;
      }

      var shouldUpdateHeight = ['height', 'maxHeight', 'data', 'store.expandingRows', 'expandRowKeys', 'showSummary', 'summaryMethod', 'sumText'].some(function (key) {
        return _this2.isPropChanged(key, preProps);
      });

      if (shouldUpdateHeight) {
        this.updateHeight();
        this.updateScrollY();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      (0, _resizeEvent.removeResizeListener)(this.el, this.resizeListener);
    }
  }, {
    key: "isPropChanged",
    value: function isPropChanged(key, preProps) {
      var prop = (0, _utils.getValueByPath)(this.props, key);
      var preProp = (0, _utils.getValueByPath)(preProps, key);
      return prop !== preProp;
    }
  }, {
    key: "getChildContext",
    value: function getChildContext() {
      return {
        layout: this
      };
    }
  }, {
    key: "scheduleLayout",
    value: function scheduleLayout() {
      var _this3 = this;

      this.setState(this.caculateWidth(), function () {
        _this3.updateHeight();

        _this3.updateScrollY();
      });
    } // horizontal direction layout

  }, {
    key: "caculateWidth",
    value: function caculateWidth() {
      var _this$props = this.props,
          _this$props$tableStor = _this$props.tableStoreState,
          columns = _this$props$tableStor.columns,
          fixedColumns = _this$props$tableStor.fixedColumns,
          rightFixedColumns = _this$props$tableStor.rightFixedColumns,
          fit = _this$props.fit;
      var gutterWidth = this.state.gutterWidth;
      var bodyMinWidth = columns.reduce(function (pre, col) {
        return pre + (col.width || col.minWidth);
      }, 0);
      var bodyWidth = this.table.el.clientWidth;
      var scrollX;
      var fixedWidth;
      var rightFixedWidth; // mutate props (TableStore's state[columns])

      var flexColumns = columns.filter(function (column) {
        return typeof column.width !== 'number';
      });

      if (flexColumns.length && fit) {
        if (bodyMinWidth < bodyWidth - gutterWidth) {
          // no scroll bar
          scrollX = false;
          var totalFlexWidth = bodyWidth - gutterWidth - bodyMinWidth;

          if (flexColumns.length === 1) {
            flexColumns[0].realWidth = flexColumns[0].minWidth + totalFlexWidth;
          } else {
            var allColumnsWidth = flexColumns.reduce(function (pre, col) {
              return pre + col.minWidth;
            }, 0);
            var flexWidthPerPixel = totalFlexWidth / allColumnsWidth;
            var widthWithoutFirst = 0;
            flexColumns.forEach(function (column, index) {
              if (index === 0) return;
              var flexWidth = Math.floor(column.minWidth * flexWidthPerPixel);
              widthWithoutFirst += flexWidth;
              column.realWidth = column.minWidth + flexWidth;
            });
            flexColumns[0].realWidth = flexColumns[0].minWidth + totalFlexWidth - widthWithoutFirst;
          }
        } else {
          // have horizontal scroll bar
          scrollX = true;
          flexColumns.forEach(function (column) {
            column.realWidth = column.minWidth;
          });
        }

        bodyWidth = Math.max(bodyMinWidth, bodyWidth);
      } else {
        scrollX = bodyMinWidth > bodyWidth;
        bodyWidth = bodyMinWidth;
      }

      if (fixedColumns.length) {
        fixedWidth = fixedColumns.reduce(function (pre, col) {
          return pre + col.realWidth;
        }, 0);
      }

      if (rightFixedColumns.length) {
        rightFixedWidth = rightFixedColumns.reduce(function (pre, col) {
          return pre + col.realWidth;
        }, 0);
      }

      return {
        scrollX: scrollX,
        bodyWidth: bodyWidth,
        fixedWidth: fixedWidth,
        rightFixedWidth: rightFixedWidth
      };
    } // vertical direction layout

  }, {
    key: "updateHeight",
    value: function updateHeight() {
      var _this4 = this;

      this.setState(function (state) {
        var data = _this4.props.data;
        var scrollX = state.scrollX,
            gutterWidth = state.gutterWidth;
        var noData = !data || !data.length;
        var _this4$table = _this4.table,
            headerWrapper = _this4$table.headerWrapper,
            footerWrapper = _this4$table.footerWrapper;
        var tableHeight = _this4.el.clientHeight;
        var headerHeight = headerWrapper ? headerWrapper.offsetHeight : 0;
        var footerHeight = footerWrapper ? footerWrapper.offsetHeight : 0;
        var bodyHeight = tableHeight - headerHeight - footerHeight + (footerWrapper ? 1 : 0);
        var fixedBodyHeight = bodyHeight - (scrollX ? gutterWidth : 0);
        var viewportHeight = tableHeight - (scrollX && !noData ? gutterWidth : 0);
        return {
          tableHeight: tableHeight,
          headerHeight: headerHeight,
          bodyHeight: bodyHeight,
          footerHeight: footerHeight,
          fixedBodyHeight: fixedBodyHeight,
          viewportHeight: viewportHeight // no useful

        };
      });
    } // judge if has scroll-Y bar

  }, {
    key: "updateScrollY",
    value: function updateScrollY() {
      var _this5 = this;

      this.setState(function (state) {
        var bodyWrapper = _this5.table.bodyWrapper;
        var fixedBodyHeight = state.fixedBodyHeight;
        var body = bodyWrapper.querySelector('.el-table__body');
        var scrollY = body.offsetHeight > fixedBodyHeight;
        return {
          scrollY: scrollY
        };
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this6 = this;

      return /*#__PURE__*/React.createElement(_Table["default"], _extends({
        ref: function ref(table) {
          _this6.table = table;
        }
      }, this.props, {
        layout: this.state
      }));
    }
  }]);

  return TableLayout;
}(_libs.Component);

exports["default"] = TableLayout;

_defineProperty(TableLayout, "childContextTypes", {
  layout: _libs.PropTypes.any
});