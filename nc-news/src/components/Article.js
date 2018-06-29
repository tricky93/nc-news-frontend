import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as api from "../api";
import AddComment from "./AddComment";

class Article extends Component {
  state = { article: {}, addComment: false, update: false };

  componentDidMount() {
    const articleId = this.props.match.params.article_id;
    api.fetchArticle(articleId).then(article => {
      this.setState({
        article
      });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.update !== prevState.update) {
      api
        .fetchArticles()
        .then(articles => {
          this.setState({ articles, update: false, addComment: false });
        })
        .catch(console.log);
    }
  }

  render() {
    let { title, votes, comments, created_by, body } = this.state.article;
    const id = this.state.article._id;
    return (
      <div>
        <h2>
          <span
            className="article-header"
            onClick={this.props.handleArticleClick}
          >
            {title}{" "}
          </span>
          <span className="article-body"> {body}</span>
          <div className="article-footer">
            <span>
              {" "}
              Author: <Link to={`/users/${created_by}`}>{created_by}</Link>
            </span>
            <span> Votes: {votes}</span>
            <Link to={`/articles/${id}/comments`}>
              {" "}
              <span> Comments: {comments}</span>
            </Link>
          </div>
        </h2>
        <button value={id} name="articles" onClick={this.props.handleClick}>
          up
        </button>
        <button value={id} name="articles" onClick={this.props.handleClick}>
          down
        </button>
        <button value={id} name="comment" onClick={this.handleClick}>
          comment
        </button>
        <div>
          {this.state.addComment && (
            <AddComment articleTitle={title} articleId={id} />
          )}
        </div>
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
    console.log(e.target);
    const collection = e.target.name;
    const id = e.target.value;
    const voteType = e.target.innerText;
    api.modifyVotes(collection, id, voteType);
    const key = e.target.className;
    const voteModify = e.target.innerText === "up" ? 1 : -1;
    const updatedArticles = this.state.articles.map((article, index) => {
      const newArticle = { ...article };
      if (index === key) {
        article.votes += voteModify;
      }
      return newArticle;
    });
    this.setState({ updatedArticles, update: true });
  };
}

export default Article;
