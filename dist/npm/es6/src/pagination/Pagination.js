"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _libs = require("../../libs");

var _Pager = _interopRequireDefault(require("./Pager"));

var _select = _interopRequireDefault(require("../select"));

var _locale = _interopRequireDefault(require("../locale"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

var Pre = function Pre(props) {
  var disabled = props.internalCurrentPage <= 1 ? 'disabled' : '';
  return /*#__PURE__*/_react["default"].createElement("button", {
    type: "button",
    className: "btn-prev ".concat(disabled),
    onClick: props.prev
  }, /*#__PURE__*/_react["default"].createElement("i", {
    className: "el-icon el-icon-arrow-left"
  }));
};

var Next = function Next(props) {
  var disabled = props.internalCurrentPage === props.internalPageCount || props.internalPageCount === 0 ? 'disabled' : '';
  return /*#__PURE__*/_react["default"].createElement("button", {
    type: "button",
    className: "btn-next ".concat(disabled),
    onClick: props.next
  }, /*#__PURE__*/_react["default"].createElement("i", {
    className: "el-icon el-icon-arrow-right"
  }));
};

var Sizes = /*#__PURE__*/function (_Component) {
  _inherits(Sizes, _Component);

  var _super = _createSuper(Sizes);

  function Sizes() {
    _classCallCheck(this, Sizes);

    return _super.apply(this, arguments);
  }

  _createClass(Sizes, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          onSizeChange = _this$props.onSizeChange,
          internalPageSize = _this$props.internalPageSize;
      return /*#__PURE__*/_react["default"].createElement("span", {
        className: "el-pagination__sizes"
      }, /*#__PURE__*/_react["default"].createElement(_select["default"], {
        size: "small",
        value: internalPageSize,
        onChange: onSizeChange,
        width: 110
      }, this.props.pageSizes.map(function (item, idx) {
        return /*#__PURE__*/_react["default"].createElement(_select["default"].Option, {
          key: idx,
          value: item,
          label: item + ' ' + _locale["default"].t('el.pagination.pagesize')
        });
      })));
    }
  }]);

  return Sizes;
}(_libs.Component);

var Total = function Total(props) {
  return typeof props.total === 'number' ? /*#__PURE__*/_react["default"].createElement("span", {
    className: "el-pagination__total"
  }, _locale["default"].t('el.pagination.total', {
    total: props.total
  })) : /*#__PURE__*/_react["default"].createElement("span", null);
};

var Jumper = /*#__PURE__*/function (_Component2) {
  _inherits(Jumper, _Component2);

  var _super2 = _createSuper(Jumper);

  function Jumper() {
    _classCallCheck(this, Jumper);

    return _super2.apply(this, arguments);
  }

  _createClass(Jumper, [{
    key: "handleChange",
    value: function handleChange(_ref) {
      var target = _ref.target;
      var jumper = this.props.jumper;
      jumper(target.value);
    }
  }, {
    key: "handleFocus",
    value: function handleFocus() {}
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      return /*#__PURE__*/_react["default"].createElement("span", {
        className: "el-pagination__jump"
      }, _locale["default"].t('el.pagination.goto'), /*#__PURE__*/_react["default"].createElement("input", {
        className: "el-pagination__editor",
        type: "number",
        min: 1,
        max: this.props.internalPageCount,
        defaultValue: this.props.internalCurrentPage,
        onBlur: this.handleChange.bind(this),
        onKeyUp: function onKeyUp(e) {
          if (e.keyCode == 13) {
            _this.handleChange(e);
          }
        },
        onFocus: this.handleFocus.bind(this),
        style: {
          width: '30px'
        }
      }), _locale["default"].t('el.pagination.pageClassifier'));
    }
  }]);

  return Jumper;
}(_libs.Component);

var Pagination = /*#__PURE__*/function (_Component3) {
  _inherits(Pagination, _Component3);

  var _super3 = _createSuper(Pagination);

  function Pagination(props, context) {
    var _this2;

    _classCallCheck(this, Pagination);

    _this2 = _super3.call(this, props, context);

    _defineProperty(_assertThisInitialized(_this2), "state", void 0);

    var _this2$props = _this2.props,
        currentPage = _this2$props.currentPage,
        pageSizes = _this2$props.pageSizes,
        pageSize = _this2$props.pageSize,
        total = _this2$props.total,
        pageCount = _this2$props.pageCount,
        layout = _this2$props.layout;
    var internalPageSize = 0;

    if (layout.split(',').indexOf('sizes') > -1 && Array.isArray(pageSizes)) {
      internalPageSize = pageSizes.indexOf(pageSize) > -1 ? pageSize : pageSizes[0];
    } else {
      internalPageSize = pageSize;
    }

    _this2.state = {
      internalPageSize: internalPageSize,
      total: total,
      pageCount: pageCount,
      internalCurrentPage: currentPage ? _this2.getValidCurrentPage(currentPage) : 1
    };
    return _this2;
  }

  _createClass(Pagination, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var _this3 = this;

      var _this$props2 = this.props,
          currentPage = _this$props2.currentPage,
          pageSizes = _this$props2.pageSizes,
          pageSize = _this$props2.pageSize,
          total = _this$props2.total,
          pageCount = _this$props2.pageCount;

      if (nextProps.currentPage != currentPage || nextProps.pageSizes != pageSizes || nextProps.pageSize != pageSize || nextProps.total != total || nextProps.pageCount != pageCount) {
        var internalPageSize = this.state.internalPageSize;
        var hasSizesLayout = nextProps.layout.split(',').map(function (item) {
          return item.trim();
        }).indexOf('sizes') > -1;

        if (hasSizesLayout && Array.isArray(nextProps.pageSizes)) {
          internalPageSize = nextProps.pageSizes.indexOf(nextProps.pageSize) > -1 ? nextProps.pageSize : nextProps.pageSizes[0];
        }

        this.setState({
          internalPageSize: internalPageSize,
          total: nextProps.total,
          pageCount: nextProps.pageCount
        }, function () {
          _this3.setState({
            internalCurrentPage: nextProps.currentPage ? _this3.getValidCurrentPage(nextProps.currentPage) : 1
          });
        });
      }
    }
  }, {
    key: "pre",
    value: function pre() {
      var _this4 = this;

      var oldPage = this.state.internalCurrentPage;
      var newVal = this.state.internalCurrentPage - 1;
      this.setState({
        internalCurrentPage: this.getValidCurrentPage(newVal)
      }, function () {
        if (_this4.state.internalCurrentPage !== oldPage) {
          var onCurrentChange = _this4.props.onCurrentChange;
          onCurrentChange && onCurrentChange(_this4.state.internalCurrentPage);
        }
      });
    }
  }, {
    key: "next",
    value: function next() {
      var _this5 = this;

      var oldPage = this.state.internalCurrentPage;
      var newVal = this.state.internalCurrentPage + 1;
      this.setState({
        internalCurrentPage: this.getValidCurrentPage(newVal)
      }, function () {
        if (_this5.state.internalCurrentPage !== oldPage) {
          var onCurrentChange = _this5.props.onCurrentChange;
          onCurrentChange && onCurrentChange(_this5.state.internalCurrentPage);
        }
      });
    }
  }, {
    key: "getValidCurrentPage",
    value: function getValidCurrentPage(value) {
      value = parseInt(value, 10);
      var internalPageCount = this.internalPageCount();
      var resetValue;

      if (!internalPageCount) {
        if (isNaN(value) || value < 1) resetValue = 1;
      } else {
        if (value < 1) {
          resetValue = 1;
        } else if (value > internalPageCount) {
          resetValue = internalPageCount;
        }
      }

      if (resetValue === undefined && isNaN(value)) {
        resetValue = 1;
      } else if (resetValue === 0) {
        resetValue = 1;
      }

      return resetValue === undefined ? value : resetValue;
    }
  }, {
    key: "internalPageCount",
    value: function internalPageCount() {
      if (this.state) {
        if (typeof this.state.total === 'number') {
          return Math.ceil(this.state.total / this.state.internalPageSize);
        } else if (typeof this.state.pageCount === 'number') {
          return this.state.pageCount;
        }
      }

      return null;
    }
  }, {
    key: "jumperToPage",
    value: function jumperToPage(page) {
      var _this6 = this;

      var oldPage = this.state.internalCurrentPage;
      this.setState({
        internalCurrentPage: this.getValidCurrentPage(page)
      }, function () {
        if (oldPage !== _this6.state.internalCurrentPage) {
          var onCurrentChange = _this6.props.onCurrentChange;
          onCurrentChange && onCurrentChange(_this6.state.internalCurrentPage);
        }
      }); //this.oldValue = null;
    }
  }, {
    key: "handleCurrentChange",
    value: function handleCurrentChange(val) {
      var _this7 = this;

      var oldPage = this.state.internalCurrentPage;
      this.setState({
        internalCurrentPage: this.getValidCurrentPage(val)
      }, function () {
        if (oldPage !== _this7.state.internalCurrentPage) {
          var onCurrentChange = _this7.props.onCurrentChange;
          onCurrentChange && onCurrentChange(_this7.state.internalCurrentPage);
        }
      });
    }
  }, {
    key: "onSizeChange",
    value: function onSizeChange(val) {
      var _this8 = this;

      if (val !== this.state.internalPageSize) {
        val = parseInt(val, 10);
        this.setState({
          internalPageSize: val
        }, function () {
          _this8.setState({
            internalCurrentPage: _this8.getValidCurrentPage(_this8.state.internalCurrentPage)
          });

          var onSizeChange = _this8.props.onSizeChange;
          onSizeChange && onSizeChange(val);
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state = this.state,
          internalCurrentPage = _this$state.internalCurrentPage,
          internalPageSize = _this$state.internalPageSize;
      var className = this.classNames({
        'el-pagination': true,
        'el-pagination__rightwrapper': false,
        'el-pagination--small': this.props.small
      });
      var children = [];
      var layout = this.props.layout || '';
      if (!layout) return null;
      var components = layout.split(',').map(function (item) {
        return item.trim();
      });
      var TEMPLATE_MAP = {
        prev: /*#__PURE__*/_react["default"].createElement(Pre, {
          key: "pre",
          internalCurrentPage: internalCurrentPage,
          prev: this.pre.bind(this)
        }),
        jumper: /*#__PURE__*/_react["default"].createElement(Jumper, {
          key: "jumper",
          jumper: this.jumperToPage.bind(this),
          internalPageCount: this.internalPageCount(),
          internalCurrentPage: internalCurrentPage
        }),
        pager: /*#__PURE__*/_react["default"].createElement(_Pager["default"], {
          key: "pager",
          currentPage: internalCurrentPage,
          pageCount: this.internalPageCount(),
          onChange: this.handleCurrentChange.bind(this)
        }),
        next: /*#__PURE__*/_react["default"].createElement(Next, {
          key: "next",
          internalCurrentPage: internalCurrentPage,
          internalPageCount: this.internalPageCount(),
          next: this.next.bind(this)
        }),
        sizes: /*#__PURE__*/_react["default"].createElement(Sizes, {
          key: "sizes",
          internalPageSize: internalPageSize,
          pageSizes: this.props.pageSizes,
          onSizeChange: this.onSizeChange.bind(this)
        }),
        total: /*#__PURE__*/_react["default"].createElement(Total, {
          key: "total",
          total: this.state.total
        })
      };
      components.forEach(function (compo) {
        if (compo !== '->') {
          children.push(TEMPLATE_MAP[compo]);
        }
      });
      return /*#__PURE__*/_react["default"].createElement("div", {
        style: this.style(),
        className: this.className(className)
      }, children);
    }
  }]);

  return Pagination;
}(_libs.Component);

exports["default"] = Pagination;
Pagination.propTypes = {
  pageSize: _libs.PropTypes.number,
  small: _libs.PropTypes.bool,
  total: _libs.PropTypes.number,
  pageCount: _libs.PropTypes.number,
  currentPage: _libs.PropTypes.number,
  layout: _libs.PropTypes.string,
  pageSizes: _libs.PropTypes.array,
  //Event
  onCurrentChange: _libs.PropTypes.func,
  onSizeChange: _libs.PropTypes.func
};
Pagination.defaultProps = {
  small: false,
  pageSize: 10,
  currentPage: 1,
  layout: 'prev, pager, next, jumper, ->, total',
  pageSizes: [10, 20, 30, 40, 50, 100]
};