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

  useEffect(() => {
    getEntriesProps();
  }, []);

  const getEntriesProps = () => {
    axios
      .get("http://localhost:3000/symptoms")
      .then((response) => {
        setSymptomsData(response.data);
        axios
          .get("http://localhost:3000/triggers")
          .then((nestedResponse) => {
            setTriggersData(nestedResponse.data);
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

        <Stack spacing={10}>
          <section>
            <h2>Placeholder text for trigger entries:</h2>
            <section>
              <Button size="large" variant="contained">
                <Link to="/entries" state={triggerEntriesProps}>
                  Trigger Entries
                </Link>
              </Button>
            </section>
          </section>
          <section>
            <h2>Placeholder text for symptom entries:</h2>
            <section>
              <Button size="large" variant="contained">
                <Link to="/entries" state={symptomEntriesProps}>
                  Symptom Entries
                </Link>
              </Button>
            </section>
          </section>
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
