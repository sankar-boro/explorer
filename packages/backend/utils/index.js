const { programExists, runLinuxCmd } = require("./programs");
const { insertPg, getPg, deletePg} = require("./postgres");

module.exports = {
  programExists,
  insertPg,
  getPg,
  runLinuxCmd,
  deletePg
}