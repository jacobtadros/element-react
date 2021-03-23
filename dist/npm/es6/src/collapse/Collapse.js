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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Collapse = /*#__PURE__*/function (_Component) {
  _inherits(Collapse, _Component);

  var _super = _createSuper(Collapse);

  function Collapse(props) {
    var _this;

    _classCallCheck(this, Collapse);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "state", void 0);

    _this.state = {
      activeNames: [].concat(_this.props.value)
    };
    return _this;
  }

  _createClass(Collapse, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      this.setActiveNames(nextProps.value);
    }
  }, {
    key: "setActiveNames",
    value: function setActiveNames(activeNames) {
      var _this2 = this;

      activeNames = [].concat(activeNames);
      this.setState({
        activeNames: activeNames
      }, function () {
        return _this2.props.onChange(activeNames);
      });
    }
  }, {
    key: "handleItemClick",
    value: function handleItemClick(name) {
      var activeNames = this.state.activeNames;

      if (this.props.accordion) {
        this.setActiveNames(activeNames[0] && activeNames[0] === name ? '' : name);
      } else {
        if (activeNames.includes(name)) {
          this.setActiveNames(activeNames.filter(function (item) {
            return item !== name;
          }));
        } else {
          this.setActiveNames(activeNames.concat(name));
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var content = _react["default"].Children.map(this.props.children, function (child, idx) {
        var name = child.props.name || idx.toString();
        return /*#__PURE__*/_react["default"].cloneElement(child, {
          isActive: _this3.state.activeNames.includes(name),
          key: idx,
          name: name,
          onClick: function onClick(item) {
            return _this3.handleItemClick(item);
          }
        });
      });

      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "el-collapse"
      }, content);
    }
  }]);

  return Collapse;
}(_libs.Component);

exports["default"] = Collapse;

_defineProperty(Collapse, "defaultProps", {
  value: [],
  onChange: function onChange() {}
});

Collapse.propTypes = {
  accordion: _libs.PropTypes.bool,
  value: _libs.PropTypes.oneOfType([_libs.PropTypes.array, _libs.PropTypes.string]),
  onChange: _libs.PropTypes.func
};