export const getOpenPorts = (setOpenPorts: any) => {
  fetch("http://localhost:8000/openPorts")
  .then((res) => res.json())
  .then((res) => {
    console.log(res.data)
    setOpenPorts(res.data)
  })
  .catch((err) => {
    setOpenPorts(JSON.stringify(err))
  });
}