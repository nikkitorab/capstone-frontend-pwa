import React from "react";
// import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import SymptomRating from "./SymptomRating";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Box from "@mui/material/Box";
import DisabledByDefaultOutlinedIcon from "@mui/icons-material/DisabledByDefaultOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const SymptomEntries = (props) => {
  const [selectedList, setSelectedList] = useState("ToDo"); // default

  const theme = createTheme({
    indicator: {
      backgroundColor: "#ECFFE8",
    },
    palette: {
      primary: {
        light: "#969EC2",
        main: "#383B49",
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
  // const location = useLocation();
  // const data = location.state;
  // console.log(data);
  // get list of symptoms from api
  //
  // const [remainingEntries, setRemainingEntries] = useState(
  //   props.remainingSymptomEntries
  // );
  // const [remainingEntries, setRemainingEntries] = useState(
  //   props.remainingEntries
  // );
  // const [completedEntries, setCompletedEntries] = useState(
  //   props.completedEntries
  // );
  // console.log(remainingEntries);
  // const [completedEntries, setCompletedEntries] = useState(
  //   props.completedSymptomEntries
  // );
  // const [lastEntryID, setLastEntryID] = useState("");
  // const [done, setDone] = useState(1);

  // const [completedEntriesList, setCompletedEntriesList] = useState(
  //   props.completedEntries.entries()
  // );

  // useEffect(() => {
  //   setCompletedEntriesList
  //   // getRemainingSymptomEntries();
  // }, []);

  // useEffect(() => {
  //   // addRelatedEntries(lastEntryID);
  //   getSymptomEntriesFromAPI(lastEntryID);
  // }, [lastEntryID]);

  // useEffect(() => {
  //   getEntriesData();
  // }, []);

  // API - GET
  // const getSymptomsFromAPI = () => {
  //   axios
  //     .get("http://localhost:3000/symptoms")
  //     .then((response) => {
  //       setRemainingEntries(response.data);
  //     })
  //     .catch((error) => {
  //       console.log("cant get ur symptoms :/ ");
  //     });
  // };

  // const getCompletedSymptomEntries = () => {
  //   axios
  //     .get("http://localhost:3000/completed/symptoms")
  //     .then((response) => {
  //       setCompletedEntries(response.data);

  //       const remaining = [];

  //       for (const symptom of props.symptomsData) {
  //         const id = symptom.id.toString();
  //         if (!response.data[id]) {
  //           console.log("*********");
  //           remaining.push(symptom);
  //         }
  //       }
  //       setRemainingEntries(remaining);
  //     })
  //     .catch((error) => {
  //       console.log("cant get ur symptoms :/ ");
  //     });
  // };

  // const getRemainingSymptomEntries = () => {
  //   axios
  //     .get("http://localhost:3000/symptoms")
  //     .then((response) => {
  //       const remaining = [];
  //       for (const symptom of response.data) {
  //         const id = symptom.id.toString();
  //         if (!completedEntries[id]) {
  //           remaining.push(symptom);
  //         }
  //       }
  //       setRemainingEntries(remaining);
  //     })
  //     .catch((error) => {
  //       console.log("cant get ur symptoms :/ ");
  //     });
  // };

  // const getSymptomEntriesFromAPI = (id) => {
  //   axios
  //     .get(`http://localhost:3000/related-entries/symptom-entries/${id}`)
  //     .then((response) => {
  //       console.log(response.data);
  //       // addRelatedEntries(lastEntryID);
  //       // setEntries(response.data);
  //     })
  //     .catch((error) => {
  //       console.log("cant get ur entries :/ ");
  //     });
  // };

  // API - POST
  // const addSymptomEntryAPI = (data) => {
  //   // const symptomID = data.symptom_id;
  //   return axios
  //     .post("http://localhost:3000/symptom-entries", data)
  //     .then((response) => {
  //       // getCompletedSymptomEntries();
  //       // getRemainingSymptomEntries();
  //       // remove symptom from to-do list
  //       // console.log(`response: ${response}`);
  //       // const updatedSymptoms = symptomsData.filter(
  //       //   (symptom) => symptom.id !== symptomID
  //       // );
  //       // console.log(`response: ${response.data.id}`);
  //       // // setLastEntryID(response.data.id);
  //       // return response.data.id;
  //     })
  //     .catch((error) => {
  //       console.log("COULDN'T MAKE A new symptom entry");
  //     });

  //   // const relatedData = { symptomEntryID };

  //   // add related entries
  // };
  const handleChange = (event, newValue) => {
    // console.log(`newValue ${newValue}`);
    setSelectedList(newValue);
    // if (newValue == 0) {
    //   setSelectedList("SymptomsList");
    // } else {
    //   setSelectedList("TriggersList");
    // }
  };

  const addEntry = (data) => {
    props.addEntryCallback(data);
  };

  const editEntry = () => {
    console.log("u wanna edit ur entry");
  };
  console.log(`remainingEntries: ${props.completedEntries}`);

  return (
    <div>
      <h1> How severe were your symptoms today? </h1>
      <h>
        Click the <DisabledByDefaultOutlinedIcon fontSize="small" /> if you
        didn't experience the symptom today.
      </h>
      <h2> </h2>
      <ToggleButtonGroup
        value={selectedList}
        exclusive
        size="large"
        onChange={handleChange}
        color="primary"
        aria-label="list selection"
        sx={{
          p: "2.5vw",
        }}
      >
        <ToggleButton value="ToDo" aria-label="ToDo">
          To-Do
          {/* <FormatAlignLeftIcon /> */}
        </ToggleButton>

        <ToggleButton value="Completed" aria-label="Completed">
          Completed
          {/* <FormatAlignCenterIcon /> */}
        </ToggleButton>
      </ToggleButtonGroup>
      {/* <section> */}
      <Box
        sx={{
          // border: 2,
          borderRadius: "16px",
          // m: "20px",
          alignItems: "center",
          justifyContent: "center",
          // m: "5vw",
          p: "1.5vw",
          // p: "20px",
          // bgcolor: "secondary.light",
          width: 1,
          boxShadow: 3,
        }}
      >
        {selectedList === "ToDo" && (
          <Stack spacing={3} justifyContent="center" alignItems="center">
            {props.remainingEntries.map((symptom) => (
              <SymptomRating
                key={symptom.id}
                id={symptom.id}
                name={symptom.name}
                addEntryCallback={addEntry}
              />
            ))}
          </Stack>
        )}
        {selectedList === "Completed" && (
          <Stack spacing={3} justifyContent="center" alignItems="center">
            {Object.entries(props.completedEntries).map((entry) => (
              // <section>
              <Box
                sx={{
                  border: 2,
                  borderRadius: "16px",
                  bgcolor: "#EEF3F8",
                  borderColor: "#969EC2",

                  // m: "20px",
                  m: "1vw",
                  p: "1.5vw",
                  // p: "20px",
                  width: 0.7,
                  boxShadow: 3,
                }}
              >
                <h3>{entry[1]}</h3>
                {/* <button onClick={editEntry}>EDIT</button>
          // </section> */}
              </Box>
            ))}
            {/* </section> */}
          </Stack>
        )}
      </Box>
    </div>
  );
};

export default SymptomEntries;
