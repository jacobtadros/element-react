"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _libs = require("../../libs");

var _internal = require("../../libs/internal");

var _input = _interopRequireDefault(require("../input"));

var _constants = require("./constants");

var _utils = require("../../libs/utils");

var _MountBody = require("./MountBody");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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

var idGen = new _utils.IDGenerator();

var haveTriggerType = function haveTriggerType(type) {
  return _constants.HAVE_TRIGGER_TYPES.indexOf(type) !== -1;
};

var isValidValue = function isValidValue(value) {
  if (value instanceof Date) return true;
  if (Array.isArray(value) && value.length !== 0 && value[0] instanceof Date) return true;
  return false;
}; // only considers date-picker's value: Date or [Date, Date]


var valueEquals = function valueEquals(a, b) {
  var aIsArray = Array.isArray(a);
  var bIsArray = Array.isArray(b);

  var isEqual = function isEqual(a, b) {
    // equal if a, b date is equal or both is null or undefined
    var equal = false;
    if (a && b) equal = a.getTime() === b.getTime();else equal = a === b && a == null;
    return equal;
  };

  if (aIsArray && bIsArray) {
    return isEqual(a[0], b[0]) && isEqual(a[1], b[1]);
  }

  if (!aIsArray && !bIsArray) {
    return isEqual(a, b);
  }

  return false;
};

var BasePicker = /*#__PURE__*/function (_Component) {
  _inherits(BasePicker, _Component);

  var _super = _createSuper(BasePicker);

  function BasePicker(props, _type) {
    var _this;

    var state = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    _classCallCheck(this, BasePicker);

    (0, _utils.require_condition)(typeof _type === 'string');
    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "state", void 0);

    _this.type = _type; // type need to be set first

    _this.state = Object.assign({}, state, {
      pickerVisible: false
    }, _this.propsToState(props));
    _this.clickOutsideId = 'clickOutsideId_' + idGen.next();
    return _this;
  } // ---: start, abstract methods
  // (state, props)=>ReactElement


  _createClass(BasePicker, [{
    key: "pickerPanel",
    value: function pickerPanel(state, props) {
      throw new _utils.Errors.MethodImplementationRequiredError(props);
    }
  }, {
    key: "getFormatSeparator",
    value: function getFormatSeparator() {
      return undefined;
    } // ---: end, abstract methods

  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      this.setState(this.propsToState(nextProps));
    }
    /**
     * onPicked should only be called from picker pannel instance
     * and should never return a null date instance
     *
     * @param value: Date|Date[]|null
     * @param isKeepPannel: boolean = false
     */

  }, {
    key: "onPicked",
    value: function onPicked(value) {
      var isKeepPannel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      //only change input value on picked triggered
      var hasChanged = !valueEquals(this.state.value, value);
      this.setState({
        pickerVisible: isKeepPannel,
        value: value,
        text: this.dateToStr(value)
      });

      if (hasChanged) {
        this.props.onChange(value);
        this.context.form && this.context.form.onFieldChange();
      }
    }
  }, {
    key: "dateToStr",
    value: function dateToStr(date) {
      if (!isValidValue(date)) return '';
      var tdate = date;
      var formatter = (_constants.TYPE_VALUE_RESOLVER_MAP[this.type] || _constants.TYPE_VALUE_RESOLVER_MAP['default']).formatter;
      var result = formatter(tdate, this.getFormat(), this.getFormatSeparator());
      return result;
    } // (string) => Date | null

  }, {
    key: "parseDate",
    value: function parseDate(dateStr) {
      if (!dateStr) return null;
      var type = this.type;
      var parser = (_constants.TYPE_VALUE_RESOLVER_MAP[type] || _constants.TYPE_VALUE_RESOLVER_MAP['default']).parser;
      return parser(dateStr, this.getFormat(), this.getFormatSeparator());
    }
  }, {
    key: "getFormat",
    value: function getFormat() {
      return this.props.format || _constants.DEFAULT_FORMATS[this.type];
    }
  }, {
    key: "propsToState",
    value: function propsToState(props) {
      var state = {};

      if (this.isDateValid(props.value)) {
        state.text = this.dateToStr(props.value);
        state.value = props.value;
      } else {
        state.text = '';
        state.value = null;
      } // if (state.value == null) {
      //   state.value = new Date()
      // }


      return state;
    }
  }, {
    key: "triggerClass",
    value: function triggerClass() {
      return this.type.includes('time') ? 'el-icon-time' : 'el-icon-date';
    }
  }, {
    key: "calcIsShowTrigger",
    value: function calcIsShowTrigger() {
      if (this.props.isShowTrigger != null) {
        return !!this.props.isShowTrigger;
      } else {
        return haveTriggerType(this.type);
      }
    }
  }, {
    key: "handleFocus",
    value: function handleFocus() {
      var _this2 = this;

      this.isInputFocus = true;

      if (haveTriggerType(this.type) && !this.state.pickerVisible) {
        this.setState({
          pickerVisible: true
        }, function () {
          _this2.props.onFocus(_this2);
        });
      }
    }
  }, {
    key: "handleBlur",
    value: function handleBlur() {
      this.isInputFocus = false;
      this.props.onBlur(this);
    }
  }, {
    key: "handleKeydown",
    value: function handleKeydown(evt) {
      var keyCode = evt.keyCode; // tab

      if (keyCode === 9 || keyCode === 27) {
        this.setState({
          pickerVisible: false
        });
        evt.stopPropagation();
      }
    }
  }, {
    key: "togglePickerVisible",
    value: function togglePickerVisible() {
      this.setState({
        pickerVisible: !this.state.pickerVisible
      });
    }
  }, {
    key: "isDateValid",
    value: function isDateValid(date) {
      return date == null || isValidValue(date);
    } // return true on condition
    //  * input is parsable to date
    //  * also meet your other condition

  }, {
    key: "isInputValid",
    value: function isInputValid(value) {
      var parseable = this.parseDate(value);

      if (!parseable) {
        return false;
      }

      var isdatevalid = this.isDateValid(parseable);

      if (!isdatevalid) {
        return false;
      }

      return true;
    }
  }, {
    key: "handleClickOutside",
    value: function handleClickOutside(evt) {
      var _this$state = this.state,
          value = _this$state.value,
          pickerVisible = _this$state.pickerVisible;

      if (!this.isInputFocus && !pickerVisible) {
        return;
      }

      if (this.domRoot.contains(evt.target)) return;
      if (this.pickerProxy && this.pickerProxy.contains(evt)) return;

      if (this.isDateValid(value)) {
        this.setState({
          pickerVisible: false
        });
        this.props.onChange(value);
        this.context.form && this.context.form.onFieldChange();
      } else {
        this.setState({
          pickerVisible: false,
          text: this.dateToStr(value)
        });
      }
    }
  }, {
    key: "handleClickIcon",
    value: function handleClickIcon() {
      var _this$props = this.props,
          isReadOnly = _this$props.isReadOnly,
          isDisabled = _this$props.isDisabled;
      var text = this.state.text;
      if (isReadOnly || isDisabled) return;

      if (!text) {
        this.togglePickerVisible();
      } else {
        this.setState({
          text: '',
          value: null,
          pickerVisible: false
        });
        this.props.onChange(null);
        this.context.form && this.context.form.onFieldChange();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props2 = this.props,
          isReadOnly = _this$props2.isReadOnly,
          placeholder = _this$props2.placeholder,
          isDisabled = _this$props2.isDisabled,
          className = _this$props2.className;
      var _this$state2 = this.state,
          pickerVisible = _this$state2.pickerVisible,
          value = _this$state2.value,
          text = _this$state2.text,
          isShowClose = _this$state2.isShowClose;

      var createIconSlot = function createIconSlot() {
        if (_this3.calcIsShowTrigger()) {
          var cls = isShowClose ? 'el-icon-close' : _this3.triggerClass();
          return /*#__PURE__*/_react["default"].createElement("i", {
            className: _this3.classNames('el-input__icon', cls),
            onClick: _this3.handleClickIcon.bind(_this3),
            onMouseEnter: function onMouseEnter() {
              if (isReadOnly || isDisabled) return;

              if (text) {
                _this3.setState({
                  isShowClose: true
                });
              }
            },
            onMouseLeave: function onMouseLeave() {
              _this3.setState({
                isShowClose: false
              });
            }
          });
        } else {
          return null;
        }
      };

      var createPickerPanel = function createPickerPanel() {
        if (pickerVisible) {
          /* eslint-disable */
          var _this3$props = _this3.props,
              _placeholder = _this3$props.placeholder,
              onFocus = _this3$props.onFocus,
              onBlur = _this3$props.onBlur,
              onChange = _this3$props.onChange,
              others = _objectWithoutProperties(_this3$props, ["placeholder", "onFocus", "onBlur", "onChange"]);
          /* eslint-enable */


          return /*#__PURE__*/_react["default"].createElement(_MountBody.MountBody, {
            ref: function ref(e) {
              return _this3.pickerProxy = e;
            }
          }, _this3.pickerPanel(_this3.state, _objectSpread(_objectSpread({}, others), {
            getPopperRefElement: function getPopperRefElement() {
              return _reactDom["default"].findDOMNode(_this3.refs.inputRoot);
            },
            popperMixinOption: {
              placement: _constants.PLACEMENT_MAP[_this3.props.align] || _constants.PLACEMENT_MAP.left
            }
          })));
        } else {
          return null;
        }
      };

      return /*#__PURE__*/_react["default"].createElement("span", {
        className: this.classNames('el-date-editor', className, {
          'is-have-trigger': this.calcIsShowTrigger(),
          'is-active': pickerVisible,
          'is-filled': !!value
        }),
        ref: function ref(v) {
          return _this3.domRoot = v;
        }
      }, /*#__PURE__*/_react["default"].createElement(_internal.EventRegister, {
        id: this.clickOutsideId,
        target: document,
        eventName: "click",
        func: this.handleClickOutside.bind(this)
      }), /*#__PURE__*/_react["default"].createElement(_input["default"], {
        className: this.classNames("el-date-editor el-date-editor--".concat(this.type)),
        readOnly: isReadOnly,
        disabled: isDisabled,
        type: "text",
        placeholder: placeholder,
        onFocus: this.handleFocus.bind(this),
        onBlur: this.handleBlur.bind(this),
        onKeyDown: this.handleKeydown.bind(this),
        onChange: function onChange(value) {
          var iptxt = value;
          var nstate = {
            text: iptxt
          };

          if (iptxt.trim() === '' || !_this3.isInputValid(iptxt)) {
            nstate.value = null;
          } else {
            //only set value on a valid date input
            nstate.value = _this3.parseDate(iptxt);
          }

          _this3.setState(nstate);
        },
        ref: "inputRoot",
        value: text,
        icon: createIconSlot()
      }), createPickerPanel());
    }
  }], [{
    key: "propTypes",
    get: function get() {
      return {
        align: _libs.PropTypes.oneOf(['left', 'center', 'right']),
        className: _libs.PropTypes.string,
        format: _libs.PropTypes.string,
        isShowTrigger: _libs.PropTypes.bool,
        isReadOnly: _libs.PropTypes.bool,
        isDisabled: _libs.PropTypes.bool,
        placeholder: _libs.PropTypes.string,
        onFocus: _libs.PropTypes.func,
        onBlur: _libs.PropTypes.func,
        // (Date|Date[]|null)=>(), null when click on clear icon
        onChange: _libs.PropTypes.func,
        // time select pannel:
        value: _libs.PropTypes.oneOfType([_libs.PropTypes.instanceOf(Date), _libs.PropTypes.arrayOf(_libs.PropTypes.instanceOf(Date))])
      };
    }
  }, {
    key: "defaultProps",
    get: function get() {
      return {
        value: new Date(),
        // (thisReactElement)=>Unit
        onFocus: function onFocus() {},
        onBlur: function onBlur() {}
      };
    }
  }]);

  return BasePicker;
}(_libs.Component);

exports["default"] = BasePicker;
BasePicker.contextTypes = {
  form: _libs.PropTypes.any
};