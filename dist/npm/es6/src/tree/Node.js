"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _throttleDebounce = require("throttle-debounce");

var _libs = require("../../libs");

var _utils = require("../../libs/utils");

var _checkbox = _interopRequireDefault(require("../checkbox"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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

function NodeContent(_ref) {
  var context = _ref.context,
      renderContent = _ref.renderContent;
  var _context$props = context.props,
      nodeModel = _context$props.nodeModel,
      treeNode = _context$props.treeNode;

  if (typeof renderContent === 'function') {
    return renderContent(nodeModel, nodeModel.data, treeNode.store);
  } else {
    return /*#__PURE__*/_react["default"].createElement("span", {
      className: "el-tree-node__label"
    }, nodeModel.label);
  }
}

NodeContent.propTypes = {
  renderContent: _libs.PropTypes.func,
  context: _libs.PropTypes.object.isRequired
};

var Node = /*#__PURE__*/function (_Component) {
  _inherits(Node, _Component);

  var _super = _createSuper(Node);

  function Node(props) {
    var _this;

    _classCallCheck(this, Node);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "state", void 0);

    _this.state = {
      childNodeRendered: false,
      isShowCheckbox: false
    };
    _this.state.isShowCheckbox = props.treeNode.isShowCheckbox;
    _this.oldChecked = false;
    _this.oldIndeterminate = false;
    _this.idGen = new _utils.IDGenerator();
    return _this;
  }

  _createClass(Node, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this,
          _this$watchers;

      var nodeModel = this.props.nodeModel;
      var childrenKey = this.props.options.children || 'children';
      var triggerChange = (0, _throttleDebounce.debounce)(20, function () {
        if (_this2.isDeconstructed) return;

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        _this2.handleSelectChange.apply(_this2, args);
      });
      this.loadHandler = this.enhanceLoad(nodeModel);
      this.watchers = (_this$watchers = {}, _defineProperty(_this$watchers, this.idGen.next(), (0, _utils.watchPropertyChange)(nodeModel, 'indeterminate', function (value) {
        triggerChange(nodeModel.checked, value);
      })), _defineProperty(_this$watchers, this.idGen.next(), (0, _utils.watchPropertyChange)(nodeModel, 'checked', function (value) {
        triggerChange(value, nodeModel.indeterminate);
      })), _defineProperty(_this$watchers, this.idGen.next(), (0, _utils.watchPropertyChange)(nodeModel, 'loading', function () {
        _this2.setState({});
      })), _this$watchers);

      if (nodeModel.data != null) {
        this.watchers[this.idGen.next()] = (0, _utils.watchPropertyChange)(nodeModel.data, childrenKey, function () {
          nodeModel.updateChildren();

          _this2.setState({}); //force update view

        });
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.loadHandler(); // clear watchs

      for (var w in this.watchers) {
        if (this.watchers[w]) {
          this.watchers[w]();
        }
      }

      this.isDeconstructed = true;
    }
  }, {
    key: "enhanceLoad",
    value: function enhanceLoad(nodeModel) {
      var _this3 = this;

      var load = nodeModel.load;

      var enhanced = function enhanced() {
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        load.apply(null, args);

        _this3.setState({});
      };

      nodeModel.load = enhanced;
      return function () {
        nodeModel.load = load;
      };
    }
  }, {
    key: "handleSelectChange",
    value: function handleSelectChange(checked, indeterminate) {
      var _this$props = this.props,
          onCheckChange = _this$props.onCheckChange,
          nodeModel = _this$props.nodeModel; // !NOTE: 原码是 && 的关系，感觉有bug

      if (this.oldChecked !== checked || this.oldIndeterminate !== indeterminate) {
        onCheckChange(nodeModel.data, checked, indeterminate);
        this.setState({}); //force update
      }

      this.oldChecked = checked;
      this.oldIndeterminate = indeterminate;
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
    key: "handleClick",
    value: function handleClick(evt) {
      if (evt) evt.stopPropagation();
      var _this$props2 = this.props,
          nodeModel = _this$props2.nodeModel,
          treeNode = _this$props2.treeNode;
      treeNode.setCurrentNode(this);

      if (treeNode.props.expandOnClickNode) {
        this.handleExpandIconClick();
      }
    }
  }, {
    key: "handleExpandIconClick",
    value: function handleExpandIconClick(evt) {
      var _this4 = this;

      if (evt) evt.stopPropagation();
      var _this$props3 = this.props,
          nodeModel = _this$props3.nodeModel,
          parent = _this$props3.parent;
      var _this$props$treeNode$ = this.props.treeNode.props,
          onNodeCollapse = _this$props$treeNode$.onNodeCollapse,
          onNodeExpand = _this$props$treeNode$.onNodeExpand;
      if (nodeModel.isLeaf) return;

      if (nodeModel.expanded) {
        nodeModel.collapse();
        this.refresh();
        onNodeCollapse(nodeModel.data, nodeModel, this);
      } else {
        nodeModel.expand(function () {
          _this4.setState({
            childNodeRendered: true
          }, function () {
            onNodeExpand(nodeModel.data, nodeModel, _this4);
          });

          parent.closeSiblings(nodeModel);
        });
      }
    }
  }, {
    key: "closeSiblings",
    value: function closeSiblings(exclude) {
      var _this$props4 = this.props,
          treeNode = _this$props4.treeNode,
          nodeModel = _this$props4.nodeModel;
      if (!treeNode.props.accordion) return;
      if (nodeModel.isLeaf || !nodeModel.childNodes || !nodeModel.childNodes.length) return;
      nodeModel.childNodes.filter(function (e) {
        return e !== exclude;
      }).forEach(function (e) {
        return e.collapse();
      });
      this.refresh();
    }
  }, {
    key: "refresh",
    value: function refresh() {
      this.setState({});
    }
  }, {
    key: "handleUserClick",
    value: function handleUserClick() {
      var _this$props$treeNode = this.props.treeNode,
          nodeModel = _this$props$treeNode.nodeModel,
          checkStrictly = _this$props$treeNode.checkStrictly;

      if (nodeModel.indeterminate) {
        nodeModel.setChecked(nodeModel.checked, !checkStrictly);
      }
    }
  }, {
    key: "handleCheckChange",
    value: function handleCheckChange(checked) {
      this.props.nodeModel.setChecked(checked, true);
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;

      var childNodeRendered = this.state.childNodeRendered;
      var _this$props5 = this.props,
          treeNode = _this$props5.treeNode,
          nodeModel = _this$props5.nodeModel,
          renderContent = _this$props5.renderContent,
          isShowCheckbox = _this$props5.isShowCheckbox;
      var expanded = nodeModel.expanded;
      return /*#__PURE__*/_react["default"].createElement("div", {
        onClick: this.handleClick.bind(this),
        className: this.classNames('el-tree-node', {
          expanded: childNodeRendered && expanded,
          'is-current': treeNode.getCurrentNode() === this,
          'is-hidden': !nodeModel.visible
        }),
        style: {
          display: nodeModel.visible ? '' : 'none'
        }
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "el-tree-node__content",
        style: {
          paddingLeft: "".concat((nodeModel.level - 1) * treeNode.props.indent, "px")
        }
      }, /*#__PURE__*/_react["default"].createElement("span", {
        className: this.classNames('el-tree-node__expand-icon', {
          'is-leaf': nodeModel.isLeaf,
          expanded: !nodeModel.isLeaf && expanded
        }),
        onClick: this.handleExpandIconClick.bind(this)
      }), isShowCheckbox && /*#__PURE__*/_react["default"].createElement(_checkbox["default"], {
        checked: nodeModel.checked,
        onChange: this.handleCheckChange.bind(this),
        indeterminate: nodeModel.indeterminate,
        onClick: this.handleUserClick.bind(this)
      }), nodeModel.loading && /*#__PURE__*/_react["default"].createElement("span", {
        className: "el-tree-node__loading-icon el-icon-loading"
      }, " "), /*#__PURE__*/_react["default"].createElement(NodeContent, {
        nodeModel: nodeModel,
        renderContent: treeNode.props.renderContent,
        context: this
      })), /*#__PURE__*/_react["default"].createElement(_libs.CollapseTransition, {
        isShow: expanded,
        ref: "collapse"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "el-tree-node__children"
      }, nodeModel.childNodes.map(function (e, idx) {
        var props = Object.assign({}, _this5.props, {
          nodeModel: e,
          parent: _this5
        });
        return /*#__PURE__*/_react["default"].createElement(Node, _extends({}, props, {
          key: _this5.getNodeKey(e, idx)
        }));
      }))));
    }
  }]);

  return Node;
}(_libs.Component);

exports["default"] = Node;
Node.propTypes = {
  nodeModel: _libs.PropTypes.object,
  options: _libs.PropTypes.object,
  treeNode: _libs.PropTypes.object.isRequired,
  isShowCheckbox: _libs.PropTypes.bool,
  onCheckChange: _libs.PropTypes.func
};
Node.defaultProps = {
  nodeModel: {},
  options: {},
  onCheckChange: function onCheckChange() {}
};