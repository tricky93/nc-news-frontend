import React, { Component } from "react";
import axios from "axios";
import * as api from "../api";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Vote from "./Vote";
dayjs.extend(relativeTime);

class Comments extends Component {
  state = { comments: [], currentComment: "", update: false };

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
    if (this.state.update !== prevState.update) {
      api
        .fetchCommentsByArticle(articleId)
        .then(comments => {
          this.setState({ comments, update: false });
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
            <div key={index}>
              <div>
                <p>{comment.body}</p>
                <p>
                  <span>created {dayjs(comment.created_at).fromNow()} </span>
                  <span>author {comment.created_by} </span>
                  <span>votes {comment.votes}</span>
                </p>
              </div>
              <Vote
                index={index}
                id={id}
                name="comments"
                handleClick={this.handleClick}
              />
              {/* <button
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
              </button> */}
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
    action === "delete" ? this.deleteComment(e) : this.changeVote(e);
  };

  deleteComment = e => {
    const commentId = e.target.value;
    if (window.confirm("Do you really want to delete this comment?")) {
      axios.delete(
        `https://nc-news-portfolio.herokuapp.com/api/comments/${commentId}`
      );
      this.setState({
        currentComment: `${commentId}`,
        update: true
      });
      window.alert("Comment will be deleted");
    }
  };

  changeVote = e => {
    const collection = e.target.name;
    const id = e.target.value;
    const voteType = e.target.innerText;
    api.modifyVotes(collection, id, voteType);
    const key = e.target.className;
    const voteModify = e.target.innerText === "up" ? 1 : -1;
    const updatedComments = this.state.comments.map((comment, index) => {
      const newComment = { ...comment };
      if (index === key) {
        comment.votes += voteModify;
      }
      return newComment;
    });
    this.setState({ comments: updatedComments, update: true });
  };
}

export default Comments;
