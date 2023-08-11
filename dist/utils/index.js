"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "deletePg", {
  enumerable: true,
  get: function get() {
    return _postgres.deletePg;
  }
});
Object.defineProperty(exports, "getPg", {
  enumerable: true,
  get: function get() {
    return _postgres.getPg;
  }
});
Object.defineProperty(exports, "insertPg", {
  enumerable: true,
  get: function get() {
    return _postgres.insertPg;
  }
});
Object.defineProperty(exports, "programExists", {
  enumerable: true,
  get: function get() {
    return _programs.programExists;
  }
});
Object.defineProperty(exports, "runLinuxCmd", {
  enumerable: true,
  get: function get() {
    return _programs.runLinuxCmd;
  }
});
var _programs = require("./programs");
var _postgres = require("./postgres");