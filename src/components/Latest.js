import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

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
    resultJsx = (
      <div className="flex justify-between items-start">
        <div className="bg-slate-950 p-8 mt-8 rounded-md shadow-md w-1/2">
          <h2>Name: {latest.name}</h2>
          <p>Date: {`${day}-${month}-${year}`}</p>
          <p>Flight no: {latest.flight_number}</p>
          <p>{latest.success === true ? "Successful" : "Failure"}</p>
          {latest.details && <p>Details: {latest.details}</p>}
          {latest.links.wikipedia && (
            <a href={latest.links.wikipedia} target="_blank">
              <button>Read More</button>
            </a>
          )}

          {crewMembers && crewMembers.length > 0 && (
            <div className="bg-slate-900 rounded-md p-4 mt-8">
              <div className="flex flex-wrap gap-y-12 text-center">
                {crewMembers.map((c) => (
                  <div key={c.id} className="w-1/2">
                    <img
                      src={c.image}
                      alt="crew-member-image"
                      className="w-1/2 mx-auto rounded-lg"
                    />
                    <p className="mt-2 italic font-bold text-blue-300">
                      {c.role}
                    </p>
                    <p>{c.name}</p> <p>{c.agency}</p>
                    <a href={c.wikipedia} target="_blank">
                      <img
                        src="/images/information.png"
                        alt="crew-member-info"
                        className="w-4 inline"
                      />
                    </a>
                    <p>Launches: {c.launches}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        {latest.links.flickr.original.length > 0 ? (
          <div className="w-1/2 p-4">
            <img src={latest.links.flickr.original[carouselIndex]} />
          </div>
        ) : latest.links.patch.large ? (
          <div className="w-1/2 p-12">
            <img src={latest.links.patch.large} />
          </div>
        ) : (
          <div className="w-1/2 p-8">
            <img src="/images/spacex.jpeg" />
          </div>
        )}
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
