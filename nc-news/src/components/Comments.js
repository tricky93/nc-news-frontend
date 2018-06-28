import React, { Component } from "react";
import axios from "axios";

class Comments extends Component {
  state = { comments: [] };
  componentDidMount() {
    const articleId = this.props.match.params.article_id;
    axios
      .get(
        `https://nc-news-portfolio.herokuapp.com/api/articles/${articleId}/comments`
      )
      .then(({ data }) => {
        this.setState({
          comments: data.comments
        });
      })
      .catch(console.log);
  }
  render() {
    const { comments } = this.state;
    return (
      <div>
        <h1>comment title</h1>
        {comments.map((comment, index) => {
          const id = comment._id;
          return (
            <div>
              <div>
                <p>{comment.body}</p>
                <h2>
                  <span>{comment.created_at}</span>
                  <span>{comment.created_by}</span>
                  <span>{comment.votes}</span>
                </h2>
              </div>
              <button
                className={index}
                value={id}
                name="up"
                onClick={this.handleClick}
              >
                up
              </button>
              <button
                className={index}
                value={id}
                name="down"
                onClick={this.handleClick}
              >
                down
              </button>
              <button
                className={index}
                value={id}
                name="add"
                onClick={this.handleClick}
              >
                add
              </button>
              <button
                className={index}
                value={id}
                name="delete"
                onClick={this.handleClick}
              >
                delete
              </button>
            </div>
          );
        })}
      </div>
    );
  }

  handleClick = e => {
    const action = e.target.name;
    action === "up" || action === "down" ? this.changeVote(e) : null;
  };

  changeVote = e => {
    const key = e.target.className;
    let voteModify = e.target.name === "up" ? 1 : -1;
    e.target.name === "up"
      ? axios.put(
          `https://nc-news-portfolio.herokuapp.com/api/comments/${
            e.target.value
          }?vote=up`
        )
      : axios.put(
          `https://nc-news-portfolio.herokuapp.com/api/comments/${
            e.target.value
          }?vote=down`
        );

    let updatedComments = [...this.state.comments];
    updatedComments[key].votes += voteModify;
    this.setState({
      articles: updatedComments
    });
  };
}

export default Comments;
