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

var CollapseItem = /*#__PURE__*/function (_Component) {
  _inherits(CollapseItem, _Component);

  var _super = _createSuper(CollapseItem);

  function CollapseItem(props) {
    _classCallCheck(this, CollapseItem);

    return _super.call(this, props);
  }

  _createClass(CollapseItem, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          title = _this$props.title,
          isActive = _this$props.isActive,
          _onClick = _this$props.onClick,
          name = _this$props.name;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: this.classNames({
          'el-collapse-item': true,
          'is-active': isActive
        })
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "el-collapse-item__header",
        onClick: function onClick() {
          return _onClick(name);
        }
      }, /*#__PURE__*/_react["default"].createElement("i", {
        className: "el-collapse-item__header__arrow el-icon-arrow-right"
      }), title), /*#__PURE__*/_react["default"].createElement(_libs.CollapseTransition, {
        isShow: isActive
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "el-collapse-item__wrap"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "el-collapse-item__content"
      }, this.props.children))));
    }
  }]);

  return CollapseItem;
}(_libs.Component);

exports["default"] = CollapseItem;
CollapseItem.propTypes = {
  onClick: _libs.PropTypes.func,
  isActive: _libs.PropTypes.bool,
  title: _libs.PropTypes.node,
  name: _libs.PropTypes.string
};