// import { spawner } from "./spawner"

const seed =
  'daughter peasant twelve bless century neglect title mouse habit plate galaxy ticket'

// sr25519, ed25519, ecdsa
const allKeys = [
  { scheme: 'sr25519', keyType: 'aura', short: 'aura' },
  { scheme: 'sr25519', keyType: 'babe', short: 'babe' },
  { scheme: 'ed25519', keyType: 'grandpa', short: 'gran' },
  { scheme: 'sr25519', keyType: 'im_online', short: 'imon' },
  { scheme: 'sr25519', keyType: 'para_validator', short: 'para' },
  { scheme: 'sr25519', keyType: 'para_assignment', short: 'asgn' },
  { scheme: 'sr25519', keyType: 'authority_discovery', short: 'audi' },
  { scheme: 'ecdsa', keyType: 'beefy', short: 'beef' },
]

function generateSpecificAddress(schemeType) {
  return bashCmd('subkey', [
    'inspect',
    '--scheme',
    schemeType,
    seed,
  ]);
}

async function generateAddress() {
  const p1 = generateSpecificAddress('sr25519')
  const p2 = generateSpecificAddress('ed25519')
  const p3 = generateSpecificAddress('ecdsa')

  return Promise.all([p1, p2, p3])
}

function sendCurlRequest(name, suri, publicHexKey, port) {
  const d = `{ "jsonrpc":"2.0", "method":"author_insertKey", "params":["${name}", "${suri}", "${publicHexKey}"],"id":1 }`
  return bashCmd('curl', [
    '-H',
    'Content-Type: application/json',
    '--data',
    d,
    `http://localhost:${port}`,
  ]);
}

const ports = [9004]

async function insertKeys() {
  const address = await generateAddress()
  const mappedValues = address.map((r) => `${r}`)
  const filteredValues = mappedValues.map((d) => {
    const x = d
      .split('\n')
      .filter((f, i) => i > 1 && i < 7)
      .map((m) => {
        const s = m.split(' ')
        return s[s.length - 1]
      })
    return {
      secretSeed: x[0],
      publicKeyHex: x[1],
      accountId: x[2],
      publicKeySS58: x[3],
      ss58Address: x[4],
    }
  })

  let allpromises = []

  for (const port of ports) {
    for (const thiskey of allKeys) {
      if (thiskey.scheme === 'sr25519') {
        let x = sendCurlRequest(
          thiskey.short,
          seed,
          filteredValues[0].publicKeyHex,
          port
        )
        allpromises.push(x)
      }
      if (thiskey.scheme === 'ed25519') {
        let x = sendCurlRequest(
          thiskey.short,
          seed,
          filteredValues[1].publicKeyHex,
          port
        )
        allpromises.push(x)
      }
      if (thiskey.scheme === 'ecdsa') {
        let x = sendCurlRequest(
          thiskey.short,
          seed,
          filteredValues[2].publicKeyHex,
          port
        )
        allpromises.push(x)
      }
    }
  }

  return new Promise((resolve, reject) => {
    Promise.all(allpromises)
      .then((res) => {
        if (res.length === 8) {
          resolve(`inserted ${res.length} keys`)
        } else {
          reject(`failed with ${allKeys - res.length}`)
        }
      })
      .catch((res) => {
        reject(`failed ${JSON.stringify(res)}`)
      })
  })
}

export {
  insertKeys,
}

// curl -H 'Content-Type: application/json' --data '{ "jsonrpc":"2.0", "method":"author_insertKey", "params":["aura", "daughter peasant twelve bless century neglect title mouse habit plate galaxy ticket//2//aura", "0xb46f4dc3ade8c29e2e9cf838db61f2da2e0db79df3c5de8698d58c2ccff59137"],"id":1 }' http://localhost:9008
