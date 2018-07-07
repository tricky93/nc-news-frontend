import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <div>
      <h3>
        <NavLink to="/articles" activeClassName="selected">
          <span> All </span>
        </NavLink>
        <NavLink to="/topics/cooking" activeClassName="selected">
          <span>Cooking </span>
        </NavLink>
        <NavLink to="/topics/coding" activeClassName="selected">
          <span> Coding </span>
        </NavLink>
        <NavLink to="/topics/football" activeClassName="selected">
          <span> Football </span>
        </NavLink>
      </h3>
    </div>
  );
};

export default Navigation;
