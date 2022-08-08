import React from "react";
import "../App.css";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "react-router-dom";

import Home from "./Home";
import Lists from "./Lists";
import AddMenu from "./AddMenu";

import DataOutput from "./DataOutput";
import Settings from "./Settings";

import { Link, Route } from "react-router-dom";

const NavigationBar = () => {
  const myData = {
    name: "Some thing",
    price: 123,
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar bg="light" variant="light" fixed="bottom">
          <Nav className="me-auto">
            <Link to="/" state={myData}>
              {" "}
              Home{" "}
            </Link>
            <Link to="/lists" state={myData}>
              {" "}
              Lists{" "}
            </Link>
            <Link to={{ pathname: "/add", state: { msg: "add+" } }}>Add</Link>
            <Link to={{ pathname: "/data", state: { msg: "daaaattttttsa" } }}>
              Data
            </Link>
            <Link
              to={{ pathname: "/settings", state: { msg: "set ttinnnng" } }}
            >
              Settings
            </Link>
          </Nav>
        </Navbar>
        <Routes>
          <Route path="/lists" element={<Lists />}></Route>
          <Route path="/add" element={<AddMenu />}></Route>
          <Route path="/data" element={<DataOutput />}></Route>
          <Route path="/settings" element={<Settings />}></Route>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default NavigationBar;
