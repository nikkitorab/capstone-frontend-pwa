import React from "react";

const Trigger = (props) => {
  const name = props.name;
  const id = props.id;

  const deleteTrigger = () => {
    props.deleteTriggerCallback(id);
  };

  return (
    <div>
      <h1>{name}</h1>
      <button onClick={deleteTrigger}>DELETE</button>
    </div>
  );
};

export default Trigger;
