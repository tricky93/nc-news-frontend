import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as api from "../api";
import AddComment from "./AddComment";
import Vote from "./Vote";

class Article extends Component {
  state = { article: {}, addComment: false, update: false, loaded: false };

  componentDidMount() {
    const articleId = this.props.match.params.article_id;
    api.fetchArticle(articleId).then(article => {
      this.setState({
        article,
        loaded: true
      });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const articleId = this.props.match.params.article_id;
    if (this.state.update !== prevState.update) {
      api
        .fetchArticle(articleId)
        .then(article => {
          this.setState({ article, update: false, addComment: false });
        })
        .catch(console.log);
    }
  }

  render() {
    let { title, votes, comments, created_by, body, _id } = this.state.article;
    const voteStyle = votes < 0 ? "redVote" : "greenVote";
    return this.state.loaded ? (
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
                <Link to={`/articles/${_id}/comments`}>
                  {" "}
                  <span> Comments: {comments}</span>
                </Link>
              </div>
            </h2>
            <Vote
              index={0}
              id={_id}
              handleClick={this.handleClick}
              name="articles"
            />
            <button
              class="button is-small is-outlined is-info"
              value={_id}
              name="comment"
              onClick={this.handleClick}
            >
              comment
            </button>
            <div>
              {this.state.addComment && (
                <AddComment articleTitle={title} articleId={_id} />
              )}
            </div>
          </div>
        </div>
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
    if (e.target.innerText === "comment") {
      const comment = !this.state.addComment;
      this.setState({ addComment: comment });
    } else {
      this.changeVoteCount(e);
    }
  };
  changeVoteCount = e => {
    const collection = e.target.name;
    const id = e.target.value;
    const voteType = e.target.innerText;
    api.modifyVotes(collection, id, voteType);
    const voteModify = e.target.innerText === "up" ? 1 : -1;
    const updatedArticle = { ...this.state.article };

    updatedArticle.votes += voteModify;

    this.setState({ updatedArticle, update: true });
  };
}

export default Article;
