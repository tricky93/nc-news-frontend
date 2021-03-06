import React, { Component } from "react";
import { Link } from "react-router-dom";
import Vote from "./Vote";

class ArticleList extends Component {
  state = { showComment: false };

  render() {
    let articleCollection;
    if (this.props.userName) articleCollection = this.props.filtered;
    else {
      articleCollection = this.props.articles;
    }
    return (
      <div className="section">
        {articleCollection.map((article, index) => {
          const { title, votes, comments, created_by, _id } = article;
          const voteStyle = votes < 0 ? "redVote" : "greenVote";
          return (
            <div key={_id} className="box has-background-black-ter">
              <div className="box-content">
                <Link to={`/articles/${_id}`}>
                  <h2
                    className="title has-text-white"
                    id={_id}
                    onClick={this.props.handleArticleClick}
                  >
                    {title}{" "}
                  </h2>
                </Link>
                <div className="has-text-white">
                  <span>
                    <Link to={`/users/${created_by}`}>{created_by}</Link>
                  </span>
                  <span>
                    {" "}
                    Votes: <span className={voteStyle}>{votes}</span>
                  </span>{" "}
                  <span> Comments: {comments}</span>
                  <Vote
                    index={index}
                    id={_id}
                    handleClick={this.props.handleClick}
                    name="articles"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default ArticleList;
