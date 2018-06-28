import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Article extends Component {
  state = { article: {} };
  componentDidMount() {
    const articleId = this.props.match.params.article_id;
    axios
      .get(`https://nc-news-portfolio.herokuapp.com/api/articles/${articleId}`)
      .then(({ data }) => {
        this.setState({
          article: data.article
        });
      });
  }
  render() {
    let { title, votes, comments, created_by, body } = this.state.article;
    const id = this.state.article._id;
    return (
      <div className="article">
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
        <button value={id} name="up-button" onClick={this.props.handleClick}>
          up
        </button>
        <button value={id} name="down-button" onClick={this.props.handleClick}>
          down
        </button>
      </div>
    );
  }
}

export default Article;
