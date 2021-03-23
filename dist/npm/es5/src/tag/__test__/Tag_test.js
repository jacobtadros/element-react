"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _sinon = _interopRequireDefault(require("sinon"));

var _ = _interopRequireDefault(require("../"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe('Tag test', function () {
  it('type', function () {
    var w = (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(_["default"], {
      type: "primary"
    }, "TEST"));
    expect(w.find('.el-tag--primary')).toHaveLength(1);
    expect(w.find('.el-tag--primary').text()).toBe('TEST');
  });
  it('closable', function () {
    var w = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_["default"], {
      type: "primary",
      closable: true
    }, "TEST"));
    expect(w.find('i.el-tag__close').exists()).toBe(true);
  }); // it('closeTransition', () => {
  //   const w = shallow(
  //     <Tag closable={true} closeTransition={false}>TEST</Tag>
  //   );
  //   expect(w.find('[name="el-zoom-in-center"]').exists()).toBe(true);
  // });

  it('hit', function () {
    var w = (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(_["default"], {
      hit: true
    }, "TEST"));
    expect(w.find('.el-tag').first().hasClass('is-hit')).toBeTruthy();
  });
  it('onClose', function () {
    var onClose = _sinon["default"].spy();

    var w = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_["default"], {
      type: "primary",
      closable: true,
      onClose: onClose
    }, "TEST"));
    w.find('i.el-tag__close').simulate('click');
    expect(onClose.calledOnce).toBe(true);
  });
});