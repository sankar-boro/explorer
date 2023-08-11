import { pipeBashCmd } from "./spawner";

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

export {
  listenOpenPorts
}