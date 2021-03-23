"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _sinon = _interopRequireDefault(require("sinon"));

var _ = _interopRequireDefault(require("../"));

var _2 = require("../../");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe('Badge Test', function () {
  it('Basic usage', function () {
    var w = (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(_["default"], {
      value: 12
    }, /*#__PURE__*/_react["default"].createElement(_2.Button, {
      size: "small"
    }, "TEST")));
    expect(w.find('.el-badge .el-button span').text()).toBe('TEST');
    expect(w.find('.el-badge sup.el-badge__content').text()).toBe('12');
  });
  it('with Dropdown', function () {
    var w = (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(_2.Dropdown, {
      trigger: "click",
      menu: /*#__PURE__*/_react["default"].createElement(_2.Dropdown.Menu, null, /*#__PURE__*/_react["default"].createElement(_2.Dropdown.Item, {
        className: "clearfix"
      }, /*#__PURE__*/_react["default"].createElement("span", null, "\u8BC4\u8BBA"), /*#__PURE__*/_react["default"].createElement(_["default"], {
        className: "mark",
        value: 12
      })), /*#__PURE__*/_react["default"].createElement(_2.Dropdown.Item, {
        className: "clearfix"
      }, /*#__PURE__*/_react["default"].createElement("span", null, "\u56DE\u590D"), /*#__PURE__*/_react["default"].createElement(_["default"], {
        className: "mark",
        value: 3
      })))
    }, /*#__PURE__*/_react["default"].createElement("span", {
      className: "el-dropdown-link"
    }, "\u70B9\u6211\u67E5\u770B", /*#__PURE__*/_react["default"].createElement("i", {
      className: "el-icon-caret-bottom el-icon--right"
    }))));
    expect(w.find('.el-dropdown-menu').childAt(0).find('div.el-badge').hasClass('mark')).toBeTruthy();
    expect(w.find('.el-dropdown-menu').childAt(1).find('div.el-badge').hasClass('mark')).toBeTruthy();
    expect(w.find('.el-dropdown-menu').childAt(0).find('sup.el-badge__content').text()).toBe('12');
    expect(w.find('.el-dropdown-menu').childAt(1).find('sup.el-badge__content').text()).toBe('3');
  });
  it('Max value', function () {
    var w1 = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_["default"], {
      value: 200,
      max: 99
    }, /*#__PURE__*/_react["default"].createElement(_2.Button, {
      size: "small"
    }, "TEST")));
    var w2 = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_["default"], {
      value: 99,
      max: 99
    }, /*#__PURE__*/_react["default"].createElement(_2.Button, {
      size: "small"
    }, "TEST")));
    var w3 = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_["default"], {
      value: 1,
      max: 99
    }, /*#__PURE__*/_react["default"].createElement(_2.Button, {
      size: "small"
    }, "TEST")));
    expect(w1.find('.el-badge sup.el-badge__content').text()).toBe('99+');
    expect(w2.find('.el-badge sup.el-badge__content').text()).toBe('99');
    expect(w3.find('.el-badge sup.el-badge__content').text()).toBe('1');
  });
  it('Custom content', function () {
    var w1 = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_["default"], {
      value: 'new'
    }, /*#__PURE__*/_react["default"].createElement(_2.Button, {
      size: "small"
    }, "TEST")));
    var w2 = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_["default"], {
      value: 'hot'
    }, /*#__PURE__*/_react["default"].createElement(_2.Button, {
      size: "small"
    }, "TEST")));
    expect(w1.find('.el-badge sup.el-badge__content').text()).toBe('new');
    expect(w2.find('.el-badge sup.el-badge__content').text()).toBe('hot');
  });
  it('Dot', function () {
    var w1 = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_["default"], {
      isDot: true
    }, /*#__PURE__*/_react["default"].createElement(_2.Button, {
      className: "share-button",
      icon: "share",
      type: "primary"
    })));
    expect(w1.find('.el-badge sup.el-badge__content').hasClass('is-dot')).toBeTruthy();
  });
});