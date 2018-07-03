import React, { Component } from "react";
import * as api from "../api";
import { Redirect } from "react-router-dom";
import Articles from "./Articles";
import LoadSpinner from "./LoadSpinner";

class User extends Component {
  state = {
    user: {},
    articles: [],
    loaded: false
  };

  componentDidMount() {
    const username = this.props.match.params.username;
    api
      .fetchUser(username)
      .then(({ data }) => {
        this.setState({
          user: data.user,
          loaded: true
        });
      })
      .catch(err => {
        this.props.history.push("/404");
        this.setState({ invalidUrl: true });
      });
  }
  render() {
    const { avatar_url, username, name } = this.state.user;
    return this.state.invalidUrl ? (
      <Redirect to="/404" />
    ) : this.state.loaded ? (
      <div className="section">
        <div className="box">
          <article className="media">
            <div className="media-left">
              <figure className="image is-64x64">
                <img src={avatar_url} alt="users avatar" />
              </figure>
            </div>
            <div className="media-content">
              <div className="content">
                <p>
                  <strong>{name}</strong> <small>{username}</small> <br />
                  Below are a list of {username}'s articles
                </p>
              </div>
              <nav className="level is-mobile">
                <div className="level-left" />
              </nav>
            </div>
          </article>
        </div>
        <Articles userName={username} />
      </div>
    ) : (
      <LoadSpinner />
    );
  }
}

export default User;
