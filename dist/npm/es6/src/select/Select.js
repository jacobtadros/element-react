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

var _style = _interopRequireDefault(require("../../libs/utils/style"));

var _libs = require("../../libs");

var _resizeEvent = require("../../libs/utils/resize-event");

var _scrollbar = require("../scrollbar");

var _tag = _interopRequireDefault(require("../tag"));

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

_style["default"].reset("\n  .el-select-dropdown {\n    position: absolute !important;\n  }\n");

var sizeMap = {
  'large': 42,
  'small': 30,
  'mini': 22
};

var Select = /*#__PURE__*/function (_Component) {
  _inherits(Select, _Component);

  var _super = _createSuper(Select);

  function Select(props) {
    var _this;

    _classCallCheck(this, Select);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "state", void 0);

    _defineProperty(_assertThisInitialized(_this), "debouncedOnInputChange", void 0);

    _this.state = {
      options: [],
      isSelect: true,
      inputLength: 20,
      inputWidth: 0,
      inputHovering: false,
      filteredOptionsCount: 0,
      optionsCount: 0,
      hoverIndex: -1,
      bottomOverflowBeforeHidden: 0,
      cachedPlaceHolder: props.placeholder || _locale["default"].t('el.select.placeholder'),
      currentPlaceholder: props.placeholder || _locale["default"].t('el.select.placeholder'),
      selectedLabel: '',
      selectedInit: false,
      visible: false,
      selected: undefined,
      value: props.value,
      valueChangeBySelected: false,
      voidRemoteQuery: false,
      query: ''
    };

    if (props.multiple) {
      _this.state.selectedInit = true;
      _this.state.selected = [];
    }

    if (props.remote) {
      _this.state.voidRemoteQuery = true;
    }

    _this.debouncedOnInputChange = (0, _throttleDebounce.debounce)(_this.debounce(), function () {
      _this.onInputChange();
    });
    _this.resetInputWidth = _this._resetInputWidth.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Select, [{
    key: "getChildContext",
    value: function getChildContext() {
      return {
        component: this
      };
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.reference = _reactDom["default"].findDOMNode(this.refs.reference);
      this.popper = _reactDom["default"].findDOMNode(this.refs.popper);
      this.handleValueChange();
      (0, _resizeEvent.addResizeListener)(this.refs.root, this.resetInputWidth);
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(props) {
      var _this2 = this;

      if (props.placeholder != this.props.placeholder) {
        this.setState({
          currentPlaceholder: props.placeholder
        });
      }

      if (props.value != this.props.value) {
        this.setState({
          value: props.value
        }, function () {
          _this2.handleValueChange();
        });
      }
    }
  }, {
    key: "componentWillUpdate",
    value: function componentWillUpdate(props, state) {
      if (state.value != this.state.value) {
        this.onValueChange(state.value);
      }

      if (state.visible != this.state.visible) {
        if (this.props.onVisibleChange) {
          this.props.onVisibleChange(state.visible);
        }

        this.onVisibleChange(state.visible);
      }

      if (state.query != this.state.query) {
        this.onQueryChange(state.query);
      }

      if (Array.isArray(state.selected)) {
        if (state.selected.length != this.state.selected.length) {
          this.onSelectedChange(state.selected);
        }
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.state.inputWidth = this.reference.getBoundingClientRect().width;
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      (0, _resizeEvent.removeResizeListener)(this.refs.root, this.resetInputWidth);
    }
  }, {
    key: "debounce",
    value: function debounce() {
      return this.props.remote ? 300 : 0;
    }
  }, {
    key: "handleClickOutside",
    value: function handleClickOutside() {
      if (this.state.visible) {
        this.setState({
          visible: false
        });
      }
    }
  }, {
    key: "handleValueChange",
    value: function handleValueChange() {
      var _this3 = this;

      var multiple = this.props.multiple;
      var _this$state = this.state,
          value = _this$state.value,
          options = _this$state.options;

      if (multiple && Array.isArray(value)) {
        this.setState({
          selected: options.reduce(function (prev, curr) {
            return value.indexOf(curr.props.value) > -1 ? prev.concat(curr) : prev;
          }, [])
        }, function () {
          _this3.onSelectedChange(_this3.state.selected, false);
        });
      } else {
        var selected = options.filter(function (option) {
          return option.props.value === value;
        })[0];

        if (selected) {
          this.state.selectedLabel = selected.props.label || selected.props.value;
        }
      }
    }
  }, {
    key: "onVisibleChange",
    value: function onVisibleChange(visible) {
      var _this$props = this.props,
          multiple = _this$props.multiple,
          filterable = _this$props.filterable;
      var _this$state2 = this.state,
          query = _this$state2.query,
          dropdownUl = _this$state2.dropdownUl,
          selected = _this$state2.selected,
          selectedLabel = _this$state2.selectedLabel,
          bottomOverflowBeforeHidden = _this$state2.bottomOverflowBeforeHidden;

      if (!visible) {
        this.reference.querySelector('input').blur();

        if (this.refs.root.querySelector('.el-input__icon')) {
          var elements = this.refs.root.querySelector('.el-input__icon');

          for (var i = 0; i < elements.length; i++) {
            elements[i].classList.remove('is-reverse');
          }
        }

        if (this.refs.input) {
          this.refs.input.blur();
        }

        this.resetHoverIndex();

        if (!multiple) {
          if (dropdownUl && selected) {
            var element = _reactDom["default"].findDOMNode(selected);

            bottomOverflowBeforeHidden = element.getBoundingClientRect().bottom - this.popper.getBoundingClientRect().bottom;
          }

          if (selected && selected.props) {
            if (selected.props.value) {
              selectedLabel = selected.currentLabel();
            }
          } else if (filterable) {
            selectedLabel = '';
          }

          this.setState({
            bottomOverflowBeforeHidden: bottomOverflowBeforeHidden,
            selectedLabel: selectedLabel
          });
        }
      } else {
        var icon = this.refs.root.querySelector('.el-input__icon');

        if (icon && !icon.classList.contains('el-icon-circle-close')) {
          var _elements = this.refs.root.querySelector('.el-input__icon');

          for (var _i = 0; _i < _elements.length; _i++) {
            _elements[_i].classList.add('is-reverse');
          }
        }

        if (this.popperJS) {
          this.popperJS.update();
        }

        if (filterable) {
          query = selectedLabel;

          if (multiple) {
            this.refs.input.focus();
          } else {
            this.refs.reference.focus();
          }
        }

        if (!dropdownUl) {
          var dropdownChildNodes = this.popper.childNodes;
          dropdownUl = [].filter.call(dropdownChildNodes, function (item) {
            return item.tagName === 'UL';
          })[0];
        }

        if (!multiple && dropdownUl) {
          if (bottomOverflowBeforeHidden > 0) {
            dropdownUl.scrollTop += bottomOverflowBeforeHidden;
          }
        }

        this.setState({
          query: query || '',
          dropdownUl: dropdownUl
        });
      }
    }
  }, {
    key: "onValueChange",
    value: function onValueChange(val) {
      var _this4 = this;

      var multiple = this.props.multiple;
      var _this$state3 = this.state,
          options = _this$state3.options,
          valueChangeBySelected = _this$state3.valueChangeBySelected,
          selectedInit = _this$state3.selectedInit,
          selected = _this$state3.selected,
          selectedLabel = _this$state3.selectedLabel,
          currentPlaceholder = _this$state3.currentPlaceholder,
          cachedPlaceHolder = _this$state3.cachedPlaceHolder;

      if (valueChangeBySelected) {
        return this.setState({
          valueChangeBySelected: false
        });
      }

      if (multiple && Array.isArray(val)) {
        this.resetInputHeight();
        selectedInit = true;
        selected = [];
        currentPlaceholder = cachedPlaceHolder;
        val.forEach(function (item) {
          var option = options.filter(function (option) {
            return option.props.value === item;
          })[0];

          if (option) {
            _this4.addOptionToValue(option);
          }
        });
        this.forceUpdate();
      }

      if (!multiple) {
        var option = options.filter(function (option) {
          return option.props.value === val;
        })[0];

        if (option) {
          this.addOptionToValue(option);
          this.setState({
            selectedInit: selectedInit,
            currentPlaceholder: currentPlaceholder
          });
        } else {
          selected = {};
          selectedLabel = '';
          this.setState({
            selectedInit: selectedInit,
            selected: selected,
            currentPlaceholder: currentPlaceholder,
            selectedLabel: selectedLabel
          }, function () {
            _this4.resetHoverIndex();
          });
        }
      }
    }
  }, {
    key: "onSelectedChange",
    value: function onSelectedChange(val) {
      var _this5 = this;

      var bubble = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var form = this.context.form;
      var _this$props2 = this.props,
          multiple = _this$props2.multiple,
          filterable = _this$props2.filterable,
          onChange = _this$props2.onChange;
      var _this$state4 = this.state,
          query = _this$state4.query,
          hoverIndex = _this$state4.hoverIndex,
          inputLength = _this$state4.inputLength,
          selectedInit = _this$state4.selectedInit,
          currentPlaceholder = _this$state4.currentPlaceholder,
          cachedPlaceHolder = _this$state4.cachedPlaceHolder,
          valueChangeBySelected = _this$state4.valueChangeBySelected;

      if (multiple) {
        if (val.length > 0) {
          currentPlaceholder = '';
        } else {
          currentPlaceholder = cachedPlaceHolder;
        }

        this.setState({
          currentPlaceholder: currentPlaceholder
        }, function () {
          _this5.resetInputHeight();
        });
        valueChangeBySelected = true;

        if (bubble) {
          onChange && onChange(val.map(function (item) {
            return item.props.value;
          }), val);
          form && form.onFieldChange();
        }

        if (filterable) {
          query = '';
          hoverIndex = -1;
          inputLength = 20;
          this.refs.input.focus();
        }

        this.setState({
          valueChangeBySelected: valueChangeBySelected,
          query: query,
          hoverIndex: hoverIndex,
          inputLength: inputLength
        }, function () {
          if (_this5.refs.input) {
            _this5.refs.input.value = '';
          }
        });
      } else {
        if (selectedInit) {
          return this.setState({
            selectedInit: false
          });
        }

        if (bubble) {
          onChange && onChange(val.props.value, val);
          form && form.onFieldChange();
        }
      }
    }
  }, {
    key: "onQueryChange",
    value: function onQueryChange(query) {
      var _this$props3 = this.props,
          multiple = _this$props3.multiple,
          filterable = _this$props3.filterable,
          remote = _this$props3.remote,
          remoteMethod = _this$props3.remoteMethod,
          filterMethod = _this$props3.filterMethod;
      var _this$state5 = this.state,
          voidRemoteQuery = _this$state5.voidRemoteQuery,
          hoverIndex = _this$state5.hoverIndex,
          options = _this$state5.options,
          optionsCount = _this$state5.optionsCount;

      if (this.popperJS) {
        this.popperJS.update();
      }

      if (multiple && filterable) {
        this.resetInputHeight();
      }

      if (remote && typeof remoteMethod === 'function') {
        hoverIndex = -1;
        voidRemoteQuery = query === '';
        remoteMethod(query);
        options.forEach(function (option) {
          option.resetIndex();
        });
      } else if (typeof filterMethod === 'function') {
        filterMethod(query);
      } else {
        this.setState({
          filteredOptionsCount: optionsCount
        }, function () {
          options.forEach(function (option) {
            option.queryChange(query);
          });
        });
      }

      this.setState({
        hoverIndex: hoverIndex,
        voidRemoteQuery: voidRemoteQuery
      });
    }
  }, {
    key: "onEnter",
    value: function onEnter() {
      this.popperJS = new _popper["default"](this.reference, this.popper, {
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
    key: "iconClass",
    value: function iconClass() {
      return this.showCloseIcon() ? 'circle-close' : this.props.remote && this.props.filterable ? '' : "caret-top ".concat(this.state.visible ? 'is-reverse' : '');
    }
  }, {
    key: "showCloseIcon",
    value: function showCloseIcon() {
      var criteria = this.props.clearable && this.state.inputHovering && !this.props.multiple && this.state.options.indexOf(this.state.selected) > -1;
      if (!this.refs.root) return false;
      var icon = this.refs.root.querySelector('.el-input__icon');

      if (icon) {
        if (criteria) {
          icon.addEventListener('click', this.deleteSelected.bind(this));
          icon.classList.add('is-show-close');
        } else {
          icon.removeEventListener('click', this.deleteSelected.bind(this));
          icon.classList.remove('is-show-close');
        }
      }

      return criteria;
    }
  }, {
    key: "emptyText",
    value: function emptyText() {
      var _this$props4 = this.props,
          loading = _this$props4.loading,
          filterable = _this$props4.filterable;
      var _this$state6 = this.state,
          voidRemoteQuery = _this$state6.voidRemoteQuery,
          options = _this$state6.options,
          filteredOptionsCount = _this$state6.filteredOptionsCount;

      if (loading) {
        return _locale["default"].t('el.select.loading');
      } else {
        if (voidRemoteQuery) {
          this.state.voidRemoteQuery = false;
          return false;
        }

        if (filterable && filteredOptionsCount === 0) {
          return _locale["default"].t('el.select.noMatch');
        }

        if (options.length === 0) {
          return _locale["default"].t('el.select.noData');
        }
      }

      return null;
    }
  }, {
    key: "handleClose",
    value: function handleClose() {
      this.setState({
        visible: false
      });
    }
  }, {
    key: "toggleLastOptionHitState",
    value: function toggleLastOptionHitState(hit) {
      var selected = this.state.selected;
      if (!Array.isArray(selected)) return;
      var option = selected[selected.length - 1];
      if (!option) return;

      if (hit === true || hit === false) {
        return option.hitState = hit;
      }

      option.hitState = !option.hitState;
      return option.hitState;
    }
  }, {
    key: "deletePrevTag",
    value: function deletePrevTag(e) {
      if (e.target.value.length <= 0 && !this.toggleLastOptionHitState()) {
        var selected = this.state.selected;
        selected.pop();
        this.setState({
          selected: selected
        });
      }
    }
  }, {
    key: "addOptionToValue",
    value: function addOptionToValue(option, init) {
      var _this$props5 = this.props,
          multiple = _this$props5.multiple,
          remote = _this$props5.remote;
      var _this$state7 = this.state,
          selected = _this$state7.selected,
          selectedLabel = _this$state7.selectedLabel,
          hoverIndex = _this$state7.hoverIndex,
          value = _this$state7.value;

      if (multiple) {
        if (selected.indexOf(option) === -1 && (remote ? value.indexOf(option.props.value) === -1 : true)) {
          this.selectedInit = !!init;
          selected.push(option);
          this.resetHoverIndex();
        }
      } else {
        this.selectedInit = !!init;
        selected = option;
        selectedLabel = option.currentLabel();
        hoverIndex = option.index;
        this.setState({
          selected: selected,
          selectedLabel: selectedLabel,
          hoverIndex: hoverIndex
        });
      }
    }
  }, {
    key: "managePlaceholder",
    value: function managePlaceholder() {
      var _this$state8 = this.state,
          currentPlaceholder = _this$state8.currentPlaceholder,
          cachedPlaceHolder = _this$state8.cachedPlaceHolder;

      if (currentPlaceholder !== '') {
        currentPlaceholder = this.refs.input.value ? '' : cachedPlaceHolder;
      }

      this.setState({
        currentPlaceholder: currentPlaceholder
      });
    }
  }, {
    key: "resetInputState",
    value: function resetInputState(e) {
      if (e.keyCode !== 8) {
        this.toggleLastOptionHitState(false);
      }

      this.setState({
        inputLength: this.refs.input.value.length * 15 + 20
      });
    }
  }, {
    key: "_resetInputWidth",
    value: function _resetInputWidth() {
      this.setState({
        inputWidth: this.reference.getBoundingClientRect().width
      });
    }
  }, {
    key: "resetInputHeight",
    value: function resetInputHeight() {
      var inputChildNodes = this.reference.childNodes;
      var input = [].filter.call(inputChildNodes, function (item) {
        return item.tagName === 'INPUT';
      })[0];
      input.style.height = Math.max(this.refs.tags.clientHeight + 6, sizeMap[this.props.size] || 36) + 'px';

      if (this.popperJS) {
        this.popperJS.update();
      }
    }
  }, {
    key: "resetHoverIndex",
    value: function resetHoverIndex() {
      var _this6 = this;

      var multiple = this.props.multiple;
      var _this$state9 = this.state,
          hoverIndex = _this$state9.hoverIndex,
          options = _this$state9.options,
          selected = _this$state9.selected;
      setTimeout(function () {
        if (!multiple) {
          hoverIndex = options.indexOf(selected);
        } else {
          if (selected.length > 0) {
            hoverIndex = Math.min.apply(null, selected.map(function (item) {
              return options.indexOf(item);
            }));
          } else {
            hoverIndex = -1;
          }
        }

        _this6.setState({
          hoverIndex: hoverIndex
        });
      }, 300);
    }
  }, {
    key: "toggleMenu",
    value: function toggleMenu() {
      var _this$props6 = this.props,
          filterable = _this$props6.filterable,
          disabled = _this$props6.disabled;
      var _this$state10 = this.state,
          query = _this$state10.query,
          visible = _this$state10.visible;

      if (filterable && query === '' && visible) {
        return;
      }

      if (!disabled) {
        this.setState({
          visible: !visible
        });
      }
    }
  }, {
    key: "navigateOptions",
    value: function navigateOptions(direction) {
      var _this7 = this;

      var _this$state11 = this.state,
          visible = _this$state11.visible,
          hoverIndex = _this$state11.hoverIndex,
          options = _this$state11.options;

      if (!visible) {
        return this.setState({
          visible: true
        });
      }

      var skip;

      if (options.length != options.filter(function (item) {
        return item.props.disabled === true;
      }).length) {
        if (direction === 'next') {
          hoverIndex++;

          if (hoverIndex === options.length) {
            hoverIndex = 0;
          }

          if (options[hoverIndex].props.disabled === true || options[hoverIndex].props.groupDisabled === true || !options[hoverIndex].state.visible) {
            skip = 'next';
          }
        }

        if (direction === 'prev') {
          hoverIndex--;

          if (hoverIndex < 0) {
            hoverIndex = options.length - 1;
          }

          if (options[hoverIndex].props.disabled === true || options[hoverIndex].props.groupDisabled === true || !options[hoverIndex].state.visible) {
            skip = 'prev';
          }
        }
      }

      this.setState({
        hoverIndex: hoverIndex,
        options: options
      }, function () {
        if (skip) {
          _this7.navigateOptions(skip);
        }

        _this7.resetScrollTop();
      });
    }
  }, {
    key: "resetScrollTop",
    value: function resetScrollTop() {
      var element = _reactDom["default"].findDOMNode(this.state.options[this.state.hoverIndex]);

      var bottomOverflowDistance = element.getBoundingClientRect().bottom - this.popper.getBoundingClientRect().bottom;
      var topOverflowDistance = element.getBoundingClientRect().top - this.popper.getBoundingClientRect().top;

      if (this.state.dropdownUl) {
        if (bottomOverflowDistance > 0) {
          this.state.dropdownUl.scrollTop += bottomOverflowDistance;
        }

        if (topOverflowDistance < 0) {
          this.state.dropdownUl.scrollTop += topOverflowDistance;
        }
      }
    }
  }, {
    key: "selectOption",
    value: function selectOption() {
      var _this$state12 = this.state,
          hoverIndex = _this$state12.hoverIndex,
          options = _this$state12.options;

      if (options[hoverIndex]) {
        this.onOptionClick(options[hoverIndex]);
      }
    }
  }, {
    key: "deleteSelected",
    value: function deleteSelected(e) {
      e.stopPropagation();

      if (this.state.selectedLabel != '') {
        this.setState({
          selected: {},
          selectedLabel: '',
          visible: false
        });
        this.context.form && this.context.form.onFieldChange();

        if (this.props.onChange) {
          this.props.onChange('');
        }

        if (this.props.onClear) {
          this.props.onClear();
        }
      }
    }
  }, {
    key: "deleteTag",
    value: function deleteTag(tag) {
      var _this8 = this;

      var index = this.state.selected.indexOf(tag);

      if (index > -1 && !this.props.disabled) {
        var selected = this.state.selected.slice(0);
        selected.splice(index, 1);
        this.setState({
          selected: selected
        }, function () {
          if (_this8.props.onRemoveTag) {
            _this8.props.onRemoveTag(tag.props.value);
          }
        });
      }
    }
  }, {
    key: "handleIconClick",
    value: function handleIconClick(event) {
      if (this.iconClass().indexOf('circle-close') > -1) {
        this.deleteSelected(event);
      } else {
        this.toggleMenu();
      }
    }
  }, {
    key: "onInputChange",
    value: function onInputChange() {
      if (this.props.filterable && this.state.selectedLabel !== this.state.value) {
        this.setState({
          query: this.state.selectedLabel
        });
      }
    }
  }, {
    key: "onOptionCreate",
    value: function onOptionCreate(option) {
      this.state.options.push(option);
      this.state.optionsCount++;
      this.state.filteredOptionsCount++;
      this.forceUpdate();
      this.handleValueChange();
    }
  }, {
    key: "onOptionDestroy",
    value: function onOptionDestroy(option) {
      this.state.optionsCount--;
      this.state.filteredOptionsCount--;
      var index = this.state.options.indexOf(option);

      if (index > -1) {
        this.state.options.splice(index, 1);
      }

      this.state.options.forEach(function (el) {
        if (el != option) {
          el.resetIndex();
        }
      });
      this.forceUpdate();
      this.handleValueChange();
    }
  }, {
    key: "onOptionClick",
    value: function onOptionClick(option) {
      var _this9 = this;

      var multiple = this.props.multiple;
      var _this$state13 = this.state,
          visible = _this$state13.visible,
          selected = _this$state13.selected,
          selectedLabel = _this$state13.selectedLabel;

      if (!multiple) {
        selected = option;
        selectedLabel = option.currentLabel();
        visible = false;
      } else {
        var optionIndex = -1;
        selected = selected.slice(0);
        selected.forEach(function (item, index) {
          if (item === option || item.props.value === option.props.value) {
            optionIndex = index;
          }
        });

        if (optionIndex > -1) {
          selected.splice(optionIndex, 1);
        } else {
          selected.push(option);
        }
      }

      this.setState({
        selected: selected,
        selectedLabel: selectedLabel
      }, function () {
        if (!multiple) {
          _this9.onSelectedChange(_this9.state.selected);
        }

        _this9.setState({
          visible: visible
        });
      });
    }
  }, {
    key: "onMouseDown",
    value: function onMouseDown(event) {
      event.preventDefault();

      if (this.refs.input) {
        this.refs.input.focus();
      }

      this.toggleMenu();
    }
  }, {
    key: "onMouseEnter",
    value: function onMouseEnter() {
      this.setState({
        inputHovering: true
      });
    }
  }, {
    key: "onMouseLeave",
    value: function onMouseLeave() {
      this.setState({
        inputHovering: false
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this10 = this;

      var _this$props7 = this.props,
          multiple = _this$props7.multiple,
          size = _this$props7.size,
          disabled = _this$props7.disabled,
          filterable = _this$props7.filterable,
          loading = _this$props7.loading;
      var _this$state14 = this.state,
          selected = _this$state14.selected,
          inputWidth = _this$state14.inputWidth,
          inputLength = _this$state14.inputLength,
          query = _this$state14.query,
          selectedLabel = _this$state14.selectedLabel,
          visible = _this$state14.visible,
          options = _this$state14.options,
          filteredOptionsCount = _this$state14.filteredOptionsCount,
          currentPlaceholder = _this$state14.currentPlaceholder;
      return /*#__PURE__*/_react["default"].createElement("div", {
        ref: "root",
        style: this.style(),
        className: this.className('el-select')
      }, multiple && /*#__PURE__*/_react["default"].createElement("div", {
        ref: "tags",
        className: "el-select__tags",
        onClick: this.toggleMenu.bind(this),
        style: {
          maxWidth: inputWidth - 32
        }
      }, selected.map(function (el) {
        return /*#__PURE__*/_react["default"].createElement(_tag["default"], {
          type: "primary",
          key: el.props.value,
          hit: el.hitState,
          closable: !disabled,
          closeTransition: true,
          onClose: _this10.deleteTag.bind(_this10, el)
        }, /*#__PURE__*/_react["default"].createElement("span", {
          className: "el-select__tags-text"
        }, el.currentLabel()));
      }), filterable && /*#__PURE__*/_react["default"].createElement("input", {
        ref: "input",
        type: "text",
        className: this.classNames('el-select__input', size && "is-".concat(size)),
        style: {
          width: inputLength,
          maxWidth: inputWidth - 42
        },
        disabled: disabled,
        defaultValue: query,
        onKeyUp: this.managePlaceholder.bind(this),
        onKeyDown: function onKeyDown(e) {
          _this10.resetInputState(e);

          switch (e.keyCode) {
            case 27:
              _this10.setState({
                visible: false
              });

              e.preventDefault();
              break;

            case 8:
              _this10.deletePrevTag(e);

              break;

            case 13:
              _this10.selectOption();

              e.preventDefault();
              break;

            case 38:
              _this10.navigateOptions('prev');

              e.preventDefault();
              break;

            case 40:
              _this10.navigateOptions('next');

              e.preventDefault();
              break;

            default:
              break;
          }
        },
        onChange: function onChange(e) {
          clearTimeout(_this10.timeout);
          _this10.timeout = setTimeout(function () {
            _this10.setState({
              query: _this10.state.value
            });
          }, _this10.debounce());
          _this10.state.value = e.target.value;
        }
      })), /*#__PURE__*/_react["default"].createElement(_input["default"], {
        ref: "reference",
        value: selectedLabel,
        type: "text",
        placeholder: currentPlaceholder,
        name: "name",
        size: size,
        disabled: disabled,
        readOnly: !filterable || multiple,
        icon: this.iconClass() || undefined,
        onChange: function onChange(value) {
          return _this10.setState({
            selectedLabel: value
          });
        },
        onIconClick: this.handleIconClick.bind(this),
        onMouseDown: this.onMouseDown.bind(this),
        onMouseEnter: this.onMouseEnter.bind(this),
        onMouseLeave: this.onMouseLeave.bind(this),
        onKeyUp: this.debouncedOnInputChange.bind(this),
        onKeyDown: function onKeyDown(e) {
          switch (e.keyCode) {
            case 9:
            case 27:
              _this10.setState({
                visible: false
              });

              e.preventDefault();
              break;

            case 13:
              _this10.selectOption();

              e.preventDefault();
              break;

            case 38:
              _this10.navigateOptions('prev');

              e.preventDefault();
              break;

            case 40:
              _this10.navigateOptions('next');

              e.preventDefault();
              break;

            default:
              break;
          }
        }
      }), /*#__PURE__*/_react["default"].createElement(_libs.Transition, {
        name: "el-zoom-in-top",
        onEnter: this.onEnter.bind(this),
        onAfterLeave: this.onAfterLeave.bind(this)
      }, /*#__PURE__*/_react["default"].createElement(_libs.View, {
        show: visible && this.emptyText() !== false
      }, /*#__PURE__*/_react["default"].createElement("div", {
        ref: "popper",
        className: this.classNames('el-select-dropdown', {
          'is-multiple': multiple
        }),
        style: {
          minWidth: inputWidth
        }
      }, /*#__PURE__*/_react["default"].createElement(_libs.View, {
        show: options.length > 0 && filteredOptionsCount > 0 && !loading
      }, /*#__PURE__*/_react["default"].createElement(_scrollbar.Scrollbar, {
        viewComponent: "ul",
        wrapClass: "el-select-dropdown__wrap",
        viewClass: "el-select-dropdown__list"
      }, this.props.children)), this.emptyText() && /*#__PURE__*/_react["default"].createElement("p", {
        className: "el-select-dropdown__empty"
      }, this.emptyText())))));
    }
  }]);

  return Select;
}(_libs.Component);

Select.childContextTypes = {
  component: _libs.PropTypes.any
};
Select.contextTypes = {
  form: _libs.PropTypes.any
};
Select.propTypes = {
  value: _libs.PropTypes.any,
  size: _libs.PropTypes.string,
  disabled: _libs.PropTypes.bool,
  clearable: _libs.PropTypes.bool,
  filterable: _libs.PropTypes.bool,
  loading: _libs.PropTypes.bool,
  remote: _libs.PropTypes.bool,
  remoteMethod: _libs.PropTypes.func,
  filterMethod: _libs.PropTypes.func,
  multiple: _libs.PropTypes.bool,
  placeholder: _libs.PropTypes.string,
  onChange: _libs.PropTypes.func,
  onVisibleChange: _libs.PropTypes.func,
  onRemoveTag: _libs.PropTypes.func,
  onClear: _libs.PropTypes.func
};

var _default = (0, _reactClickOutside["default"])(Select);

exports["default"] = _default;