import React from "react";
import { useLocation } from "react-router-dom";

const Home = (props) => {
  const location = useLocation();
  // const data = location.state;
  // console.log(data);
  // const f = location.state.func;
  // const fun = data.func;
  // f();
  return (
    <div>
      <h1> homeeeeee</h1>
    </div>
  );
};

export default Home;
