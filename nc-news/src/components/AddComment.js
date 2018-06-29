import React, { Component } from "react";
import axios from "axios";

class AddComment extends Component {
  state = {
    body: "",
    created_by: "jessJelly",
    belongs_to: this.props.articleTitle
  };
  render() {
    return (
      <div>
        <h1>+ comment</h1>
        <input
          onChange={this.handleChange}
          type="textbox"
          placeholder="comment here"
          value={this.state.body}
          required
        />
        <input placeholder="username" />
        <p>commenting on {this.props.articleTitle}</p>
        <button onClick={this.handleClick}>Submit</button>
      </div>
    );
  }

  handleChange = e => {
    this.setState({ body: e.target.value });
  };
  handleClick = e => {
    const newComment = {
      body: this.state.body,
      created_by: this.state.created_by,
      belongs_to: this.state.belongs_to
    };
    if (window.confirm("Are you sure you want to post this comment?")) {
      const articleId = this.props.articleId;
      axios
        .post(
          `https://nc-news-portfolio.herokuapp.com/api/articles/${articleId}/comments`,
          newComment
        )
        .then(alert("Your comment was posted"))
        .catch(console.log);
    }
  };
}

export default AddComment;
