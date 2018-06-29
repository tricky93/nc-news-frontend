import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as api from "../api";
import AddComment from "./AddComment";

class Article extends Component {
  state = { article: {}, addComment: false };

  componentDidMount() {
    const articleId = this.props.match.params.article_id;
    api.fetchArticle(articleId).then(article => {
      this.setState({
        article
      });
    });
  }

  render() {
    let { title, votes, comments, created_by, body } = this.state.article;
    const id = this.state.article._id;
    return (
      <div>
        <p>
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
        </p>
        <button value={id} name="up" onClick={this.props.handleClick}>
          up
        </button>
        <button value={id} name="down" onClick={this.props.handleClick}>
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
  handleClick = () => {
    const comment = !this.state.addComment;
    this.setState({ addComment: comment });
  };
}

export default Article;
