const { insertKeys } = require("./insertKeys");
const { listenOpenPorts } = require("./openPorts");

const express = require('express')
const app = express()
const port = 3000

app.get('/', async (req, res) => {
  res.send('Hello World!')
})

app.get('/insertParaKeys', async (req, res) => {
  const d = await insertKeys();
  res.send(d)
})

app.get('/openPorts', async (req, res) => {
  const d = await listenOpenPorts();
  res.send(d)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})