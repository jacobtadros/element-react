"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var React = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _popper = _interopRequireDefault(require("popper.js"));

var _libs = require("../../libs");

var _checkbox = _interopRequireDefault(require("../checkbox"));

var _Types = require("./Types");

var _locale = _interopRequireDefault(require("../locale"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

function getPopupContainer() {
  var container = document.createElement('div');
  container.className = 'el-table-poper';
  container.style.zIndex = 999;
  document.body.appendChild(container);
  return container;
}

var FilterPannel = /*#__PURE__*/function (_Component) {
  _inherits(FilterPannel, _Component);

  var _super = _createSuper(FilterPannel);

  function FilterPannel(props) {
    var _this;

    _classCallCheck(this, FilterPannel);

    _this = _super.call(this, props);
    _this.container = getPopupContainer();
    ['handleClickOutside', 'onEnter', 'onAfterLeave'].forEach(function (fn) {
      _this[fn] = _this[fn].bind(_assertThisInitialized(_this));
    });
    _this.state = {
      filteredValue: props.filteredValue
    };
    return _this;
  }

  _createClass(FilterPannel, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.renderPortal(this.renderContent(), this.container);
      document.addEventListener('click', this.handleClickOutside);
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.filteredValue !== nextProps.filteredValue) {
        this.setState({
          filteredValue: nextProps.filteredValue
        });
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.renderPortal(this.renderContent(), this.container);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.poperIns && this.poperIns.destroy();

      _reactDom["default"].unmountComponentAtNode(this.container);

      document.removeEventListener('click', this.handleClickOutside);
      document.body.removeChild(this.container);
    }
  }, {
    key: "handleFiltersChange",
    value: function handleFiltersChange(value) {
      this.setState({
        filteredValue: value
      });
    }
  }, {
    key: "changeFilteredValue",
    value: function changeFilteredValue(value) {
      this.props.onFilterChange(value);
      this.props.toggleFilter();
    }
  }, {
    key: "handleClickOutside",
    value: function handleClickOutside() {
      if (this.props.visible) {
        this.props.toggleFilter();
      }
    }
  }, {
    key: "onEnter",
    value: function onEnter() {
      this.poperIns = new _popper["default"](this.refer, this.container, {
        placement: this.props.placement
      });
    }
  }, {
    key: "onAfterLeave",
    value: function onAfterLeave() {
      this.poperIns.destroy();
    }
  }, {
    key: "renderPortal",
    value: function renderPortal(element, container) {
      _reactDom["default"].render(element, container);
    }
  }, {
    key: "renderContent",
    value: function renderContent() {
      var _this2 = this;

      var _this$props = this.props,
          multiple = _this$props.multiple,
          filters = _this$props.filters,
          visible = _this$props.visible;
      var filteredValue = this.state.filteredValue;
      var content;

      if (multiple) {
        content = [/*#__PURE__*/React.createElement("div", {
          className: "el-table-filter__content",
          key: "content"
        }, /*#__PURE__*/React.createElement(_checkbox["default"].Group, {
          value: filteredValue || [],
          onChange: this.handleFiltersChange.bind(this),
          className: "el-table-filter__checkbox-group"
        }, filters && filters.map(function (filter) {
          return /*#__PURE__*/React.createElement(_checkbox["default"], {
            value: filter.value,
            label: filter.text,
            key: filter.value
          });
        }))), /*#__PURE__*/React.createElement("div", {
          className: "el-table-filter__bottom",
          key: "bottom"
        }, /*#__PURE__*/React.createElement("button", {
          className: this.classNames({
            'is-disabled': !filteredValue || !filteredValue.length
          }),
          disabled: !filteredValue || !filteredValue.length,
          onClick: this.changeFilteredValue.bind(this, filteredValue)
        }, _locale["default"].t('el.table.confirmFilter')), /*#__PURE__*/React.createElement("button", {
          onClick: this.changeFilteredValue.bind(this, null)
        }, _locale["default"].t('el.table.resetFilter')))];
      } else {
        content = /*#__PURE__*/React.createElement("ul", {
          className: "el-table-filter__list"
        }, /*#__PURE__*/React.createElement("li", {
          className: this.classNames('el-table-filter__list-item', {
            'is-active': !filteredValue
          }),
          onClick: this.changeFilteredValue.bind(this, null)
        }, _locale["default"].t('el.table.clearFilter')), filters && filters.map(function (filter) {
          return /*#__PURE__*/React.createElement("li", {
            key: filter.value,
            className: _this2.classNames('el-table-filter__list-item', {
              'is-active': filter.value === filteredValue
            }),
            onClick: _this2.changeFilteredValue.bind(_this2, filter.value)
          }, filter.text);
        }));
      }

      return /*#__PURE__*/React.createElement(_libs.Transition, {
        name: "el-zoom-in-top",
        onEnter: this.onEnter,
        onAfterLeave: this.onAfterLeave
      }, /*#__PURE__*/React.createElement(_libs.View, {
        show: visible
      }, /*#__PURE__*/React.createElement("div", {
        className: 'el-table-filter',
        ref: function ref(dom) {
          _this2.poper = dom;
        },
        onClick: function onClick(e) {
          e.nativeEvent.stopImmediatePropagation();
        } // prevent document click event

      }, content)));
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      return /*#__PURE__*/React.cloneElement(this.props.children, {
        ref: function ref(dom) {
          _this3.refer = dom;
        }
      });
    }
  }]);

  return FilterPannel;
}(_libs.Component);

exports["default"] = FilterPannel;