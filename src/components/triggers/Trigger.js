import React from "react";
import Button from "@mui/material/Button";

const Trigger = (props) => {
  const name = props.name;
  const id = props.id;

  const deleteTrigger = () => {
    props.deleteTriggerCallback(id);
  };

  return (
    <div>
      <h> {name} </h>
      <Button variant="outlined" onClick={deleteTrigger}>
        DELETE
      </Button>
      {/* <button onClick={deleteTrigger}>DELETE</button> */}
    </div>
  );
};

export default Trigger;
