import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Chart from "./Chart";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

const SignificantData = (props) => {
  const [triggerName, setTriggerName] = useState("");
  const [triggerData, setTriggerData] = useState([]);

  const [showChart, setShowChart] = useState(false);
  const [chartData, setChartData] = useState("");
  // const [chartData, setChartData] = useState([]);
  const [symptomNames, setSymptomNames] = useState(props.symptomNames);

  // const [open, setOpen] = useState(false);

  // const handleOpen = () => setOpen(true);
  const handleClose = () => setShowChart(false);

  const trigger_id = props.trigger_id;

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 900,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  // const symptomNames = props.symptomNames;

  // selectChartCallback

  useEffect(() => {
    getTriggerNameByID();
    getTriggerData();
    // getChartData();
  }, []);

  const toggleChart = () => {
    setShowChart(!showChart);
  };

  const viewData = () => {
    // const chartData = getChartData();
    getChartData();
    toggleChart();
    // setShowChart(!showChart);
    // props.selectChartCallback(chartData, props.symptomNames);
  };

  const getTriggerNameByID = () => {
    // const id = props.id;
    axios
      .get(`http://localhost:3000/triggers/name/${trigger_id}`)
      .then((response) => {
        // setTriggersData(response.data);
        // console.log(`name from app: ${response.data[0].name}`);
        // console.log(`id from app: ${response.data.id}`);
        setTriggerName(response.data[0].name);
      })
      .catch((error) => {
        console.log("cant get ur symptoms :/ ");
      });
  };

  // const getSymptomNameByID = (id) => {
  //   // const id = props.id;
  //   axios
  //     .get(`http://localhost:3000/symptoms/name/${id}`)
  //     .then((response) => {
  //       // setTriggersData(response.data);
  //       // console.log(`name from app: ${response.data[0].name}`);
  //       // console.log(`id from app: ${response.data.id}`);

  //       const names = [...symptomNames];
  //       names.push(response.data[0].name);
  //       setSymptomNames(names);
  //       // setSymptomName(response.data[0].name);
  //     })
  //     .catch((error) => {
  //       console.log("cant get ur symptoms :/ ");
  //     });

  //   // getChartData(response.data);
  // };

  // const getAllSymptomNames = (triggerData) => {
  //   for (const t of triggerData) {
  //     getSymptomNameByID(t.symptom_id);
  //   }

  //   getChartData(triggerData);

  //   //   getSymptomNameByID(id)
  // };

  const getTriggerData = () => {
    // const id = props.id;
    axios
      .get(
        `http://localhost:3000/related-entries/data/sig/trigger/${trigger_id}`
      )
      .then((response) => {
        // setTriggersData(response.data);
        // console.log(`name from app: ${response.data[0].name}`);
        // console.log(`id from app: ${response.data.id}`);
        // console.log(response.data);
        const data = [];
        for (const row of response.data) {
          // const id = row.id
          const rowData = {};
          const name = props.symptomNames[row.symptom_id];
          rowData["id"] = row.id;
          // rowData["symptom_id"] = row.symptom_id; present_mean
          rowData["trigger_id"] = row.trigger_id;
          rowData["present_mean"] = row.present_mean;
          rowData["absent_mean"] = row.absent_mean;
          rowData["cohens_d"] = row.cohens_d;
          rowData["symptom_id"] = row.symptom_id;
          rowData["symptomName"] = name;
          data.push(rowData);
        }
        console.log("!!!!!");
        console.log(data);

        // setTriggerData(response.data);
        setTriggerData(data);
        // getAllSymptomNames(response.data);
        // getAllSymptomNames()
        // getChartData(response.data);
      })
      .catch((error) => {
        console.log("cant get ur symptoms :/ ");
      });
  };

  const getChartData = () => {
    const chartData = [];

    for (const d of triggerData) {
      const data = {
        symptomName: props.symptomNames[d.symptom_id], // get symptom name from symptom id
        trigger: triggerName,
        trigger_id: d.trigger_id,
        symptom_id: d.symptom_id,
        "Avg Symptom Rating Without Trigger": d.absent_mean,
        "Avg Symptom Rating With Trigger": d.present_mean,
        cohens_d: d.cohens_d,
      };
      chartData.push(data);
      // i += 1;
    }
    // return chartData;
    setChartData(chartData);
    // setChartData(chartData);
    // console.log(`@@ ${chartData}`);
  };

  ///data/sig/trigger/:id
  // relationship between x trigger and your symptoms
  /// Relationships between "X" and Symptoms
  //placeholder: these links show the relationship between your symptoms and your triggers based on the data you have provided
  //These links show the relationship between your symptoms and your triggers, based on the data that you have provided.
  //Note: only triggers and symptoms with statistically significant relationships are shown.
  //
  //
  return (
    <div>
      {/* <h1>{triggerName}</h1> */}
      <Button variant="outlined" onClick={viewData}>
        {triggerName}
      </Button>

      <Modal
        open={showChart}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1> Relationships between {triggerName} and Symptoms:</h1>
          <Chart
            chartData={chartData}
            symptomNames={symptomNames}
            // trigger_id={trigger_id}
            // getTriggerByIDCallback={getTriggerNameByID}
            // getEntriesDataCallback={getEntriesData}
            // data={entriesData}
          ></Chart>
        </Box>
      </Modal>
      {/* {showChart ? (
        <Chart
          // toggle={toggleChart}
          chartData={chartData}
          symptomNames={symptomNames}
          // trigger_id={trigger_id}
          // getTriggerByIDCallback={getTriggerNameByID}
          // getEntriesDataCallback={getEntriesData}
          // data={entriesData}
        ></Chart>
      ) : null} */}
      {/* {showChart && (
        <Chart
          chartData={chartData}
          symptomNames={symptomNames}
          // trigger_id={trigger_id}
          // getTriggerByIDCallback={getTriggerNameByID}
          // getEntriesDataCallback={getEntriesData}
          // data={entriesData}
        ></Chart>
      )} */}
    </div>
  );
};

export default SignificantData;
