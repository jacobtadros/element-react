"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PopperMixin = PopperMixin;
exports.PopperReactMixin = PopperReactMixin;

var _popper = _interopRequireDefault(require("popper.js"));

var _assert = require("./assert");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var mixinPrototype = {
  //---------- start: public methods

  /**
   * @param {HTMLElement} popupElement - The reference element used to position the popper.
   * @param {HTMLElement} refElement - The HTML element used as popper, or a configuration used to generate the popper.
   * @param {object} popperOptions, PopperJS options
   */
  createPopper: function createPopper(popupElement, refElement, popperOptions) {
    var _this = this;

    (0, _assert.require_condition)(popupElement && refElement);

    var _this$_popper_config = this._popper_config,
        visibleArrow = _this$_popper_config.visibleArrow,
        placement = _this$_popper_config.placement,
        zIndex = _this$_popper_config.zIndex,
        offset = _this$_popper_config.offset,
        width = _this$_popper_config.width,
        others = _objectWithoutProperties(_this$_popper_config, ["visibleArrow", "placement", "zIndex", "offset", "width"]);

    popperOptions = _objectSpread(_objectSpread({}, popperOptions), others);

    if (!/^(top|bottom|left|right)(-start|-end)?$/g.test(placement)) {
      return;
    }

    var popper = popupElement;
    var reference = refElement;
    if (!popper || !reference) return;
    if (visibleArrow) this._appendArrow(popper);

    if (this._poperJS) {
      this._poperJS.destroy();
    } // these options are perserved only for smooth the migiration from eleme/element


    if (!popperOptions.placement) {
      popperOptions.placement = placement;
    }

    if (!popperOptions.offset) {
      popperOptions.offset = offset;
    }

    popperOptions.onCreate = function () {
      _this._resetTransformOrigin();

      _this._popper_state.isCreated = true;
      _this._poperJS.popper.style.zIndex = zIndex;
      _this._poperJS.popper.style.width = width !== null ? "".concat(width, "px") : reference.getBoundingClientRect().width + 'px';
    };

    this._poperJS = new _popper["default"](reference, popper, popperOptions);
  },
  destroyPopper: function destroyPopper() {
    if (this._poperJS && this._popper_state.isCreated) {
      this._poperJS.destroy();

      this._poperJS = null;
      this._popper_state = {};
      this._popper_config = {};
    }
  },
  updatePopper: function updatePopper() {
    if (!this._poperJS && this._popper_state.isCreated) return;

    this._poperJS.update();
  },
  //---------- end: public methods
  _resetTransformOrigin: function _resetTransformOrigin() {
    var placementMap = {
      top: 'bottom',
      bottom: 'top',
      left: 'right',
      right: 'left'
    };

    var placement = this._poperJS.popper.getAttribute('x-placement').split('-')[0];

    var origin = placementMap[placement];
    this._poperJS.popper.style.transformOrigin = ['top', 'bottom'].indexOf(placement) > -1 ? "center ".concat(origin) : "".concat(origin, " center");
  },
  _appendArrow: function _appendArrow(element) {
    if (this._popper_state.appended) {
      return;
    }

    this._popper_state.appended = true;
    var arrow = document.createElement('div');
    arrow.setAttribute('x-arrow', '');
    arrow.className = 'popper__arrow';
    element.appendChild(arrow);
  }
};
/**
 * @param {args} @see PopperMixin
 * @param {object} config
    * @param {String} [placement=button] - Placement of the popper accepted values: top(-start, -end), right(-start, -end), bottom(-start, -right), left(-start, -end)
    * @param {Number} [offset=0] - Amount of pixels the popper will be shifted (can be negative).
    * @param {Number} [boundariesPadding=5]
    * @param {Boolean} [visibleArrow=false] Visibility of the arrow, no style.
*/

function PopperMixin(config) {
  this._popper_config = Object.assign({}, {
    width: null,
    zIndex: 1050,
    offset: 0,
    placement: 'bottom',
    boundariesPadding: 5,
    visibleArrow: false
  }, config);
  this._popper_state = {};
}

PopperMixin.prototype = mixinPrototype;
var PopperReactMixinMethods = {
  hookReactLifeCycle: function hookReactLifeCycle(getPopperRootDom, getRefDom) {
    var componentDidMount = this.componentDidMount;
    var componentWillUnmount = this.componentWillUnmount;

    this.componentDidMount = function () {
      var root = getPopperRootDom();
      var ref = getRefDom();
      (0, _assert.require_condition)(root, 'method `getPopperRootDom()` require a HTMLElement instance when componentDidMount is called');
      (0, _assert.require_condition)(ref, 'method `getRefDom()` require a HTMLElement instance when componentDidMount is called');
      this.createPopper(root, ref);
      this._animateRef = window.requestAnimationFrame(this.updatePopper.bind(this));

      if (typeof componentDidMount === 'function') {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        componentDidMount.apply(this, args);
      }
    };

    this.componentWillUnmount = function () {
      window.cancelAnimationFrame(this._animateRef);
      this.destroyPopper();

      if (typeof componentWillUnmount === 'function') {
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        componentWillUnmount.apply(this, args);
      }
    };
  }
};
/**
 * this Mixin provide utility method to hook reactjs component lifecycle
 *
 * @param getPopperRootDom: ()=>HTMLElement, return your popper root HTMLElement when componentDidMount is called
 * @param getRefDom: ()=>HTMLElement, ref node, the node that popper aligns its pop-up to, see the popperjs doc for more information
 */

function PopperReactMixin(getPopperRootDom, getRefDom, config) {
  var _this2 = this;

  (0, _assert.require_condition)(typeof getPopperRootDom === 'function', '`getPopperRootDom` func is required!');
  (0, _assert.require_condition)(typeof getRefDom === 'function', '`getRefDom` func is required!');
  PopperMixin.call(this, config);
  Object.keys(mixinPrototype).forEach(function (k) {
    return _this2[k] = mixinPrototype[k];
  });
  PopperReactMixinMethods.hookReactLifeCycle.call(this, getPopperRootDom, getRefDom);
  return this;
}