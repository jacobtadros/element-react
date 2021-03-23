"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _ = _interopRequireDefault(require("../"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe('Breadcrumb test', function () {
  it('basic usage', function () {
    var w = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_["default"], null, /*#__PURE__*/_react["default"].createElement(_["default"].Item, null, "\u9996\u9875"), /*#__PURE__*/_react["default"].createElement(_["default"].Item, null, "\u6D3B\u52A8\u7BA1\u7406")));
    expect(w.is('.el-breadcrumb')).toBe(true);
  });
  it('test children', function () {
    var w = (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(_["default"], {
      separator: ""
    }, /*#__PURE__*/_react["default"].createElement(_["default"].Item, null, "\u9996\u9875"), /*#__PURE__*/_react["default"].createElement(_["default"].Item, null, "\u6D3B\u52A8\u7BA1\u7406"), /*#__PURE__*/_react["default"].createElement(_["default"].Item, null, "\u6D3B\u52A8\u5217\u8868"), /*#__PURE__*/_react["default"].createElement(_["default"].Item, null, "\u6D3B\u52A8\u8BE6\u60C5")));
    expect(w.find('.el-breadcrumb__item').length).toBe(4);
  });
  it('test separator', function () {
    var w = (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(_["default"], {
      separator: "/"
    }, /*#__PURE__*/_react["default"].createElement(_["default"].Item, null, "\u9996\u9875"), /*#__PURE__*/_react["default"].createElement(_["default"].Item, null, "\u6D3B\u52A8\u7BA1\u7406"), /*#__PURE__*/_react["default"].createElement(_["default"].Item, null, "\u6D3B\u52A8\u5217\u8868"), /*#__PURE__*/_react["default"].createElement(_["default"].Item, null, "\u6D3B\u52A8\u8BE6\u60C5")));
    expect(w.find('.el-breadcrumb__separator').at(0).text()).toBe('/');
  });
});