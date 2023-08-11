import { spawn } from 'node:child_process'

const hexToString = (hex) => {
  let str = '';
  for (let i = 0; i < hex.length; i += 2) {
    const hexValue = hex.substring(i, i + 2);
    const decimalValue = parseInt(hexValue, 16);
    const x = String.fromCharCode(decimalValue);
    str += x;
  }
  return str;
};

function bashCmd(ss) {
  const data = hexToString(ss.cmds);
  let allCommands = [];

  const splitData = data.split("|");
  const splitDataMulti = splitData.map((r) => {
    return r.split(" ");
  })
  .map((r) => {
    return r.filter((x) => x != "")
  })

  splitDataMulti.forEach((x, j) => {
    if (x.length > 1) {
      allCommands[j] = { cmd: x[0], args: [] }
      for (let i=1; i < x.length; i++) {
        allCommands[j].args.push(x[i]);
      }
    }
  })

  return pipeBashCmd(allCommands)
}

function pipeBashCmd(cmds) {
  let allspawns = [];
  cmds.forEach((d, id) => {
    allspawns.push({fn: spawn(d.cmd, d.args), id });
  })

  return new Promise((resolve, reject) => {
    for (let i=0; i < allspawns.length; i++) {
      allspawns[i].fn.stdout.on('data', (data) => {
        if (i === allspawns.length - 1) {
          resolve(data)
        }
        if (allspawns[i + 1]) {
          allspawns[i + 1].fn.stdin.write(data);
        }
      });
      
      allspawns[i].fn.on('error', (data) => {
        reject(data)
      });
      
      allspawns[i].fn.on('close', (code) => {
        if (code !== 0) {
          reject(`ps process exited with code ${code}`)
        }
        if (allspawns[i + 1]) {
          allspawns[i + 1].fn.stdin.end();
        }
      });
    }
  })
}

// pipeBashCmd([
//   {
//     cmd: 'lsof',
//     args: ['-i', '-P', '-n']
//   },
//   {
//     cmd: 'grep',
//     args: ['LISTEN']
//   }
// ])

export {
  bashCmd,
  pipeBashCmd
}
