"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mockRAf = mockRAf;
exports.nativeEvent = void 0;

var _mockRaf = _interopRequireDefault(require("mock-raf"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import sinon from 'sinon'
function mockRAf() {
  var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
  var mockRaf = (0, _mockRaf["default"])(); // Stub out your `requestAnimationFrame` method

  global.requestAnimationFrame = mockRaf.raf;

  global.cancelAnimationFrame = function () {}; // sinon.stub(global, 'requestAnimationFrame').callsFake(mockRaf.raf);
  // Take 10 `requestAnimationFrame` steps (your callback will fire 10 times)


  mockRaf.step({
    count: count
  });
}

var nativeEvent = {
  nativeEvent: {
    stopImmediatePropagation: function stopImmediatePropagation() {}
  }
};
exports.nativeEvent = nativeEvent;