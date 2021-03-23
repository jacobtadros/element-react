"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _reactClickOutside = _interopRequireDefault(require("react-click-outside"));

var _throttleDebounce = require("throttle-debounce");

var _popper = _interopRequireDefault(require("popper.js"));

var _libs = require("../../libs");

var _Menu = _interopRequireDefault(require("./Menu"));

var _input = _interopRequireDefault(require("../input"));

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

var Cascader = /*#__PURE__*/function (_Component) {
  _inherits(Cascader, _Component);

  var _super = _createSuper(Cascader);

  function Cascader(props) {
    var _this;

    _classCallCheck(this, Cascader);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "state", void 0);

    _defineProperty(_assertThisInitialized(_this), "input", void 0);

    _defineProperty(_assertThisInitialized(_this), "debouncedInputChange", void 0);

    _this.state = {
      currentValue: props.value,
      menu: null,
      menuVisible: false,
      inputHover: false,
      inputValue: '',
      flatOptions: _this.flattenOptions(props.options)
    };
    _this.debouncedInputChange = (0, _throttleDebounce.debounce)(props.debounce, function () {
      var value = _this.state.inputValue;

      var before = _this.props.beforeFilter(value);

      if (before && before.then) {
        _this.state.menu.setState({
          options: [{
            __IS__FLAT__OPTIONS: true,
            label: _locale["default"].t('el.cascader.loading'),
            value: '',
            disabled: true
          }]
        });

        before.then(function () {
          _this.handleInputChange(value);
        });
      } else {
        _this.handleInputChange(value);
      }
    });
    return _this;
  }

  _createClass(Cascader, [{
    key: "getChildContext",
    value: function getChildContext() {
      return {
        component: this
      };
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.input = _reactDom["default"].findDOMNode(this.refs.input);
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(props) {
      this.setState({
        currentValue: props.value,
        flatOptions: this.flattenOptions(props.options)
      });
      this.state.menu.setState({
        options: props.options
      });
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(props, state) {
      var menuVisible = this.state.menuVisible;

      if (menuVisible !== state.menuVisible) {
        if (menuVisible) {
          this.showMenu();

          if (this.popperJS) {
            this.popperJS.update();
          } else {
            this.popperJS = new _popper["default"](this.input, _reactDom["default"].findDOMNode(this.refs.menu), {
              placement: 'bottom-start',
              modifiers: {
                computeStyle: {
                  gpuAcceleration: false
                }
              }
            });
          }
        } else {
          this.hideMenu();

          if (this.popperJS) {
            this.popperJS.destroy();
          }

          delete this.popperJS;
        }
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.popperJS) {
        this.popperJS.destroy();
      }
    }
  }, {
    key: "placeholder",
    value: function placeholder() {
      return this.props.placeholder || _locale["default"].t('el.cascader.placeholder');
    }
  }, {
    key: "updatePopper",
    value: function updatePopper() {
      if (this.popperJS) {
        this.popperJS.update();
      }
    }
  }, {
    key: "initMenu",
    value: function initMenu(menu) {
      this.state.menu = menu;
    }
  }, {
    key: "showMenu",
    value: function showMenu() {
      this.state.menu.setState({
        value: this.state.currentValue.slice(0),
        visible: true,
        options: this.props.options,
        inputWidth: this.input.offsetWidth - 2
      });
    }
  }, {
    key: "hideMenu",
    value: function hideMenu() {
      this.setState({
        inputValue: ''
      });

      if (this.state.menu) {
        this.state.menu.setState({
          visible: false
        });
      }
    }
  }, {
    key: "handleActiveItemChange",
    value: function handleActiveItemChange(value) {
      this.updatePopper();

      if (this.props.activeItemChange) {
        this.props.activeItemChange(value);
      }
    }
  }, {
    key: "handlePick",
    value: function handlePick(value) {
      var close = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      this.setState({
        currentValue: value
      });

      if (close) {
        this.setState({
          menuVisible: false
        });
      }

      if (this.props.onChange) {
        this.props.onChange(value);
      }
    }
  }, {
    key: "handleInputChange",
    value: function handleInputChange(value) {
      var _this2 = this;

      if (!this.state.menuVisible) return;
      var flatOptions = this.state.flatOptions;

      if (!value) {
        this.state.menu.setState({
          options: this.props.options
        });
        return;
      }

      var filteredFlatOptions = flatOptions.filter(function (optionsStack) {
        return optionsStack.some(function (option) {
          return new RegExp(value, 'i').test(option[_this2.labelKey()]);
        });
      });

      if (filteredFlatOptions.length > 0) {
        filteredFlatOptions = filteredFlatOptions.map(function (optionStack) {
          return {
            __IS__FLAT__OPTIONS: true,
            value: optionStack.map(function (item) {
              return item[_this2.valueKey()];
            }),
            label: _this2.renderFilteredOptionLabel(value, optionStack)
          };
        });
      } else {
        filteredFlatOptions = [{
          __IS__FLAT__OPTIONS: true,
          label: _locale["default"].t('el.cascader.noMatch'),
          value: '',
          disabled: true
        }];
      }

      this.state.menu.setState({
        options: filteredFlatOptions
      });
    }
  }, {
    key: "renderFilteredOptionLabel",
    value: function renderFilteredOptionLabel(inputValue, optionsStack) {
      var _this3 = this;

      return optionsStack.map(function (option, index) {
        var label = option[_this3.labelKey()];

        var keywordIndex = label.toLowerCase().indexOf(inputValue.toLowerCase());
        var labelPart = label.slice(keywordIndex, inputValue.length + keywordIndex);
        var node = keywordIndex > -1 ? _this3.highlightKeyword(label, labelPart) : label;
        return index === 0 ? node : [' / ', node];
      });
    }
  }, {
    key: "highlightKeyword",
    value: function highlightKeyword(label, keyword) {
      return label.split(keyword).map(function (node, index) {
        return index === 0 ? node : [/*#__PURE__*/_react["default"].createElement("span", {
          className: "el-cascader-menu__item__keyword"
        }, keyword), node];
      });
    }
  }, {
    key: "flattenOptions",
    value: function flattenOptions(options) {
      var _this4 = this;

      var ancestor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var flatOptions = [];
      options.forEach(function (option) {
        var optionsStack = ancestor.concat(option);

        if (!option[_this4.childrenKey()]) {
          flatOptions.push(optionsStack);
        } else {
          if (_this4.changeOnSelect) {
            flatOptions.push(optionsStack);
          }

          flatOptions = flatOptions.concat(_this4.flattenOptions(option[_this4.childrenKey()], optionsStack));
        }
      });
      return flatOptions;
    }
  }, {
    key: "clearValue",
    value: function clearValue(e) {
      e.stopPropagation();
      this.handlePick([], true);
    }
  }, {
    key: "handleClickOutside",
    value: function handleClickOutside() {
      if (this.state.menuVisible) {
        this.setState({
          menuVisible: false
        });
      }
    }
  }, {
    key: "handleClick",
    value: function handleClick() {
      if (this.props.disabled) return;

      if (this.filterable) {
        this.setState({
          menuVisible: true
        });
        return;
      }

      this.setState({
        menuVisible: !this.state.menuVisible
      });
    }
    /* Computed Methods */

  }, {
    key: "labelKey",
    value: function labelKey() {
      return this.props.props.label || 'label';
    }
  }, {
    key: "valueKey",
    value: function valueKey() {
      return this.props.props.value || 'value';
    }
  }, {
    key: "childrenKey",
    value: function childrenKey() {
      return this.props.props.children || 'children';
    }
  }, {
    key: "currentLabels",
    value: function currentLabels() {
      var _this5 = this;

      var options = this.props.options;
      var labels = [];
      this.state.currentValue.forEach(function (value) {
        var targetOption = options && options.filter(function (option) {
          return option[_this5.valueKey()] === value;
        })[0];

        if (targetOption) {
          labels.push(targetOption[_this5.labelKey()]);
          options = targetOption[_this5.childrenKey()];
        }
      });
      return labels;
    }
  }, {
    key: "render",
    value: function render() {
      var _this6 = this;

      var _this$props = this.props,
          size = _this$props.size,
          disabled = _this$props.disabled,
          filterable = _this$props.filterable,
          clearable = _this$props.clearable,
          showAllLevels = _this$props.showAllLevels;
      var _this$state = this.state,
          menuVisible = _this$state.menuVisible,
          inputHover = _this$state.inputHover,
          inputValue = _this$state.inputValue;
      var currentLabels = this.currentLabels();
      return /*#__PURE__*/_react["default"].createElement("span", {
        ref: "reference",
        className: this.className('el-cascader', size ? 'el-cascader--' + size : '', {
          'is-opened': menuVisible,
          'is-disabled': disabled
        })
      }, /*#__PURE__*/_react["default"].createElement("span", {
        onClick: this.handleClick.bind(this),
        onMouseEnter: function onMouseEnter() {
          _this6.setState({
            inputHover: true
          });
        },
        onMouseLeave: function onMouseLeave() {
          _this6.setState({
            inputHover: false
          });
        }
      }, /*#__PURE__*/_react["default"].createElement(_input["default"], {
        ref: "input",
        readOnly: !filterable,
        placeholder: currentLabels.length ? undefined : this.placeholder(),
        value: inputValue,
        onChange: function onChange(value) {
          _this6.setState({
            inputValue: value
          });
        },
        onKeyUp: this.debouncedInputChange.bind(this),
        size: size,
        disabled: disabled,
        icon: clearable && inputHover && currentLabels.length ? /*#__PURE__*/_react["default"].createElement("i", {
          className: "el-input__icon el-icon-circle-close el-cascader__clearIcon",
          onClick: this.clearValue.bind(this)
        }) : /*#__PURE__*/_react["default"].createElement("i", {
          className: this.classNames('el-input__icon el-icon-caret-bottom', {
            'is-reverse': menuVisible
          })
        })
      }), /*#__PURE__*/_react["default"].createElement(_libs.View, {
        show: currentLabels.length
      }, /*#__PURE__*/_react["default"].createElement("span", {
        className: "el-cascader__label"
      }, showAllLevels ? currentLabels.map(function (label, index) {
        return /*#__PURE__*/_react["default"].createElement("label", {
          key: index
        }, label, index < currentLabels.length - 1 && /*#__PURE__*/_react["default"].createElement("span", null, " / "));
      }) : currentLabels[currentLabels.length - 1]))), /*#__PURE__*/_react["default"].createElement(_Menu["default"], {
        ref: "menu"
      }));
    }
  }]);

  return Cascader;
}(_libs.Component);

Cascader.childContextTypes = {
  component: _libs.PropTypes.any
};
Cascader.propTypes = {
  options: _libs.PropTypes.arrayOf(_libs.PropTypes.shape({
    value: _libs.PropTypes.string
  })).isRequired,
  props: _libs.PropTypes.object,
  value: _libs.PropTypes.array,
  placeholder: _libs.PropTypes.string,
  disabled: _libs.PropTypes.bool,
  clearable: _libs.PropTypes.bool,
  changeOnSelect: _libs.PropTypes.bool,
  popperClass: _libs.PropTypes.string,
  expandTrigger: _libs.PropTypes.string,
  filterable: _libs.PropTypes.bool,
  size: _libs.PropTypes.string,
  showAllLevels: _libs.PropTypes.bool,
  debounce: _libs.PropTypes.number,
  activeItemChange: _libs.PropTypes.func,
  beforeFilter: _libs.PropTypes.func,
  onChange: _libs.PropTypes.func
};
Cascader.defaultProps = {
  value: [],
  clearable: false,
  expandTrigger: 'click',
  showAllLevels: true,
  debounce: 300,
  props: {
    children: 'children',
    label: 'label',
    value: 'value',
    disabled: 'disabled'
  },
  beforeFilter: function beforeFilter() {
    return function () {};
  }
};

var _default = (0, _reactClickOutside["default"])(Cascader);

exports["default"] = _default;