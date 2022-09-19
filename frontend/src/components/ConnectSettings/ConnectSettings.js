import { Link } from "react-router-dom";

function ConnectSettings({
  handleSave,
  connect,
  connection,
  settings,
  hostUrl,
}) {
  return (
    <section id="Connect-settings">
      <h2>Connection Settings</h2>
      <div
        style={{backgroundColor: connection.color}}
        id="message"
      >
        <p>{connection.message}</p>
      </div>
      <form onSubmit={handleSave}>
        <div className="row">
          {/* <div className="six columns">
              <label htmlFor="name">Client Name:</label>
              <input
                type="text"
                id="client-name"
                className="u-full-width"
                name="clientName"
                placeholder="Enter short name for client"
                required
                defaultValue={settings.clientName}
              />
            </div> */}
          {/* <div className="six columns">
              <label htmlFor="client-id">Client ID:</label>
              <input
                type="text"
                id="client-id"
                className="u-full-width"
                name="clientId"
                required
                defaultValue={settings.clientId || genClientId(16)}
              />
            </div> */}
        </div>
        <div className="row">
          <div className="ten columns">
            <label htmlFor="host">Host Address:</label>
            <input
              type="url"
              id="host-address"
              className="u-full-width"
              name="host-address"
              placeholder="E.g. mqtt://broker.hivemq.com"
              required
              defaultValue={hostUrl}
            />
          </div>
          <div className="two columns">
            <label htmlFor="port">Port:</label>
            <input
              type="number"
              id="port"
              className="u-full-width"
              name="port"
              min="0"
              placeholder="0"
              required
              defaultValue={settings.port}
            />
          </div>
        </div>
        <div className="row">
          <div className="six columns">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              className="u-full-width"
              name="username"
              placeholder="Enter connection username"
              defaultValue={settings.username}
            />
          </div>
          <div className="six columns">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              className="u-full-width"
              name="password"
              placeholder="Enter connection password"
              defaultValue={settings.password}
            />
          </div>
        </div>
        {/* <div className="row">
            <div className="three columns">
              <label htmlFor="clean-session">Clean Session: </label>
              <input type="checkbox" id="clean-session" name="clean" checked/>
            </div>
          </div> */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            columnGap: "1rem",
            marginTop: "1rem",
          }}
        >
          <button type="submit" className="button-primary">
            Save settings
          </button>
          <button type="button" className="button" onClick={connect}>
            Connect to broker
          </button>
        </div>
        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <Link to="/">&#60;&#60; Back to dashboard</Link>
        </div>
      </form>
    </section>
  );
}

export default ConnectSettings;
