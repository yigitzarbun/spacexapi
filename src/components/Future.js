import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
function Future(props) {
  const { launchEndpoint } = props;
  const [future, setFuture] = useState([]);
  console.log(future);
  useEffect(() => {
    axios
      .get(launchEndpoint + "upcoming")
      .then((res) => setFuture(res.data))
      .catch((err) => console.log(err));
  }, []);
  return <div>Future</div>;
}

export default Future;
