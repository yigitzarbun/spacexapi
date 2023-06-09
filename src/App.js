import Header from "./components/Header";
import Latest from "./components/Latest";
import Past from "./components/Past";
import Future from "./components/Future";
import LaunchPhotos from "./components/LaunchPhotos";
import All from "./components/All";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const launchEndpoint = "https://api.spacexdata.com/v5/launches/";
  const [crew, setCrew] = useState([]);
  useEffect(() => {
    axios
      .get("https://api.spacexdata.com/v4/crew")
      .then((res) => setCrew(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="p-8 md:px-2">
      <Header />
      <main className="mt-12">
        <Routes>
          <Route
            exact
            path="/"
            element={<Latest launchEndpoint={launchEndpoint} crew={crew} />}
          />
          <Route
            path="/past"
            element={<Past launchEndpoint={launchEndpoint} crew={crew} />}
          />
          <Route
            path="/future"
            element={<Future launchEndpoint={launchEndpoint} crew={crew} />}
          />
          <Route path="/:launch_id" element={<LaunchPhotos />} />
          <Route
            path="/all"
            element={<All launchEndpoint={launchEndpoint} crew={crew} />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
