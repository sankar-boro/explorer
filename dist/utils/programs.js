"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.runLinuxCmd = exports.programExists = void 0;
var _spawner = require("../spawner");
// const stringToHex = (str) => {
//   let hex = '';
//   for (let i = 0; i < str.length; i++) {
//     const charCode = str.charCodeAt(i);
//     const hexValue = charCode.toString(16);

//     // Pad with zeros to ensure two-digit representation
//     hex += hexValue.padStart(2, '0');
//   }
//   return hex;
// };

// const hexToString = (hex) => {
//   let str = '';
//   for (let i = 0; i < hex.length; i += 2) {
//     const hexValue = hex.substring(i, i + 2);
//     const decimalValue = parseInt(hexValue, 16);
//     const x = String.fromCharCode(decimalValue);
//     str += x;
//   }
//   return str;
// };
var programExists = function programExists() {
  return new Promise(function (resolve, reject) {
    (0, _spawner.bashCmd)("psql", ["--version"]).then(function (res) {
      resolve("".concat(res));
    })["catch"](function (err) {
      reject("".concat(err));
    });
  });
};
exports.programExists = programExists;
var runLinuxCmd = function runLinuxCmd(data) {
  var x = JSON.parse(data.cmds);
  console.log(data, x);
  return new Promise(function (resolve, reject) {
    (0, _spawner.bashCmd)(data.name, x).then(function (res) {
      resolve("".concat(res));
    })["catch"](function (err) {
      reject("".concat(err));
    });
  });
};
exports.runLinuxCmd = runLinuxCmd;