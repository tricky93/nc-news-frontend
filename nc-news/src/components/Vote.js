import React from "react";

const Vote = props => {
  return (
    <div className="voteButtons">
      <button
        className={props.index}
        class="button is-small is-success is-outlined"
        value={props.id}
        name={props.name}
        onClick={props.handleClick}
      >
        <span>⬆️</span>
      </button>
      <button
        className={props.index}
        class="button is-small is-danger is-outlined"
        value={props.id}
        name={props.name}
        onClick={props.handleClick}
      >
        <span>⬇️</span>
      </button>
    </div>
  );
};

export default Vote;
