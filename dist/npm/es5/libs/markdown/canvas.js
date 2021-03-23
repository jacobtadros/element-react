"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _marked = _interopRequireDefault(require("marked"));

var _standalone = require("@babel/standalone");

var _editor = _interopRequireDefault(require("../editor"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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

var Canvas = /*#__PURE__*/function (_React$Component) {
  _inherits(Canvas, _React$Component);

  var _super = _createSuper(Canvas);

  function Canvas(props) {
    var _this;

    _classCallCheck(this, Canvas);

    _this = _super.call(this, props);
    _this.playerId = "".concat(parseInt(Math.random() * 1e9).toString(36));
    _this.document = _this.props.children.match(/([^]*)\n?(```[^]+```)/);
    _this.description = (0, _marked["default"])(_this.document[1]);
    _this.source = _this.document[2].match(/```(.*)\n?([^]+)```/);
    _this.state = {
      showBlock: false
    };
    return _this;
  }

  _createClass(Canvas, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.renderSource(this.source[2]);
    }
  }, {
    key: "blockControl",
    value: function blockControl() {
      this.setState({
        showBlock: !this.state.showBlock
      });
    }
  }, {
    key: "renderSource",
    value: function renderSource(value) {
      var _this2 = this;

      Promise.resolve().then(function () {
        return _interopRequireWildcard(require('../../src'));
      }).then(function (Element) {
        var args = ['context', 'React', 'ReactDOM'];
        var argv = [_this2, _react["default"], _reactDom["default"]];

        for (var key in Element) {
          args.push(key);
          argv.push(Element[key]);
        }

        return {
          args: args,
          argv: argv
        };
      }).then(function (_ref) {
        var args = _ref.args,
            argv = _ref.argv;
        var code = (0, _standalone.transform)("\n        class Demo extends React.Component {\n          ".concat(value, "\n        }\n\n        ReactDOM.render(<Demo {...context.props} />, document.getElementById('").concat(_this2.playerId, "'))\n      "), {
          presets: ['es2015', 'react']
        }).code;
        args.push(code);

        _construct(Function, _toConsumableArray(args)).apply(null, argv);

        _this2.source[2] = value;
      })["catch"](function (err) {
        if (process.env.NODE_ENV !== 'production') {
          throw err;
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "demo-block demo-box demo-".concat(this.props.name)
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "source",
        id: this.playerId
      }), this.state.showBlock && /*#__PURE__*/_react["default"].createElement("div", {
        className: "meta"
      }, this.description && /*#__PURE__*/_react["default"].createElement("div", {
        ref: "description",
        className: "description",
        dangerouslySetInnerHTML: {
          __html: this.description
        }
      }), /*#__PURE__*/_react["default"].createElement(_editor["default"], {
        value: this.source[2],
        onChange: function onChange(code) {
          return _this3.renderSource(code);
        }
      })), /*#__PURE__*/_react["default"].createElement("div", {
        className: "demo-block-control",
        onClick: this.blockControl.bind(this)
      }, this.state.showBlock ? /*#__PURE__*/_react["default"].createElement("span", null, /*#__PURE__*/_react["default"].createElement("i", {
        className: "el-icon-caret-top"
      }), this.props.locale.hide) : /*#__PURE__*/_react["default"].createElement("span", null, /*#__PURE__*/_react["default"].createElement("i", {
        className: "el-icon-caret-bottom"
      }), this.props.locale.show)));
    }
  }]);

  return Canvas;
}(_react["default"].Component);

exports["default"] = Canvas;
Canvas.propTypes = {
  locale: _propTypes["default"].object
};
Canvas.defaultProps = {
  locale: {}
};