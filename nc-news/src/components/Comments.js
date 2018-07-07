import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import * as api from "../api";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Vote from "./Vote";
import LoadSpinner from "./LoadSpinner";
dayjs.extend(relativeTime);

class Comments extends Component {
  state = {
    comments: [],
    loaded: false,
    update: false,
    delete: false,
    modalStyle: "modal",
    commentId: "",
    commentAuthor: ""
  };

  componentDidMount() {
    api
      .fetchCommentsByArticle(this.props.articleId)
      .then(comments => {
        this.setState({
          comments,
          loaded: true
        });
      })
      .catch(err => {
        this.props.history.push("/404");
        this.setState({ invalidUrl: true });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.update !== prevState.update ||
      this.prevProps !== prevProps
    ) {
      api
        .fetchCommentsByArticle(this.props.articleId)
        .then(comments => {
          this.setState({ comments, update: false });
        })
        .catch(err => {
          this.props.history.push("/404");
          this.setState({ invalidUrl: true });
        });
    }
  }
  render() {
    const { comments } = this.state;
    return this.state.invalidUrl ? (
      <Redirect to="/404" />
    ) : this.state.loaded ? (
      <div>
        {comments.map((comment, index) => {
          const { _id, votes, created_by, created_at, body } = comment;
          const voteStyle = votes < 0 ? "redVote" : "greenVote";
          return (
            <div key={index} className="box has-background-grey-dark">
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
                <div>
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
                    <Vote
                      index={index}
                      id={_id}
                      name="comments"
                      handleClick={this.handleClick}
                    />
                  </p>
                </div>
              </article>
            </div>
          );
        })}
        <div className={this.state.modalStyle}>
          <div className="modal-background" />
          <div className="modal-content">
            <h1 className="has-text-white">
              Are you sure you want to delete this comment?
            </h1>
            <button
              className="button"
              onClick={this.handleClick}
              name="confirm"
            >
              Yes
            </button>
            <button
              className="button"
              onClick={this.handleClick}
              name="confirm"
            >
              No
            </button>
          </div>
          <button className="modal-close is-large" aria-label="close" />
        </div>
      </div>
    ) : (
      <LoadSpinner />
    );
  }

  handleClick = e => {
    const action = e.target.innerText;
    const commentId = e.target.value;
    if (action === "delete") {
      this.setState({
        modalStyle: "modal is-active",
        commentId: commentId,
        commentAuthor: e.target.type
      });
    }
    if (e.target.name === "confirm") this.deleteComment(e);
    else {
      this.changeVote(e);
    }
  };

  deleteComment = e => {
    const commentId = this.state.commentId;
    if (e.target.innerText === "Yes") {
      api.deleteAComment(commentId).catch(console.log);
      this.setState({
        update: true,
        delete: false,
        modalStyle: "modal",
        commentId: ""
      });
    }
    if (e.target.innerText === "No") {
      this.setState({
        update: true,
        delete: false,
        modalStyle: "modal",
        commentId: ""
      });
    }
  };

  changeVote = e => {
    const collection = e.target.name;
    const id = e.target.value;
    let voteType = "down";
    if (e.target.innerText === "⬆️") voteType = "up";
    api.modifyVotes(collection, id, voteType);
    const key = e.target.className;
    const voteModify = e.target.innerText === "⬆️" ? 1 : -1;
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
