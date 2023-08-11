"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.insertKeys = insertKeys;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
// import { spawner } from "./spawner"

var seed = 'daughter peasant twelve bless century neglect title mouse habit plate galaxy ticket';

// sr25519, ed25519, ecdsa
var allKeys = [{
  scheme: 'sr25519',
  keyType: 'aura',
  "short": 'aura'
}, {
  scheme: 'sr25519',
  keyType: 'babe',
  "short": 'babe'
}, {
  scheme: 'ed25519',
  keyType: 'grandpa',
  "short": 'gran'
}, {
  scheme: 'sr25519',
  keyType: 'im_online',
  "short": 'imon'
}, {
  scheme: 'sr25519',
  keyType: 'para_validator',
  "short": 'para'
}, {
  scheme: 'sr25519',
  keyType: 'para_assignment',
  "short": 'asgn'
}, {
  scheme: 'sr25519',
  keyType: 'authority_discovery',
  "short": 'audi'
}, {
  scheme: 'ecdsa',
  keyType: 'beefy',
  "short": 'beef'
}];
function generateSpecificAddress(schemeType) {
  return bashCmd('subkey', ['inspect', '--scheme', schemeType, seed]);
}
function generateAddress() {
  return _generateAddress.apply(this, arguments);
}
function _generateAddress() {
  _generateAddress = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var p1, p2, p3;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          p1 = generateSpecificAddress('sr25519');
          p2 = generateSpecificAddress('ed25519');
          p3 = generateSpecificAddress('ecdsa');
          return _context.abrupt("return", Promise.all([p1, p2, p3]));
        case 4:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _generateAddress.apply(this, arguments);
}
function sendCurlRequest(name, suri, publicHexKey, port) {
  var d = "{ \"jsonrpc\":\"2.0\", \"method\":\"author_insertKey\", \"params\":[\"".concat(name, "\", \"").concat(suri, "\", \"").concat(publicHexKey, "\"],\"id\":1 }");
  return bashCmd('curl', ['-H', 'Content-Type: application/json', '--data', d, "http://localhost:".concat(port)]);
}
var ports = [9004];
function insertKeys() {
  return _insertKeys.apply(this, arguments);
}
function _insertKeys() {
  _insertKeys = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    var address, mappedValues, filteredValues, allpromises, _iterator, _step, port, _iterator2, _step2, thiskey, x, _x, _x2;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return generateAddress();
        case 2:
          address = _context2.sent;
          mappedValues = address.map(function (r) {
            return "".concat(r);
          });
          filteredValues = mappedValues.map(function (d) {
            var x = d.split('\n').filter(function (f, i) {
              return i > 1 && i < 7;
            }).map(function (m) {
              var s = m.split(' ');
              return s[s.length - 1];
            });
            return {
              secretSeed: x[0],
              publicKeyHex: x[1],
              accountId: x[2],
              publicKeySS58: x[3],
              ss58Address: x[4]
            };
          });
          allpromises = [];
          _iterator = _createForOfIteratorHelper(ports);
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              port = _step.value;
              _iterator2 = _createForOfIteratorHelper(allKeys);
              try {
                for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                  thiskey = _step2.value;
                  if (thiskey.scheme === 'sr25519') {
                    x = sendCurlRequest(thiskey["short"], seed, filteredValues[0].publicKeyHex, port);
                    allpromises.push(x);
                  }
                  if (thiskey.scheme === 'ed25519') {
                    _x = sendCurlRequest(thiskey["short"], seed, filteredValues[1].publicKeyHex, port);
                    allpromises.push(_x);
                  }
                  if (thiskey.scheme === 'ecdsa') {
                    _x2 = sendCurlRequest(thiskey["short"], seed, filteredValues[2].publicKeyHex, port);
                    allpromises.push(_x2);
                  }
                }
              } catch (err) {
                _iterator2.e(err);
              } finally {
                _iterator2.f();
              }
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
          return _context2.abrupt("return", new Promise(function (resolve, reject) {
            Promise.all(allpromises).then(function (res) {
              if (res.length === 8) {
                resolve("inserted ".concat(res.length, " keys"));
              } else {
                reject("failed with ".concat(allKeys - res.length));
              }
            })["catch"](function (res) {
              reject("failed ".concat(JSON.stringify(res)));
            });
          }));
        case 9:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return _insertKeys.apply(this, arguments);
} // curl -H 'Content-Type: application/json' --data '{ "jsonrpc":"2.0", "method":"author_insertKey", "params":["aura", "daughter peasant twelve bless century neglect title mouse habit plate galaxy ticket//2//aura", "0xb46f4dc3ade8c29e2e9cf838db61f2da2e0db79df3c5de8698d58c2ccff59137"],"id":1 }' http://localhost:9008