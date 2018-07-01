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
    const articleId = this.props.match.params.article_id;
    console.log(this.props);
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
    return this.state.comments[0] ? (
      <div>
        {comments[0] && (
          <h1 className="title has-text-white">{comments[0].belongs_to}</h1>
        )}
        {comments.map((comment, index) => {
          const { _id, votes, created_by, created_at, body } = comment;
          const voteStyle = votes < 0 ? "redVote" : "greenVote";
          return (
            <div key={index} className="box has-background-black-ter">
              <article>
                <div>
                  <button
                    className={index}
                    class="delete is-small is-danger"
                    value={_id}
                    name="comments"
                    onClick={this.handleClick}
                  >
                    delete
                  </button>
                </div>
                <div className="box-content has-text-light">
                  <em>{body}</em>
                </div>
                <p className="has-text-white">
                  <span>created {dayjs(created_at).fromNow()} </span>
                  <span className="title is-6">
                    {" "}
                    <Link to={`/users/${created_by}`}>{created_by}</Link>
                  </span>
                  <span>
                    {" "}
                    votes <span className={voteStyle}>{votes}</span>
                  </span>
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
    ) : (
      <div className="section">
        <img
          className="loader"
          src="https://media.giphy.com/media/3o7bu3XilJ5BOiSGic/giphy.gif"
          alt="loading spinner"
        />
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
      window.alert("Comment will be deleted");
      this.setState({
        currentComment: `${commentId}`,
        update: true
      });
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
