"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _libs = require("../../libs");

var _UploadList = _interopRequireDefault(require("./UploadList"));

var _iFrameUpload = _interopRequireDefault(require("./iFrameUpload"));

var _AjaxUpload = _interopRequireDefault(require("./AjaxUpload"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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

var Upload = /*#__PURE__*/function (_Component) {
  _inherits(Upload, _Component);

  var _super = _createSuper(Upload);

  function Upload(props) {
    var _this;

    _classCallCheck(this, Upload);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "state", void 0);

    _this.state = {
      fileList: [],
      tempIndex: 1
    };
    return _this;
  }

  _createClass(Upload, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.init(this.props);
    }
  }, {
    key: "init",
    value: function init(props) {
      var tempIndex = this.state.tempIndex;
      var fileList = props.fileList;
      var uploadFiles = fileList.map(function (file) {
        file.uid = file.uid || Date.now() + tempIndex++;
        file.status = 'success';
        return file;
      });
      this.setState({
        fileList: uploadFiles
      });
    }
  }, {
    key: "getChildContext",
    value: function getChildContext() {
      return {
        onPreview: this.handlePreview.bind(this),
        onRemove: this.handleRemove.bind(this)
      };
    }
  }, {
    key: "getFile",
    value: function getFile(file) {
      if (file) {
        return this.state.fileList.find(function (item) {
          return item.uid === file.uid;
        });
      }

      return null;
    }
  }, {
    key: "handleStart",
    value: function handleStart(file) {
      var _this$state = this.state,
          tempIndex = _this$state.tempIndex,
          fileList = _this$state.fileList;
      file.uid = Date.now() + tempIndex++;
      var _file = {
        status: 'ready',
        name: file.name,
        size: file.size,
        percentage: 0,
        uid: file.uid,
        raw: file
      };

      try {
        _file.url = URL.createObjectURL(file);
      } catch (err) {
        return;
      }

      fileList.push(_file);
      this.setState({
        fileList: fileList,
        tempIndex: tempIndex
      });
    }
  }, {
    key: "handleProgress",
    value: function handleProgress(e, file) {
      var fileList = this.state.fileList;

      var _file = this.getFile(file);

      if (_file) {
        _file.percentage = e.percent || 0;
        _file.status = 'uploading';
        this.props.onProgress(e, _file, fileList);
        this.setState({
          fileList: fileList
        });
      }
    }
  }, {
    key: "handleSuccess",
    value: function handleSuccess(res, file) {
      var _this2 = this;

      var fileList = this.state.fileList;

      var _file = this.getFile(file);

      if (_file) {
        _file.status = 'success';
        _file.response = res;
        setTimeout(function () {
          _this2.setState({
            fileList: fileList
          }, function () {
            _this2.props.onSuccess(res, _file, fileList);

            _this2.props.onChange(_file, fileList);
          });
        }, 1000);
      }
    }
  }, {
    key: "handleError",
    value: function handleError(err, file) {
      var _this3 = this;

      var fileList = this.state.fileList;

      var _file = this.getFile(file);

      if (_file) {
        _file.status = 'fail';
        fileList.splice(fileList.indexOf(_file), 1);
        this.setState({
          fileList: fileList
        }, function () {
          _this3.props.onError(err, _file, fileList);

          _this3.props.onChange(_file, fileList);
        });
      }
    }
  }, {
    key: "handleRemove",
    value: function handleRemove(file) {
      var _this4 = this;

      var fileList = this.state.fileList;

      var _file = this.getFile(file);

      if (_file) {
        fileList.splice(fileList.indexOf(_file), 1);
        this.setState({
          fileList: fileList
        }, function () {
          return _this4.props.onRemove(file, fileList);
        });
      }
    }
  }, {
    key: "handlePreview",
    value: function handlePreview(file) {
      if (file.status === 'success') {
        this.props.onPreview(file);
      }
    }
  }, {
    key: "clearFiles",
    value: function clearFiles() {
      this.setState({
        fileList: []
      });
    }
  }, {
    key: "submit",
    value: function submit() {
      var _this5 = this;

      this.state.fileList.filter(function (file) {
        return file.status === 'ready';
      }).forEach(function (file) {
        _this5.refs['upload-inner'].upload(file.raw, file);
      });
    }
  }, {
    key: "showCover",
    value: function showCover() {
      var fileList = this.state.fileList;
      var file = fileList[fileList.length - 1];
      return file && file.status !== 'fail';
    }
  }, {
    key: "render",
    value: function render() {
      var fileList = this.state.fileList;
      var _this$props = this.props,
          showFileList = _this$props.showFileList,
          autoUpload = _this$props.autoUpload,
          drag = _this$props.drag,
          tip = _this$props.tip,
          action = _this$props.action,
          multiple = _this$props.multiple,
          beforeUpload = _this$props.beforeUpload,
          withCredentials = _this$props.withCredentials,
          headers = _this$props.headers,
          name = _this$props.name,
          data = _this$props.data,
          accept = _this$props.accept,
          listType = _this$props.listType,
          className = _this$props.className,
          limit = _this$props.limit,
          disabled = _this$props.disabled,
          onExceed = _this$props.onExceed,
          httpRequest = _this$props.httpRequest;
      var uploadList;

      if (showFileList && fileList.length) {
        uploadList = /*#__PURE__*/_react["default"].createElement(_UploadList["default"], {
          listType: listType,
          fileList: fileList
        });
      }

      var restProps = {
        autoUpload: autoUpload,
        drag: drag,
        action: action,
        multiple: multiple,
        beforeUpload: beforeUpload,
        withCredentials: withCredentials,
        headers: headers,
        name: name,
        data: data,
        accept: accept,
        listType: listType,
        fileList: fileList,
        limit: limit,
        disabled: disabled,
        onExceed: onExceed,
        httpRequest: httpRequest,
        onStart: this.handleStart.bind(this),
        onProgress: this.handleProgress.bind(this),
        onSuccess: this.handleSuccess.bind(this),
        onError: this.handleError.bind(this),
        onPreview: this.handlePreview.bind(this),
        onRemove: this.handleRemove.bind(this),
        showCover: this.showCover(),
        ref: 'upload-inner'
      };
      var trigger = this.props.trigger || this.props.children;
      var uploadComponent = typeof FormData !== 'undefined' ? /*#__PURE__*/_react["default"].createElement(_AjaxUpload["default"], _extends({
        key: "AjaxUpload"
      }, restProps), trigger) : /*#__PURE__*/_react["default"].createElement("iFrameUpload", _extends({
        key: "iFrameUpload"
      }, restProps), trigger);
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: className
      }, listType === 'picture-card' ? uploadList : '', this.props.trigger ? [uploadComponent, this.props.children] : uploadComponent, tip, listType !== 'picture-card' ? uploadList : '');
    }
  }]);

  return Upload;
}(_libs.Component);

exports["default"] = Upload;

_defineProperty(Upload, "defaultProps", {
  headers: {},
  name: 'file',
  type: 'select',
  listType: 'text',
  fileList: [],
  showFileList: true,
  autoUpload: true,
  disabled: false,
  onRemove: function onRemove() {},
  onPreview: function onPreview() {},
  onProgress: function onProgress() {},
  onSuccess: function onSuccess() {},
  onError: function onError() {},
  onChange: function onChange() {}
});

Upload.childContextTypes = {
  onPreview: _libs.PropTypes.func,
  onRemove: _libs.PropTypes.func
};
Upload.propTypes = {
  action: _libs.PropTypes.string.isRequired,
  headers: _libs.PropTypes.object,
  data: _libs.PropTypes.object,
  multiple: _libs.PropTypes.bool,
  name: _libs.PropTypes.string,
  withCredentials: _libs.PropTypes.bool,
  showFileList: _libs.PropTypes.bool,
  fileList: _libs.PropTypes.array,
  autoUpload: _libs.PropTypes.bool,
  accept: _libs.PropTypes.string,
  drag: _libs.PropTypes.bool,
  listType: _libs.PropTypes.oneOf(['text', 'picture', 'picture-card']),
  tip: _libs.PropTypes.node,
  trigger: _libs.PropTypes.node,
  beforeUpload: _libs.PropTypes.func,
  onRemove: _libs.PropTypes.func,
  onPreview: _libs.PropTypes.func,
  onProgress: _libs.PropTypes.func,
  onSuccess: _libs.PropTypes.func,
  onError: _libs.PropTypes.func,
  onChange: _libs.PropTypes.func,
  className: _libs.PropTypes.string,
  disabled: _libs.PropTypes.bool,
  limit: _libs.PropTypes.number,
  onExceed: _libs.PropTypes.func,
  httpRequest: _libs.PropTypes.func
};