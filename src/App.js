import React from "react";
import "./App.css";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "react-router-dom";

import Home from "./components/screens/Home";
import Lists from "./components/screens/Lists";
import AddMenu from "./components/screens/AddMenu";

import DataOutput from "./components/data/DataOutput";
import Entries from "./components/screens/Entries";

import { Link, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  // const testFunc = () => {
  //   return { output: "in the func !!!" };
  // };

  const [symptomsData, setSymptomsData] = useState([]);
  const [triggersData, setTriggersData] = useState([]);

  useEffect(() => {
    getSymptomsFromAPI();
    getTriggersFromAPI();
  }, []);

  const getSymptomsFromAPI = () => {
    axios
      .get("http://localhost:3000/symptoms")
      .then((response) => {
        setSymptomsData(response.data);
      })
      .catch((error) => {
        console.log("cant get ur symptoms :/ ");
      });
    // return symptomsData;
  };

  const getTriggersFromAPI = () => {
    axios
      .get("http://localhost:3000/triggers")
      .then((response) => {
        setTriggersData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log("cant get ur triggers :/ ");
      });
  };

  // console.log(`data: ${symptomsData}`);

  // const homeProps = {
  //   symptomsData: symptomsData,
  //   triggersData: triggersData,
  // };

  const listsProps = {
    symptomsData: symptomsData,
    triggersData: triggersData,
  };

  const addProps = {
    name: "Some thing",
    price: 123,
  };

  const dataProps = {
    name: "Some thing",
    price: 123,
  };

  const entriesProps = {
    selection: "TriggerEntries",
    symptomsData: symptomsData,
    triggersData: triggersData,
  };

  // const homeProps = {
  //   symptomsData: symptomsData,
  //   triggersData: triggersData,
  // };

  return (
    <div className="App">
      {/* <div className="Nav-Bar"> */}
      <BrowserRouter>
        <Navbar bg="light" variant="light" fixed="bottom">
          <Nav className="me-auto">
            <Link to="/">Home</Link>
            <Link to="/lists" state={listsProps}>
              Lists
            </Link>
            <Link to="/add" state={addProps}>
              Add
            </Link>
            <Link to="/data" state={dataProps}>
              Data
            </Link>
            {/* <Link to="/entries" state={entriesProps}>
              Entries
            </Link> */}
          </Nav>
        </Navbar>
        <Routes>
          <Route path="/lists" element={<Lists />}></Route>
          <Route path="/add" element={<AddMenu />}></Route>
          <Route path="/data" element={<DataOutput />}></Route>
          {/* <Route path="/settings" element={<Settings />}></Route> */}
          <Route path="/entries" element={<Entries />}></Route>
          <Route path="*" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
      {/* </div> */}
    </div>
  );
};

export default App;
