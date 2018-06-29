import React from "react";

const Vote = props => {
  return (
    <div>
      <button
        className={props.index}
        value={props.id}
        name={props.name}
        onClick={props.handleClick}
      >
        up
      </button>
      <button
        className={props.index}
        value={props.id}
        name={props.name}
        onClick={props.handleClick}
      >
        down
      </button>
    </div>
  );
};

export default Vote;
