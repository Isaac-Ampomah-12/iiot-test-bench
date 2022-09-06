import "./css/normalize.css";
import "./css/skeleton.css";
import "./css/App.css";
import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard/Dashboard";
import ConnectionSettings from "./pages/ConnectionSettings/ConnectionSettings";

function App() {
  return (
    <main className="u-max-full-width">
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route exact path="/settings" element={<ConnectionSettings />} />
      </Routes>
    </main>
  );
}

export default App;
