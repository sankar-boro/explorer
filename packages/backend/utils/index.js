const { programExists, runLinuxCmd } = require("./programs");
const { insertPg, getPg, } = require("./postgres");

module.exports = {
  programExists,
  insertPg,
  getPg,
  runLinuxCmd
}