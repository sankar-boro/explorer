const express = require('express')
var cors = require('cors')
const bodyParser = require('body-parser')
const pgp = require('pg-promise')(/* options */)

const { insertKeys } = require("./insertKeys");
const { listenOpenPorts } = require("./openPorts");
const { programExists, insertPg, getPg, runLinuxCmd, deletePg } = require("./utils");

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const port = 8000
const db = pgp('postgres://sankar:sankar@localhost:5432/sankar')

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

app.post('/addPostgressCmd', async (req, res) => {
  let data = req.body;
  const d = await insertPg(data, db);
  res.send(d);
})

app.get('/getPostgressCmd', async (req, res) => {
  const d = await getPg(db);
  res.json({ data: d });
})

app.post('/deletePostgressCmd', async (req, res) => {
  const d = await deletePg(req.body, db);
  res.json({ data: d });
})

app.post('/runLinuxCmd', async (req, res) => {
  let data = req.body;
  const d = await runLinuxCmd(data);
  res.json({ data: d });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
