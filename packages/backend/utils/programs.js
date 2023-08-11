import { bashCmd } from "../spawner";

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

const runLinuxCmd = (data) => {
  return new Promise((resolve, reject) => {
    bashCmd(data)
    .then((res) => {
      resolve(`${res}`);
    })
    .catch((err) => {
      reject(`${err}`);
    })
  })
}

export {
  programExists,
  runLinuxCmd
}