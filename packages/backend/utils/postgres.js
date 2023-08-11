const insertPg = async (data, db) => {
  await db.none('INSERT INTO linuxcmds(name, cmds, label, body) VALUES($/name/, $/cmds/, $/label/, $/body/)', data);
  return "insert"
}

const getPg = async (db) => {
  return await db.any('SELECT * FROM linuxcmds')
}

const deletePg = async (data, db) => {
  return await db.one('DELETE FROM linuxcmds WHERE id = $1 RETURNING *', data.id)
}

module.exports = {
  insertPg,
  getPg,
  deletePg
}