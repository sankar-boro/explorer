const { spawn } = require('node:child_process')

function bashCmd(cmds) {
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

function pipeBashCmd() {
  let allspawns = [];
  cmds.forEach((d) => {
    allspawns.push(spawn(d.cmd, d.args));
  })

  for (let i=0; i < allspawns.length; i++) {
    allspawns[i].stdout.on('data', (data) => {
      console.log(`${data}`)
      if (allspawns[i + 1]) {
        allspawns[i + 1].stdin.write(data);
      }
    });
    
    allspawns[i].stderr.on('data', (data) => {
      console.error(`ps stderr: ${data}`);
    });
    
    allspawns[i].on('close', (code) => {
      if (code !== 0) {
        console.log(`ps process exited with code ${code}`);
      }
      if (allspawns[i + 1]) {
        allspawns[i + 1].stdin.end();
      }
    });
  }
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
