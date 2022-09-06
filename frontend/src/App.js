import "./css/normalize.css";
import "./css/skeleton.css";
import "./css/App.css";

import Dashboard from "./pages/Dashboard/Dashboard";
// import ConnectionSettings from "./pages/ConnectionSettings/ConnectionSettings";

function App() {
  return (
    <main className="u-max-full-width">
      <Dashboard />
      {/* <ConnectionSettings /> */}
    </main>
  );
}

export default App;
