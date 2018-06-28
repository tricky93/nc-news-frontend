import React, { Component } from "react";
import { Link } from "react-router-dom";

class ArticleList extends Component {
  render() {
    return (
      <div>
        <button id="normal" onClick={this.props.handleOrderChange}>
          Normal
        </button>
        <button id="mostComments" onClick={this.props.handleOrderChange}>
          Most comments
        </button>
        <button id="mostPopular" onClick={this.props.handleOrderChange}>
          Most popular
        </button>
        <div id="central-column">
          {this.props.articles
            .sort((a, b) => {
              a.comments < b.comments ? -1 : 1;
            })
            .map((article, index) => {
              let { title, votes, comments, created_by, body } = article;
              const id = article._id;
              return (
                <div className="article" key={article._id}>
                  <p>
                    <Link to={`/articles/${id}`}>
                      <span
                        id={article._id}
                        className="article-header"
                        onClick={this.props.handleArticleClick}
                      >
                        {title}{" "}
                      </span>
                    </Link>
                    <span className="article-body">
                      {" "}
                      {body.slice(0, 60)}...
                    </span>
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
                  </p>
                  <button
                    className={index}
                    value={id}
                    name="up"
                    onClick={this.props.handleClick}
                  >
                    up
                  </button>
                  <button
                    className={index}
                    value={id}
                    name="down"
                    onClick={this.props.handleClick}
                  >
                    down
                  </button>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

export default ArticleList;
