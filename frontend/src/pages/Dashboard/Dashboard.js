import "./Dashboard.css";
import BrokerMetrics from "../../components/Broker/BrokerMetrics/BrokerMetrics";

function Dashboard() {
  return (
    <div id="Dashboard" className="container">
      <h1>IIoT Test Bench</h1>
      <BrokerMetrics />
    </div>
  );
}

export default Dashboard;
