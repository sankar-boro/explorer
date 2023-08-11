import { bashCmd } from "../spawner";

// const stringToHex = (str) => {
//   let hex = '';
//   for (let i = 0; i < str.length; i++) {
//     const charCode = str.charCodeAt(i);
//     const hexValue = charCode.toString(16);

//     // Pad with zeros to ensure two-digit representation
//     hex += hexValue.padStart(2, '0');
//   }
//   return hex;
// };

// const hexToString = (hex) => {
//   let str = '';
//   for (let i = 0; i < hex.length; i += 2) {
//     const hexValue = hex.substring(i, i + 2);
//     const decimalValue = parseInt(hexValue, 16);
//     const x = String.fromCharCode(decimalValue);
//     str += x;
//   }
//   return str;
// };

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
  let x = JSON.parse(data.cmds);
  console.log(data, x);
  return new Promise((resolve, reject) => {
    bashCmd(data.name, x)
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