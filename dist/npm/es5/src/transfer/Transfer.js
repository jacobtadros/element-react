"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _libs = require("../../libs");

var _button = _interopRequireDefault(require("../button"));

var _TransferPanel = _interopRequireDefault(require("./TransferPanel"));

var _locale = _interopRequireDefault(require("../locale"));

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

var Transfer = /*#__PURE__*/function (_Component) {
  _inherits(Transfer, _Component);

  var _super = _createSuper(Transfer);

  function Transfer(props) {
    var _this;

    _classCallCheck(this, Transfer);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "props", void 0);

    _defineProperty(_assertThisInitialized(_this), "state", void 0);

    _defineProperty(_assertThisInitialized(_this), "onSourceCheckedChange", function (val) {
      _this.setState({
        leftChecked: val
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onTargetCheckedChange", function (val) {
      _this.setState({
        rightChecked: val
      });
    });

    _defineProperty(_assertThisInitialized(_this), "addToLeft", function () {
      var value = _this.props.value;
      var rightChecked = _this.state.rightChecked;
      var currentValue = value.slice();
      rightChecked.forEach(function (item) {
        var index = currentValue.indexOf(item);

        if (index > -1) {
          currentValue.splice(index, 1);
        }
      });

      _this.setState({
        rightChecked: []
      }, function () {
        return _this.props.onChange(currentValue, 'left', rightChecked);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "addToRight", function () {
      var value = _this.props.value;
      var leftChecked = _this.state.leftChecked;
      var currentValue = value.slice();
      leftChecked.forEach(function (item) {
        if (!value.includes(item)) {
          currentValue = currentValue.concat(item);
        }
      });

      _this.setState({
        leftChecked: []
      }, function () {
        return _this.props.onChange(currentValue, 'right', leftChecked);
      });
    });

    _this.state = {
      leftChecked: [],
      rightChecked: []
    };
    return _this;
  }

  _createClass(Transfer, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var _this$props = this.props,
          leftDefaultChecked = _this$props.leftDefaultChecked,
          rightDefaultChecked = _this$props.rightDefaultChecked;

      if (leftDefaultChecked.length) {
        this.setState({
          leftChecked: leftDefaultChecked
        });
      }

      if (rightDefaultChecked.length) {
        this.setState({
          rightChecked: rightDefaultChecked
        });
      }
    }
  }, {
    key: "sourceData",
    get: function get() {
      var _this$props2 = this.props,
          data = _this$props2.data,
          value = _this$props2.value,
          propsAlias = _this$props2.propsAlias;
      return data.filter(function (item) {
        return !value.includes(item[propsAlias.key]);
      });
    }
  }, {
    key: "targetData",
    get: function get() {
      var _this$props3 = this.props,
          data = _this$props3.data,
          value = _this$props3.value,
          propsAlias = _this$props3.propsAlias;
      return data.filter(function (item) {
        return value.includes(item[propsAlias.key]);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props4 = this.props,
          filterPlaceholder = _this$props4.filterPlaceholder,
          titles = _this$props4.titles,
          buttonTexts = _this$props4.buttonTexts,
          propsAlias = _this$props4.propsAlias,
          filterable = _this$props4.filterable,
          filterMethod = _this$props4.filterMethod,
          footerFormat = _this$props4.footerFormat,
          leftFooter = _this$props4.leftFooter,
          rightFooter = _this$props4.rightFooter,
          renderContent = _this$props4.renderContent;
      var _this$state = this.state,
          leftChecked = _this$state.leftChecked,
          rightChecked = _this$state.rightChecked;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "el-transfer"
      }, /*#__PURE__*/_react["default"].createElement(_TransferPanel["default"], {
        propsAlias: propsAlias,
        data: this.sourceData,
        title: titles[0] || _locale["default"].t('el.transfer.titles.0'),
        checked: leftChecked,
        filterable: filterable,
        filterMethod: filterMethod,
        footerFormat: footerFormat,
        renderContent: renderContent,
        placeholder: filterPlaceholder || _locale["default"].t('el.transfer.filterPlaceholder'),
        onChange: this.onSourceCheckedChange
      }, leftFooter), /*#__PURE__*/_react["default"].createElement("div", {
        className: "el-transfer__buttons"
      }, /*#__PURE__*/_react["default"].createElement(_button["default"], {
        type: "primary",
        size: "small",
        onClick: this.addToLeft,
        disabled: rightChecked.length === 0
      }, /*#__PURE__*/_react["default"].createElement("i", {
        className: "el-icon-arrow-left"
      }), buttonTexts[0] !== undefined && /*#__PURE__*/_react["default"].createElement("span", null, buttonTexts[0])), /*#__PURE__*/_react["default"].createElement(_button["default"], {
        type: "primary",
        size: "small",
        onClick: this.addToRight,
        disabled: leftChecked.length === 0
      }, buttonTexts[1] !== undefined && /*#__PURE__*/_react["default"].createElement("span", null, buttonTexts[1]), /*#__PURE__*/_react["default"].createElement("i", {
        className: "el-icon-arrow-right"
      }))), /*#__PURE__*/_react["default"].createElement(_TransferPanel["default"], {
        propsAlias: propsAlias,
        data: this.targetData,
        title: titles[1] || _locale["default"].t('el.transfer.titles.1'),
        checked: rightChecked,
        filterable: filterable,
        filterMethod: filterMethod,
        footerFormat: footerFormat,
        renderContent: renderContent,
        placeholder: filterPlaceholder || _locale["default"].t('el.transfer.filterPlaceholder'),
        onChange: this.onTargetCheckedChange
      }, rightFooter));
    }
  }]);

  return Transfer;
}(_libs.Component);

exports["default"] = Transfer;

_defineProperty(Transfer, "propTypes", {
  data: _libs.PropTypes.array,
  titles: _libs.PropTypes.array,
  buttonTexts: _libs.PropTypes.array,
  filterPlaceholder: _libs.PropTypes.string,
  filterMethod: _libs.PropTypes.func,
  leftDefaultChecked: _libs.PropTypes.array,
  rightDefaultChecked: _libs.PropTypes.array,
  renderContent: _libs.PropTypes.func,
  value: _libs.PropTypes.array,
  footerFormat: _libs.PropTypes.object,
  filterable: _libs.PropTypes.bool,
  propsAlias: _libs.PropTypes.object,
  onChange: _libs.PropTypes.func,
  leftFooter: _libs.PropTypes.node,
  rightFooter: _libs.PropTypes.node
});

_defineProperty(Transfer, "defaultProps", {
  data: [],
  titles: [],
  buttonTexts: [],
  filterPlaceholder: '',
  leftDefaultChecked: [],
  rightDefaultChecked: [],
  value: [],
  footerFormat: {},
  propsAlias: {
    label: 'label',
    key: 'key',
    disabled: 'disabled'
  },
  onChange: function onChange() {}
});