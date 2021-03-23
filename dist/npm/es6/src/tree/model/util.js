"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNodeKey = exports.markNodeData = exports.NODE_KEY = void 0;
var NODE_KEY = '$treeNodeId';
exports.NODE_KEY = NODE_KEY;

var markNodeData = function markNodeData(node, data) {
  if (data[NODE_KEY]) return;
  Object.defineProperty(data, NODE_KEY, {
    value: node.id,
    enumerable: false,
    configurable: false,
    writable: false
  });
};

exports.markNodeData = markNodeData;

var getNodeKey = function getNodeKey(key, data) {
  if (!key) return data[NODE_KEY];
  return data[key];
};

exports.getNodeKey = getNodeKey;