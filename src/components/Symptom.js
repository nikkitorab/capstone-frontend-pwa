import React from "react";

const Symptom = (props) => {
  const name = props.name;
  const id = props.id;

  const deleteSymptom = () => {
    props.deleteSymptomCallback(id);
  };

  return (
    <div>
      <h1>{name}</h1>
      <button onClick={deleteSymptom}>DELETE</button>
    </div>
  );
};

export default Symptom;
