import "./ConnectionSettings.css";

function ConnectionSettings() {
  return (
    <div className="container">
      <section id="Connect-settings">
        <h2>Connection settings</h2>
        <form>
          <div className="row">
            <div className="five columns">
              <label htmlhtmlFor="host">Host:</label>
              <input
                type="url"
                id="host"
                className="u-full-width"
                placeholder="E.g. mqtt://broker.hostname.com"
                required
                autofocus
              />
            </div>
            <div className="two columns">
              <label htmlhtmlFor="port">Port:</label>
              <input
                type="number"
                id="port"
                className="u-full-width"
                min="0"
                value="1883"
                required
              />
            </div>
            <div className="five columns">
              <label htmlhtmlFor="port">Client ID:</label>
              <input
                type="text"
                id="client-id"
                className="u-full-width"
                value="clientId-XXXXXXXXXX"
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="six columns">
              <label htmlFor="username">Username:</label>
              <input type="text" id="username" className="u-full-width" />
            </div>
            <div className="six columns">
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" className="u-full-width" />
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}

export default ConnectionSettings;
