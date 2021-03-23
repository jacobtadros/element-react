"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _libs = require("../../libs");

var _ajax = _interopRequireDefault(require("./ajax"));

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

var AjaxUpload = /*#__PURE__*/function (_Component) {
  _inherits(AjaxUpload, _Component);

  var _super = _createSuper(AjaxUpload);

  function AjaxUpload(props) {
    _classCallCheck(this, AjaxUpload);

    return _super.call(this, props);
  }

  _createClass(AjaxUpload, [{
    key: "isImage",
    value: function isImage(str) {
      return str.indexOf('image') !== -1;
    }
  }, {
    key: "handleChange",
    value: function handleChange(e) {
      if (e.target instanceof HTMLInputElement) {
        var files = e.target.files;

        if (!files) {
          return;
        }

        this.uploadFiles(files);
        this.refs.input.value = null;
      }
    }
  }, {
    key: "uploadFiles",
    value: function uploadFiles(files) {
      var _this = this;

      var _this$props = this.props,
          multiple = _this$props.multiple,
          limit = _this$props.limit,
          onExceed = _this$props.onExceed,
          fileList = _this$props.fileList;

      if (limit && fileList.length + files.length > limit) {
        onExceed && onExceed(files, fileList);
        return;
      }

      var postFiles = Array.prototype.slice.call(files);

      if (postFiles.length === 0) {
        return;
      }

      if (!multiple) {
        postFiles = postFiles.slice(0, 1);
      }

      postFiles.forEach(function (file) {
        _this.props.onStart(file);

        if (_this.props.autoUpload) _this.upload(file);
      });
    }
  }, {
    key: "upload",
    value: function upload(rawFile, file) {
      var _this2 = this;

      var beforeUpload = this.props.beforeUpload;

      if (!beforeUpload) {
        return this.post(rawFile);
      }

      var before = beforeUpload(rawFile);

      if (before && before.then) {
        before.then(function (processedFile) {
          if (Object.prototype.toString.call(processedFile) === '[object File]') {
            _this2.post(processedFile);
          } else {
            _this2.post(rawFile);
          }
        }, function () {
          if (file && typeof _this2.props.onRemove === 'function') _this2.props.onRemove(file);
        });
      } else if (before !== false) {
        this.post(rawFile);
      } else {
        if (file && typeof this.props.onRemove === 'function') this.props.onRemove(file);
      }
    }
  }, {
    key: "post",
    value: function post(file) {
      var _this$props2 = this.props,
          filename = _this$props2.name,
          headers = _this$props2.headers,
          withCredentials = _this$props2.withCredentials,
          data = _this$props2.data,
          action = _this$props2.action,
          _onProgress = _this$props2.onProgress,
          _onSuccess = _this$props2.onSuccess,
          _onError = _this$props2.onError;
      var _this$props$httpReque = this.props.httpRequest,
          httpRequest = _this$props$httpReque === void 0 ? _ajax["default"] : _this$props$httpReque;
      var req = httpRequest({
        headers: headers,
        withCredentials: withCredentials,
        file: file,
        data: data,
        filename: filename,
        action: action,
        onProgress: function onProgress(e) {
          return _onProgress(e, file);
        },
        onSuccess: function onSuccess(res) {
          return _onSuccess(res, file);
        },
        onError: function onError(err) {
          return _onError(err, file);
        }
      });

      if (req && req.then) {
        req.then(_onSuccess, _onError);
      }
    }
  }, {
    key: "handleClick",
    value: function handleClick() {
      if (!this.props.disabled) {
        this.refs.input.click();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props3 = this.props,
          drag = _this$props3.drag,
          multiple = _this$props3.multiple,
          accept = _this$props3.accept,
          listType = _this$props3.listType,
          disabled = _this$props3.disabled;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: this.classNames(_defineProperty({
          'el-upload': true
        }, "el-upload--".concat(listType), true)),
        onClick: function onClick() {
          return _this3.handleClick();
        }
      }, drag ? /*#__PURE__*/_react["default"].createElement(_Cover["default"], {
        disabled: disabled,
        onFile: function onFile(file) {
          return _this3.uploadFiles(file);
        }
      }, this.props.children) : this.props.children, /*#__PURE__*/_react["default"].createElement("input", {
        className: "el-upload__input",
        type: "file",
        ref: "input",
        onChange: function onChange(e) {
          return _this3.handleChange(e);
        },
        multiple: multiple,
        accept: accept
      }));
    }
  }]);

  return AjaxUpload;
}(_libs.Component);

exports["default"] = AjaxUpload;

_defineProperty(AjaxUpload, "defaultProps", {
  name: 'file'
});

AjaxUpload.propTypes = {
  drag: _libs.PropTypes.bool,
  data: _libs.PropTypes.object,
  action: _libs.PropTypes.string.isRequired,
  name: _libs.PropTypes.string,
  accept: _libs.PropTypes.string,
  headers: _libs.PropTypes.object,
  withCredentials: _libs.PropTypes.bool,
  multiple: _libs.PropTypes.bool,
  onStart: _libs.PropTypes.func,
  onProgress: _libs.PropTypes.func,
  onSuccess: _libs.PropTypes.func,
  onError: _libs.PropTypes.func,
  beforeUpload: _libs.PropTypes.func,
  autoUpload: _libs.PropTypes.bool,
  listType: _libs.PropTypes.string,
  fileList: _libs.PropTypes.array,
  disabled: _libs.PropTypes.bool,
  limit: _libs.PropTypes.number,
  onExceed: _libs.PropTypes.func,
  httpRequest: _libs.PropTypes.func
};