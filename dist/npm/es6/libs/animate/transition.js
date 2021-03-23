"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactTransitionGroup = require("react-transition-group");

var _view = _interopRequireDefault(require("../view"));

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

var noneFun = function noneFun() {
  return undefined;
};

var Transition = /*#__PURE__*/function (_Component) {
  _inherits(Transition, _Component);

  var _super = _createSuper(Transition);

  function Transition() {
    _classCallCheck(this, Transition);

    return _super.apply(this, arguments);
  }

  _createClass(Transition, [{
    key: "render",
    value: function render() {
      var _this = this;

      var _this$props = this.props,
          inProp = _this$props["in"],
          _onEnter = _this$props.onEnter,
          _onEntering = _this$props.onEntering,
          _onEntered = _this$props.onEntered,
          _onExit = _this$props.onExit,
          _onExiting = _this$props.onExiting,
          _onExited = _this$props.onExited,
          _addEndListener = _this$props.addEndListener,
          unmountOnExit = _this$props.unmountOnExit,
          appear = _this$props.appear,
          duration = _this$props.duration,
          mountOnEnter = _this$props.mountOnEnter,
          transitionClass = _this$props.transitionClass;
      return /*#__PURE__*/_react["default"].createElement(_reactTransitionGroup.Transition, {
        onEnter: function onEnter() {
          return _onEnter();
        },
        onEntering: function onEntering() {
          return _onEntering();
        },
        onEntered: function onEntered() {
          return _onEntered();
        },
        onExit: function onExit() {
          return _onExit();
        },
        onExiting: function onExiting() {
          return _onExiting();
        },
        onExited: function onExited() {
          return _onExited();
        },
        addEndListener: function addEndListener() {
          return _addEndListener();
        },
        "in": inProp,
        mountOnEnter: mountOnEnter,
        unmountOnExit: unmountOnExit,
        appear: appear,
        timeout: duration
      }, function (state) {
        return /*#__PURE__*/_react["default"].createElement(_view["default"], {
          className: transitionClass[state]
        }, _this.props.children);
      });
    }
  }]);

  return Transition;
}(_react.Component);

Transition.defaultProps = {
  onEnter: noneFun,
  onEntering: noneFun,
  onEntered: noneFun,
  onExit: noneFun,
  onExiting: noneFun,
  onExited: noneFun,
  addEndListener: noneFun,
  mountOnEnter: false,
  unmountOnExit: false,
  appear: true,
  duration: 0
};
var _default = Transition;
exports["default"] = _default;