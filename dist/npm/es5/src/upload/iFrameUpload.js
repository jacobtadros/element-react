"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _libs = require("../../libs");

var _Cover = _interopRequireDefault(require("./Cover"));

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

var IframeUpload = /*#__PURE__*/function (_Component) {
  _inherits(IframeUpload, _Component);

  var _super = _createSuper(IframeUpload);

  function IframeUpload(props) {
    var _this;

    _classCallCheck(this, IframeUpload);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "state", void 0);

    _this.state = {
      dragOver: false,
      file: null,
      disabled: false,
      frameName: 'frame-' + Date.now()
    };
    return _this;
  }

  _createClass(IframeUpload, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
          action = _this$props.action,
          onSuccess = _this$props.onSuccess,
          onError = _this$props.onError;
      var file = this.state.file;
      window.addEventListener('message', function (event) {
        var _URL = new URL(action),
            origin = _URL.origin;

        if (event.origin !== origin) return false;
        var response = event.data;

        if (response.result === 'success') {
          onSuccess(response, file);
        } else if (response.result === 'failed') {
          onError(response, file);
        }
      }, false);
    }
  }, {
    key: "onload",
    value: function onload() {
      this.setState({
        disabled: false
      });
    }
  }, {
    key: "onDrop",
    value: function onDrop(e) {
      e.preventDefault();
      this.setState({
        dragOver: false
      });
      this.uploadFiles(e.dataTransfer.files); // TODO
    }
  }, {
    key: "handleChange",
    value: function handleChange(e) {
      if (e.target instanceof HTMLInputElement) {
        var file = e.target.files[0];

        if (file) {
          this.uploadFiles(file);
        }
      }
    }
  }, {
    key: "uploadFiles",
    value: function uploadFiles(file) {
      if (this.state.disabled) return;
      this.setState({
        disabled: false,
        file: file
      });
      this.props.onStart && this.props.onStart(file);
      var formNode = this.refs.form;
      var dataSpan = this.refs.data;
      var data = this.props.data;

      if (typeof data === 'function') {
        data = data(file);
      }

      var inputs = Object.keys(data).map(function (key) {
        return "<input name=\"".concat(key, "\" value=\"").concat(data[key], "\"/>");
      });
      dataSpan.innerHTML = inputs.join('');
      formNode.submit();
      dataSpan.innerHTML = '';
    }
  }, {
    key: "handleClick",
    value: function handleClick() {
      if (!this.state.disabled) {
        this.refs.input.click();
      }
    }
  }, {
    key: "handleDragover",
    value: function handleDragover(e) {
      e.preventDefault();
      this.setState({
        onDrop: true
      });
    }
  }, {
    key: "handleDragleave",
    value: function handleDragleave(e) {
      e.preventDefault();
      this.setState({
        onDrop: false
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props2 = this.props,
          drag = _this$props2.drag,
          action = _this$props2.action,
          name = _this$props2.name,
          accept = _this$props2.accept,
          listType = _this$props2.listType;
      var frameName = this.state.frameName;
      var classes = this.classNames(_defineProperty({
        'el-upload': true
      }, "el-upload--".concat(listType), true));
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: classes,
        onClick: function onClick() {
          return _this2.handleClick();
        },
        onDrop: function onDrop(e) {
          return _this2.onDrop(e);
        },
        onDragOver: function onDragOver(e) {
          return _this2.handleDragover(e);
        },
        onDragLeave: function onDragLeave(e) {
          return _this2.handleDragleave(e);
        }
      }, /*#__PURE__*/_react["default"].createElement("iframe", {
        onLoad: function onLoad() {
          return _this2.onload();
        },
        ref: "iframe",
        name: frameName
      }), /*#__PURE__*/_react["default"].createElement("form", {
        ref: "form",
        action: action,
        target: frameName,
        encType: "multipart/form-data",
        method: "POST"
      }, /*#__PURE__*/_react["default"].createElement("input", {
        className: "el-upload__input",
        type: "file",
        ref: "input",
        name: name,
        onChange: function onChange(e) {
          return _this2.handleChange(e);
        },
        accept: accept
      }), /*#__PURE__*/_react["default"].createElement("input", {
        type: "hidden",
        name: "documentDomain",
        value: document.domain
      }), /*#__PURE__*/_react["default"].createElement("span", {
        ref: "data"
      })), drag ? /*#__PURE__*/_react["default"].createElement(_Cover["default"], {
        onFile: function onFile(file) {
          return _this2.uploadFiles(file);
        }
      }, this.props.children) : this.props.children);
    }
  }]);

  return IframeUpload;
}(_libs.Component);

exports["default"] = IframeUpload;

_defineProperty(IframeUpload, "defaultProps", {
  name: 'file'
});

IframeUpload.propTypes = {
  drag: _libs.PropTypes.bool,
  data: _libs.PropTypes.object,
  action: _libs.PropTypes.string.isRequired,
  name: _libs.PropTypes.string,
  accept: _libs.PropTypes.string,
  onStart: _libs.PropTypes.func,
  onSuccess: _libs.PropTypes.func,
  onError: _libs.PropTypes.func,
  listType: _libs.PropTypes.string
};