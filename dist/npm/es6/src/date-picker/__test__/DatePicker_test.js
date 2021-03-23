"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _sinon = _interopRequireDefault(require("sinon"));

var _ = require("../");

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

describe('DatePicker tests', function () {
  describe('DatePicker test', function () {
    var minProps = {
      value: null,
      placeholder: '',
      onChange: function onChange() {}
    };

    function mountDefault() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(_.DatePicker, _extends({}, minProps, props)));
    }

    function shallowDefault() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_.DatePicker, _extends({}, minProps, props)));
    }

    it('should render without exploding', function () {
      var w = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_.DatePicker, minProps));
      expect(w.exists()).toBeTruthy();
    });
    it('should unmount without exploding', function () {
      var w = (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(_.DatePicker, minProps));
      w.unmount();
      expect(true).toBeTruthy();
    });
    it('disabledDate should work', function () {
      (0, _utils.mockRAf)();
      var date = new Date(2017, 1, 2);
      var w = mountDefault({
        value: date,
        disabledDate: function disabledDate(d) {
          return d.getTime() < new Date(2017, 1, 2);
        }
      });
      w.find('input').simulate('focus');
      var condition = Array.from(document.querySelectorAll('.el-date-table td.normal.disabled')).map(function (node) {
        return node.innerHTML;
      }).some(function (t) {
        return t == 1;
      });
      expect(condition).toBeTruthy();
    }); // it('onChange should work', () => {
    //   mockRAf()
    //   let date = new Date(2017, 1, 2)
    //   let onChange = sinon.spy()
    //   let w = mountDefault({
    //     value: date,
    //     onChange
    //   })
    //   w.find('input').simulate('focus');
    //   w.find('input').simulate('change', {target: {value: ''}})
    //   document.querySelectorAll('.el-date-table td.available')[0].click()
    //   expect(onChange.called).toBeTruthy()
    //   expect(onChange.args[0][0] instanceof Date).toBeTruthy()
    // })

    it('isShowTrigger should work', function () {
      var w = shallowDefault({
        isShowTrigger: false
      });
      expect(w.find('i.el-input__icon').exists()).toBe(false);
    });
    it('format should work', function () {
      var w = shallowDefault({
        value: new Date(2017, 0, 1),
        format: 'yy-MM-dd'
      });
      expect(w.find('Input').props().value).toBe('17-01-01'); //shallow, cant use find('input'), 
    });
    it('onFocus & onBlur should work', function () {
      var onFocus = _sinon["default"].spy();

      var onBlur = _sinon["default"].spy();

      var w = mountDefault({
        onFocus: onFocus,
        onBlur: onBlur
      });
      w.find('input').simulate('focus');
      expect(onFocus.called).toBeTruthy();
      w.find('input').simulate('blur');
      expect(onBlur.called).toBeTruthy();
    });
  });
  describe('DateRangePicker test', function () {
    var minProps = {
      value: [],
      onChange: function onChange() {}
    };

    function mountDefault() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return (0, _enzyme.mount)( /*#__PURE__*/_react["default"].createElement(_.DateRangePicker, _extends({}, minProps, props)));
    }

    it('should render without exploding', function () {
      var w = mountDefault();
      expect(w.exists()).toBeTruthy();
    });
  });
});