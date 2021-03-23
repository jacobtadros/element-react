"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;
var isDragging = false;

function _default(element, options) {
  var moveFn = function moveFn(event) {
    if (options.drag) {
      options.drag(event);
    }
  };

  var upFn = function upFn(event) {
    document.removeEventListener('mousemove', moveFn);
    document.removeEventListener('mouseup', upFn);
    document.onselectstart = null;
    document.ondragstart = null;
    isDragging = false;

    if (options.end) {
      options.end(event);
    }
  };

  element.addEventListener('mousedown', function (event) {
    if (isDragging) return;

    document.onselectstart = function () {
      return false;
    };

    document.ondragstart = function () {
      return false;
    };

    document.addEventListener('mousemove', moveFn);
    document.addEventListener('mouseup', upFn);
    isDragging = true;

    if (options.start) {
      options.start(event);
    }
  });
}