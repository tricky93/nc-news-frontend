import React from "react";

const Vote = props => {
  return (
    <div>
      <button
        className={props.index}
        class="button is-small is-success is-outlined"
        value={props.id}
        name={props.name}
        onClick={props.handleClick}
      >
        up
      </button>
      <button
        className={props.index}
        class="button is-small is-danger is-outlined "
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
