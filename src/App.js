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
// import DataO from "./components/screens/Settings";
import SymptomEntries from "./components/symptoms/SymptomEntries";

// import { Link, Route } from "react-router-dom";

const App = () => {
  const homeScreen = <Home> </Home>;
  const [selectedScreen, setSelectedScreen] = useState(homeScreen);

  const [symptomsData, setSymptomsData] = useState([]);
  const [triggersData, setTriggersData] = useState([]);

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

  useEffect(() => {
    getSymptomsFromAPI();
  }, []);

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
  };

  useEffect(() => {
    getTriggersFromAPI();
  }, []);

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
        console.log(`name from app: ${response.body.name}`);
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

  const selectData = () => {
    const dataScreen = (
      <DataOutput
        symptomsData={symptomsData}
        triggersData={triggersData}
        getTriggerByIDCallback={getTriggerNameByID}
        // getEntriesDataCallback={getEntriesData}
        // data={entriesData}
      ></DataOutput>
    );
    setSelectedScreen(dataScreen);
    console.log("selected data");
  };

  const selectEntries = () => {
    const entryScreen = <SymptomEntries></SymptomEntries>;
    setSelectedScreen(entryScreen);
    console.log("selected entry");
  };

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
          <button onClick={selectEntries}>entries</button>
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
