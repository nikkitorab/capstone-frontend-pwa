import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// const data = [
//   {
//     name: "Page A",
//     uv: 4000,
//     pv: 2400,
//     amt: 2400,
//   },
//   {
//     name: "Page B",
//     uv: 3000,
//     pv: 1398,
//     amt: 2210,
//   },
//   {
//     name: "Page C",
//     uv: 2000,
//     pv: 9800,
//     amt: 2290,
//   },
//   {
//     name: "Page D",
//     uv: 2780,
//     pv: 3908,
//     amt: 2000,
//   },
//   {
//     name: "Page E",
//     uv: 1890,
//     pv: 4800,
//     amt: 2181,
//   },
//   {
//     name: "Page F",
//     uv: 2390,
//     pv: 3800,
//     amt: 2500,
//   },
//   {
//     name: "Page G",
//     uv: 3490,
//     pv: 4300,
//     amt: 2100,
//   },
// ];

const Chart = (props) => {
  // const [symptomNames, setSymptomNames] = useState([]);

  const data = props.chartData;
  // console.log(props.chartData)
  // const symptomNames = props.symptomNames;
  // console.log(`dddd ${data}`);

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
  //       // setSymptomNames(names);
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

  //   // getChartData(triggerData);

  //   //   getSymptomNameByID(id)
  // };
  // export default class Example extends PureComponent {
  // static demoUrl = 'https://codesandbox.io/s/simple-bar-chart-tpz8r';

  // ABSENT MEAN: AVERAGE SYMPTOM RATING WITHOUT TRIGGER

  // PRESENT MEAN: AVERAGE SYMPTOM RATING WITH TRIGGER
  return (
    <BarChart
      width={800}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="symptomName" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="Avg Symptom Rating Without Trigger" fill="#8884d8" />
      <Bar dataKey="Avg Symptom Rating With Trigger" fill="#82ca9d" />
    </BarChart>
  );
};

export default Chart;
