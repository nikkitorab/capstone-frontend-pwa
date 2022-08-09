import React from "react";
import { useLocation } from "react-router-dom";

const Settings = () => {
  const location = useLocation();
  const data = location.state;
  console.log(data);
  return (
    <div>
      <h1> Settings!!!!!</h1>
    </div>
  );
};

export default Settings;
