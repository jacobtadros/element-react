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

var Loading = /*#__PURE__*/function (_Component) {
  _inherits(Loading, _Component);

  var _super = _createSuper(Loading);

  function Loading() {
    _classCallCheck(this, Loading);

    return _super.apply(this, arguments);
  }

  _createClass(Loading, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.enableScroll();
    }
  }, {
    key: "getStyle",
    value: function getStyle() {
      if (this.props.fullscreen) {
        this.disableScroll();
        return {
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          zIndex: 99999
        };
      } else {
        this.enableScroll();

        if (this.props.loading) {
          return {
            position: 'relative'
          };
        }

        return {};
      }
    }
  }, {
    key: "documentBody",
    value: function documentBody() {
      return document.body;
    }
  }, {
    key: "disableScroll",
    value: function disableScroll() {
      var documentBody = this.documentBody();

      if (documentBody) {
        documentBody.style.setProperty('overflow', 'hidden');
      }
    }
  }, {
    key: "enableScroll",
    value: function enableScroll() {
      var documentBody = this.documentBody();

      if (documentBody) {
        documentBody.style.removeProperty('overflow');
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          loading = _this$props.loading,
          fullscreen = _this$props.fullscreen,
          text = _this$props.text;
      return /*#__PURE__*/_react["default"].createElement("div", {
        style: this.style(this.getStyle()),
        className: this.className()
      }, loading && /*#__PURE__*/_react["default"].createElement("div", {
        style: {
          display: 'block',
          position: 'absolute',
          zIndex: 657,
          backgroundColor: 'rgba(255, 255, 255, 0.901961)',
          margin: 0,
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        }
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: this.classNames('el-loading-spinner', {
          'is-full-screen': fullscreen
        }),
        style: {
          position: 'absolute',
          display: 'inline-block',
          left: 0
        }
      }, /*#__PURE__*/_react["default"].createElement("svg", {
        className: "circular",
        viewBox: "25 25 50 50"
      }, /*#__PURE__*/_react["default"].createElement("circle", {
        className: "path",
        cx: "50",
        cy: "50",
        r: "20",
        fill: "none"
      })), text && /*#__PURE__*/_react["default"].createElement("p", {
        className: "el-loading-text"
      }, text))), this.props.children);
    }
  }]);

  return Loading;
}(_libs.Component);

exports["default"] = Loading;
Loading.propTypes = {
  loading: _libs.PropTypes.bool,
  fullscreen: _libs.PropTypes.bool,
  text: _libs.PropTypes.string
};
Loading.defaultProps = {
  loading: true
};