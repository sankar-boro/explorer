/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";

const usePgCommands = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/getPostgressCmd")
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      setData(res.data)
    })
  }, []);
  return data;
}

type Cmds = {
  id: number;
  name: string;
  cmds: string;
  label: string;
}

const Main = () => {
  const data = usePgCommands();

  const [insertName, setInsertName] = useState("");
  const [insertCmd, setInsertCmd] = useState("");
  const [insertLabel, setInsertLabel] = useState("");

  const runCmd = (cmds: string) => {
    fetch("http://localhost:8000/runLinuxCmd", {
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
      body: JSON.stringify({cmds}), // body data type must match "Content-Type" header
    });
  }

  const submitPgCmd = () => {
    fetch("http://localhost:8000/addPostgressCmd", {
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
      body: JSON.stringify({label: insertLabel, name: insertName, cmds: JSON.stringify(insertCmd), body: ""}), // body data type must match "Content-Type" header
    });
  }

  const deleteCmd = (id: any) => {
    fetch("http://localhost:8000/deletePostgressCmd", {
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
      body: JSON.stringify({ id }), // body data type must match "Content-Type" header
    });
  }

  return (
		<div style={{ width: "75%", marginLeft: "auto", marginRight: "auto" }}>
      <h2>Zeeve</h2>
      <div>
        <div>
          <div>Insert commands</div>
          <div>
            <label>Label</label>
            <input onChange={(e) => { setInsertLabel(e.target.value) }} value={insertLabel} />
          </div>
          <div>
            <label>Cmd Name</label>
            <input onChange={(e) => { setInsertName(e.target.value) }} value={insertName} />
          </div>
          <div>
            <label>Value</label>
            <input onChange={(e) => { setInsertCmd(e.target.value) }} value={insertCmd} />
          </div>
          <button onClick={() => { submitPgCmd() }}>Submit</button>
        </div>

        <hr />
        <div>Commands</div>
        {data.map((cmds: Cmds) => {
          return <div>
            <hr />
            <div>
              <span className="label">{cmds.label}</span> <span className="cmd">{cmds.name} {cmds.cmds}</span>
              <div style={{ whiteSpace: "pre-wrap" }}><pre>Response goes here</pre></div>
              <button onClick={() => { runCmd(cmds.cmds) }}>
                Run
              </button>
              <button>
                Clear
              </button>
              <button onClick={() => { deleteCmd(cmds.id) }}>
                Delete
              </button>
            </div>
          </div>
        })}
      </div>
    </div>
  );
};

export default Main;