import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import * as api from "../api";
import AddComment from "./AddComment";
import Vote from "./Vote";
import Comments from "./Comments";
import LoadSpinner from "./LoadSpinner";

class Article extends Component {
  state = {
    article: {},
    addComment: false,
    update: false,
    loaded: false
  };

  componentDidMount() {
    const articleId = this.props.match.params.article_id;
    api
      .fetchArticle(articleId)
      .then(article => {
        this.setState({
          article,
          loaded: true
        });
      })
      .catch(err => {
        this.props.history.push("/404");
        this.setState({ invalidUrl: true });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    const articleId = this.props.match.params.article_id;

    if (this.state.update !== prevState.update) {
      api
        .fetchArticle(articleId)
        .then(article => {
          this.setState({
            article,
            loaded: true,
            update: false,
            addComment: false
          });
        })
        .catch(err => {
          this.props.history.push("/404");
          this.setState({ invalidUrl: true });
        });
    }
  }

  render() {
    let { title, votes, comments, created_by, body, _id } = this.state.article;
    const voteStyle = votes < 0 ? "redVote" : "greenVote";
    return this.state.invalidUrl ? (
      <Redirect to="/404" />
    ) : this.state.loaded ? (
      <div className="column">
        <div className="box has-background-black-ter">
          <h1>
            {" "}
            <span
              className="title has-text-white"
              onClick={this.props.handleArticleClick}
            >
              {title}{" "}
            </span>
          </h1>
          <div>
            <div className="article">
              <h2>
                <span className="content has-text-light"> {body}</span>
                <div className="has-text-white">
                  <span>
                    {" "}
                    <Link to={`/users/${created_by}`}>{created_by}</Link>
                  </span>
                  <span>
                    {" "}
                    Votes: <span className={voteStyle}>{votes}</span>
                  </span>

                  <span> Comments: {comments}</span>
                  <div className="commentButton">
                    <button
                      class="button is-small is-outlined is-info"
                      value={_id}
                      name="comment"
                      onClick={this.handleClick}
                    >
                      🗨️
                    </button>
                  </div>
                  <Vote
                    index={0}
                    id={_id}
                    handleClick={this.handleClick}
                    name="articles"
                  />
                </div>
              </h2>
            </div>
            <div>
              {this.state.addComment && (
                <AddComment
                  articleTitle={title}
                  articleId={_id}
                  postComment={this.postComment}
                />
              )}
            </div>
            <Comments
              articleId={_id}
              update={this.state.update}
              author={created_by}
            />
          </div>
        </div>
      </div>
    ) : (
      <LoadSpinner />
    );
  }
  handleClick = e => {
    if (e.target.innerText === "🗨️") {
      const comment = !this.state.addComment;
      this.setState({ addComment: comment });
    } else {
      this.changeVoteCount(e);
    }
  };

  postComment = () => {
    this.setState({ update: true });
  };

  changeVoteCount = e => {
    const collection = e.target.name;
    const id = e.target.value;
    let voteType = "down";
    if (e.target.innerText === "⬆️") voteType = "up";
    api.modifyVotes(collection, id, voteType);
    const voteModify = e.target.innerText === "⬆" ? 1 : -1;
    const updatedArticle = { ...this.state.article };

    updatedArticle.votes += voteModify;

    this.setState({ updatedArticle, update: true });
  };
}

export default Article;
