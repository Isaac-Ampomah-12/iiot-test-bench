import "./ConnectionSettings.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { saveSettings, connectBroker} from "../../app/slices/brokerSlice";
import { sendPubSubTest } from "../../app/slices/pubSubSlice";
// import { genClientId } from "../../util";
import ConnectSettings from "../../components/ConnectSettings/ConnectSettings";
import PubSub from "../../components/PubSub/PubSub";

function ConnectionSettings() {

  const dispatch = useDispatch();
  const connection = useSelector((state) => state.broker.connection);
  const settings = useSelector(state => state.broker.settings);
  const [isSending, setIsSending] = useState(false);

  let hostUrl = '';
  if (settings.protocol && settings.host) {
    hostUrl = settings.protocol + '://' + settings.host;
  }

  function handleSave (e) {
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
    alert('Settings saved!');
  }

  function getConnect() {
    if (Object.keys(settings).length === 0) {
      alert('No connection settings');
    } else {
      dispatch(connectBroker(settings));
    }
  }

  function handlePubSubTest(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const publish = {};
    for (const entry of formData.entries()) {
      const [name, value] = entry;
      publish[name] = value;
    }
    dispatch(sendPubSubTest(publish));
  }

  return (
    <div className="container">
      <ConnectSettings
        handleSave={handleSave}
        getConnect={getConnect}
        connection={connection}
        settings={settings}
        hostUrl={hostUrl}
      />
      <PubSub 
        handlePubSubTest={handlePubSubTest}
        isSending={isSending}
      />
    </div>
  );
}

export default ConnectionSettings;
