import React, { Component } from "react";
import "./App.css";
import { Route, NavLink } from "react-router-dom";
import logo from "./images/logo.png";
import Articles from "./components/Articles";
import Article from "./components/Article";
import User from "./components/User";
import Topic from "./components/Topic";
import Comments from "./components/Comments";
import Homepage from "./components/Homepage";
import Navigation from "./components/Navigation";
import Errorpage from "./components/ErrorPage";

class App extends Component {
  render() {
    return (
      <div>
        <header className="navbar is-fixed-top has-background-black-ter">
          <div className="navbar-brand">
            <NavLink to="/">
              <img src={logo} alt="Northcoders logo" />
            </NavLink>
          </div>
          <div className="navbar-item">
            <Navigation />
          </div>
        </header>
        <div id="wrapper">
          <div className="has-navbar-fixed-top container is-fluid">
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
            <Route exact path="/404" component={Errorpage} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
