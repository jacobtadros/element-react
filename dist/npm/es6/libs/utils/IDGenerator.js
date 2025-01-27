"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IDGenerator = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var IDGenerator = /*#__PURE__*/function () {
  function IDGenerator() {
    _classCallCheck(this, IDGenerator);

    this.id = 0;
  }

  _createClass(IDGenerator, [{
    key: "next",
    value: function next() {
      return this.id++ & 0xffff;
    }
  }]);

  return IDGenerator;
}();

exports.IDGenerator = IDGenerator;