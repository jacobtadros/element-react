"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _sinon = _interopRequireDefault(require("sinon"));

var _ = _interopRequireDefault(require("../"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe('Button test', function () {
  it('create', function () {
    var w = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_["default"], {
      type: "primary"
    }, "TEST"));
    expect(w.hasClass('el-button--primary')).toBeTruthy();
    expect(w.childAt(0).text()).toBe('TEST');
  });
  it('icon', function () {
    var w = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_["default"], {
      icon: "search"
    }, "TEST"));
    expect(w.childAt(0).hasClass('el-icon-search')).toBeTruthy();
  });
  it('nativeType', function () {
    var w = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_["default"], {
      nativeType: "submit"
    }, "TEST"));
    expect(w.prop('type')).toBe('submit');
  });
  it('loading', function () {
    var w = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_["default"], {
      loading: true
    }, "TEST"));
    expect(w.hasClass('is-loading')).toBeTruthy();
    expect(w.childAt(0).hasClass('el-icon-loading')).toBeTruthy();
  });
  it('disabled', function () {
    var w = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_["default"], {
      disabled: true
    }, "TEST"));
    expect(w.hasClass('is-disabled')).toBeTruthy();
  });
  it('size', function () {
    var w = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_["default"], {
      size: "large"
    }, "TEST"));
    expect(w.hasClass('el-button--large')).toBeTruthy();
  });
  it('plain', function () {
    var w = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_["default"], {
      plain: true
    }, "TEST"));
    expect(w.hasClass('is-plain')).toBeTruthy();
  });
  it('click', function () {
    var fn = _sinon["default"].spy();

    var w = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_["default"], {
      onClick: fn
    }, "TEST"));
    w.simulate('click');
    expect(fn.callCount).toBe(1);
  });
});