"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _sinon = _interopRequireDefault(require("sinon"));

var _ = _interopRequireDefault(require("../"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe('Card test', function () {
  it('render header', function () {
    var w = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_["default"], {
      header: "HEADER"
    }));
    expect(w.find('.el-card__header').at(0).text()).toBe('HEADER');
  });
  it('render body', function () {
    var w = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_["default"], null, "BODY"));
    expect(w.find('.el-card__body').at(0).text()).toBe('BODY');
  });
  it('use bodyStyle', function () {
    var bodyStyle = {
      padding: '5px',
      border: '1px solid blue'
    };
    var w = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_["default"], {
      bodyStyle: bodyStyle
    }));
    expect(w.find('.el-card__body').at(0).prop('style')).toEqual(bodyStyle);
  });
});