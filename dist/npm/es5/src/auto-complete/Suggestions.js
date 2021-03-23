"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _popper = _interopRequireDefault(require("popper.js"));

var _libs = require("../../libs");

var _scrollbar = require("../scrollbar");

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

var Suggestions = /*#__PURE__*/function (_Component) {
  _inherits(Suggestions, _Component);

  var _super = _createSuper(Suggestions);

  function Suggestions(props) {
    var _this;

    _classCallCheck(this, Suggestions);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "props", void 0);

    _defineProperty(_assertThisInitialized(_this), "state", void 0);

    _this.state = {
      showPopper: false,
      dropdownWidth: ''
    };
    return _this;
  }

  _createClass(Suggestions, [{
    key: "onVisibleChange",
    value: function onVisibleChange(visible, inputWidth) {
      this.setState({
        dropdownWidth: inputWidth,
        showPopper: visible
      });
    }
  }, {
    key: "parent",
    value: function parent() {
      return this.context.component;
    }
  }, {
    key: "onSelect",
    value: function onSelect(item) {
      this.parent().select(item);
    }
  }, {
    key: "onEnter",
    value: function onEnter() {
      var reference = _reactDom["default"].findDOMNode(this.parent().inputNode);

      this.popperJS = new _popper["default"](reference, this.refs.popper, {
        modifiers: {
          computeStyle: {
            gpuAcceleration: false
          }
        }
      });
    }
  }, {
    key: "onAfterLeave",
    value: function onAfterLeave() {
      this.popperJS.destroy();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var customItem = this.parent().props.customItem;
      var _this$parent$state = this.parent().state,
          loading = _this$parent$state.loading,
          highlightedIndex = _this$parent$state.highlightedIndex;
      var suggestions = this.props.suggestions;
      var _this$state = this.state,
          showPopper = _this$state.showPopper,
          dropdownWidth = _this$state.dropdownWidth;
      return /*#__PURE__*/_react["default"].createElement(_libs.Transition, {
        name: "el-zoom-in-top",
        onEnter: this.onEnter.bind(this),
        onAfterLeave: this.onAfterLeave.bind(this)
      }, /*#__PURE__*/_react["default"].createElement(_libs.View, {
        show: showPopper
      }, /*#__PURE__*/_react["default"].createElement("div", {
        ref: "popper",
        className: this.classNames('el-autocomplete-suggestion', 'el-popper', {
          'is-loading': loading
        }),
        style: {
          width: dropdownWidth,
          zIndex: 1
        }
      }, /*#__PURE__*/_react["default"].createElement(_scrollbar.Scrollbar, {
        viewComponent: "ul",
        wrapClass: "el-autocomplete-suggestion__wrap",
        viewClass: "el-autocomplete-suggestion__list"
      }, loading ? /*#__PURE__*/_react["default"].createElement("li", null, /*#__PURE__*/_react["default"].createElement("i", {
        className: "el-icon-loading"
      })) : suggestions.map(function (item, index) {
        return /*#__PURE__*/_react["default"].createElement("li", {
          key: index,
          className: _this2.classNames({
            'highlighted': highlightedIndex === index
          }),
          onClick: _this2.onSelect.bind(_this2, item)
        }, !customItem ? item.value : /*#__PURE__*/_react["default"].createElement(customItem, {
          index: index,
          item: item
        }));
      })))));
    }
  }]);

  return Suggestions;
}(_libs.Component);

exports["default"] = Suggestions;
Suggestions.contextTypes = {
  component: _libs.PropTypes.any
};