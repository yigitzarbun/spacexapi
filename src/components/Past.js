import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Past(props) {
  const { launchEndpoint, crew } = props;
  const [past, setPast] = useState([]);
  const [sort, setSort] = useState(null);
  const handleSort = (value) => {
    if (sort === null) {
      setSort(value);
    } else {
      setSort(null);
    }
  };
  let resultJsx = "";
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
      if (past[p]["crew"].length > 0) {
        for (let k = 0; k < past[p]["crew"].length; k++) {
          let member = crew.find((m) => m.id === past[p]["crew"][k]["crew"]);
          if (member != null && member != undefined) {
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
    }
    resultJsx = (
      <table className="text-left bg-slate-900 mt-8">
        <thead>
          <tr>
            <th
              style={{ width: "15%" }}
              className="cursor-pointer"
              onClick={() => {
                handleSort("flight_number");
              }}
            >
              <div className="flex">
                <p> Flight #</p>
                <img
                  src={
                    sort === "flight_number"
                      ? "/images/down-arrow.png"
                      : "/images/up-arrow.png"
                  }
                  alt="sort-direction"
                  className="w-4 h-4 ml-2"
                />
              </div>
            </th>
            <th
              style={{ width: "10%" }}
              className="cursor-pointer"
              onClick={() => {
                handleSort("name");
              }}
            >
              <div className="flex">
                <p> Name</p>
                <img
                  src={
                    sort === "name"
                      ? "/images/down-arrow.png"
                      : "/images/up-arrow.png"
                  }
                  alt="sort-direction"
                  className="w-4 h-4 ml-2"
                />
              </div>
            </th>
            <th
              style={{ width: "10%" }}
              className="cursor-pointer"
              onClick={() => {
                handleSort("date_utc");
              }}
            >
              <div className="flex">
                <p> Date</p>
                <img
                  src={
                    sort === "date_utc"
                      ? "/images/down-arrow.png"
                      : "/images/up-arrow.png"
                  }
                  alt="sort-direction"
                  className="w-4 h-4 ml-2"
                />
              </div>
            </th>
            <th
              style={{ width: "5%" }}
              className="cursor-pointer"
              onClick={() => {
                handleSort("success");
              }}
            >
              <div className="flex">
                <p> Success</p>
                <img
                  src={
                    sort === "success"
                      ? "/images/down-arrow.png"
                      : "/images/up-arrow.png"
                  }
                  alt="sort-direction"
                  className="w-4 h-4 ml-2"
                />
              </div>
            </th>
            <th style={{ width: "20%" }}>Crew</th>
            <th style={{ width: "30%" }}>Details</th>
            <th style={{ width: "10%", height: "0" }}>Image</th>
          </tr>
        </thead>
        <tbody>
          {past
            .sort(function (a, b) {
              if (sort === null) {
                return a.flight_number - b.flight_number;
              } else if (sort === "flight_number") {
                return b[sort] - a[sort];
              } else if (sort === "date_utc") {
                return new Date(b[sort]) - new Date(a[sort]);
              } else if (sort === "name") {
                let x = a.name.toLowerCase();
                let y = b.name.toLowerCase();
                if (x < y) {
                  return -1;
                }
                if (x > y) {
                  return 1;
                }
                return 0;
              } else if (sort === "success") {
                let x = a.success;
                let y = b.success;
                if (x < y) {
                  return -1;
                }
                if (x > y) {
                  return 1;
                }
                return 0;
              }
            })
            .map((launch) => (
              <tr key={launch.id}>
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
                          <li key={m.member_id}>
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
                  <Link to={`/${launch.id}`} state={{ launch: launch }}>
                    {" "}
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
                  </Link>
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
