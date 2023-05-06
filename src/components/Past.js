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
            id: member.id,
          });
        }
      }
    }
    resultJsx = (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Details</th>
            <th>Image</th>
            <th>Crew</th>
          </tr>
        </thead>
        <tbody>
          {past.map((launch) => (
            <tr>
              <td>{launch.name}</td>
              <td>
                {new Date(launch.date_utc).getUTCDate() +
                  "-" +
                  new Date(launch.date_utc).getUTCMonth() +
                  "-" +
                  new Date(launch.date_utc).getUTCFullYear()}
              </td>
              <td>
                {launch.details ? launch.details : "No details available"}
              </td>
              <td>
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
                  className="rounded-lg h-24"
                />
              </td>
              <td>{launch.crew.length}</td>
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
