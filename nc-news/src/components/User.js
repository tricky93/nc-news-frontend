import React, { Component } from "react";
import axios from "axios";

class User extends Component {
  state = {
    user: {}
  };
  componentDidMount() {
    const username = this.props.match.params.username;
    axios
      .get(`https://nc-news-portfolio.herokuapp.com/api/users/${username}`)
      .then(({ data }) => {
        this.setState({
          user: data.user
        });
      });
  }
  render() {
    const { avatar_url, username, name } = this.state.user;
    return (
      <div>
        <h1>{name}</h1>
        <h2>{username}</h2>
        <img src={avatar_url} />
      </div>
    );
  }
}

export default User;
