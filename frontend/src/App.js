import "./css/normalize.css";
import "./css/skeleton.css";

import Dashboard from "./pages/Dashboard/Dashboard";
import ConnectionSettings from "./pages/ConnectionSettings/ConnectionSettings";

function App() {
  return (
    <div>
      <Dashboard />
      <ConnectionSettings />
    </div>
  );
}

export default App;
