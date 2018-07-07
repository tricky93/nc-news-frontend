import React, { Component } from "react";
import * as api from "../api";

class AddComment extends Component {
  state = {
    //default user is set to jessJelly
    body: "",
    belongs_to: this.props.articleTitle,
    modalStyle: "modal is-active"
  };
  render() {
    return (
      <div class={this.state.modalStyle}>
        <div class="modal-background" />
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Post Comment</p>
            <button
              className="delete"
              aria-label="close"
              onClick={this.handleClick}
            />
          </header>
          <section class="modal-card-body">
            <textarea
              className="textarea"
              placeholder="your comment here"
              value={this.state.body}
              onChange={this.handleChange}
            />
          </section>
          <footer class="modal-card-foot">
            <button onClick={this.handleClick} class="button is-success">
              Post
            </button>
            <button onClick={this.handleClick} class="button">
              Cancel
            </button>
          </footer>
        </div>
      </div>
    );
  }

  handleChange = e => {
    this.setState({ body: e.target.value });
  };
  handleClick = e => {
    if (this.state.body && e.target.innerText === "Post") {
      const newComment = {
        body: this.state.body,
        created_by: "jessJelly",
        belongs_to: this.state.belongs_to
      };
      const articleId = this.props.articleId;
      api.postAComment(articleId, newComment).catch(console.log);
      this.setState({
        body: "",
        modalStyle: "modal"
      });
      this.props.postComment();
    } else if (
      e.target.innerText === "Cancel" ||
      e.target.className === "delete"
    ) {
      this.setState({ body: "", modalStyle: "modal" });
    }
  };
}

export default AddComment;
