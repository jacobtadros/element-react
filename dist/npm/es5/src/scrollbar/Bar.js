"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Bar = void 0;

var _react = _interopRequireDefault(require("react"));

var _libs = require("../../libs");

var _util = require("./util");

var _dom = require("../../libs/utils/dom");

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

var Bar = /*#__PURE__*/function (_Component) {
  _inherits(Bar, _Component);

  var _super = _createSuper(Bar);

  function Bar(props) {
    var _this;

    _classCallCheck(this, Bar);

    _this = _super.call(this, props);
    _this.clickTrackHandler = _this.clickTrackHandler.bind(_assertThisInitialized(_this));
    _this.clickThumbHandler = _this.clickThumbHandler.bind(_assertThisInitialized(_this));
    _this.mouseMoveDocumentHandler = _this.mouseMoveDocumentHandler.bind(_assertThisInitialized(_this));
    _this.mouseUpDocumentHandler = _this.mouseUpDocumentHandler.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Bar, [{
    key: "bar",
    get: function get() {
      return _util.BAR_MAP[this.props.vertical ? 'vertical' : 'horizontal'];
    }
  }, {
    key: "wrap",
    get: function get() {
      return this.props.getParentWrap();
    }
  }, {
    key: "clickThumbHandler",
    value: function clickThumbHandler(e) {
      this.startDrag(e);
      this[this.bar.axis] = e.currentTarget[this.bar.offset] - (e[this.bar.client] - e.currentTarget.getBoundingClientRect()[this.bar.direction]);
    }
  }, {
    key: "clickTrackHandler",
    value: function clickTrackHandler(e) {
      var offset = Math.abs(e.target.getBoundingClientRect()[this.bar.direction] - e[this.bar.client]);
      var thumbHalf = this.thumbRef[this.bar.offset] / 2;
      var thumbPositionPercentage = (offset - thumbHalf) * 100 / this.rootRef[this.bar.offset];
      this.wrap[this.bar.scroll] = thumbPositionPercentage * this.wrap[this.bar.scrollSize] / 100;
    }
  }, {
    key: "startDrag",
    value: function startDrag(e) {
      e.nativeEvent.stopImmediatePropagation;
      this.cursorDown = true;
      (0, _dom.on)(document, 'mousemove', this.mouseMoveDocumentHandler);
      (0, _dom.on)(document, 'mouseup', this.mouseUpDocumentHandler);

      document.onselectstart = function () {
        return false;
      };
    }
  }, {
    key: "mouseMoveDocumentHandler",
    value: function mouseMoveDocumentHandler(e) {
      if (this.cursorDown === false) return;
      var prevPage = this[this.bar.axis];
      if (!prevPage) return;
      var offset = e[this.bar.client] - this.rootRef.getBoundingClientRect()[this.bar.direction];
      var thumbClickPosition = this.thumbRef[this.bar.offset] - prevPage;
      var thumbPositionPercentage = (offset - thumbClickPosition) * 100 / this.rootRef[this.bar.offset];
      this.wrap[this.bar.scroll] = thumbPositionPercentage * this.wrap[this.bar.scrollSize] / 100;
    }
  }, {
    key: "mouseUpDocumentHandler",
    value: function mouseUpDocumentHandler() {
      this.cursorDown = false;
      this[this.bar.axis] = 0;
      (0, _dom.off)(document, 'mousemove', this.mouseMoveDocumentHandler);
      document.onselectstart = null;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          size = _this$props.size,
          move = _this$props.move;
      return /*#__PURE__*/_react["default"].createElement("div", {
        ref: function ref(root) {
          return _this2.rootRef = root;
        },
        className: this.classNames('el-scrollbar__bar', "is-".concat(this.bar.key)),
        onMouseDown: this.clickTrackHandler
      }, /*#__PURE__*/_react["default"].createElement("div", {
        ref: function ref(thumb) {
          return _this2.thumbRef = thumb;
        },
        className: "el-scrollbar__thumb",
        onMouseDown: this.clickThumbHandler,
        style: (0, _util.renderThumbStyle)({
          size: size,
          move: move,
          bar: this.bar
        })
      }));
    }
  }]);

  return Bar;
}(_libs.Component);

exports.Bar = Bar;
Bar.propTypes = {
  vertical: _libs.PropTypes.bool,
  size: _libs.PropTypes.string,
  move: _libs.PropTypes.number,
  getParentWrap: _libs.PropTypes.func.isRequired
};