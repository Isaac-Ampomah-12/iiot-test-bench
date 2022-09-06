import "./ConnectionSettings.css";

function ConnectionSettings() {
  return (
    <div className="container">
      <section id="Connect-settings">
        <h2>Connection settings</h2>
        <form>
          <div className="row">
            <div className="five columns">
              <label htmlFor="host">Host:</label>
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
              <label htmlFor="port">Port:</label>
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
              <label htmlFor="port">Client ID:</label>
              <input
                type="text"
                id="client-id"
                className="u-full-width"
                value="clientId-XXXXXXXXXX"
                required
              />
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}

export default ConnectionSettings;
