const { insertKeys } = require("./insert_keys");
const express = require('express')
const app = express()
const port = 3000

app.get('/', async (req, res) => {
  const d = await insertKeys();
  res.send(d)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})