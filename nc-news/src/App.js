import React, { Component } from "react";
import "./App.css";
import { Route, NavLink } from "react-router-dom";
import Articles from "./components/Articles";
import Article from "./components/Article";
import User from "./components/User";
import Topic from "./components/Topic";
import Comments from "./components/Comments";
import Homepage from "./components/Homepage";

class App extends Component {
  state = {
    view: ""
  };
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">NC News</h1>
        </header>
        <div id="search">
          <ul>
            <NavLink to="/articles">
              <li> All</li>
            </NavLink>
            <NavLink to="/topics/cooking">
              <li>Cooking</li>
            </NavLink>
            <NavLink to="/topics/coding">
              <li> Coding</li>
            </NavLink>
            <NavLink to="/topics/football">
              <li> Football</li>
            </NavLink>
            <NavLink to="/">
              <li> Home</li>
            </NavLink>
          </ul>
        </div>
        <div id="wrapper">
          <Route exact path="/" component={Homepage} />
          <Route exact path="/articles" component={Articles} />
          <Route exact path="/articles/:article_id" component={Article} />
          <Route
            exact
            path="/articles/:article_id/comments"
            component={Comments}
          />
          <Route exact path="/users/:username" component={User} />
          <Route exact path="/topics/:topic" component={Topic} />
        </div>
      </div>
    );
  }
}

export default App;
