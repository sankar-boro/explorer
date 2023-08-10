const pgp = require('pg-promise')(/* options */)
const db = pgp('postgres://sankar:sankar@localhost:5432/sankar')

async function run() {
  let __data;
  await db.none('INSERT INTO users(userid, fname, lname, email, pwd) VALUES(${id}, $<name.fname>, $/lname/, ${email}, $/pwd/)', {
      id: 1,
      name: { fname: "Sankar", lname: "Boro"},
      fname: "Sankar",
      lname: "Boro",
      email: "sankar.boro@yahoo.com",
      pwd: "sankar"
  });

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