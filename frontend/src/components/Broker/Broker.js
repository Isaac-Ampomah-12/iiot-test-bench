import "./Broker.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getPubSubStats } from "../../app/slices/pubSubSlice";

function Broker() { 
  const connection = useSelector(state => state.broker.connection);
  // const messages = useSelector(state => state.broker.stats.messages);
  // const network = useSelector(state => state.broker.stats.network);
  // const performance = useSelector(state => state.broker.stats.performance);
  const brokerSettings = useSelector(state => state.broker.settings);
  const pubSubSettings = useSelector(state => state.pubsub.settings);
  const dispatch = useDispatch();
  
  function start() {
    dispatch(getPubSubStats(pubSubSettings));
  }

  return (
    <section id="Broker">
      <h2>Broker</h2>
      <div className="row">
        <div className="four columns">
          <h3>Connection</h3>
          <div className="info">
            <div className="info-item">
              <span>
                <strong>Name:</strong>
              </span>
              <span>{brokerSettings.clientName || "Test Bench"}</span>
            </div>
            {/* <div className="info-item">
              <span>
                <strong>Port:</strong>
              </span>
              <span>{settings.port}</span>
            </div> */}
            <div className="info-item">
              <span>
                <strong>Status:</strong>
              </span>
              <span style={{ color: connection.color }}>{connection.msg}</span>
            </div>
          </div>
        </div>
        <div className="three columns">
          <h3>Messages</h3>
          <div className="info">
            <div className="info-item">
              <span>
                <strong>Sent:</strong>
              </span>
              <span>{0}</span>
            </div>
            <div className="info-item">
              <span>
                <strong>Received:</strong>
              </span>
              <span>{0}</span>
            </div>
          </div>
        </div>
        <div className="two columns">
          <h3>Network</h3>
          <div className="info">
            <div className="info-item">
              <span>
                <strong>Uplink:</strong>
              </span>
              <span>{0}</span>
            </div>
            <div className="info-item">
              <span>
                <strong>Downlink:</strong>
              </span>
              <span>{0}</span>
            </div>
          </div>
        </div>
        <div className="two columns">
          <h3>Performance</h3>
          <div className="info">
            <div className="info-item">
              <span>
                <strong>CPU:</strong>
              </span>
              <span>{0}</span>
            </div>
            <div className="info-item">
              <span>
                <strong>Memory:</strong>
              </span>
              <span>{0}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="buttons">
        <button
          type="button"
          className="button-primary"
          onClick={start()}
        >
          Start
        </button>
        {/* {connection.status ? (
          <button
            type="button"
            style={{ backgroundColor: "#F70D1A", color: "white" }}
            onClick={() => stop()}
          >
            Stop
          </button>
        ) : (
          <button
            type="button"
            className="button-primary"
            onClick={() => start()}
          >
            Start
          </button>
        )} */}
        <Link to="/settings" className="button">
          Settings
        </Link>
      </div>
    </section>
  );
}

export default Broker;