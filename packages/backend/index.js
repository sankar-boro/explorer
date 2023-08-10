const express = require('express')
var cors = require('cors')
// const pgp = require('pg-promise')(/* options */)

const { insertKeys } = require("./insertKeys");
const { listenOpenPorts } = require("./openPorts");
const { programExists } = require("./utils");

const app = express()
const port = 8000
// const db = pgp('postgres://sankar:sankar@localhost:5432/sankar')

app.use(cors())
app.get('/', async (req, res) => {
  res.send('Hello World!')
})

app.get('/insertParaKeys', async (req, res) => {
  const d = await insertKeys();
  res.send(d)
})

app.get('/openPorts', async (req, res) => {
  const d = await listenOpenPorts();
  res.json({data: `${d}`})
})

app.get('/programExists', async (req, res) => {
  const d = await programExists();
  res.send(`${d}`)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})