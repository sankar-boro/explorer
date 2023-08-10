import { useState } from "react";
import { getOpenPorts } from "./query";

const Main = () => {
  const [openPorts, setOpenPorts] = useState<any>("");
  const [insertKey, setInsertKey] = useState<any>("");
  return (
		<div style={{ width: "75%", marginLeft: "auto", marginRight: "auto" }}>
      <h2>Zeeve</h2>
      <div>
        <div>Commands</div>
        <hr />
        <div>
          <span className="label">Get open ports</span> <span className="cmd">lsof -i -P -n | grep LISTEN</span>
          <div style={{ whiteSpace: "pre-wrap" }}><pre>{openPorts}</pre></div>
          <button onClick={() => { getOpenPorts(setOpenPorts) }}>
            Get
          </button>
          <button onClick={() => { setOpenPorts("") }}>
            Clear
          </button>
        </div>
        <hr />
        <div>
          <span className="label">Insert parachain session keys</span> <span className="cmd">author_insertKey</span>
          <div style={{ whiteSpace: "pre-wrap" }}><pre>{insertKey}</pre></div>
          <button onClick={() => { setInsertKey("") }}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Main;