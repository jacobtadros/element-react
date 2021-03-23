"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var React = _interopRequireWildcard(require("react"));

var _libs = require("../../libs");

var _TableHeader = _interopRequireDefault(require("./TableHeader"));

var _TableBody = _interopRequireDefault(require("./TableBody"));

var _TableFooter = _interopRequireDefault(require("./TableFooter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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

// let tableIdSeed = 1;
var Table = /*#__PURE__*/function (_Component) {
  _inherits(Table, _Component);

  var _super = _createSuper(Table);

  function Table(props) {
    var _this;

    _classCallCheck(this, Table);

    _this = _super.call(this, props);
    _this.state = {}; // this.tableId = `el-table_${tableIdSeed++}_`;
    // this.tableId = tableIdSeed++;

    ['syncScroll'].forEach(function (fn) {
      _this[fn] = _this[fn].bind(_assertThisInitialized(_this));
    });
    return _this;
  }

  _createClass(Table, [{
    key: "bodyWrapperHeight",
    get: function get() {
      var _this$props = this.props,
          layout = _this$props.layout,
          height = _this$props.height,
          maxHeight = _this$props.maxHeight;
      var style = {};

      if (height) {
        style.height = layout.bodyHeight || '';
      } else if (maxHeight) {
        if (layout.headerHeight !== null) {
          // 非首次渲染
          style.maxHeight = maxHeight - layout.headerHeight - layout.footerHeight;
        }
      }

      return style;
    }
  }, {
    key: "bodyWidth",
    get: function get() {
      var layout = this.props.layout;
      var bodyWidth = layout.bodyWidth,
          scrollY = layout.scrollY,
          gutterWidth = layout.gutterWidth;
      return bodyWidth ? bodyWidth - (scrollY ? gutterWidth : 0) : '';
    }
  }, {
    key: "fixedHeight",
    get: function get() {
      var layout = this.props.layout;
      return {
        bottom: layout.scrollX ? layout.gutterWidth - 1 : 0
      };
    }
  }, {
    key: "fixedBodyHeight",
    get: function get() {
      var _this$props2 = this.props,
          layout = _this$props2.layout,
          props = _objectWithoutProperties(_this$props2, ["layout"]);

      var style = {};

      if (props.height) {
        style.height = layout.fixedBodyHeight || '';
      } else if (props.maxHeight) {
        if (layout.headerHeight !== null) {
          style.maxHeight = props.maxHeight - layout.headerHeight - layout.footerHeight - (layout.scrollX ? layout.gutterWidth : 0);
        }
      }

      return style;
    }
  }, {
    key: "getChildContext",
    value: function getChildContext() {
      return {
        table: this
      };
    }
  }, {
    key: "syncScroll",
    value: function syncScroll() {
      var headerWrapper = this.headerWrapper,
          footerWrapper = this.footerWrapper,
          bodyWrapper = this.bodyWrapper,
          fixedBodyWrapper = this.fixedBodyWrapper,
          rightFixedBodyWrapper = this.rightFixedBodyWrapper;

      if (headerWrapper) {
        headerWrapper.scrollLeft = bodyWrapper.scrollLeft;
      }

      if (footerWrapper) {
        footerWrapper.scrollLeft = bodyWrapper.scrollLeft;
      }

      if (fixedBodyWrapper) {
        fixedBodyWrapper.scrollTop = bodyWrapper.scrollTop;
      }

      if (rightFixedBodyWrapper) {
        rightFixedBodyWrapper.scrollTop = bodyWrapper.scrollTop;
      }
    }
  }, {
    key: "bindRef",
    value: function bindRef(key) {
      var _this2 = this;

      return function (node) {
        _this2[key] = node;
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          tableStoreState = _this$props3.tableStoreState,
          layout = _this$props3.layout,
          props = _objectWithoutProperties(_this$props3, ["tableStoreState", "layout"]);

      var isHidden = this.state.isHidden;
      return /*#__PURE__*/React.createElement("div", {
        style: this.style({
          height: props.height,
          maxHeight: props.maxHeight
        }),
        className: this.className('el-table', {
          'el-table--fit': props.fit,
          'el-table--striped': props.stripe,
          'el-table--border': props.border,
          'el-table--hidden': isHidden,
          'el-table--fluid-height': props.maxHeight,
          'el-table--enable-row-hover': !tableStoreState.isComplex,
          'el-table--enable-row-transition': (tableStoreState.data || []).length && (tableStoreState.data || []).length < 100
        }),
        ref: this.bindRef('el')
      }, props.showHeader && /*#__PURE__*/React.createElement("div", {
        className: "el-table__header-wrapper",
        ref: this.bindRef('headerWrapper')
      }, /*#__PURE__*/React.createElement(_TableHeader["default"], _extends({}, this.props, {
        style: {
          width: this.bodyWidth || ''
        }
      }))), /*#__PURE__*/React.createElement("div", {
        style: this.bodyWrapperHeight,
        className: "el-table__body-wrapper",
        ref: this.bindRef('bodyWrapper'),
        onScroll: this.syncScroll
      }, /*#__PURE__*/React.createElement(_TableBody["default"], _extends({}, this.props, {
        style: {
          width: this.bodyWidth
        }
      })), (!props.data || !props.data.length) && /*#__PURE__*/React.createElement("div", {
        style: {
          width: this.bodyWidth
        },
        className: "el-table__empty-block"
      }, /*#__PURE__*/React.createElement("span", {
        className: "el-table__empty-text"
      }, props.emptyText))), props.showSummary && /*#__PURE__*/React.createElement("div", {
        style: {
          visibility: props.data && props.data.length ? 'visible' : 'hidden'
        },
        className: "el-table__footer-wrapper",
        ref: this.bindRef('footerWrapper')
      }, /*#__PURE__*/React.createElement(_TableFooter["default"], _extends({}, this.props, {
        style: {
          width: this.bodyWidth || ''
        }
      }))), !!tableStoreState.fixedColumns.length && /*#__PURE__*/React.createElement("div", {
        style: Object.assign({}, this.fixedHeight, {
          width: layout.fixedWidth || ''
        }),
        className: "el-table__fixed",
        ref: this.bindRef('fixedWrapper')
      }, props.showHeader && /*#__PURE__*/React.createElement("div", {
        className: "el-table__fixed-header-wrapper",
        ref: this.bindRef('fixedHeaderWrapper')
      }, /*#__PURE__*/React.createElement(_TableHeader["default"], _extends({
        fixed: "left"
      }, this.props, {
        style: {
          width: this.bodyWidth || ''
        }
      }))), /*#__PURE__*/React.createElement("div", {
        style: Object.assign({}, this.fixedBodyHeight, {
          top: layout.headerHeight || 0
        }),
        className: "el-table__fixed-body-wrapper",
        ref: this.bindRef('fixedBodyWrapper')
      }, /*#__PURE__*/React.createElement(_TableBody["default"], _extends({
        fixed: "left"
      }, this.props, {
        style: {
          width: this.bodyWidth || ''
        }
      }))), props.showSummary && /*#__PURE__*/React.createElement("div", {
        className: "el-table__fixed-footer-wrapper",
        ref: this.bindRef('fixedFooterWrapper')
      }, /*#__PURE__*/React.createElement(_TableFooter["default"], _extends({
        fixed: "left"
      }, this.props, {
        style: {
          width: this.bodyWidth || ''
        }
      })))), !!tableStoreState.rightFixedColumns.length && /*#__PURE__*/React.createElement("div", {
        className: "el-table__fixed-right",
        ref: this.bindRef('rightFixedWrapper'),
        style: Object.assign({}, {
          width: layout.rightFixedWidth || '',
          right: layout.scrollY ? props.border ? layout.gutterWidth : layout.gutterWidth || 1 : ''
        }, this.fixedHeight)
      }, props.showHeader && /*#__PURE__*/React.createElement("div", {
        className: "el-table__fixed-header-wrapper",
        ref: this.bindRef('rightFixedHeaderWrapper')
      }, /*#__PURE__*/React.createElement(_TableHeader["default"], _extends({
        fixed: "right"
      }, this.props, {
        style: {
          width: this.bodyWidth || ''
        }
      }))), /*#__PURE__*/React.createElement("div", {
        className: "el-table__fixed-body-wrapper",
        ref: this.bindRef('rightFixedBodyWrapper'),
        style: Object.assign({}, {
          top: layout.headerHeight
        }, this.fixedBodyHeight)
      }, /*#__PURE__*/React.createElement(_TableBody["default"], _extends({
        fixed: "right"
      }, this.props, {
        style: {
          width: this.bodyWidth || ''
        }
      }))), props.showSummary && /*#__PURE__*/React.createElement("div", {
        className: "el-table__fixed-footer-wrapper",
        ref: this.bindRef('rightFixedFooterWrapper'),
        style: {
          visibility: props.data && props.data.length ? 'visible' : 'hidden'
        }
      }, /*#__PURE__*/React.createElement(_TableFooter["default"], _extends({
        fixed: "right"
      }, this.props, {
        style: {
          width: this.bodyWidth || ''
        }
      })))), !!tableStoreState.rightFixedColumns.length && /*#__PURE__*/React.createElement("div", {
        className: "el-table__fixed-right-patch",
        style: {
          width: layout.scrollY ? layout.gutterWidth : '0',
          height: layout.headerHeight
        }
      }), /*#__PURE__*/React.createElement("div", {
        className: "el-table__column-resize-proxy",
        ref: this.bindRef('resizeProxy'),
        style: {
          visibility: 'hidden'
        }
      }));
    }
  }]);

  return Table;
}(_libs.Component);

exports["default"] = Table;

_defineProperty(Table, "contextTypes", {
  tableStore: _libs.PropTypes.any,
  layout: _libs.PropTypes.any
});

_defineProperty(Table, "childContextTypes", {
  table: _libs.PropTypes.any
});