import Header from "./components/Header";
import Latest from "./components/Latest";
import Past from "./components/Past";
import Future from "./components/Future";
import { Routes, Route } from "react-router-dom";

function App() {
  const launchEndpoint = "https://api.spacexdata.com/v5/launches/";
  const crewEndpoint = "https://api.spacexdata.com/v4/crew";
  return (
    <div className="p-8">
      <Header />
      <main className="mt-12">
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Latest
                launchEndpoint={launchEndpoint}
                crewEndpoint={crewEndpoint}
              />
            }
          />
          <Route
            path="/past"
            element={<Past launchEndpoint={launchEndpoint} />}
          />
          <Route
            path="/future"
            element={<Future launchEndpoint={launchEndpoint} />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
