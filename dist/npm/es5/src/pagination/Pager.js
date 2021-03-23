"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _libs = require("../../libs");

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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Pager = /*#__PURE__*/function (_Component) {
  _inherits(Pager, _Component);

  var _super = _createSuper(Pager);

  function Pager(props, context) {
    var _this;

    _classCallCheck(this, Pager);

    _this = _super.call(this, props, context);

    _defineProperty(_assertThisInitialized(_this), "state", void 0);

    _this.state = {
      internalCurrentPage: 1,
      internalPageSize: 0,
      quickprevIconClass: 'el-icon-more',
      quicknextIconClass: 'el-icon-more',
      showPrevMore: false,
      showNextMore: false
    };
    return _this;
  }

  _createClass(Pager, [{
    key: "onPagerClick",
    value: function onPagerClick(e) {
      var target = e.target;

      if (target instanceof HTMLElement) {
        if (target.tagName === 'UL') {
          return;
        }

        var newPage = Number(target.textContent);
        var pageCount = this.props.pageCount;
        var currentPage = this.props.currentPage;

        if (target.className.indexOf('more') !== -1) {
          if (target.className.indexOf('quickprev') !== -1) {
            newPage = currentPage - 5;
          } else if (target.className.indexOf('quicknext') !== -1) {
            newPage = currentPage + 5;
          }
        }
        /* istanbul ignore if */


        if (!isNaN(newPage)) {
          if (newPage < 1) {
            newPage = 1;
          }

          if (newPage > pageCount) {
            newPage = pageCount;
          }
        }

        if (newPage !== currentPage) {
          this.props.onChange(newPage);
        }
      }
    }
  }, {
    key: "getPages",
    value: function getPages() {
      var pagerCount = 7;
      var currentPage = Number(this.props.currentPage);
      var pageCount = Number(this.props.pageCount);
      var showPrevMore = false;
      var showNextMore = false;

      if (pageCount > pagerCount) {
        if (currentPage > pagerCount - 2) {
          showPrevMore = true;
        }

        if (currentPage < pageCount - 2) {
          showNextMore = true;
        }
      }

      var array = [];

      if (showPrevMore && !showNextMore) {
        var startPage = pageCount - (pagerCount - 2);

        for (var i = startPage; i < pageCount; i++) {
          array.push(i);
        }
      } else if (!showPrevMore && showNextMore) {
        for (var _i = 2; _i < pagerCount; _i++) {
          array.push(_i);
        }
      } else if (showPrevMore && showNextMore) {
        var offset = Math.floor(pagerCount / 2) - 1;

        for (var _i2 = currentPage - offset; _i2 <= currentPage + offset; _i2++) {
          array.push(_i2);
        }
      } else {
        for (var _i3 = 2; _i3 < pageCount; _i3++) {
          array.push(_i3);
        }
      }

      this.state.showPrevMore = showPrevMore;
      this.state.showNextMore = showNextMore;
      this.state.quickprevIconClass = showPrevMore ? this.state.quickprevIconClass : 'el-icon-more';
      this.state.quicknextIconClass = showNextMore ? this.state.quicknextIconClass : 'el-icon-more';
      return array;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var pagers = this.getPages();
      var _this$props = this.props,
          currentPage = _this$props.currentPage,
          pageCount = _this$props.pageCount;
      var _this$state = this.state,
          quickprevIconClass = _this$state.quickprevIconClass,
          quicknextIconClass = _this$state.quicknextIconClass;
      return /*#__PURE__*/_react["default"].createElement("ul", {
        onClick: this.onPagerClick.bind(this),
        className: "el-pager"
      }, pageCount > 0 && /*#__PURE__*/_react["default"].createElement("li", {
        className: this.classNames('number', {
          active: currentPage === 1
        })
      }, "1"), this.state.showPrevMore && /*#__PURE__*/_react["default"].createElement("li", {
        className: this.classNames('el-icon more btn-quickprev', quickprevIconClass),
        onMouseEnter: function onMouseEnter() {
          _this2.setState({
            quickprevIconClass: 'el-icon-d-arrow-left'
          });
        },
        onMouseLeave: function onMouseLeave() {
          _this2.setState({
            quickprevIconClass: 'el-icon-more'
          });
        }
      }), pagers.map(function (pager, idx) {
        return /*#__PURE__*/_react["default"].createElement("li", {
          key: idx,
          className: _this2.classNames('number', {
            active: currentPage === pager
          })
        }, pager);
      }), this.state.showNextMore && /*#__PURE__*/_react["default"].createElement("li", {
        className: this.classNames('el-icon more btn-quicknext', quicknextIconClass),
        onMouseEnter: function onMouseEnter() {
          _this2.setState({
            quicknextIconClass: 'el-icon-d-arrow-right'
          });
        },
        onMouseLeave: function onMouseLeave() {
          _this2.setState({
            quicknextIconClass: 'el-icon-more'
          });
        }
      }), pageCount > 1 && /*#__PURE__*/_react["default"].createElement("li", {
        className: this.classNames('number', {
          active: currentPage === pageCount
        })
      }, pageCount));
    }
  }]);

  return Pager;
}(_libs.Component);

exports["default"] = Pager;
Pager.propTypes = {
  currentPage: _libs.PropTypes.number,
  pageCount: _libs.PropTypes.number
};