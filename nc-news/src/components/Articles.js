import React, { Component } from "react";
import * as api from "../api";
import ArticleList from "./ArticleList";

class Articles extends Component {
  state = {
    articles: [],
    currentArticle: "",
    view: "normal"
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
    if (this.state !== prevState) {
      api
        .fetchArticles()
        .then(articles => {
          this.setState({ articles });
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
    const action = e.target.innerText;
    action === "up" || action === "down" ? this.changeVoteCount(e) : null;
  };

  changeVoteCount = e => {
    const endpoint = e.target.name;
    const id = e.target.value;
    const voteType = e.target.innerText;
    api.modifyVotes(endpoint, id, voteType);
    const key = e.target.className;
    const voteModify = e.target.innerText === "up" ? 1 : -1;
    const updatedArticles = this.state.articles.map((article, index) => {
      const newArticle = { ...article };
      if (index === key) {
        console.log("hello");
        article.votes += voteModify;
      }
      return newArticle;
    });
    this.setState({
      articles: updatedArticles
    });
  };
}

export default Articles;
