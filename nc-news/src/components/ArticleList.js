import React, { Component } from "react";
import { Link } from "react-router-dom";
import Vote from "./Vote";

class ArticleList extends Component {
  render() {
    return (
      <div id="central-column">
        {this.props.articles.map((article, index) => {
          let { title, votes, comments, created_by, body } = article;
          const id = article._id;
          return (
            <div className="article" key={article._id}>
              <h2>
                <Link to={`/articles/${id}`}>
                  <span
                    id={article._id}
                    className="article-header"
                    onClick={this.props.handleArticleClick}
                  >
                    {title}{" "}
                  </span>
                </Link>
                <span className="article-body"> {body.slice(0, 60)}...</span>
                <div className="article-footer">
                  <span>
                    {" "}
                    Author:{" "}
                    <Link to={`/users/${created_by}`}>{created_by}</Link>
                  </span>
                  <span> Votes: {votes}</span>{" "}
                  <Link to={`/articles/${id}/comments`}>
                    {" "}
                    <span> Comments: {comments}</span>
                  </Link>
                </div>
              </h2>
              <Vote
                index={index}
                id={id}
                handleClick={this.props.handleClick}
                name="articles"
              />
            </div>
          );
        })}
      </div>
    );
  }
}

export default ArticleList;
