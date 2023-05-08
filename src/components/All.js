import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function All(props) {
  const { launchEndpoint, crew } = props;
  const [all, setAll] = useState([]);
  const [sort, setSort] = useState(null);
  const [search, setSearch] = useState("");
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const handleSort = (value) => {
    if (sort === null) {
      setSort(value);
    } else {
      setSort(null);
    }
  };
  let resultJsx = "";
  let crewMembers = [];
  if (all === null || crew === null) {
    resultJsx = "Loading..";
  } else if (all.length === 0) {
    resultJsx = (
      <div>
        <h2>No available launch information</h2>
      </div>
    );
  } else if (all && Array.isArray(all) && Array.isArray(crew) && crew) {
    for (let p = 0; p < all.length; p++) {
      if (all[p]["crew"].length > 0) {
        for (let k = 0; k < all[p]["crew"].length; k++) {
          let member = crew.find((m) => m.id === all[p]["crew"][k]["crew"]);
          if (member != null && member != undefined) {
            crewMembers.push({
              name: member.name,
              image: member.image,
              launches: member.launches.length,
              wikipedia: member.wikipedia,
              agency: member.agency,
              role: all[p]["crew"][k]["role"],
              member_id: member.id,
              launch_id: all[p]["id"],
            });
          }
        }
      }
    }
    resultJsx = (
      <>
        <h2 className="font-bold text-xl text-slate-400 mt-4">
          Past Launches:{" "}
          <span className="text-blue-400">
            {
              all.filter((l) => {
                if (
                  (l.name === undefined || l.name === "") &&
                  (l.details === undefined || l.details === "")
                ) {
                  return false;
                } else if (
                  (l.name &&
                    l.name
                      .toLowerCase()
                      .includes(search.toLocaleLowerCase())) ||
                  (l.details &&
                    l.details
                      .toLocaleLowerCase()
                      .includes(search.toLocaleLowerCase()))
                ) {
                  return l;
                } else {
                  return false;
                }
              }).length
            }{" "}
          </span>
          results
        </h2>
        <table className="text-left bg-slate-900 mt-8 table-responsive">
          <thead>
            <tr>
              <th
                style={{ width: "5%" }}
                onClick={() => {
                  handleSort("flight_number");
                }}
              >
                <div className="flex">
                  <p className=" hover:text-blue-400 cursor-pointer"> #</p>
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
                onClick={() => {
                  handleSort("name");
                }}
              >
                <div className="flex">
                  <p className=" hover:text-blue-400 cursor-pointer"> Name</p>
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
                onClick={() => {
                  handleSort("date_utc");
                }}
              >
                <div className="flex">
                  <p className=" hover:text-blue-400 cursor-pointer"> Date</p>
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
                onClick={() => {
                  handleSort("success");
                }}
              >
                <div className="flex">
                  <p className=" hover:text-blue-400 cursor-pointer">
                    {" "}
                    Success
                  </p>
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
              <th
                style={{ width: "20%" }}
                onClick={() => {
                  handleSort("crew");
                }}
              >
                <div className="flex">
                  <p className=" hover:text-blue-400 cursor-pointer"> Crew</p>
                  <img
                    src={
                      sort === "crew"
                        ? "/images/down-arrow.png"
                        : "/images/up-arrow.png"
                    }
                    alt="sort-direction"
                    className="w-4 h-4 ml-2 cursor-pointer"
                  />
                </div>
              </th>
              <th style={{ width: "40%" }}>Details</th>
              <th style={{ width: "10%", height: "0" }}>Image</th>
            </tr>
          </thead>
          <tbody>
            {all
              .filter((l) => {
                if (
                  (l.name === undefined || l.name === "") &&
                  (l.details === undefined || l.details === "")
                ) {
                  return false;
                } else if (
                  (l.name &&
                    l.name
                      .toLowerCase()
                      .includes(search.toLocaleLowerCase())) ||
                  (l.details &&
                    l.details
                      .toLocaleLowerCase()
                      .includes(search.toLocaleLowerCase()))
                ) {
                  return l;
                } else {
                  return false;
                }
              })
              .sort(function (a, b) {
                if (sort === null) {
                  return a.flight_number - b.flight_number;
                } else if (sort === "flight_number") {
                  return b[sort] - a[sort];
                } else if (sort === "crew") {
                  return b[sort].length - a[sort].length;
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
                  if (x > y) {
                    return -1;
                  }
                  if (x < y) {
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
                      launch.success === true
                        ? "text-green-400"
                        : "text-red-400"
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
      </>
    );
  }
  useEffect(() => {
    axios
      .get(launchEndpoint)
      .then((res) => setAll(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <input
        type="text"
        className="w-1/3 rounded-lg p-2 bg-slate-200 text-black border-2 hover:border-blue-500 xl:w-2/3 md:w-full"
        placeholder="Search in all launches"
        onChange={handleSearch}
        value={search}
      />
      {search && (
        <button
          onClick={() => setSearch("")}
          className="font-bold border-2 border-red-400 rounded-md ml-2 p-2 hover:bg-gradient-to-r from-red-500 to-purple-700 hover:border-slate-950 md:w-full md:ml-0 md:my-2"
        >
          Clear
        </button>
      )}
      <br />
      {all.filter((l) => {
        if (
          (l.name === undefined || l.name === "") &&
          (l.details === undefined || l.details === "")
        ) {
          return false;
        } else if (
          (l.name &&
            l.name.toLowerCase().includes(search.toLocaleLowerCase())) ||
          (l.details &&
            l.details.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
        ) {
          return l;
        } else {
          return false;
        }
      }).length === 0 ? (
        <div className="text-center">
          <h3 className="text-xl font-bold mt-4">
            No results matching your criteria
          </h3>
          <p className="mt-2">
            Try searcing for something else or clear search to see launch
            results.
          </p>
        </div>
      ) : (
        resultJsx
      )}
    </div>
  );
}

export default All;
