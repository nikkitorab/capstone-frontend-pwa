import React from "react";
// import Chart from "../data/Chart";
import { Routes } from "react-router-dom";
import { Link, Route } from "react-router-dom";
import Entries from "./Entries";
import axios from "axios";

import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import green from "@mui/material/colors/green";
import { Box } from "@mui/system";
import List from "@mui/material/List";

const theme = createTheme({
  indicator: {
    backgroundColor: "green",
  },
  palette: {
    primary: {
      light: "#60ac5d",
      main: "#2e7d32",
      dark: "#004f04",
      contrastText: "#fff",
    },
    secondary: {
      light: "#cfff95",
      main: "#9ccc65",
      dark: "#6b9b37",
      contrastText: "#000",
    },
  },
});

const Home = (props) => {
  const [symptomsData, setSymptomsData] = useState([]);
  const [triggersData, setTriggersData] = useState([]);
  const [triggerEntriesProps, setTriggerEntriesProps] = useState("");
  const [symptomEntriesProps, setSymptomEntriesProps] = useState("");

  const [completedSymptoms, setCompletedSymptoms] = useState(0);
  const [completedTriggers, setCompletedTriggers] = useState(0);

  useEffect(() => {
    getEntriesProps();
  }, []);

  const getEntriesProps = () => {
    axios
      .get("http://localhost:3000/symptoms")
      .then((response) => {
        setSymptomsData(response.data);
        getRemainingSymptomEntries(response.data);
        axios
          .get("http://localhost:3000/triggers")
          .then((nestedResponse) => {
            setTriggersData(nestedResponse.data);
            getRemainingTriggerEntries(nestedResponse.data);
            setTriggerEntriesProps({
              selection: "TriggerEntries",
              symptomsData: response.data,
              triggersData: nestedResponse.data,
            });
            setSymptomEntriesProps({
              selection: "SymptomEntries",
              symptomsData: response.data,
              triggersData: nestedResponse.data,
            });
          })
          .catch((error) => {
            console.log("cant get ur triggers :/ ");
          });
      })
      .catch((error) => {
        console.log("cant get ur symptoms :/ ");
      });
  };

  const getRemainingSymptomEntries = () => {
    axios
      .get("http://localhost:3000/completed/symptoms")
      .then((response) => {
        let count = 0;
        for (let key in response.data) {
          ++count;
        }

        setCompletedSymptoms(count);
      })
      .catch((error) => {
        console.log("cant get ur completed symptoms :/ ");
      });
  };

  const getRemainingTriggerEntries = () => {
    axios
      .get("http://localhost:3000/completed/triggers")
      .then((response) => {
        let count = 0;
        for (let key in response.data) {
          ++count;
        }

        setCompletedTriggers(count);
      })
      .catch((error) => {
        console.log("cant get ur trigger entries :/ ");
      });
  };

  return (
    // <div>
    <ThemeProvider theme={theme}>
      <Container
        maxWidth="sm"
        sx={{
          justifyContent: "flex-end",

          // p: "20px",
        }}
      >
        <h1> Today's Dashboard</h1>

        <Stack
          spacing={2}
          alignItems="center"
          sx={{
            mb: 2,
            display: "flex",
            flexDirection: "column",
            height: "80vh",
            overflow: "hidden",
            overflowY: "scroll",
          }}
        >
          {/* <List style={{ maxHeight: "100%" }} > */}
          <Box
            sx={{
              border: 2,
              borderRadius: "16px",
              // m: "20px",
              m: "2vw",
              p: "2vw",

              // p: "20px",
              width: 1,
              boxShadow: 3,
            }}
          >
            <h2>Which triggers did you experience today?</h2>
            <h3>
              completed {completedTriggers}/{triggersData.length}
            </h3>
            <Box
              sx={{
                m: "2vw",
              }}
            >
              <Button size="large" variant="outlined">
                <Link to="/entries" state={triggerEntriesProps}>
                  Trigger Entries
                </Link>
              </Button>
              <h4> </h4>
              <h>
                Your data insights will be more accurate if you complete all
                your entries everyday
              </h>
            </Box>
          </Box>
          {/* </section> */}
          <Box
            sx={{
              border: 2,
              borderRadius: "16px",
              m: "2vw",
              p: "2vw",
              // padding-bottom:
              width: 1,
              boxShadow: 3,
            }}
          >
            <h2>Which symptoms did you experience today?</h2>
            <h3>
              completed {completedSymptoms}/{symptomsData.length}
            </h3>
            <Box
              sx={{
                // m: "20px",
                // p: "20px",
                m: "2vw",
                // width: 1,
                // boxShadow: 3,
              }}
            >
              <Button size="large" variant="outlined">
                <Link to="/entries" state={symptomEntriesProps}>
                  Symptom Entries
                </Link>
              </Button>
              <h4> </h4>
              <h>
                Your data insights will be more accurate if you complete all
                your entries everyday
              </h>
            </Box>
          </Box>
          {/* </List> */}
        </Stack>

        <Routes>
          <Route path="/entries" element={<Entries />}></Route>
        </Routes>
      </Container>
    </ThemeProvider>
  );
};

export default Home;
