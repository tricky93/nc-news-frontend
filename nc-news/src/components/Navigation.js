import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <div>
      <h3>
        <NavLink to="/articles">
          <span> All </span>
        </NavLink>
        <NavLink to="/topics/cooking">
          <span>Cooking </span>
        </NavLink>
        <NavLink to="/topics/coding">
          <span> Coding </span>
        </NavLink>
        <NavLink to="/topics/football">
          <span> Football </span>
        </NavLink>
      </h3>
    </div>
  );
};

export default Navigation;
