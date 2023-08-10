const Main = () => {
  return (
		<div>
      <h2>Zeeve</h2>
      <div>
        <div>Commands</div>
        <hr />
        <div>
          <span style={{ color: "blueviolet" }}>Get open ports</span> <span>lsof -i -P -n | grep LISTEN</span>
          <div><code>res</code></div>
          <button>
            Get
          </button>
        </div>
        <hr />
        <div>
          <span style={{ color: "blueviolet" }}>Insert parachain session keys</span> <span>author_insertKey</span>
          <div><code>res</code></div>
          <button>
            Get
          </button>
        </div>
      </div>
    </div>
  );
};

export default Main;