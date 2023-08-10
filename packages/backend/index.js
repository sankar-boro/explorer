const express = require('express')
var cors = require('cors')
const { insertKeys } = require("./insertKeys");
const { listenOpenPorts } = require("./openPorts");

const app = express()
const port = 8000

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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})