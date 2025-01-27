"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _libs = require("../../libs");

var _utils = require("../../libs/utils");

var _Node = _interopRequireDefault(require("./Node"));

var _locale = _interopRequireDefault(require("../locale"));

var _treeStore = _interopRequireDefault(require("./model/tree-store"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Tree = /*#__PURE__*/function (_Component) {
  _inherits(Tree, _Component);

  var _super = _createSuper(Tree);

  function Tree(props) {
    var _this;

    _classCallCheck(this, Tree);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "state", void 0);

    var _this$props = _this.props,
        data = _this$props.data,
        lazy = _this$props.lazy,
        options = _this$props.options,
        load = _this$props.load,
        defaultCheckedKeys = _this$props.defaultCheckedKeys,
        defaultExpandedKeys = _this$props.defaultExpandedKeys,
        currentNodeKey = _this$props.currentNodeKey,
        nodeKey = _this$props.nodeKey,
        checkStrictly = _this$props.checkStrictly,
        autoExpandParent = _this$props.autoExpandParent,
        defaultExpandAll = _this$props.defaultExpandAll,
        filterNodeMethod = _this$props.filterNodeMethod;
    _this.state = {
      store: new _treeStore["default"]({
        key: nodeKey,
        data: data,
        lazy: lazy,
        props: options,
        load: load,
        currentNodeKey: currentNodeKey,
        checkStrictly: checkStrictly,
        defaultCheckedKeys: defaultCheckedKeys,
        defaultExpandedKeys: defaultExpandedKeys,
        autoExpandParent: autoExpandParent,
        defaultExpandAll: defaultExpandAll,
        filterNodeMethod: filterNodeMethod
      }),
      currentNode: null
    };
    return _this;
  }

  _createClass(Tree, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.data instanceof Array && this.props.data !== nextProps.data) {
        this.root.setData(nextProps.data);
        this.setState({}); //force update
      }
    }
  }, {
    key: "root",
    get: function get() {
      return this.state.store.root;
    }
  }, {
    key: "store",
    get: function get() {
      return this.state.store;
    }
  }, {
    key: "filter",
    value: function filter(value) {
      if (!this.props.filterNodeMethod) throw new Error('[Tree] filterNodeMethod is required when filter');
      this.store.filter(value);
      this.refresh();
    }
  }, {
    key: "refresh",
    value: function refresh() {
      this.setState({});
    }
  }, {
    key: "getNodeKey",
    value: function getNodeKey(node, otherwise) {
      var nodeKey = this.props.nodeKey;

      if (nodeKey && node) {
        return node.data[nodeKey];
      }

      return otherwise;
    }
  }, {
    key: "getCheckedNodes",
    value: function getCheckedNodes(leafOnly) {
      return this.store.getCheckedNodes(leafOnly);
    }
  }, {
    key: "getCheckedKeys",
    value: function getCheckedKeys(leafOnly) {
      return this.store.getCheckedKeys(leafOnly);
    }
  }, {
    key: "setCheckedNodes",
    value: function setCheckedNodes(nodes, leafOnly) {
      if (!this.props.nodeKey) throw new Error('[Tree] nodeKey is required in setCheckedNodes');
      this.store.setCheckedNodes(nodes, leafOnly);
    }
  }, {
    key: "setCheckedKeys",
    value: function setCheckedKeys(keys, leafOnly) {
      if (!this.props.nodeKey) throw new Error('[Tree] nodeKey is required in setCheckedNodes');
      this.store.setCheckedKeys(keys, leafOnly);
    }
  }, {
    key: "setChecked",
    value: function setChecked(data, checked, deep) {
      this.store.setChecked(data, checked, deep);
    } // used by child nodes, use tree store to store this info?

  }, {
    key: "getCurrentNode",
    value: function getCurrentNode() {
      return this.state.currentNode;
    }
  }, {
    key: "setCurrentNode",
    value: function setCurrentNode(node) {
      (0, _utils.require_condition)(node != null);
      var _this$props2 = this.props,
          onCurrentChange = _this$props2.onCurrentChange,
          onNodeClicked = _this$props2.onNodeClicked;
      this.store.setCurrentNode(node);
      this.setState({
        currentNode: node
      }, function () {
        var nodeModel = node.props.nodeModel;
        onCurrentChange(nodeModel.data, node);
        onNodeClicked(nodeModel.data, node);
      });
    }
  }, {
    key: "closeSiblings",
    value: function closeSiblings(exclude) {
      var accordion = this.props.accordion;
      if (!accordion) return;
      if (!this.root.childNodes || !this.root.childNodes.length) return;
      this.root.childNodes.filter(function (e) {
        return e !== exclude;
      }).forEach(function (e) {
        return e.collapse();
      });
      this.refresh();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props3 = this.props,
          options = _this$props3.options,
          renderContent = _this$props3.renderContent,
          highlightCurrent = _this$props3.highlightCurrent,
          isShowCheckbox = _this$props3.isShowCheckbox,
          onCheckChange = _this$props3.onCheckChange,
          onNodeClicked = _this$props3.onNodeClicked,
          emptyText = _this$props3.emptyText;

      var renderEmptyText = function renderEmptyText() {
        if (!_this2.root.childNodes || _this2.root.childNodes.length === 0) {
          return /*#__PURE__*/_react["default"].createElement("div", {
            className: "el-tree__empty-block"
          }, /*#__PURE__*/_react["default"].createElement("span", {
            className: "el-tree__empty-text"
          }, emptyText));
        } else return null;
      };

      return /*#__PURE__*/_react["default"].createElement("div", {
        style: this.style(),
        className: this.className('el-tree', {
          'el-tree--highlight-current': highlightCurrent
        })
      }, this.root.childNodes.map(function (e, idx) {
        return /*#__PURE__*/_react["default"].createElement(_Node["default"], {
          ref: "cnode",
          key: _this2.getNodeKey(e, idx),
          nodeModel: e,
          options: options,
          renderContent: renderContent,
          treeNode: _this2,
          parent: _this2,
          isShowCheckbox: isShowCheckbox,
          onCheckChange: onCheckChange
        });
      }), renderEmptyText());
    }
  }]);

  return Tree;
}(_libs.Component);

exports["default"] = Tree;
Tree.propTypes = {
  autoExpandParent: _libs.PropTypes.bool,
  checkStrictly: _libs.PropTypes.bool,
  currentNodeKey: _libs.PropTypes.any,
  defaultCheckedKeys: _libs.PropTypes.array,
  defaultExpandedKeys: _libs.PropTypes.array,
  defaultExpandAll: _libs.PropTypes.bool,
  data: _libs.PropTypes.array,
  emptyText: _libs.PropTypes.string,
  expandOnClickNode: _libs.PropTypes.bool,
  filterNodeMethod: _libs.PropTypes.func,
  renderContent: _libs.PropTypes.func,
  isShowCheckbox: _libs.PropTypes.bool,
  accordion: _libs.PropTypes.bool,
  indent: _libs.PropTypes.number,
  nodeKey: _libs.PropTypes.string,
  options: _libs.PropTypes.shape({
    children: _libs.PropTypes.string,
    label: _libs.PropTypes.string,
    icon: _libs.PropTypes.string
  }),
  //equal to props in vue element
  lazy: _libs.PropTypes.bool,
  //todo: check this
  highlightCurrent: _libs.PropTypes.bool,
  // (f:(resolve, reject)=>Unit)=>Unit
  load: _libs.PropTypes.func,
  //
  onCheckChange: _libs.PropTypes.func,
  // todo: 这个地方需要改下， 现在是current和nodeclick一起被设置上了
  // (nodeModel.data, node)=>Unit
  onNodeClicked: _libs.PropTypes.func,
  // (nodeModel.data, node)=>Unit
  onCurrentChange: _libs.PropTypes.func,
  // (nodeModel.data, nodeModel, Node)=>Unit
  onNodeExpand: _libs.PropTypes.func,
  onNodeCollapse: _libs.PropTypes.func
};
Tree.defaultProps = {
  autoExpandParent: true,
  defaultCheckedKeys: [],
  defaultExpandedKeys: [],
  data: [],
  expandOnClickNode: true,
  emptyText: _locale["default"].t('el.tree.emptyText'),
  indent: 16,
  options: {
    children: 'children',
    label: 'label',
    icon: 'icon'
  },
  onCheckChange: function onCheckChange() {},
  onNodeClicked: function onNodeClicked() {},
  onCurrentChange: function onCurrentChange() {},
  onNodeExpand: function onNodeExpand() {},
  onNodeCollapse: function onNodeCollapse() {}
};