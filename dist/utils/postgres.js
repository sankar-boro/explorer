"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.insertPg = exports.getPg = exports.deletePg = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var insertPg = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(data, db) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return db.none('INSERT INTO linuxcmds(name, cmds, label, body) VALUES($/name/, $/cmds/, $/label/, $/body/)', data);
        case 2:
          return _context.abrupt("return", "insert");
        case 3:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function insertPg(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.insertPg = insertPg;
var getPg = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(db) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return db.any('SELECT * FROM linuxcmds');
        case 2:
          return _context2.abrupt("return", _context2.sent);
        case 3:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function getPg(_x3) {
    return _ref2.apply(this, arguments);
  };
}();
exports.getPg = getPg;
var deletePg = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(data, db) {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return db.one('DELETE FROM linuxcmds WHERE id = $1 RETURNING *', data.id);
        case 2:
          return _context3.abrupt("return", _context3.sent);
        case 3:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function deletePg(_x4, _x5) {
    return _ref3.apply(this, arguments);
  };
}();
exports.deletePg = deletePg;