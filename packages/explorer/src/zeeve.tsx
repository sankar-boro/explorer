/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { fetchQueryGet, fetchQueryPost } from "./query";
import { hexToString, stringToHex } from "./utils";

const usePgCommands = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/getPostgressCmd")
    .then((res) => res.json())
    .then((res) => {
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

  const [response, setResponse] = useState("");
  const [insertName, setInsertName] = useState("");
  const [insertCmd, setInsertCmd] = useState("");
  const [insertLabel, setInsertLabel] = useState("");

  const runCmd = (name: string, cmds: string) => {
    fetchQueryPost('runLinuxCmd', { name, cmds: hexToString(cmds) })
    .then((res: any) => {
      // console.log(JSON.stringify(res))
      setResponse(res.data);
    })
  }

  const submitPgCmd = () => {
    fetchQueryPost(
      'addPostgressCmd',
      {label: insertLabel, name: insertName, cmds: stringToHex(insertCmd), body: ""}
    )
  }

  const deleteCmd = (id: any) => {
    fetchQueryPost(
      'deletePostgressCmd',
      { id }
    )
  }

  return (
		<div style={{ width: "75%", marginLeft: "auto", marginRight: "auto" }}>
      <h2>Zeeve</h2>
      <div>
        <div style={{ display: "flex "}}>
          <div style={{ flex: 1 }}>
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
          <div style={{ flex: 1 }}>
            <div style={{ whiteSpace: "pre-wrap" }}><pre>{response}</pre></div>
          </div>
        </div>

        <hr />
        <div>Commands</div>
        {data && Array.isArray(data) && data.map((cmds: Cmds) => {
          return <div key={cmds.id}>
            <hr />
            <div>
              <span className="label">{cmds.label}</span> <span className="cmd">{cmds.name} {hexToString(cmds.cmds)}</span>
              <button onClick={() => { runCmd(cmds.name, cmds.cmds) }}>
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

exportdefault Main;