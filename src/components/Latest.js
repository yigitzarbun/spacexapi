import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
function Latest(props) {
  const { launchEndpoint, crew } = props;
  const [latest, setLatest] = useState([]);
  const [carouselIndex, setCarouselIndex] = useState(0);

  let resultJsx = "";
  let date = null;
  let year = null;
  let month = null;
  let day = null;
  let crewMembers = [];
  if (latest === null || crew === null) {
    resultJsx = "Loading..";
  } else if (latest.length === 0) {
    resultJsx = (
      <div>
        <h2>No available launch information</h2>
      </div>
    );
  } else if (latest && Array.isArray(crew) && crew) {
    date = date = new Date(latest.date_utc);
    year = date.getUTCFullYear();
    month = date.getUTCMonth();
    day = date.getUTCDate();
    for (let i = 0; i < latest.crew.length; i++) {
      let member = crew.find((c) => c.id === latest.crew[i]["crew"]);
      if (member) {
        crewMembers.push({
          name: member.name,
          image: member.image,
          launches: member.launches.length,
          wikipedia: member.wikipedia,
          agency: member.agency,
          role: latest.crew[i]["role"],
          id: member.id,
        });
      }
    }
    resultJsx = (
      <div className="flex justify-between items-center lg:flex-col">
        <div className="bg-slate-950 p-8 mt-4 rounded-md shadow-md w-1/2 table-responsive overflow-x:auto lg:w-full">
          <h2 className="font-bold text-xl text-slate-400 mt-4">
            Latest Launch
          </h2>
          <table
            className="text-left bg-slate-950 mt-4 w-full"
            style={{ overflowX: "auto" }}
          >
            <thead>
              <tr>
                <th style={{ width: "10%" }} className="md:hidden">
                  #
                </th>
                <th style={{ width: "25%" }}>Name</th>
                <th style={{ width: "20%" }}>Date</th>
                <th style={{ width: "40%" }}>Details</th>
                <th style={{ width: "5%" }} className="md:hidden">
                  Crew
                </th>
              </tr>
            </thead>
            <tbody className="bg-slate-900">
              <tr>
                <td className="md:hidden">{latest.flight_number}</td>
                <td>{latest.name}</td>
                <td>{`${day}-${month}-${year}`}</td>
                <td>
                  {latest.details ? latest.details : "No details available"}
                </td>
                <td className="md:hidden">{latest.crew.length}</td>
              </tr>
            </tbody>
          </table>
          {crewMembers && crewMembers.length > 0 && (
            <div className="bg-slate-900 rounded-md p-4 mt-8">
              <div className="flex flex-wrap gap-y-12 text-center md:flex-col">
                {crewMembers.map((c) => (
                  <div key={c.id} className="w-1/2 md:w-full">
                    <img
                      src={c.image}
                      alt="crew-member-image"
                      className="w-1/2 mx-auto rounded-lg md:w-2/3"
                    />
                    <p className="mt-2 italic font-bold text-blue-300">
                      {c.role}
                    </p>
                    <p>{c.name}</p> <p>{c.agency}</p>
                    <p>Launches: {c.launches}</p>
                    <a href={c.wikipedia} target="_blank">
                      <img
                        src="/images/information.png"
                        alt="crew-member-info"
                        className="w-4 inline"
                      />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <Link
          to={`/${latest.id}`}
          state={{ launch: latest }}
          className="w-1/2 p-8 lg:w-full"
        >
          {latest.links.flickr.original.length > 0 ? (
            <div>
              <img src={latest.links.flickr.original[carouselIndex]} />
            </div>
          ) : latest.links.patch.large ? (
            <div>
              <img src={latest.links.patch.large} />
            </div>
          ) : (
            <div>
              <img src="/images/spacex.jpeg" />
            </div>
          )}
        </Link>
      </div>
    );
  }
  useEffect(() => {
    axios
      .get(launchEndpoint + "latest")
      .then((res) => setLatest(res.data))
      .catch((err) => console.log(err));
  }, []);

  return <div>{resultJsx}</div>;
}

export default Latest;
