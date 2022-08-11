import React from "react";
// import { useLocation } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const DataOutput = (props) => {
  // const location = useLocation();
  // const data = location.state;
  // const [data, setEntriesData] = useState([]);

  const getData = () => {
    props.getEntriesData();
  };
  const data = props.data;

  const getEntriesDataByTrigger = (triggerID) => {
    axios
      .get(`http://localhost:3000/entries/triggers/${triggerID}`)
      .then((response) => {
        // MAKE THE DATA VISUALIZATION
      })
      .catch((error) => {
        console.log("cant get ur entry data :/ ");
      });
  };

  // console.log(data);

  // const organizedData = {};
  // for (const entry of data) {
  //   if (entry.trigger_present_count === 0 || entry.trigger_absent_count === 0) {
  //     continue;
  //   }

  //   const presentMean = entry.trigger_present / entry.trigger_present_count;
  //   const absentMean = entry.trigger_absent / entry.trigger_absent_count;

  //   const symptomIdStr = entry.symptom_id.toString();
  //   const triggerIdStr = entry.trigger_id.toString();
  //   // const t = entry.trigger_id;
  //   console.log(`strrrr: ${triggerIdStr}`);

  //   if (symptomIdStr in organizedData) {
  //     organizedData.symptomIdStr[triggerIdStr] = {
  //       present: presentMean,
  //       absent: absentMean,
  //     };
  //   } else {
  //     organizedData.symptomIdStr = {
  //       t: { present: presentMean, absent: absentMean },
  //     };
  //   }
  //   console.log(organizedData.symptomIdStr);
  // }

  // for (const d of organizedData) {
  //   console.log(d);
  // }

  return (
    <div>
      <h1> DataOutput!!!!!</h1>
    </div>
  );
};

export default DataOutput;
