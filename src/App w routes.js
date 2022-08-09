import React from "react";
import "./App.css";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "react-router-dom";

import Home from "./components/screens/Home";
import Lists from "./components/Lists";
import AddMenu from "./components/screens/AddMenu";

import DataOutput from "./components/screens/DataOutput";
import Settings from "./components/screens/Settings";
import SymptomEntries from "./components/symptoms/SymptomEntries";

import { Link, Route } from "react-router-dom";

const App = () => {
  // const testFunc = () => {
  //   return { output: "in the func !!!" };
  // };

  const homeProps = {
    name: "Some thing",
    price: 123,
    // func: testFunc(),
  };

  const listsProps = {
    name: "Some thing",
    price: 123,
  };

  const addProps = {
    name: "Some thing",
    price: 123,
  };

  const dataProps = {
    name: "Some thing",
    price: 123,
  };

  const settingsProps = {
    name: "Some thing",
    price: 123,
  };

  return (
    <div className="App">
      {/* <div className="Nav-Bar"> */}
      <BrowserRouter>
        <Navbar bg="light" variant="light" fixed="bottom">
          <Nav className="me-auto">
            <Link to="/" data={homeProps}>
              Home
            </Link>
            <Link to="/lists" state={listsProps}>
              Lists
            </Link>
            <Link to="/add" state={addProps}>
              Add
            </Link>
            <Link to="/data" state={dataProps}>
              Data
            </Link>
            <Link to="/settings" state={settingsProps}>
              Settings
            </Link>
          </Nav>
        </Navbar>
        <Routes>
          <Route path="/lists" element={<Lists />}></Route>
          <Route path="/add" element={<AddMenu />}></Route>
          <Route path="/data" element={<DataOutput />}></Route>
          {/* <Route path="/settings" element={<Settings />}></Route> */}
          <Route path="/settings" element={<SymptomEntries />}></Route>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
      {/* </div> */}
    </div>
  );
};

export default App;
