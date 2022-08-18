import React from "react";
// import Chart from "../data/Chart";
import { Routes } from "react-router-dom";
import { Link, Route } from "react-router-dom";
import Entries from "./Entries";
import axios from "axios";
import Typography from "@mui/material/Typography";

import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import green from "@mui/material/colors/green";
import { Box } from "@mui/system";

const theme = createTheme({
  indicator: {
    backgroundColor: "#ECFFE8",
  },
  palette: {
    primary: {
      light: "#969EC2",
      main: "#FFC0CB",
      dark: "#FFC0CB",
      contrastText: "#fff",
    },
    secondary: {
      light: "#D4E2ED",
      main: "#C7D4F0",
      dark: "#BBC5F2",
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
          // bgcolor: "secondary.light",

          // p: "20px",
        }}
      >
        <Typography variant="h2" sx={{ p: 1, fontWeight: "medium" }} mt={4}>
          Today's Dashboard
        </Typography>
        <Typography variant="h" sx={{ fontStyle: "italic" }} mt={3}>
          Data insights will be more accurate if you complete your entries
          everyday
        </Typography>
        {/* <h>
          Your data insights will be more accurate if you complete all your
          entries everyday
        </h> */}
        {/* <h1> Today's Dashboard</h1> */}

        <Stack
          spacing={2}
          alignItems="center"
          sx={{
            mb: 2,
            mt: 3,
            display: "flex",
            flexDirection: "column",
            height: "65vh",
            overflow: "hidden",
            overflowY: "scroll",
          }}
        >
          {/* <List style={{ maxHeight: "100%" }} > */}
          <Box
            sx={{
              border: 2,
              borderRadius: "16px",
              borderColor: "primary.light",
              // m: "20px",
              m: "1vw",
              p: "1vw",
              bgcolor: "secondary.light",

              // p: "20px",
              width: 1,
              boxShadow: 3,
              // height: "30vh",
            }}
          >
            <Typography variant="h5" sx={{ p: 2, fontWeight: "medium" }} mt={2}>
              Which triggers did you experience today?
              {/* <h2>Which triggers did you experience today?</h2> */}
            </Typography>
            {/* <h3> */}
            <Typography variant="h" sx={{ fontStyle: "italic" }} mt={2}>
              COMPLETED {completedTriggers}/{triggersData.length}
            </Typography>
            {/* </h3> */}
            <Box
              sx={{
                m: "1vw",
                p: "0.5vw",
              }}
            >
              <Button
                size="large"
                variant="contained"
                sx={{
                  color: "secondary.dark",
                  backgroundColor: "secondary.dark",
                  borderColor: "secondary.main",
                }}
              >
                <Link to="/entries" state={triggerEntriesProps}>
                  Trigger Entries
                </Link>
              </Button>
              <h4> </h4>
            </Box>
          </Box>
          {/* </section> */}
          <Box
            sx={{
              border: 2,
              borderRadius: "16px",
              m: "1vw",
              p: "1vw",
              borderColor: "primary.light",
              // padding-bottom:
              bgcolor: "secondary.light",
              width: 1,
              boxShadow: 3,
            }}
          >
            <Typography variant="h5" sx={{ p: 2, fontWeight: "medium" }} mt={2}>
              Which symptoms did you experience today?
            </Typography>
            {/* <h2>Which symptoms did you experience today?</h2> */}
            <Typography variant="h" sx={{ fontStyle: "italic" }} mt={2}>
              COMPLETED {completedSymptoms}/{symptomsData.length}
            </Typography>
            <Box
              sx={{
                // m: "20px",
                // p: "20px",
                m: "1vw",
                p: "0.5vw",
                // width: 1,
                // boxShadow: 3,
              }}
            >
              <Button
                size="large"
                variant="contained"
                sx={{
                  color: "secondary.dark",
                  backgroundColor: "secondary.dark",
                  borderColor: "secondary.main",
                }}
              >
                <Link to="/entries" state={symptomEntriesProps}>
                  Symptom Entries
                </Link>
              </Button>
              <h4> </h4>
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
