import React, { Component } from "react";
import * as api from "../api";
import { Redirect } from "react-router-dom";
import ArticleList from "./ArticleList";
import LoadSpinner from "./LoadSpinner";

class Articles extends Component {
  state = {
    articles: [],
    currentArticle: "",
    loaded: false,
    update: false
  };

  componentDidMount() {
    api
      .fetchArticles()
      .then(articles => {
        this.setState({
          articles,
          loaded: true
        });
      })
      .catch(err => {
        this.props.history.push("/404");
        this.setState({ invalidUrl: true });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.update !== prevState.update) {
      api
        .fetchArticles()
        .then(articles => {
          this.setState({ articles, update: false, loaded: true });
        })
        .catch(err => {
          this.props.history.push("/404");
          this.setState({ invalidUrl: true });
        });
    }
  }

  render() {
    return this.state.invalidUrl ? (
      <Redirect to="/404" />
    ) : this.state.loaded ? (
      <div>
        <ArticleList
          handleArticleClick={this.handleArticleClick}
          handleClick={this.handleClick}
          articles={this.state.articles}
          userName={this.props.userName}
          filtered={this.state.articles.filter(article => {
            return article.created_by === this.props.userName;
          })}
        />
      </div>
    ) : (
      <LoadSpinner />
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
    let voteType = "down";
    if (e.target.innerText === "⬆️") voteType = "up";
    api.modifyVotes(collection, id, voteType);
    const key = e.target.className;
    const voteModify = e.target.innerText === "⬆️" ? 1 : -1;
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
