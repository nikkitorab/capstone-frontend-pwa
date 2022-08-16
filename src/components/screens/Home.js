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

const theme = createTheme({
  palette: {
    primary: green,
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
        // const numRemaining = symptomsData.length - count;
        // const entriesCompleted = [numRemaining, symptomsData.length];
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
        // const numRemaining = triggersData.length - count;
        // const entriesCompleted = [numRemaining, triggersData.length];
        setCompletedTriggers(count);
      })
      .catch((error) => {
        console.log("cant get ur trigger entries :/ ");
      });
  };

  // const getTriggersFromAPI = () => {
  //   axios
  //     .get("http://localhost:3000/triggers")
  //     .then((response) => {
  //       setTriggersData(response.data);
  //       setTriggerEntriesProps({
  //         selection: "TriggerEntries",
  //         symptomsData: symptomsData,
  //         triggersData: triggersData,
  //       });
  //     })
  //     .catch((error) => {
  //       console.log("cant get ur triggers :/ ");
  //     });
  // };
  // const location = useLocation();
  // const data = location.state;
  // const [symptomsData, setSymptomsData] = useState(data.symptomsData);
  // const [triggersData, setTriggersData] = useState(data.triggersData);
  // const location = useLocation();
  // const data = location.state;
  // console.log(data);
  // const f = location.state.func;
  // const fun = data.func;
  // f();
  // const triggerEntries = () => {
  //   props.triggerEntriesCallback();
  // };
  // console.log(data.entriesProps);
  // console.log(data.symptomsData);

  return (
    // <div>
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm">
        <h1> HOME</h1>
        {/* <section>
        <Button variant="contained">
          <Link to="/entries" state={triggerEntriesProps}>
            Trigger Entries
          </Link>
        </Button>
      </section> */}

        {/* <button>
        <Link to="/entries" state={triggerEntriesProps}>
          Trigger Entries
        </Link>
      </button> */}
        {/* <button>
        <Link to="/entries" state={symptomEntriesProps}>
          Symptom Entries
        </Link>
      </button> */}

        <Stack spacing={10} justifyContent="center" alignItems="center">
          <Box
            sx={{
              border: 2,
              borderRadius: "16px",
              // m: "20px",
              m: "3vw",
              p: "3vw",
              // p: "20px",
              width: 1,
              boxShadow: 3,
            }}
          >
            <h2>Placeholder text for trigger entries:</h2>
            <h3>
              completed {completedTriggers}/{triggersData.length}
            </h3>
            <Box
              sx={{
                // border: 2,
                // borderRadius: "16px",
                // m: "15px",
                m: "2vw",
                // p: "20px",
                // width: 1,
                // boxShadow: 3,
              }}
            >
              <Button size="large" variant="contained">
                <Link to="/entries" state={triggerEntriesProps}>
                  Trigger Entries
                </Link>
              </Button>
            </Box>
          </Box>
          {/* </section> */}
          <Box
            sx={{
              border: 2,
              borderRadius: "16px",
              m: "20px",
              p: "20px",
              width: 1,
              boxShadow: 3,
            }}
          >
            <h2>Placeholder text for symptom entries:</h2>
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
              <Button size="large" variant="contained">
                <Link to="/entries" state={symptomEntriesProps}>
                  Symptom Entries
                </Link>
              </Button>
            </Box>
          </Box>
        </Stack>
        {/* <section>
        <Button variant="contained">
          <Link to="/entries" state={symptomEntriesProps}>
            Symptom Entries
          </Link>
        </Button>
      </section> */}
        <Routes>
          <Route path="/entries" element={<Entries />}></Route>
        </Routes>
        {/* </div> */}
      </Container>
    </ThemeProvider>
  );
};

export default Home;
