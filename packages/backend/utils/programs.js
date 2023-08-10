const { bashCmd } = require("../spawner");

const programExists = () => {
  return new Promise((resolve, reject) => {
    bashCmd("psql", ["--version"])
    .then((res) => {
      resolve(`${res}`);
    })
    .catch((err) => {
      reject(`${err}`);
    })
  })
}

module.exports = {
  programExists
}