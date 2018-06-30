import React, { Component } from "react";
import { Link } from "react-router-dom";
import Comments from "./Comments";
import Vote from "./Vote";

class ArticleList extends Component {
  state = { showComments: false };
  render() {
    return (
      <div id="central-column">
        {this.props.articles.map((article, index) => {
          const { title, votes, comments, created_by, body, _id } = article;
          const id = article._id;
          return (
            <div key={article._id}>
              <Link to={`/articles/${id}`}>
                <span id={article._id} onClick={this.props.handleArticleClick}>
                  {title}{" "}
                </span>
              </Link>

              <div> {body.slice(0, 101)}...</div>
              <div className="article-footer">
                <span>
                  {" "}
                  Author: <Link to={`/users/${created_by}`}>{created_by}</Link>
                </span>
                <span> Votes: {votes}</span>{" "}
                {/* <Link to={`/articles/${id}/comments`}>
                  {" "}
                  <span> Comments: {comments}</span>
                </Link> */}
                <span onClick={this.handleClick}>Comments : {comments}</span>
              </div>

              <Vote
                index={index}
                id={id}
                handleClick={this.props.handleClick}
                name="articles"
              />
              <div>{this.state.showComments && <Comments id={_id} />}</div>
            </div>
          );
        })}
      </div>
    );
  }
  handleClick = () => {
    const change = !this.state.showComments;
    this.setState({ showComments: change });
  };
}

export default ArticleList;
