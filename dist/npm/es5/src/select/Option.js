"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

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

var Option = /*#__PURE__*/function (_Component) {
  _inherits(Option, _Component);

  var _super = _createSuper(Option);

  function Option(props) {
    var _this;

    _classCallCheck(this, Option);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "state", void 0);

    _this.state = {
      index: -1,
      visible: true,
      hitState: false
    };
    return _this;
  }

  _createClass(Option, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.parent().onOptionCreate(this);
      this.setState({
        index: this.parent().state.options.indexOf(this)
      });

      if (this.currentSelected() === true) {
        this.parent().addOptionToValue(this, true);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.parent().onOptionDestroy(this);
    }
  }, {
    key: "parent",
    value: function parent() {
      return this.context.component;
    }
  }, {
    key: "currentSelected",
    value: function currentSelected() {
      return this.props.selected || (this.parent().props.multiple ? this.parent().state.value.indexOf(this.props.value) > -1 : this.parent().state.value === this.props.value);
    }
  }, {
    key: "currentLabel",
    value: function currentLabel() {
      return this.props.label || (typeof this.props.value === 'string' || typeof this.props.value === 'number' ? this.props.value : '');
    }
  }, {
    key: "itemSelected",
    value: function itemSelected() {
      if (Object.prototype.toString.call(this.parent().state.selected) === '[object Object]') {
        return this === this.parent().state.selected;
      } else if (Array.isArray(this.parent().state.selected)) {
        return this.parent().state.selected.map(function (el) {
          return el.props.value;
        }).indexOf(this.props.value) > -1;
      }

      return false;
    }
  }, {
    key: "hoverItem",
    value: function hoverItem() {
      if (!this.props.disabled && !this.parent().props.disabled) {
        this.parent().setState({
          hoverIndex: this.parent().state.options.indexOf(this)
        });
      }
    }
  }, {
    key: "selectOptionClick",
    value: function selectOptionClick() {
      if (this.props.disabled !== true && this.parent().props.disabled !== true) {
        this.parent().onOptionClick(this);
      }
    }
  }, {
    key: "queryChange",
    value: function queryChange(query) {
      // query 里如果有正则中的特殊字符，需要先将这些字符转义
      var parsedQuery = query.replace(/(\^|\(|\)|\[|\]|\$|\*|\+|\.|\?|\\|\{|\}|\|)/g, '\\$1');
      var visible = new RegExp(parsedQuery, 'i').test(this.currentLabel());

      if (!visible) {
        this.parent().setState({
          filteredOptionsCount: this.parent().state.filteredOptionsCount - 1
        });
      }

      this.setState({
        visible: visible
      });
    }
  }, {
    key: "resetIndex",
    value: function resetIndex() {
      this.setState({
        index: this.parent().state.options.indexOf(this)
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state = this.state,
          visible = _this$state.visible,
          index = _this$state.index;
      return /*#__PURE__*/_react["default"].createElement(_libs.View, {
        show: visible
      }, /*#__PURE__*/_react["default"].createElement("li", {
        style: this.style(),
        className: this.className('el-select-dropdown__item', {
          'selected': this.itemSelected(),
          'is-disabled': this.props.disabled || this.parent().props.disabled,
          'hover': this.parent().state.hoverIndex === index
        }),
        onMouseEnter: this.hoverItem.bind(this),
        onClick: this.selectOptionClick.bind(this)
      }, this.props.children || /*#__PURE__*/_react["default"].createElement("span", null, this.currentLabel())));
    }
  }]);

  return Option;
}(_libs.Component);

exports["default"] = Option;
Option.contextTypes = {
  component: _libs.PropTypes.any
};
Option.propTypes = {
  value: _libs.PropTypes.any.isRequired,
  label: _libs.PropTypes.oneOfType([_libs.PropTypes.string, _libs.PropTypes.number]),
  selected: _libs.PropTypes.bool,
  disabled: _libs.PropTypes.bool
};