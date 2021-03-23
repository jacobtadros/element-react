"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _libs = require("../../libs");

var _input = _interopRequireDefault(require("../input"));

var _checkbox = _interopRequireDefault(require("../checkbox"));

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

var TransferPanel = /*#__PURE__*/function (_Component) {
  _inherits(TransferPanel, _Component);

  var _super = _createSuper(TransferPanel);

  function TransferPanel(props) {
    var _this;

    _classCallCheck(this, TransferPanel);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "props", void 0);

    _defineProperty(_assertThisInitialized(_this), "state", void 0);

    _defineProperty(_assertThisInitialized(_this), "handleMouseEnter", function () {
      return _this.setState({
        inputHover: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleMouseLeave", function () {
      return _this.setState({
        inputHover: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "clearQuery", function () {
      if (_this.inputIcon === 'circle-close') {
        _this.setState({
          query: ''
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleAllCheckedChange", function (ischecked) {
      var checked = ischecked ? _this.checkableData.map(function (item) {
        return item[_this.keyProp];
      }) : [];

      _this.props.onChange(checked);
    });

    _defineProperty(_assertThisInitialized(_this), "handleCheckedChange", function (value) {
      _this.props.onChange(value);
    });

    _defineProperty(_assertThisInitialized(_this), "handleInputChange", function (value) {
      _this.setState({
        query: value
      });
    });

    _this.state = {
      query: '',
      inputHover: false
    };
    return _this;
  }

  _createClass(TransferPanel, [{
    key: "allChecked",
    get: function get() {
      var _this2 = this;

      var checkableDataKeys = this.checkableData.map(function (item) {
        return item[_this2.keyProp];
      });
      return checkableDataKeys.length > 0 && checkableDataKeys.every(function (item) {
        return _this2.props.checked.includes(item);
      });
    }
  }, {
    key: "filteredData",
    get: function get() {
      var _this3 = this;

      return this.props.data.filter(function (item) {
        if (typeof _this3.props.filterMethod === 'function') {
          return _this3.props.filterMethod(_this3.state.query, item);
        } else {
          var label = item[_this3.labelProp] || item[_this3.keyProp].toString();

          return label.toLowerCase().includes(_this3.state.query.toLowerCase());
        }
      });
    }
  }, {
    key: "checkableData",
    get: function get() {
      var _this4 = this;

      return this.filteredData.filter(function (item) {
        return !item[_this4.disabledProp];
      });
    }
  }, {
    key: "checkedSummary",
    get: function get() {
      var checkedLength = this.props.checked.length;
      var dataLength = this.props.data.length;
      var _this$props$footerFor = this.props.footerFormat,
          noChecked = _this$props$footerFor.noChecked,
          hasChecked = _this$props$footerFor.hasChecked;

      if (noChecked && hasChecked) {
        return checkedLength > 0 ? hasChecked.replace(/\${checked}/g, checkedLength).replace(/\${total}/g, dataLength) : noChecked.replace(/\${total}/g, dataLength);
      } else {
        return checkedLength > 0 ? _locale["default"].t('el.transfer.hasCheckedFormat', {
          total: dataLength,
          checked: checkedLength
        }) : _locale["default"].t('el.transfer.noCheckedFormat', {
          total: dataLength
        });
      }
    }
  }, {
    key: "isIndeterminate",
    get: function get() {
      var checkedLength = this.props.checked.length;
      return checkedLength > 0 && checkedLength < this.checkableData.length;
    }
  }, {
    key: "hasNoMatch",
    get: function get() {
      var query = this.state.query;
      return query.length > 0 && this.filteredData.length === 0;
    }
  }, {
    key: "inputIcon",
    get: function get() {
      var _this$state = this.state,
          query = _this$state.query,
          inputHover = _this$state.inputHover;
      return query.length > 0 && inputHover ? 'circle-close' : 'search';
    }
  }, {
    key: "labelProp",
    get: function get() {
      return this.props.propsAlias.label;
    }
  }, {
    key: "keyProp",
    get: function get() {
      return this.props.propsAlias.key;
    }
  }, {
    key: "disabledProp",
    get: function get() {
      return this.props.propsAlias.disabled;
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;

      var _this$props = this.props,
          filterable = _this$props.filterable,
          title = _this$props.title,
          data = _this$props.data,
          renderContent = _this$props.renderContent,
          checked = _this$props.checked,
          placeholder = _this$props.placeholder;
      var query = this.state.query;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "el-transfer-panel"
      }, /*#__PURE__*/_react["default"].createElement("p", {
        className: "el-transfer-panel__header"
      }, title), /*#__PURE__*/_react["default"].createElement("div", {
        className: "el-transfer-panel__body"
      }, filterable && /*#__PURE__*/_react["default"].createElement(_input["default"], {
        className: "el-transfer-panel__filter",
        value: query,
        size: "small",
        placeholder: placeholder,
        icon: this.inputIcon,
        onMouseEnter: this.handleMouseEnter,
        onMouseLeave: this.handleMouseLeave,
        onIconClick: this.clearQuery,
        onChange: this.handleInputChange
      }), /*#__PURE__*/_react["default"].createElement(_libs.View, {
        show: !this.hasNoMatch && data.length > 0
      }, /*#__PURE__*/_react["default"].createElement(_checkbox["default"].Group, {
        value: checked,
        "v-show": "",
        className: this.classNames({
          'is-filterable': filterable,
          'el-transfer-panel__list': true
        }),
        onChange: this.handleCheckedChange
      }, this.filteredData.map(function (item, index) {
        return /*#__PURE__*/_react["default"].createElement(_checkbox["default"], {
          className: "el-transfer-panel__item",
          label: item[_this5.labelProp],
          disabled: item[_this5.disabledProp],
          value: item[_this5.keyProp],
          key: index
        }, /*#__PURE__*/_react["default"].createElement(OptionContent, {
          option: item,
          renderContent: renderContent,
          labelProp: _this5.labelProp,
          keyProp: _this5.keyProp
        }));
      }))), /*#__PURE__*/_react["default"].createElement(_libs.View, {
        show: this.hasNoMatch
      }, /*#__PURE__*/_react["default"].createElement("p", {
        className: "el-transfer-panel__empty"
      }, _locale["default"].t('el.transfer.noMatch'))), /*#__PURE__*/_react["default"].createElement(_libs.View, {
        show: data.length === 0 && !this.hasNoMatch
      }, /*#__PURE__*/_react["default"].createElement("p", {
        className: "el-transfer-panel__empty"
      }, _locale["default"].t('el.transfer.noData')))), /*#__PURE__*/_react["default"].createElement("p", {
        className: "el-transfer-panel__footer"
      }, /*#__PURE__*/_react["default"].createElement(_checkbox["default"], {
        checked: this.allChecked,
        onChange: this.handleAllCheckedChange,
        indeterminate: this.isIndeterminate
      }, this.checkedSummary), this.props.children));
    }
  }]);

  return TransferPanel;
}(_libs.Component);

exports["default"] = TransferPanel;

_defineProperty(TransferPanel, "propTypes", {
  data: _libs.PropTypes.array,
  renderContent: _libs.PropTypes.func,
  placeholder: _libs.PropTypes.string,
  title: _libs.PropTypes.string,
  filterable: _libs.PropTypes.bool,
  footerFormat: _libs.PropTypes.object,
  filterMethod: _libs.PropTypes.func,
  propsAlias: _libs.PropTypes.object,
  onChange: _libs.PropTypes.func,
  checked: _libs.PropTypes.array
});

_defineProperty(TransferPanel, "defaultProps", {
  data: [],
  footerFormat: {},
  propsAlias: {},
  onChange: function onChange() {}
});

var OptionContent = function OptionContent(_ref) {
  var option = _ref.option,
      renderContent = _ref.renderContent,
      labelProp = _ref.labelProp,
      keyProp = _ref.keyProp;
  return renderContent ? renderContent(option) : /*#__PURE__*/_react["default"].createElement("span", null, option[labelProp] || option[keyProp]);
};