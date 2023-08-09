const { bashCmd } = require("./spawner");

const listenOpenPorts = () => {
  return new Promise((resolve) => {
    bashCmd('lsof', ['-i', '-P', '-n'])
    .then((res) => {
      bashCmd('grep', ['LISTEN'], {stdio: [`${res}`, 'pipe', '']})
      .then((r) => {
        resolve(r)
      })
    });
  })
  // return 
}

module.exports = {
  listenOpenPorts
}