import React from "react";
// import { useLocation } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import SignificantData from "./SignificantData";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const DataOutput = (props) => {
  const [symptomNames, setSymptomNames] = useState("");

  const [triggerIDs, setTriggerIDs] = useState([]);

  useEffect(() => {
    getSymptomNames();
    getSignificantTriggerIDs();
  }, []);

  const getSignificantTriggerIDs = () => {
    axios
      .get("http://localhost:3000/related-entries/data/sig/trigger")
      .then((response) => {
        const triggerIDSet = new Set();
        for (const i of response.data) {
          triggerIDSet.add(i.trigger_id);
        }
        // setTriggerIDs(triggerIDSet);
        const triggerIDarray = [...triggerIDSet];
        setTriggerIDs(triggerIDarray);
        // console.log(`arr: ${triggerIDarray}`);
      })
      .catch((error) => {
        console.log(`error!!! ${error}`);
      });
  };
  // triggerIDs.forEach((element) => {
  //   console.log(element); // 👉️ one, two, three, four
  // });

  // API - GET
  const getSymptomNames = () => {
    axios
      .get("http://localhost:3000/symptoms/names")
      .then((response) => {
        setSymptomNames(response.data);
        console.log(`name data: ${response.data[67]}`);
      })
      .catch((error) => {
        console.log(`error!!! ${error}`);
      });
  };

  return (
    <Box
      sx={{
        // border: 2,
        borderRadius: "16px",
        // m: "20px",
        // alignItems: "center",
        justifyContent: "center",
        // m: "4vw",
        p: "3vw",
        // p: "20px",
        width: 1,
        boxShadow: 3,
      }}
    >
      <Typography variant="h2" sx={{ p: 1, fontWeight: "medium" }}>
        Significant Triggers
      </Typography>
      <Typography variant="h5" sx={{ p: 2 }}>
        These links show the relationship between your symptoms and your
        triggers based on the data you have provided
      </Typography>
      {/* <h1>Significant Triggers</h1> */}
      {/* <h2> </h2>  fontStyle: 'italic'
      <h3>
        These links show the relationship between your symptoms and your
        triggers based on the data you have provided
      </h3> */}
      <Typography variant="h" sx={{ p: 3, fontStyle: "italic" }}>
        Note: only triggers and symptoms with statistically significant
        relationships are shown.
      </Typography>
      <h1> </h1>
      <h1> </h1>

      {/* <h>
        Note: only triggers and symptoms with statistically significant
        relationships are shown.
      </h>
      <h4> </h4> */}
      <Box
        sx={{
          // border: 2,
          borderRadius: "16px",
          // m: "20px",
          // alignItems: "center",
          justifyContent: "center",
          // m: "3vh",
          p: "3vw",
          // p: "20px",
          width: 1,
          boxShadow: 3,
        }}
      >
        <Stack spacing={3} justifyContent="center" alignItems="center">
          {triggerIDs.map((i) => (
            <SignificantData
              key={i}
              trigger_id={i}
              selectChartCallback={props.selectChartCallback}
              symptomNames={symptomNames}
              // id={data.id}
              // symptomID={data.symptom_id}
              // triggerID={data.trigger_id}
              // presentMean={data.present_mean}
              // absentMean={data.absent_mean}
              // cohensD={data.cohens_d}
              // triggerName={getTriggerNameByID(data.trigger_id)}
            />
          ))}
          {/* </section> */}
        </Stack>
      </Box>
    </Box>
  );
};

export default DataOutput;
