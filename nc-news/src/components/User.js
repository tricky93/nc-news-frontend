import React, { Component } from "react";
import * as api from "../api";
import Articles from "./Articles";

class User extends Component {
  state = {
    user: {},
    articles: []
  };

  componentDidMount() {
    const username = this.props.match.params.username;
    api
      .fetchUser(username)
      .then(({ data }) => {
        this.setState({
          user: data.user
        });
      })
      .catch(console.log);
  }
  render() {
    const { avatar_url, username, name } = this.state.user;
    return (
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
    );
  }
}

export default User;
