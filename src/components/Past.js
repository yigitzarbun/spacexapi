import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

function Past(props) {
  const { launchEndpoint, crew } = props;
  const [past, setPast] = useState([]);
  let resultJsx = "";
  let date = null;
  let year = null;
  let month = null;
  let day = null;
  let crewMembers = [];
  if (past === null || crew === null) {
    resultJsx = "Loading..";
  } else if (past.length === 0) {
    resultJsx = (
      <div>
        <h2>No available launch information</h2>
      </div>
    );
  } else if (past && Array.isArray(past) && Array.isArray(crew) && crew) {
    for (let p = 0; p < past.length; p++) {
      date = date = new Date(past[p].date_utc);
      year = date.getUTCFullYear();
      month = date.getUTCMonth();
      day = date.getUTCDate();
      if (past[p]["crew"].length > 0) {
        for (let k = 0; k < past[p]["crew"].length; k++) {
          let member = crew.find((m) => m.id === past[p]["crew"][k]["crew"]);
          crewMembers.push({
            name: member.name,
            image: member.image,
            launches: member.launches.length,
            wikipedia: member.wikipedia,
            agency: member.agency,
            role: past[p]["crew"][k]["role"],
            member_id: member.id,
            launch_id: past[p]["id"],
          });
        }
      }
    }
    resultJsx = (
      <table className="text-left bg-slate-800 rounded-md p-4 mt-8">
        <thead>
          <tr>
            <th style={{ width: "10%" }}>Flight #</th>
            <th style={{ width: "10%" }}>Name</th>
            <th style={{ width: "10%" }}>Date</th>
            <th style={{ width: "10%" }}>Success</th>
            <th style={{ width: "20%" }}>Crew</th>
            <th style={{ width: "30%" }}>Details</th>
            <th style={{ width: "10%", height: "0" }}>Image</th>
          </tr>
        </thead>
        <tbody>
          {past.map((launch) => (
            <tr key={launch.flight_number}>
              <td>{launch.flight_number}</td>
              <td>{launch.name}</td>
              <td>
                {new Date(launch.date_utc).getUTCDate() +
                  "-" +
                  new Date(launch.date_utc).getUTCMonth() +
                  "-" +
                  new Date(launch.date_utc).getUTCFullYear()}
              </td>
              <td
                className={
                  launch.success === true ? "text-green-400" : "text-red-400"
                }
              >
                {launch.success === true ? "Successful" : "Failure"}
              </td>
              <td>
                {launch.crew.length === 0 ? (
                  "0"
                ) : (
                  <ul>
                    {crewMembers
                      .filter((c) => c.launch_id === launch.id)
                      .map((m) => (
                        <li>
                          <p className="text-blue-400 text-sm italic mr-2">
                            {m.role}:
                          </p>
                          <p> {m.name}</p>
                        </li>
                      ))}
                  </ul>
                )}
              </td>
              <td>
                {launch.details ? launch.details : "No details available"}
              </td>
              <td style={{ height: "100px" }}>
                <img
                  src={
                    launch.links.flickr.original[0]
                      ? launch.links.flickr.original[0]
                      : launch.links.flickr.small[0]
                      ? launch.links.flickr.small[0]
                      : launch.links.patch.large
                      ? launch.links.patch.large
                      : "/images/spacex.jpeg"
                  }
                  alt="launch-image"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "25px",
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  useEffect(() => {
    axios
      .get(launchEndpoint + "past")
      .then((res) => setPast(res.data))
      .catch((err) => console.log(err));
  }, []);
  return <div>{resultJsx}</div>;
}

export default Past;
