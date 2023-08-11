"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listenOpenPorts = void 0;
var _spawner = require("./spawner");
var listenOpenPorts = function listenOpenPorts() {
  return (0, _spawner.pipeBashCmd)([{
    cmd: 'lsof',
    args: ['-i', '-P', '-n']
  }, {
    cmd: 'grep',
    args: ['UDP']
  }]);
};
exports.listenOpenPorts = listenOpenPorts;