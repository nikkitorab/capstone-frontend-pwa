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
import IconButton from "@mui/material/IconButton";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import BarChartOutlinedIcon from "@material-ui/icons/BarChartOutlined";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import TodayOutlinedIcon from "@material-ui/icons/TodayOutlined";
import ButtonGroup from "@mui/material/ButtonGroup";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";

import BottomNavigation from "@mui/material/BottomNavigation";
// import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
// import RestoreIcon from "@mui/icons-material/Restore";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import ArchiveIcon from "@mui/icons-material/Archive";

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
  // const [value, setValue] = React.useState(0);

  return (
    <div className="App">
      {/* <div className="Nav-Bar"> */}
      <BrowserRouter>
        <Paper
          sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
          elevation={3}
        >
          <BottomNavigation showLabels>
            <ButtonGroup variant="text" aria-label="text button group">
              <Stack
                direction="row"
                // direction={{ xs: "row", sm: "column" }}
                divider={<Divider orientation="vertical" flexItem />}
                // justifyContent="space-evenly"
                // alignItems="center"
                // spacing={4}
                spacing={{ xs: 2, sm: 4, md: 7.5 }}

                //             <Stack
                //   direction={{ xs: 'row', sm: 'column' }}
                //   // spacing={{ xs: 1, sm: 2, md: 4 }}
                // >
              >
                <IconButton aria-label="home" size="large">
                  <Link to="/">
                    <HomeOutlinedIcon fontSize="large" />
                  </Link>
                </IconButton>
                <IconButton aria-label="lists" size="large">
                  <Link to="/lists" state={listsProps}>
                    <FormatListBulletedIcon fontSize="large" />
                  </Link>
                </IconButton>

                <Fab aria-label="add">
                  <Link to="/add" state={addProps}>
                    <AddIcon />
                  </Link>
                </Fab>
                <IconButton aria-label="entries" size="large">
                  <Link to="/entries" state={entriesProps}>
                    <TodayOutlinedIcon fontSize="large" />
                  </Link>
                </IconButton>
                <IconButton aria-label="data" size="large">
                  <Link to="/data" state={dataProps}>
                    <BarChartOutlinedIcon fontSize="large" />
                  </Link>
                </IconButton>
              </Stack>
            </ButtonGroup>

            {/* <Link to="/entries" state={entriesProps}>
              Entries
            </Link> */}
            {/* <BottomNavigationAction
              label="Recents"
              icon={<RestoreIcon />}
              value={<Link to="/">Home</Link>}
            />
            <BottomNavigationAction
              label="Favorites"
              icon={<FavoriteIcon />}
              value={<Link to="/lists" state={listsProps} />}
            />

            <BottomNavigationAction label="Archive" icon={<ArchiveIcon />} /> */}
          </BottomNavigation>
        </Paper>
        {/* <Navbar bg="light" variant="light" fixed="bottom">
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
            </Link> */}
        {/* <Link to="/entries" state={entriesProps}>
              Entries
            </Link> */}
        {/* </Nav>
        </Navbar> */}
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
