"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Carousel = _interopRequireDefault(require("./Carousel"));

var _CarouselItem = _interopRequireDefault(require("./CarouselItem"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_Carousel["default"].Item = _CarouselItem["default"];
var _default = _Carousel["default"];
exports["default"] = _default;