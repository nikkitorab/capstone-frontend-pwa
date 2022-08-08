import React from "react";
import { useLocation } from "react-router-dom";

const AddMenu = () => {
  const location = useLocation();
  const data = location.state;
  console.log(data);
  return (
    <div>
      <h1> Add new....</h1>
    </div>
  );
};

export default AddMenu;
