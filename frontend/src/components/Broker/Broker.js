import "./Broker.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Broker() { 
  const connection = useSelector(state => state.broker.connection);
  const messages = useSelector(state => state.broker.stats.messages);
  const network = useSelector(state => state.broker.stats.network);
  const performance = useSelector(state => state.broker.stats.performance);

    return (
      <section id="Broker">
        <h2>Broker</h2>
        <div className="row">
          <div className="four columns">
            <h3>Connection</h3>
            <div className="info">
              <div className="info-item">
                <span>
                  <strong>Host:</strong>
                </span>
                <span>broker.hivemq.com</span>
              </div>
              <div className="info-item">
                <span>
                  <strong>Port:</strong>
                </span>
                <span>8080</span>
              </div>
              <div className="info-item">
                <span>
                  <strong>Status:</strong>
                </span>
                <span style={{ color: connection.color }}>
                  {connection.msg}
                </span>
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
                <span>{messages.sent}</span>
              </div>
              <div className="info-item">
                <span>
                  <strong>Received:</strong>
                </span>
                <span>{messages.received}</span>
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
                <span>{network.uplink}</span>
              </div>
              <div className="info-item">
                <span>
                  <strong>Downlink:</strong>
                </span>
                <span>{network.downlink}</span>
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
                <span>{performance.cpu}</span>
              </div>
              <div className="info-item">
                <span>
                  <strong>Memory:</strong>
                </span>
                <span>{performance.memory}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="buttons">
          {connection.status ? (
            <button
              type="button"
              style={{ backgroundColor: "#F70D1A", color: "white" }}
            >
              Disconnect
            </button>
          ) : (
            <button type="button" className="button-primary">
              Connect
            </button>
          )}
          <Link to="/settings" className="button">
            Settings
          </Link>
        </div>
      </section>
    );
}

export default Broker;