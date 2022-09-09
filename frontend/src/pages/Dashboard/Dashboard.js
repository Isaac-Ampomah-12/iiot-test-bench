import "./Dashboard.css";
import Broker from "../../components/Broker/Broker";
import Publisher from "../../components/Publisher/Publisher";
import Subscriber from "../../components/Subscriber/Subscriber";

function Dashboard() {
  return (
    <div id="Dashboard" className="container">
      <h1>IIoT Test Bench</h1>
      <Broker />
      <Publisher />
      <Subscriber />
    </div>
  );
}

export default Dashboard;
