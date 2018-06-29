import React, { Component } from "react";
import axios from "axios";
import * as api from "../api";

class Comments extends Component {
  state = { comments: [], currentComment: "" };

  componentDidMount() {
    const articleId = this.props.match.params.article_id;
    api
      .fetchCommentsByArticle(articleId)
      .then(comments => {
        this.setState({
          comments
        });
      })
      .catch(console.log);
  }

  componentDidUpdate(prevProps, prevState) {
    const articleId = this.props.match.params.article_id;
    if (this.state !== prevState) {
      api
        .fetchCommentsByArticle(articleId)
        .then(comments => {
          this.setState({
            comments
          });
        })
        .catch(console.log);
    }
  }

  render() {
    const { comments } = this.state;
    return (
      <div>
        <h1>name of article</h1>
        {comments.map((comment, index) => {
          const id = comment._id;
          return (
            <div>
              <div>
                <p>{comment.body}</p>
                <p>
                  <span>created {comment.created_at} </span>
                  <span>author {comment.created_by} </span>
                  <span>votes {comment.votes}</span>
                </p>
              </div>
              <button
                className={index}
                value={id}
                name="comments"
                onClick={this.handleClick}
              >
                up
              </button>
              <button
                className={index}
                value={id}
                name="comments"
                onClick={this.handleClick}
              >
                down
              </button>
              <button
                className={index}
                value={id}
                name="comments"
                onClick={this.handleClick}
              >
                delete
              </button>
            </div>
          );
        })}
      </div>
    );
  }

  handleClick = e => {
    const action = e.target.innerText;
    if (action === "delete") this.deleteComment(e);
    else this.changeVote(e);
  };

  deleteComment = e => {
    const commentId = e.target.value;
    if (window.confirm("Do you really want to delete this comment?")) {
      axios.delete(
        `https://nc-news-portfolio.herokuapp.com/api/comments/${commentId}`
      );
      this.setState({
        currentComment: `${commentId}`
      });
      window.alert("Comment will be deleted");
    }
  };

  changeVote = e => {
    const endpoint = e.target.name;
    const id = e.target.value;
    const voteType = e.target.innerText;
    api.modifyVotes(endpoint, id, voteType);
    const key = e.target.className;
    const voteModify = e.target.innerText === "up" ? 1 : -1;
    const updatedComments = this.state.comments.map((comment, index) => {
      const newComment = { ...comment };
      if (index === key) {
        comment.votes += voteModify;
      }
      return newComment;
    });
    this.setState({ comments: updatedComments });
  };
}

export default Comments;
