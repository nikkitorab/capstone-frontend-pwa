import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const SignificantData = (props) => {
  const [triggerName, setTriggerName] = useState("");
  const [triggerData, setTriggerData] = useState([]);
  // const [chartData, setChartData] = useState([]);
  // const [symptomNames, setSymptomNames] = useState([]);

  const trigger_id = props.trigger_id;

  // selectChartCallback

  useEffect(() => {
    getTriggerNameByID();
    getTriggerData();
    // getChartData();
  }, []);

  const viewData = () => {
    // console.log("button clicked!");
    const chartData = getChartData();
    props.selectChartCallback(chartData);
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
        setTriggerData(response.data);
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

      const data = {
        // symptom: symptomNames[i], // get symptom name from symptom id
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
    return chartData;
    // setChartData(chartData);
    // console.log(`@@ ${chartData}`);
  };

  ///data/sig/trigger/:id

  return (
    <div>
      {/* <h1>{triggerName}</h1> */}
      <button onClick={viewData}>{triggerName}</button>
    </div>
  );
};

export default SignificantData;
