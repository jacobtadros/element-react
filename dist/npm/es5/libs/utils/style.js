"use strict";

exports.reset = function (css) {
  var style = document.createElement('style');
  style.type = 'text/css';

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }

  (document.head || document.getElementsByTagName('head')[0]).appendChild(style);
};