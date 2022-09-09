import "./ConnectionSettings.css";
import { genClientId } from "../../util";

function ConnectionSettings() {
  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <div className="container">
      <section id="Connect-settings">
        <h2>Connection settings</h2>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="six columns">
              <label htmlFor="name">Client Name:</label>
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
              <label htmlFor="client-id">Client ID:</label>
              <input
                type="text"
                id="client-id"
                className="u-full-width"
                name="clientId"
                value={genClientId(16)}
                required
              />
            </div>
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
              />
            </div>
            <div className="two columns">
              <label htmlFor="port">Port:</label>
              <input
                type="number"
                id="port"
                className="u-full-width"
                min="0"
                defaultValue="1883"
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
                name="username"
                placeholder="Enter connection username"
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
              />
            </div>
          </div>
          <div className="row">
            <div className="three columns">
              <label htmlFor="clean-session">Clean Session: </label>
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
