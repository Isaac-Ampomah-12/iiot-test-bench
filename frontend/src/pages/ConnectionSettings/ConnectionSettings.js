import "./ConnectionSettings.css";

function ConnectionSettings() {
  return (
    <div className="container">
      <section id="Connect-settings">
        <h2>Connection settings</h2>
        <form>
          <div className="row">
            <div className="six columns">
              <label htmlhtmlFor="name">Client Name:</label>
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
              <label htmlhtmlFor="client-id">Client ID:</label>
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
              <label htmlhtmlFor="host">Host Address:</label>
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
          </div>
          <div className="row">
            <div className="six columns">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                className="u-full-width"
                placeholder="Enter connection username"
              />
            </div>
            <div className="six columns">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                className="u-full-width"
                placeholder="Enter connection password"
              />
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
