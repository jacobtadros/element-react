"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _raf = _interopRequireDefault(require("raf"));

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

/**
 * @deprecated
 */
var Transition = /*#__PURE__*/function (_Component) {
  _inherits(Transition, _Component);

  var _super = _createSuper(Transition);

  function Transition(props) {
    var _this;

    _classCallCheck(this, Transition);

    _this = _super.call(this, props);
    var children = props.children;
    _this.state = {
      children: children && _this.enhanceChildren(children)
    };
    _this.didEnter = _this.didEnter.bind(_assertThisInitialized(_this));
    _this.didLeave = _this.didLeave.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Transition, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var children = /*#__PURE__*/_react["default"].isValidElement(this.props.children) && _react["default"].Children.only(this.props.children);

      var nextChildren = /*#__PURE__*/_react["default"].isValidElement(nextProps.children) && _react["default"].Children.only(nextProps.children);

      if (!nextProps.name) {
        this.setState({
          children: nextChildren
        });
        return;
      }

      if (this.isViewComponent(nextChildren)) {
        this.setState({
          children: this.enhanceChildren(nextChildren, {
            show: children ? children.props.show : true
          })
        });
      } else {
        if (nextChildren) {
          this.setState({
            children: this.enhanceChildren(nextChildren)
          });
        }
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(preProps) {
      if (!this.props.name) return;

      var children = /*#__PURE__*/_react["default"].isValidElement(this.props.children) && _react["default"].Children.only(this.props.children);

      var preChildren = /*#__PURE__*/_react["default"].isValidElement(preProps.children) && _react["default"].Children.only(preProps.children);

      if (this.isViewComponent(children)) {
        if ((!preChildren || !preChildren.props.show) && children.props.show) {
          this.toggleVisible();
        } else if (preChildren && preChildren.props.show && !children.props.show) {
          this.toggleHidden();
        }
      } else {
        if (!preChildren && children) {
          this.toggleVisible();
        } else if (preChildren && !children) {
          this.toggleHidden();
        }
      }
    }
  }, {
    key: "enhanceChildren",
    value: function enhanceChildren(children, props) {
      var _this2 = this;

      return /*#__PURE__*/_react["default"].cloneElement(children, Object.assign({
        ref: function ref(el) {
          _this2.el = el;
        }
      }, props));
    }
  }, {
    key: "transitionClass",
    get: function get() {
      var name = this.props.name;
      return {
        enter: "".concat(name, "-enter"),
        enterActive: "".concat(name, "-enter-active"),
        enterTo: "".concat(name, "-enter-to"),
        leave: "".concat(name, "-leave"),
        leaveActive: "".concat(name, "-leave-active"),
        leaveTo: "".concat(name, "-leave-to")
      };
    }
  }, {
    key: "isViewComponent",
    value: function isViewComponent(element) {
      return element && element.type._typeName === 'View';
    }
    /* css animation fix when animation applyied to .{action} instanceof .{action}-active */

  }, {
    key: "animateElement",
    value: function animateElement(element, action, active, fn) {
      element.classList.add(active);
      var styles = getComputedStyle(element);
      var duration = parseFloat(styles['animationDuration']) || parseFloat(styles['transitionDuration']);
      element.classList.add(action);

      if (duration === 0) {
        var _styles = getComputedStyle(element);

        var _duration = parseFloat(_styles['animationDuration']) || parseFloat(_styles['transitionDuration']);

        clearTimeout(this.timeout);
        this.timeout = setTimeout(function () {
          fn();
        }, _duration * 1000);
      }

      element.classList.remove(action, active);
    }
  }, {
    key: "didEnter",
    value: function didEnter(e) {
      var childDOM = _reactDom["default"].findDOMNode(this.el);

      if (!e || e.target !== childDOM) return;
      var onAfterEnter = this.props.onAfterEnter;
      var _this$transitionClass = this.transitionClass,
          enterActive = _this$transitionClass.enterActive,
          enterTo = _this$transitionClass.enterTo;
      childDOM.classList.remove(enterActive, enterTo);
      childDOM.removeEventListener('transitionend', this.didEnter);
      childDOM.removeEventListener('animationend', this.didEnter);
      onAfterEnter && onAfterEnter();
    }
  }, {
    key: "didLeave",
    value: function didLeave(e) {
      var _this3 = this;

      var childDOM = _reactDom["default"].findDOMNode(this.el);

      if (!e || e.target !== childDOM) return;
      var _this$props = this.props,
          onAfterLeave = _this$props.onAfterLeave,
          children = _this$props.children;
      var _this$transitionClass2 = this.transitionClass,
          leaveActive = _this$transitionClass2.leaveActive,
          leaveTo = _this$transitionClass2.leaveTo;
      new Promise(function (resolve) {
        if (_this3.isViewComponent(children)) {
          childDOM.removeEventListener('transitionend', _this3.didLeave);
          childDOM.removeEventListener('animationend', _this3.didLeave);
          (0, _raf["default"])(function () {
            childDOM.style.display = 'none';
            childDOM.classList.remove(leaveActive, leaveTo);
            (0, _raf["default"])(resolve);
          });
        } else {
          _this3.setState({
            children: null
          }, resolve);
        }
      }).then(function () {
        onAfterLeave && onAfterLeave();
      });
    }
  }, {
    key: "toggleVisible",
    value: function toggleVisible() {
      var _this4 = this;

      var onEnter = this.props.onEnter;
      var _this$transitionClass3 = this.transitionClass,
          enter = _this$transitionClass3.enter,
          enterActive = _this$transitionClass3.enterActive,
          enterTo = _this$transitionClass3.enterTo,
          leaveActive = _this$transitionClass3.leaveActive,
          leaveTo = _this$transitionClass3.leaveTo;

      var childDOM = _reactDom["default"].findDOMNode(this.el);

      childDOM.addEventListener('transitionend', this.didEnter);
      childDOM.addEventListener('animationend', this.didEnter); // this.animateElement(childDOM, enter, enterActive, this.didEnter);

      (0, _raf["default"])(function () {
        // when hidden transition not end
        if (childDOM.classList.contains(leaveActive)) {
          childDOM.classList.remove(leaveActive, leaveTo);
          childDOM.removeEventListener('transitionend', _this4.didLeave);
          childDOM.removeEventListener('animationend', _this4.didLeave);
        }

        childDOM.style.display = '';
        childDOM.classList.add(enter, enterActive);
        onEnter && onEnter();
        (0, _raf["default"])(function () {
          childDOM.classList.remove(enter);
          childDOM.classList.add(enterTo);
        });
      });
    }
  }, {
    key: "toggleHidden",
    value: function toggleHidden() {
      var _this5 = this;

      var onLeave = this.props.onLeave;
      var _this$transitionClass4 = this.transitionClass,
          leave = _this$transitionClass4.leave,
          leaveActive = _this$transitionClass4.leaveActive,
          leaveTo = _this$transitionClass4.leaveTo,
          enterActive = _this$transitionClass4.enterActive,
          enterTo = _this$transitionClass4.enterTo;

      var childDOM = _reactDom["default"].findDOMNode(this.el);

      childDOM.addEventListener('transitionend', this.didLeave);
      childDOM.addEventListener('animationend', this.didLeave); // this.animateElement(childDOM, leave, leaveActive, this.didLeave);

      (0, _raf["default"])(function () {
        // when enter transition not end
        if (childDOM.classList.contains(enterActive)) {
          childDOM.classList.remove(enterActive, enterTo);
          childDOM.removeEventListener('transitionend', _this5.didEnter);
          childDOM.removeEventListener('animationend', _this5.didEnter);
        }

        childDOM.classList.add(leave, leaveActive);
        onLeave && onLeave();
        (0, _raf["default"])(function () {
          childDOM.classList.remove(leave);
          childDOM.classList.add(leaveTo);
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      return this.state.children || null;
    }
  }]);

  return Transition;
}(_react.Component);

exports["default"] = Transition;
Transition.propTypes = {
  name: _propTypes["default"].string,
  onEnter: _propTypes["default"].func,
  // triggered when enter transition start
  onAfterEnter: _propTypes["default"].func,
  // triggered when enter transition end
  onLeave: _propTypes["default"].func,
  // triggered when leave transition start
  onAfterLeave: _propTypes["default"].func // tiggered when leave transition end

};