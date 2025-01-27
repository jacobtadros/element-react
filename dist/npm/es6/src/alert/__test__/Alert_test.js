"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _sinon = _interopRequireDefault(require("sinon"));

var _ = _interopRequireDefault(require("../"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe('Alert test', function () {
  it('type', function () {
    var w = (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(_["default"], {
      title: "TEST",
      type: "success"
    }));
    expect(w.find('div.el-alert--success')).toBeTruthy();
    expect(w.find('span.el-alert__title').exists()).toBeTruthy();
    expect(w.find('span.el-alert__title').text()).toBe('TEST');
  });
  it('default closable', function () {
    var w = (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(_["default"], {
      title: "TEST",
      closable: true
    }));
    expect(w.find('i.el-alert__closebtn').prop('style')).toEqual({});
  });
  it('disable close', function () {
    var w = (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(_["default"], {
      title: "TEST",
      closable: false
    }));
    expect(w.find('i.el-alert__closebtn').prop('style').display).toBe('none');
  });
  it('closeText', function () {
    var w = (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(_["default"], {
      title: "TEST",
      closeText: "testCloseText"
    }));
    expect(w.find('i.is-customed').text()).toBe('testCloseText');
  });
  it('onClose', function () {
    var onClose = _sinon["default"].spy();

    var w = (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(_["default"], {
      title: "TEST",
      onClose: onClose
    }));
    w.find('i.el-alert__closebtn').simulate('click');
    setTimeout(function () {
      expect(onClose.calledOnce).toBe(true);
    }, 1000);
  });
  it('showIcon', function () {
    var w = (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(_["default"], {
      title: "TEST",
      showIcon: true
    }));
    expect(w.find('i.el-alert__icon').exists()).toBeTruthy();
  });
  it('description', function () {
    var w = (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(_["default"], {
      title: "TEST",
      description: "testDescription"
    }));
    expect(w.find('p.el-alert__description').text()).toBe('testDescription');
  });
  it('showIcon and description', function () {
    var w = (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(_["default"], {
      title: "TEST",
      showIcon: true,
      description: "testDescription"
    }));
    expect(w.find('i.el-alert__icon').exists()).toBeTruthy();
    expect(w.find('p.el-alert__description').text()).toBe('testDescription');
  });
});