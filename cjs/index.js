"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "REDUCER", {
  enumerable: true,
  get: function get() {
    return _media.REDUCER;
  }
});
exports["default"] = exports.GET_SIZE = exports.unset = exports.setup = exports.setContainer = exports.config = void 0;

var _debounce = _interopRequireDefault(require("@indlekofer/debounce"));

var _media = require("@indlekofer/media");

var _getCoords = _interopRequireDefault(require("./getCoords"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var GET_SIZE = '@indlekofer/media_container/GET_SIZE';
exports.GET_SIZE = GET_SIZE;
var __container = null;

var config = function config() {
  var deviceWidth = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var deviceHeight = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var force = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object' && !force) {
    deviceWidth = window.innerWidth;
    deviceHeight = window.innerHeight;
  }

  if (__container === null) {
    (0, _media.handleChange)(GET_SIZE, {
      width: deviceWidth,
      height: deviceHeight
    });
  } else {
    var box = __container.getBoundingClientRect();

    var coords = (0, _getCoords["default"])(box);
    var width;
    var height;

    if (box.width == 0) {
      width = deviceWidth - coords.left * 2;
    } else {
      width = box.width;
    }

    height = deviceHeight - coords.top;
    (0, _media.handleChange)(GET_SIZE, {
      width: width,
      height: height
    });
  }
};

exports.config = config;
var configDebounced = (0, _debounce["default"])(config, 400);

var setContainer = function setContainer(container) {
  __container = container;
  config();
};

exports.setContainer = setContainer;

var setup = function setup() {
  if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object') window.addEventListener('resize', configDebounced);
};

exports.setup = setup;

var unset = function unset() {
  if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object') window.removeEventListener('resize', configDebounced);
};

exports.unset = unset;
setup();
config();
var _default = GET_SIZE;
exports["default"] = _default;