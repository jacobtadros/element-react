"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _libs = require("../../libs");

var _Progress = _interopRequireDefault(require("../progress/Progress"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

var UploadList = /*#__PURE__*/function (_Component) {
  _inherits(UploadList, _Component);

  var _super = _createSuper(UploadList);

  function UploadList(props) {
    _classCallCheck(this, UploadList);

    return _super.call(this, props);
  }

  _createClass(UploadList, [{
    key: "uploadList",
    value: function uploadList() {
      var _this = this;

      var _this$context = this.context,
          onPreview = _this$context.onPreview,
          onRemove = _this$context.onRemove;
      var _this$props = this.props,
          listType = _this$props.listType,
          fileList = _this$props.fileList;

      var isFinished = function isFinished(status) {
        return status === 'success';
      };

      if (listType === 'none') return null;
      return /*#__PURE__*/_react["default"].createElement("ul", {
        className: this.classNames(_defineProperty({
          'el-upload-list': true
        }, "el-upload-list--".concat(listType), true))
      }, fileList.map(function (file) {
        return /*#__PURE__*/_react["default"].createElement("li", {
          className: _this.classNames(_defineProperty({
            'el-upload-list__item': true
          }, "is-".concat(file.status), true)),
          key: file.uid
        }, ['picture-card', 'picture'].includes(listType) && isFinished(file.status) && /*#__PURE__*/_react["default"].createElement("img", {
          className: "el-upload-list__item-thumbnail",
          src: file.url,
          alt: ""
        }), /*#__PURE__*/_react["default"].createElement("a", {
          className: "el-upload-list__item-name",
          onClick: function onClick() {
            return onPreview(file);
          }
        }, /*#__PURE__*/_react["default"].createElement("i", {
          className: "el-icon-document"
        }), file.name), /*#__PURE__*/_react["default"].createElement("label", {
          className: "el-upload-list__item-status-label"
        }, /*#__PURE__*/_react["default"].createElement("i", {
          className: _this.classNames({
            'el-icon-upload-success': true,
            'el-icon-circle-check': listType === 'text',
            'el-icon-check': ['picture-card', 'picture'].includes(listType)
          })
        })), /*#__PURE__*/_react["default"].createElement("i", {
          className: "el-icon-close",
          onClick: function onClick() {
            return onRemove(file);
          }
        }), /*#__PURE__*/_react["default"].createElement(_libs.View, {
          className: "el-upload-list__item-actions",
          show: listType === 'picture-card' && isFinished(file.status)
        }, /*#__PURE__*/_react["default"].createElement("span", null, /*#__PURE__*/_react["default"].createElement("span", {
          onClick: function onClick() {
            return onPreview(file);
          },
          className: "el-upload-list__item-preview"
        }, /*#__PURE__*/_react["default"].createElement("i", {
          className: "el-icon-view"
        })), /*#__PURE__*/_react["default"].createElement("span", {
          className: "el-upload-list__item-delete",
          onClick: function onClick() {
            return onRemove(file);
          }
        }, /*#__PURE__*/_react["default"].createElement("i", {
          className: "el-icon-delete2"
        })))), file.status === 'uploading' && /*#__PURE__*/_react["default"].createElement(_Progress["default"], {
          strokeWidth: listType === 'picture-card' ? 6 : 2,
          type: listType === 'picture-card' ? 'circle' : 'line',
          percentage: parseInt(file.percentage, 10),
          status: isFinished(file.status) && file.showProgress ? 'success' : ''
        }));
      }));
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react["default"].createElement(_libs.Transition, {
        name: "list"
      }, this.uploadList());
    }
  }]);

  return UploadList;
}(_libs.Component);

exports["default"] = UploadList;
UploadList.contextTypes = {
  onPreview: _libs.PropTypes.func,
  onRemove: _libs.PropTypes.func
};
UploadList.propTypes = {
  listType: _libs.PropTypes.string,
  fileList: _libs.PropTypes.array
};