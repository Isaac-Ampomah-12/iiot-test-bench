import "./ConnectionSettings.css";

function ConnectionSettings() {
  return (
    <div className="container">
      <section id="Connect-settings">
        <h2>Connection settings</h2>
        <form>
          <div className="row">
            <div className="six columns">
              <label htmlhtmlhtmlFor="name">Client Name:</label>
              <input
                type="text"
                id="client-name"
                className="u-full-width"
                name="clientName"
                placeholder="Enter name for client"
                required
              />
            </div>
            <div className="six columns">
              <label htmlhtmlhtmlFor="client-id">Client ID:</label>
              <input
                type="text"
                id="client-id"
                className="u-full-width"
                name="clientId"
                value="testId-XXXXXXXXXXXXXXXXXXXX"
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="ten columns">
              <label htmlhtmlhtmlFor="host">Host Address:</label>
              <input
                type="text"
                id="host"
                className="u-full-width"
                name="host"
                placeholder="E.g. mqtt://broker.hivemq.com"
                required
              />
            </div>
            <div className="two columns">
              <label htmlhtmlhtmlFor="port">Port:</label>
              <input
                type="number"
                id="port"
                className="u-full-width"
                min="0"
                value="1883"
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="six columns">
              <label htmlhtmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                className="u-full-width"
                placeholder="Enter connection username"
              />
            </div>
            <div className="six columns">
              <label htmlhtmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                className="u-full-width"
                placeholder="Enter connection password"
              />
            </div>
          </div>
          <div className="row">
            <div className="three columns">
              <label htmlFor="keep-alive">Keep Alive &#40;s&#41;:</label>
              <input
                type="number"
                id="keep-alive"
                className="u-full-width"
                name="keepalive"
                value="10"
                min="0"
              />
            </div>
            <div className="three columns">
              <label htmlFor="connect-timeout">Connect Timeout &#40;s&#41;:</label>
              <input
                type="number"
                id="connect-timeout"
                className="u-full-width"
                name="connectTimeout"
                value="60"
                min="0"
              />
            </div>
            <div className="three columns">
              <label htmlFor="clean-session">Clean Session:</label>
              <input type="checkbox" id="clean-session" name="clean" />
            </div>
          </div>
          <div className="row">
            <button type="submit" className="button-primary u-full-width">
              Save
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default ConnectionSettings;
