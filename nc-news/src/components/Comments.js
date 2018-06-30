import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import * as api from "../api";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Vote from "./Vote";
dayjs.extend(relativeTime);

class Comments extends Component {
  state = { comments: [], currentComment: "", update: false };

  componentDidMount() {
    const articleId = this.props.id;
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
    const articleId = this.props.id;
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
      <div id="central-column">
        {comments.map((comment, index) => {
          const { _id, votes, created_by, created_at, body } = comment;

          return (
            <div key={index}>
              <article>
                <div>
                  <button
                    className={index}
                    value={_id}
                    name="comments"
                    onClick={this.handleClick}
                  >
                    delete
                  </button>
                </div>
                <div>
                  <p>{body}</p>
                </div>
                <p>
                  <span>created {dayjs(created_at).fromNow()} </span>
                  <span>
                    {" "}
                    Author:{" "}
                    <Link to={`/users/${created_by}`}>{created_by}</Link>
                  </span>
                  <span>votes {votes}</span>
                </p>
              </article>
              <Vote
                index={index}
                id={_id}
                name="comments"
                handleClick={this.handleClick}
              />
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
