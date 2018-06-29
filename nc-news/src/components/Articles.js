import React, { Component } from "react";
import * as api from "../api";
import ArticleList from "./ArticleList";

class Articles extends Component {
  state = {
    articles: [],
    currentArticle: "",
    view: "normal",
    update: false
  };

  componentDidMount() {
    api
      .fetchArticles()
      .then(articles => {
        this.setState({
          articles
        });
      })
      .catch(console.log);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.update !== prevState.update) {
      api
        .fetchArticles()
        .then(articles => {
          this.setState({ articles, update: false });
        })
        .catch(console.log);
    }
  }

  render() {
    return (
      <ArticleList
        handleArticleClick={this.handleArticleClick}
        handleClick={this.handleClick}
        articles={this.state.articles}
      />
    );
  }
  handleArticleClick = e => {
    this.setState({
      currentArticle: e.target.id
    });
  };

  handleClick = e => {
    this.changeVoteCount(e);
  };

  changeVoteCount = e => {
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

export default Articles;
