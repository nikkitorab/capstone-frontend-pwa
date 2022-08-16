import React from "react";
import "./App.css";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import { BrowserRouter } from "react-router-dom";
// import { Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import Home from "./components/screens/Home";
import Lists from "./components/screens/Lists";
import AddMenu from "./components/screens/AddMenu";

import DataOutput from "./components/data/DataOutput";
import Chart from "./components/data/Chart";

// import DataO from "./components/screens/Settings";
import Entries from "./components/screens/Entries";

// import { Link, Route } from "react-router-dom";

const App = () => {
  const [symptomsData, setSymptomsData] = useState([]);
  const [triggersData, setTriggersData] = useState([]);

  useEffect(() => {
    getSymptomsFromAPI();
    getTriggersFromAPI();
  }, []);

  const getTriggersData = () => {
    return triggersData;
  };

  const selectTriggerEntries = () => {
    const entryScreen = (
      <Entries
        symptomsData={symptomsData}
        selection={"TriggerEntries"}
        getSymptomsCallback={getSymptomsFromAPI}
        triggersData={triggersData}
        getTriggersCallback={getTriggersFromAPI}
        getTriggersData={getTriggersData}
      ></Entries>
    );
    setSelectedScreen(entryScreen);
    console.log("selected entry");
  };

  const selectSymptomEntries = () => {
    const entryScreen = (
      <Entries
        symptomsData={symptomsData}
        selection={"SymptomEntries"}
        getSymptomsCallback={getSymptomsFromAPI}
        triggersData={triggersData}
        getTriggersCallback={getTriggersFromAPI}
      ></Entries>
    );
    setSelectedScreen(entryScreen);
    console.log("selected entry");
  };

  const homeScreen = (
    <Home
      triggerEntriesCallback={selectTriggerEntries}
      symptomEntriesCallback={selectSymptomEntries}
    ></Home>
  );
  const [selectedScreen, setSelectedScreen] = useState(homeScreen);

  // const [entriesData, setEntriesData] = useState([]);

  // useEffect(() => {
  //   getEntriesData();
  // }, []);

  // const getEntriesData = () => {
  //   axios
  //     .get("http://localhost:3000/entries")
  //     .then((response) => {
  //       setEntriesData(response.data);
  //       // console.log(`entries data: ${entriesData}`);
  //       for (const entry of entriesData) {
  //         console.log(entry);
  //       }
  //     })
  //     .catch((error) => {
  //       console.log("cant get ur entry data :/ ");
  //     });
  // };

  // useEffect(() => {
  //   getSymptomsFromAPI();
  // }, []);

  // API - GET
  const getSymptomsFromAPI = () => {
    axios
      .get("http://localhost:3000/symptoms")
      .then((response) => {
        setSymptomsData(response.data);
      })
      .catch((error) => {
        console.log("cant get ur symptoms :/ ");
      });
    // return symptomsData;
  };

  // API - POST
  const addNewSymptom = (data) => {
    console.log(data);
    axios
      .post("http://localhost:3000/symptoms", data)
      .then((response) => {
        getSymptomsFromAPI();
        // setSymptomsData(response.data);
      })
      .catch((error) => {
        console.log("COULDN'T MAKE A new symptom ");
      });
  };

  // API - DELETE
  const deleteSymptom = (id) => {
    // delete all entries associated with the symptom --> deleteEntries
    axios
      .delete(`http://localhost:3000/symptoms/${id}`)
      .then((response) => {
        const updatedSymptoms = symptomsData.filter(
          (symptom) => symptom.id !== id
        );
        setSymptomsData(updatedSymptoms);
      })
      .catch((error) => {
        console.log("Unable to delete");
      });
  };

  // API - GET
  const getTriggersFromAPI = () => {
    axios
      .get("http://localhost:3000/triggers")
      .then((response) => {
        setTriggersData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log("cant get ur triggers :/ ");
      });
  };

  // API - GET
  const getTriggerNameByID = (id) => {
    axios
      .get(`http://localhost:3000/triggers/name/${id}`)
      .then((response) => {
        // setTriggersData(response.data);
        // console.log(`name from app: ${response.body.name}`);
        // console.log(`id from app: ${response.data.id}`);
        return response.data.name;
      })
      .catch((error) => {
        console.log("cant get ur symptoms :/ ");
      });
  };

  const addNewTrigger = (data) => {
    console.log(data);
    axios
      .post("http://localhost:3000/triggers", data)
      .then((response) => {
        getTriggersFromAPI();
      })
      .catch((error) => {
        console.log("COULDN'T MAKE A new trigger ");
      });
  };

  // API - DELETE
  const deleteTrigger = (id) => {
    axios
      .delete(`http://localhost:3000/triggers/${id}`)
      .then((response) => {
        const updatedTriggers = triggersData.filter(
          (trigger) => trigger.id !== id
        );
        setTriggersData(updatedTriggers);
      })
      .catch((error) => {
        console.log("Unable to delete");
      });
  };

  // const [entries, setEntries] = useState[[]];
  // // useEffect(() => {
  // //   getSymptomEntriesFromAPI();
  // // }, []);

  const selectHome = () => {
    setSelectedScreen(homeScreen);
    console.log("selected home");
  };

  const selectLists = () => {
    const listsScreen = (
      <Lists
        symptomsData={symptomsData}
        getSymptomsCallback={getSymptomsFromAPI}
        addSymptomCallback={addNewSymptom}
        deleteSymptomCallback={deleteSymptom}
        triggersData={triggersData}
        getTriggersCallback={getTriggersFromAPI}
        addNewTriggerCallback={addNewTrigger}
        deleteTriggerCallback={deleteTrigger}
      ></Lists>
    ); // add props
    setSelectedScreen(listsScreen);
    console.log("selected lists");
  };

  const selectAdd = () => {
    const addScreen = <AddMenu> </AddMenu>;
    setSelectedScreen(addScreen);
    console.log("selected add");
  };

  const selectChart = (chartData, symptomNames) => {
    const chartScreen = (
      <Chart
        chartData={chartData}
        symptomNames={symptomNames}
        // trigger_id={trigger_id}
        // getTriggerByIDCallback={getTriggerNameByID}
        // getEntriesDataCallback={getEntriesData}
        // data={entriesData}
      ></Chart>
    );
    setSelectedScreen(chartScreen);
  };

  const selectData = () => {
    const dataScreen = (
      <DataOutput
        symptomsData={symptomsData}
        triggersData={triggersData}
        getTriggerByIDCallback={getTriggerNameByID}
        selectChartCallback={selectChart}
        // getEntriesDataCallback={getEntriesData}
        // data={entriesData}
      ></DataOutput>
    );
    setSelectedScreen(dataScreen);
    console.log("selected data");
  };

  // const selectTriggerEntries = () => {
  //   const entryScreen = (
  //     <Entries
  //       symptomsData={symptomsData}
  //       selection={"TriggerEntries"}
  //       getSymptomsCallback={getSymptomsFromAPI}
  //       triggersData={triggersData}
  //       getTriggersCallback={getTriggersFromAPI}
  //     ></Entries>
  //   );
  //   setSelectedScreen(entryScreen);
  //   console.log("selected entry");
  // };

  // const selectSymptomEntries = () => {
  //   const entryScreen = (
  //     <Entries
  //       symptomsData={symptomsData}
  //       selection={"SymptomEntries"}
  //       getSymptomsCallback={getSymptomsFromAPI}
  //       triggersData={triggersData}
  //       getTriggersCallback={getTriggersFromAPI}
  //     ></Entries>
  //   );
  //   setSelectedScreen(entryScreen);
  //   console.log("selected entry");
  // };

  return (
    <div className="App">
      {/* <section>{selectedScreen === "home" && <Home> </Home>}</section> */}
      <section>{selectedScreen}</section>

      <Navbar bg="light" variant="light" fixed="bottom">
        <Nav className="me-auto">
          <button onClick={selectHome}>home</button>
          <button onClick={selectLists}>lists</button>
          <button onClick={selectAdd}>add</button>
          <button onClick={selectData}>data</button>
          <button onClick={selectTriggerEntries}>entries</button>
        </Nav>
      </Navbar>
    </div>
  );
};

export default App;

// {selectedBoard && (
//   <CardList
//     boardID={selectedBoard}
//     cards={cardsData}
//     deleteCardCallback={deleteCardFromBoard}
//     addLikeCallback={addLikeToCard}
//     handleSortAlphabetically={handleSortAlphabetically}
//     handleSortById={handleSortById}
//     handleSortByUpvotes={handleSortByUpvotes}
//   ></CardList>
// )}
