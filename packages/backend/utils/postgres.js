const insertPg = async (data, db) => {
  await db.none('INSERT INTO linuxcmds(id, name, cmds) VALUES(${id}, $/name/, $/cmds/)', data);
  return "insert"
}

const getPg = async (db) => {
  return await db.any('SELECT * FROM linuxcmds')
}

module.exports = {
  insertPg,
  getPg
}