import React from "react";
// import { useLocation } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Trigger from "../triggers/Trigger";
import SignificantData from "./SignificantData";

const DataOutput = (props) => {
  // const triggersData = props.triggersData;
  // const symptomsData = props.symptomsData;
  // const [significantData, setSignificantData] = useState([]);
  // const [mostSignificant, setMostSignificant] = useState([]);
  // const [triggerDataComponents, setTriggerDataComponents] = useState([]);
  // const [triggerName, setTriggerName] = useState("");
  const [symptomNames, setSymptomNames] = useState("");

  const [triggerIDs, setTriggerIDs] = useState([]);

  // useEffect(() => {
  //   getDataFromAPI();
  // }, []);

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

        // setSignificantData(response.data);
        // console.log(`sig: ${significantData}`);
      })
      .catch((error) => {
        console.log(`error!!! ${error}`);
      });
  };

  // const getTriggerNameByID = (id) => {
  //   axios
  //     .get(`http://localhost:3000/triggers/name/${id}`)
  //     .then((response) => {
  //       // setTriggersData(response.data);
  //       console.log(`name from app: ${response.data[0].name}`);
  //       // console.log(`id from app: ${response.data.id}`);
  //       setTriggerName(response.data[0].name);
  //     })
  //     .catch((error) => {
  //       console.log("cant get ur symptoms :/ ");
  //     });
  // };

  // const getTriggerName = (id) => {
  //   const name = props.getTriggerByIDCallback(id);
  //   console.log(`name: ${name}`);
  //   return name;
  // };

  // const getMostSignificantTriggers = () => {
  //   const groupedData = {};

  //   for (const data of significantData) {
  //     if (groupedData[data.trigger_id]) {
  //       groupedData[data.trigger_id].push(data);
  //     } else {
  //       groupedData[data.trigger_id] = [data];
  //     }
  //   }

  //   const sortedData = [];
  //   for (const trigger in groupedData) {
  //     console.log(`*** ${groupedData[trigger]}`);
  //     sortedData.push([groupedData[trigger]]);
  //   }

  //   sortedData.sort((a, b) => a.length - b.length);
  //   console.log(`&&&&&&& ${sortedData}`);
  //   // setMostSignificant(sortedData);
  //   setSignificantData(sortedData);
  //   console.log(`sorted: ${sortedData}`);

  //   for (const d of sortedData) {
  //     console.log(`ddddd ${d}`);
  //   }
  // };

  // const makeComponents = () => {
  //   const components = {};
  //   console.log("in func");
  //   for (const data of significantData) {
  //     // console.log(`make: ${data.id}`);
  //     if (components[data.trigger_id]) {
  //       components[data.trigger_id].push(data.id);
  //     } else {
  //       components[data.trigger_id] = [data.id];
  //     }
  //     console.log(`!!! ${components[data.trigger_id]}`);
  //   }

  //   for (const x of components) {
  //     console.log(`x: ${x}`);
  //   }
  //   // list of all data IDs
  // };

  // console.log(`signnnn = ${mostSignificant[0].trigger_id}`);

  return (
    <div>
      <h1> DataOutput!!!!!</h1>
      <h2>{triggerIDs.length}</h2>
      {/* <button onClick={getIDLists}>DELETE</button> */}
      <section>
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
      </section>
    </div>
  );
};

export default DataOutput;
