const pgp = require('pg-promise')(/* options */)
const db = pgp('postgres://sankar:sankar@localhost:5432/sankar')

async function run() {
  let __data;

  await db.any('SELECT * FROM users')
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