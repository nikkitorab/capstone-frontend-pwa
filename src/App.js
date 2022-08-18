import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "react-router-dom";

import Home from "./components/screens/Home";
import Lists from "./components/screens/Lists";
import AddMenu from "./components/screens/AddMenu";

import DataOutput from "./components/data/DataOutput";
import Entries from "./components/screens/Entries";
import { Box } from "@mui/system";

import AddSymptomForm from "./components/symptoms/AddSymptomForm";
import AddTriggerForm from "./components/triggers/AddTriggerForm";

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
import Popper, { PopperPlacementType } from "@mui/material/Popper";
import Typography from "@mui/material/Typography";
import Fade from "@mui/material/Fade";
import DisabledByDefaultOutlinedIcon from "@mui/icons-material/DisabledByDefaultOutlined";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

import BottomNavigation from "@mui/material/BottomNavigation";
// import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";

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

  const symptomEntriesProps = {
    selection: "SymptomEntries",
    symptomsData: symptomsData,
    triggersData: triggersData,
  };

  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleAddClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(!open);
  };

  const handleClose = () => setOpen(false);
  const [openAddSymptom, setOpenAddSymptom] = useState(false);
  // const closeAddSymptom = () => setOpenAddSymptom(false);

  const [openAddTrigger, setOpenAddTrigger] = useState(false);

  const toggleAddSymptom = () => {
    setOpenAddSymptom(!openAddSymptom);
  };

  const toggleAddTrigger = () => {
    setOpenAddTrigger(!openAddTrigger);
  };

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "#fff",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const addNewSymptom = (data) => {
    console.log(data);
    axios
      .post("http://localhost:3000/symptoms", data)
      .then((response) => {
        getSymptomsFromAPI();
        // setSymptomsData(response.data);
      })
      .catch((error) => {
        console.log("COULDN'T MAKE A new symptom ");
      });
  };

  const addNewTrigger = (data) => {
    console.log(data);
    axios
      .post("http://localhost:3000/triggers", data)
      .then((response) => {
        getTriggersFromAPI();
      })
      .catch((error) => {
        console.log("COULDN'T MAKE A new trigger ");
      });
  };

  return (
    <div className="App">
      <Modal
        open={openAddSymptom}
        onClose={!openAddSymptom}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <AddSymptomForm
            addSymptomCallback={addNewSymptom}
            toggleAddSymptomCallback={toggleAddSymptom}
          ></AddSymptomForm>
        </Box>
      </Modal>
      <Modal
        open={openAddTrigger}
        onClose={!openAddTrigger}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <AddTriggerForm
            addTriggerCallback={addNewTrigger}
            toggleAddTriggerCallback={toggleAddTrigger}
          ></AddTriggerForm>
        </Box>
      </Modal>
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
                divider={<Divider orientation="vertical" flexItem />}
                spacing={{ xs: 2, sm: 4, md: 7.5 }}
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

                <Fab
                  aria-label="add"
                  aria-haspopup="true"
                  onClick={(event) => handleAddClick(event)}
                >
                  <AddIcon />
                </Fab>

                <Popper
                  open={open}
                  anchorEl={anchorEl}
                  placement={"top"}
                  transition
                >
                  {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={350}>
                      <Paper>
                        <Stack sx={{ p: 2 }}>
                          <Typography variant="h5" sx={{ p: 1 }}>
                            Add...
                          </Typography>
                          <IconButton
                            aria-label="lists"
                            size="smalll"
                            onClick={handleClose}
                            sx={{
                              position: "fixed",
                              top: 0,
                              right: 0,
                              zIndex: 2000,
                            }}
                          >
                            <DisabledByDefaultOutlinedIcon fontSize="small" />
                          </IconButton>
                          <ButtonGroup
                            orientation="vertical"
                            aria-label="vertical outlined button group"
                          >
                            <Button
                              variant="outlined"
                              startIcon={
                                <FormatListBulletedIcon fontSize="small" />
                              }
                              onClick={toggleAddTrigger}
                            >
                              Trigger
                            </Button>
                            <Button
                              variant="outlined"
                              startIcon={
                                <FormatListBulletedIcon fontSize="small" />
                              }
                              onClick={toggleAddSymptom}
                            >
                              Symptom
                            </Button>
                            <Button
                              variant="outlined"
                              startIcon={<TodayOutlinedIcon fontSize="small" />}
                            >
                              <Link
                                to="/entries"
                                state={entriesProps}
                                onClick={handleClose}
                              >
                                Trigger Entry
                              </Link>
                            </Button>
                            <Button
                              variant="outlined"
                              startIcon={<TodayOutlinedIcon fontSize="small" />}
                            >
                              <Link
                                to="/entries"
                                state={symptomEntriesProps}
                                onClick={handleClose}
                              >
                                Symptom Entry
                              </Link>
                            </Button>
                            {/* {buttons} */}
                          </ButtonGroup>
                        </Stack>
                      </Paper>
                    </Fade>
                  )}
                </Popper>
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
          </BottomNavigation>
        </Paper>

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
