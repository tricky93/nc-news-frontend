import React, { Component } from "react";
import axios from "axios";
import { Route } from "react-router-dom";
import ArticleList from "./ArticleList";
import Article from "./Article";
//import * as api from "../api";

class Articles extends Component {
  state = {
    articles: [],
    currentArticle: "",
    view: "normal"
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
      <div>
        <ArticleList
          handleArticleClick={this.handleArticleClick}
          handleClick={this.handleClick}
          articles={this.state.articles}
        />
      </div>
    );
  }
  handleArticleClick = e => {
    this.setState({
      currentArticle: e.target.id
    });
  };

  handleClick = e => {
    const key = e.target.className;
    let voteModify = e.target.name === "up" ? 1 : -1;
    e.target.name === "up"
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

    let updatedArticles = [...this.state.articles];
    updatedArticles[key].votes += voteModify;
    this.setState({
      articles: updatedArticles
    });
  };
}

export default Articles;
