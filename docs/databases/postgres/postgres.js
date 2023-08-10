const pgp = require('pg-promise')(/* options */)
const db = pgp('postgres://sankar:sankar@localhost:5432/sankar')

async function run() {
  let __data;
  await db.none('INSERT INTO linuxcmds(id, name, cmds) VALUES(${id}, $/name/, $/cmds/)', {
      id: 1,
      name: "ls",
      cmds: JSON.stringify(["-la"])
  });

  await db.any('SELECT * FROM linuxcmds')
    .then((data) => {
      __data = data;
    })
    .catch((error) => {
      console.log('ERROR:', error)
    })

  return __data;
}

run()
.then((res) => {
  console.log(res);
})