const { pipeBashCmd } = require("./spawner");

const listenOpenPorts = () => {
  return pipeBashCmd([
    {
      cmd: 'lsof',
      args: ['-i', '-P', '-n']
    },
    {
      cmd: 'grep',
      args: ['UDP']
    }
  ])
}

module.exports = {
  listenOpenPorts
}