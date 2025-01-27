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

var Tag = /*#__PURE__*/function (_Component) {
  _inherits(Tag, _Component);

  var _super = _createSuper(Tag);

  function Tag(props) {
    var _this;

    _classCallCheck(this, Tag);

    _this = _super.call(this, props);
    _this.state = {
      visible: true
    };
    return _this;
  }

  _createClass(Tag, [{
    key: "handleClose",
    value: function handleClose() {
      var _this2 = this;

      this.setState({
        visible: false
      }, function () {
        if (_this2.props.onClose) {
          _this2.props.onClose();
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          type = _this$props.type,
          hit = _this$props.hit,
          closable = _this$props.closable,
          closeTransition = _this$props.closeTransition,
          color = _this$props.color;
      return /*#__PURE__*/_react["default"].createElement(_libs.Transition, {
        name: closeTransition ? '' : 'el-zoom-in-center'
      }, /*#__PURE__*/_react["default"].createElement(_libs.View, {
        key: this.state.visible,
        show: this.state.visible
      }, /*#__PURE__*/_react["default"].createElement("span", {
        style: this.style({
          backgroundColor: color
        }),
        className: this.className('el-tag', type && "el-tag--".concat(type), {
          'is-hit': hit
        })
      }, this.props.children, closable && /*#__PURE__*/_react["default"].createElement("i", {
        className: "el-tag__close el-icon-close",
        onClick: this.handleClose.bind(this)
      }))));
    }
  }]);

  return Tag;
}(_libs.Component);

exports["default"] = Tag;
Tag.propTypes = {
  closable: _libs.PropTypes.bool,
  type: _libs.PropTypes.string,
  hit: _libs.PropTypes.bool,
  color: _libs.PropTypes.string,
  closeTransition: _libs.PropTypes.bool,
  onClose: _libs.PropTypes.func
};