import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Chart from "./Chart";

const SignificantData = (props) => {
  const [triggerName, setTriggerName] = useState("");
  const [triggerData, setTriggerData] = useState([]);

  const [showChart, setShowChart] = useState(false);
  const [chartData, setChartData] = useState("");
  // const [chartData, setChartData] = useState([]);
  const [symptomNames, setSymptomNames] = useState(props.symptomNames);

  const trigger_id = props.trigger_id;
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
    // let i = 0;
    // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!");
    for (const d of triggerData) {
      // console.log(`name: ${symptomNames[i]}`);
      // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!");
      // get symptom name from symptom id
      // getSymptomNameByID(d.symptom_id);

      // console.log(`names: ${props.symptomNames[0][67]}`);

      const data = {
        symptomName: props.symptomNames[d.symptom_id], // get symptom name from symptom id
        trigger: triggerName,
        trigger_id: d.trigger_id,
        symptom_id: d.symptom_id,
        absent_mean: d.absent_mean,
        present_mean: d.present_mean,
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

  return (
    <div>
      {/* <h1>{triggerName}</h1> */}
      <button onClick={viewData}>{triggerName}</button>
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
      {showChart && (
        <Chart
          chartData={chartData}
          symptomNames={symptomNames}
          // trigger_id={trigger_id}
          // getTriggerByIDCallback={getTriggerNameByID}
          // getEntriesDataCallback={getEntriesData}
          // data={entriesData}
        ></Chart>
      )}
    </div>
  );
};

export default SignificantData;
