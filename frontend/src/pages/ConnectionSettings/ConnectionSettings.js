import "./ConnectionSettings.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveSettings, connectBroker } from "../../app/slices/brokerSlice";
// import { genClientId } from "../../util";

function ConnectionSettings() {

  // const connection = useSelector((state) => state.broker.connection);
  // console.log(connection.status);
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  const settings = useSelector(state => state.broker.settings);

  let hostUrl = '';
  if (settings.protocol && settings.host) {
    hostUrl = settings.protocol + '://' + settings.host;
  }

  function handleSubmit (e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const settings = {};
    for (const entry of formData.entries()) {
      const [name, value] = entry;
      if (name === "host-address") {
        const hostAddress = value.split("://");
        settings.protocol = hostAddress[0];
        settings.host = hostAddress[1];
        continue;
      }
      if (name === 'port' && value !=='') {
        settings.port = Number(value);
        continue;
      }
      // if (name === "clean") {
        //   value === "on" && (settings[name] = true);
        //   continue;
        // }
        settings[name] = value;
      }
    // if (!settings.clean) settings.clean = false;
    dispatch(saveSettings(settings));
    alert('Connection settings saved!');
    navigate('/');
  }
  return (
    <div className="container">
      <section id="Connect-settings">
        <h2>Connection settings</h2>
        <form onSubmit={handleSubmit}>
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
          <div className="row">
            <button type="submit" className="button-primary u-full-width">
              Connect
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default ConnectionSettings;
