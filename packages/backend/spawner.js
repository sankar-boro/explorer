const { spawn } = require('node:child_process')

function bashCmd(program, cmds) {
  return new Promise((resolve, reject) => {
    let cmd = spawn(program, cmds);
    cmd.stdout.on('data', (data) => {
      resolve(data)
    })
    cmd.on('close', (data) => {
      resolve(data)
    })
    cmd.on('error', (data) => {
      reject(data)
    })
  })
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

module.exports = {
  bashCmd,
  pipeBashCmd
}
