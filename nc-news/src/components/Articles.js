import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
//import * as api from "../api";

class Articles extends Component {
  state = {
    articles: [],
    currentArticle: ""
  };

  componentDidMount() {
    axios
      .get("https://nc-news-portfolio.herokuapp.com/api/articles")
      .then(({ data }) => {
        this.setState({
          articles: data.articles
        });
      })
      .catch(console.log);
  }
  render() {
    return (
      <div id="central-column">
        {this.state.articles.map(article => {
          let { title, votes, comments, created_by, body } = article;
          const id = article._id;
          return (
            <div className="article" key={article._id}>
              <p>
                <Link to="/articles/:article_id">
                  <span
                    className="article-header"
                    onClick={this.handleArticleClick}
                  >
                    {title}{" "}
                  </span>
                </Link>
                <span className="article-body"> {body}</span>
                <div className="article-footer">
                  <span> Author: {created_by}</span>
                  <span> Votes: {votes}</span>
                  <span> Comments: {comments}</span>
                </div>
              </p>
              <button value={id} name="up-button" onClick={this.handleClick}>
                up
              </button>
              <button value={id} name="down-button" onClick={this.handleClick}>
                down
              </button>
            </div>
          );
        })}
      </div>
    );
  }

  handleArticleClick = e => {
    this.setState({
      currentArticle: e.target.innerText
    });
  };

  handleClick = e => {
    e.target.name === "up-button"
      ? axios.put(
          `https://nc-news-portfolio.herokuapp.com/api/articles/${
            e.target.value
          }?vote=up`
        )
      : axios.put(
          `https://nc-news-portfolio.herokuapp.com/api/articles/${
            e.target.value
          }?vote=down`
        );
  };
}

export default Articles;
