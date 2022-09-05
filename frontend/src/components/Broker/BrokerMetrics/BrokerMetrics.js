import "./BrokerMetrics.css";

function BrokerMetrics() { 
    return (
      <section id="Broker">
        <h2>Broker</h2>
        <div className="row">
          <div className="four columns">
            <h3>Connection</h3>
            <div className="info">
              <div>
                <span>
                  <strong>Host: </strong>
                </span>
                <span>broker.hivemq.com</span>
              </div>
              <div>
                <span>
                  <strong>Port: </strong>
                </span>
                <span>8080</span>
              </div>
              <div>
                <span>
                  <strong>Status: </strong>
                </span>
                <span>Disconnected</span>
              </div>
            </div>
          </div>
          <div className="three columns">
            <h3>Messages</h3>
            <div class="info">
              <div>
                <span>
                  <strong>Sent: </strong>
                </span>
                <span>0</span>
              </div>
              <div>
                <span>
                  <strong>Received: </strong>
                </span>
                <span>0</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
}

export default BrokerMetrics;