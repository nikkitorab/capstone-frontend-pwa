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
      <Button
        onClick={deleteTrigger}
        size="large"
        variant="contained"
        sx={{
          color: "#383B49",
          backgroundColor: "#BBC5F2",
          borderColor: "#C7D4F0",
        }}
      >
        DELETE
      </Button>
      {/* <button onClick={deleteTrigger}>DELETE</button> */}
    </div>
  );
};

export default Trigger;
