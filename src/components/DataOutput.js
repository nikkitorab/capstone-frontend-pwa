import React from "react";
import { useLocation } from "react-router-dom";

const DataOutput = () => {
  const location = useLocation();
  const data = location.state;
  console.log(data);
  return (
    <div>
      <h1> DataOutput!!!!!</h1>
    </div>
  );
};

export default DataOutput;
