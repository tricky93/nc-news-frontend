import React, { Component } from "react";
import * as api from "../api";

class AddComment extends Component {
  state = {
    //default user is set to jessJelly
    body: "",
    belongs_to: this.props.articleTitle
  };
  render() {
    return (
      <div>
        <h1 className="has-text-white">Post a comment</h1>
        <input placeholder="username" />
        <input
          className="input is-large"
          onChange={this.handleChange}
          type="textbox"
          placeholder="comment here"
          value={this.state.body}
          required
        />

        <button
          class="button is-outlined is-dark is-small"
          onClick={this.handleClick}
        >
          Submit
        </button>
      </div>
    );
  }

  handleChange = e => {
    this.setState({ body: e.target.value });
  };
  handleClick = e => {
    const newComment = {
      body: this.state.body,
      created_by: "jessJelly",
      belongs_to: this.state.belongs_to
    };
    if (window.confirm("Are you sure you want to post this comment?")) {
      const articleId = this.props.articleId;
      api
        .postAComment(articleId, newComment)
        .then(alert("Your comment was posted"))
        .catch(console.log);
      this.setState({
        body: ""
      });
    }
  };
}

export default AddComment;
