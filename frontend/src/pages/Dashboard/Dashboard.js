import "./Dashboard.css";
import BrokerMetrics from "../../components/Broker/BrokerMetrics/BrokerMetrics";
import Publisher from "../../components/Publisher/Publisher";
import Subscriber from "../../components/Subscriber/Subscriber";

function Dashboard() {
  return (
    <div id="Dashboard" className="container">
      <h1>IIoT Test Bench</h1>
      <BrokerMetrics />
      <Publisher />
      <Subscriber />
    </div>
  );
}

export default Dashboard;
