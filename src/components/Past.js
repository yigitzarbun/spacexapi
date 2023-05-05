import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

function Past(props) {
  const { launchEndpoint } = props;
  const [past, setPast] = useState([]);
  console.log(past);
  useEffect(() => {
    axios
      .get(launchEndpoint + "past")
      .then((res) => setPast(res.data))
      .catch((err) => console.log(err));
  }, []);
  return <div>Past</div>;
}

export default Past;
