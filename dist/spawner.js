"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bashCmd = bashCmd;
exports.pipeBashCmd = pipeBashCmd;
var _nodeChild_process = require("node:child_process");
function bashCmd(program, cmds) {
  console.log(program, cmds);
  return new Promise(function (resolve, reject) {
    var cmd = (0, _nodeChild_process.spawn)(program, cmds);
    cmd.stdout.on('data', function (data) {
      console.log("".concat(data));
      resolve("".concat(data));
    });
    cmd.on('close', function (data) {
      console.log("".concat(data));
      resolve("".concat(data));
    });
    cmd.on('error', function (data) {
      reject("".concat(data));
    });
  });
}
function pipeBashCmd(cmds) {
  var allspawns = [];
  cmds.forEach(function (d, id) {
    allspawns.push({
      fn: (0, _nodeChild_process.spawn)(d.cmd, d.args),
      id: id
    });
  });
  return new Promise(function (resolve, reject) {
    var _loop = function _loop(i) {
      allspawns[i].fn.stdout.on('data', function (data) {
        if (i === allspawns.length - 1) {
          resolve(data);
        }
        if (allspawns[i + 1]) {
          allspawns[i + 1].fn.stdin.write(data);
        }
      });
      allspawns[i].fn.on('error', function (data) {
        reject(data);
      });
      allspawns[i].fn.on('close', function (code) {
        if (code !== 0) {
          reject("ps process exited with code ".concat(code));
        }
        if (allspawns[i + 1]) {
          allspawns[i + 1].fn.stdin.end();
        }
      });
    };
    for (var i = 0; i < allspawns.length; i++) {
      _loop(i);
    }
  });
}

// pipeBashCmd([
//   {
//     cmd: 'lsof',
//     args: ['-i', '-P', '-n']
//   },
//   {
//     cmd: 'grep',
//     args: ['LISTEN']
//   }
// ])