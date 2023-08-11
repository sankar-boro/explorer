export const getOpenPorts = (setOpenPorts: any) => {
  fetch("http://localhost:8000/openPorts")
  .then((res) => res.json())
  .then((res) => {
    setOpenPorts(res.data)
  })
  .catch((err) => {
    setOpenPorts(JSON.stringify(err))
  });
}

export const fetchQueryGet = (url: string, body: any) => {
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:8000/${url}`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(body), // body data type must match "Content-Type" header
    })
    .then((res) => res.json())
    .then((res) => { resolve(res)})
    .catch((err) => {
      reject(err)
    });
  })
}

export const fetchQueryPost = (url: string, body: any) => {
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:8000/${url}`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(body), // body data type must match "Content-Type" header
    })
    .then((res) => res.json())
    .then((res) => {
      resolve(res);
    })
    .catch((err) => {
      reject(err)
    });
  })
}