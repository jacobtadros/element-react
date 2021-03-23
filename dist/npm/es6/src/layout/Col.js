"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _libs = require("../../libs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

var Col = /*#__PURE__*/function (_Component) {
  _inherits(Col, _Component);

  var _super = _createSuper(Col);

  function Col() {
    _classCallCheck(this, Col);

    return _super.apply(this, arguments);
  }

  _createClass(Col, [{
    key: "getStyle",
    value: function getStyle() {
      var style = {};

      if (this.context.gutter) {
        style.paddingLeft = "".concat(this.context.gutter / 2, "px");
        style.paddingRight = style.paddingLeft;
      }

      return style;
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      var classList = [];
      ['span', 'offset', 'pull', 'push'].forEach(function (prop) {
        if (_this.props[prop] >= 0) {
          classList.push(prop !== 'span' ? "el-col-".concat(prop, "-").concat(_this.props[prop]) : "el-col-".concat(_this.props[prop]));
        }
      });
      ['xs', 'sm', 'md', 'lg'].forEach(function (size) {
        if (_typeof(_this.props[size]) === 'object') {
          var props = _this.props[size];
          Object.keys(props).forEach(function (prop) {
            classList.push(prop !== 'span' ? "el-col-".concat(size, "-").concat(prop, "-").concat(props[prop]) : "el-col-".concat(size, "-").concat(props[prop]));
          });
        } else if (_this.props[size] >= 0) {
          classList.push("el-col-".concat(size, "-").concat(Number(_this.props[size])));
        }
      });
      return /*#__PURE__*/_react["default"].createElement(this.props.tag, {
        className: this.className('el-col', classList),
        style: this.style(this.getStyle())
      }, this.props.children);
    }
  }]);

  return Col;
}(_libs.Component);

exports["default"] = Col;
Col.contextTypes = {
  gutter: _libs.PropTypes.oneOfType([_libs.PropTypes.number, _libs.PropTypes.string])
};
Col.propTypes = {
  span: _libs.PropTypes.oneOfType([_libs.PropTypes.number, _libs.PropTypes.string]),
  offset: _libs.PropTypes.oneOfType([_libs.PropTypes.number, _libs.PropTypes.string]),
  pull: _libs.PropTypes.oneOfType([_libs.PropTypes.number, _libs.PropTypes.string]),
  push: _libs.PropTypes.oneOfType([_libs.PropTypes.number, _libs.PropTypes.string]),
  xs: _libs.PropTypes.oneOfType([_libs.PropTypes.number, _libs.PropTypes.string, _libs.PropTypes.object]),
  sm: _libs.PropTypes.oneOfType([_libs.PropTypes.number, _libs.PropTypes.string, _libs.PropTypes.object]),
  md: _libs.PropTypes.oneOfType([_libs.PropTypes.number, _libs.PropTypes.string, _libs.PropTypes.object]),
  lg: _libs.PropTypes.oneOfType([_libs.PropTypes.number, _libs.PropTypes.string, _libs.PropTypes.object]),
  tag: _libs.PropTypes.string
};
Col.defaultProps = {
  span: 24,
  tag: 'div'
};