"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _reactClickOutside = _interopRequireDefault(require("react-click-outside"));

var _libs = require("../../libs");

var _input = _interopRequireDefault(require("../input"));

var _Suggestions = _interopRequireDefault(require("./Suggestions"));

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

var AutoComplete = /*#__PURE__*/function (_Component) {
  _inherits(AutoComplete, _Component);

  var _super = _createSuper(AutoComplete);

  function AutoComplete(props) {
    var _this;

    _classCallCheck(this, AutoComplete);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "props", void 0);

    _defineProperty(_assertThisInitialized(_this), "state", void 0);

    _this.state = {
      inputValue: props.value,
      isFocus: false,
      suggestions: [],
      loading: false,
      highlightedIndex: -1
    };
    return _this;
  }

  _createClass(AutoComplete, [{
    key: "getChildContext",
    value: function getChildContext() {
      return {
        component: this
      };
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(props) {
      this.setState({
        inputValue: props.value
      });
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var _this2 = this;

      var visible = this.suggestionVisible();

      var reference = _reactDom["default"].findDOMNode(this.inputNode);

      if (reference instanceof HTMLElement) {
        setTimeout(function () {
          _this2.suggestionsNode.onVisibleChange(visible, reference.offsetWidth);
        });
      }
    }
  }, {
    key: "getData",
    value: function getData(queryString) {
      var _this3 = this;

      this.setState({
        loading: true
      });
      this.props.fetchSuggestions(queryString, function (suggestions) {
        _this3.setState({
          loading: false
        });

        if (Array.isArray(suggestions)) {
          _this3.setState({
            suggestions: suggestions
          });
        }
      });
    }
  }, {
    key: "handleChange",
    value: function handleChange(value) {
      this.setState({
        inputValue: value
      });

      if (!this.props.triggerOnFocus && !value) {
        this.setState({
          suggestions: []
        });
        return;
      }

      if (this.props.onChange) {
        this.props.onChange(value);
      }

      this.getData(value);
    }
  }, {
    key: "handleFocus",
    value: function handleFocus(e) {
      this.setState({
        isFocus: true
      });
      if (this.props.onFocus) this.props.onFocus(e);

      if (this.props.triggerOnFocus) {
        this.getData(this.state.inputValue);
      }
    }
  }, {
    key: "handleKeyEnter",
    value: function handleKeyEnter(highlightedIndex) {
      if (this.suggestionVisible() && highlightedIndex >= 0 && highlightedIndex < this.state.suggestions.length) {
        this.select(this.state.suggestions[highlightedIndex]);
      }
    }
  }, {
    key: "handleClickOutside",
    value: function handleClickOutside() {
      if (this.state.isFocus) {
        this.setState({
          isFocus: false
        });
      }
    }
  }, {
    key: "select",
    value: function select(item) {
      var _this4 = this;

      this.setState({
        inputValue: item.value
      }, function () {
        _this4.setState({
          suggestions: []
        });
      });

      if (this.props.onSelect) {
        this.props.onSelect(item);
      }
    }
  }, {
    key: "highlight",
    value: function highlight(index) {
      if (!this.suggestionVisible() || this.state.loading) return;
      if (index < 0) index = 0;

      if (index >= this.state.suggestions.length) {
        index = this.state.suggestions.length - 1;
      }

      var reference = _reactDom["default"].findDOMNode(this.suggestionsNode);

      if (reference instanceof HTMLElement) {
        var suggestion = document.querySelector('.el-autocomplete-suggestion__wrap');
        var suggestionList = document.querySelectorAll('.el-autocomplete-suggestion__list li');

        if (suggestion instanceof HTMLElement && suggestionList instanceof NodeList) {
          var highlightItem = suggestionList[index];
          var scrollTop = suggestion.scrollTop;
          var offsetTop = highlightItem.offsetTop;

          if (offsetTop + highlightItem.scrollHeight > scrollTop + suggestion.clientHeight) {
            suggestion.scrollTop += highlightItem.scrollHeight;
          }

          if (offsetTop < scrollTop) {
            suggestion.scrollTop -= highlightItem.scrollHeight;
          }

          this.setState({
            highlightedIndex: index
          });
        }
      }
    }
    /* Computed Methods */

  }, {
    key: "suggestionVisible",
    value: function suggestionVisible() {
      var suggestions = this.state.suggestions;
      var isValidData = Array.isArray(suggestions) && suggestions.length > 0;
      return (isValidData || this.state.loading) && this.state.isFocus;
    }
  }, {
    key: "onKeyDown",
    value: function onKeyDown(e) {
      var highlightedIndex = this.state.highlightedIndex;

      switch (e.keyCode) {
        case 13:
          this.handleKeyEnter(highlightedIndex);
          break;

        case 38:
          this.highlight(highlightedIndex - 1);
          break;

        case 40:
          this.highlight(highlightedIndex + 1);
          break;

        default:
          break;
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;

      var _this$props = this.props,
          disabled = _this$props.disabled,
          placeholder = _this$props.placeholder,
          name = _this$props.name,
          size = _this$props.size,
          icon = _this$props.icon,
          append = _this$props.append,
          prepend = _this$props.prepend,
          onIconClick = _this$props.onIconClick,
          popperClass = _this$props.popperClass;
      var _this$state = this.state,
          inputValue = _this$state.inputValue,
          suggestions = _this$state.suggestions;
      return /*#__PURE__*/_react["default"].createElement("div", {
        style: this.style(),
        className: this.className('el-autocomplete')
      }, /*#__PURE__*/_react["default"].createElement(_input["default"], {
        ref: function ref(node) {
          return _this5.inputNode = node;
        },
        value: inputValue,
        disabled: disabled,
        placeholder: placeholder,
        name: name,
        size: size,
        icon: icon,
        prepend: prepend,
        append: append,
        onIconClick: onIconClick,
        onChange: this.handleChange.bind(this),
        onFocus: this.handleFocus.bind(this),
        onBlur: this.props.onBlur,
        onKeyDown: this.onKeyDown.bind(this)
      }), /*#__PURE__*/_react["default"].createElement(_Suggestions["default"], {
        ref: function ref(node) {
          return _this5.suggestionsNode = node;
        },
        className: this.classNames(popperClass),
        suggestions: suggestions
      }));
    }
  }]);

  return AutoComplete;
}(_libs.Component);

_defineProperty(AutoComplete, "defaultProps", {
  triggerOnFocus: true
});

AutoComplete.childContextTypes = {
  component: _libs.PropTypes.any
};

var _default = (0, _reactClickOutside["default"])(AutoComplete);

exports["default"] = _default;