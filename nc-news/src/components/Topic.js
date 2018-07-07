import React, { Component } from "react";
import * as api from "../api";
import { Redirect } from "react-router-dom";
import ArticleList from "./ArticleList";
import LoadSpinner from "./LoadSpinner";

class Topic extends Component {
  state = {
    articles: [],
    currentArticle: "",
    update: false,
    loaded: false
  };

  componentDidMount() {
    let topicSlug = this.props.match.params.topic;
    api
      .fetchArticlesByTopic(topicSlug)
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
    let topicSlug = this.props.match.params.topic;
    if (
      this.state.update !== prevState.update ||
      topicSlug !== prevProps.match.params.topic
    ) {
      api
        .fetchArticlesByTopic(topicSlug)
        .then(articles => {
          this.setState({ articles, update: false });
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
      <ArticleList
        handleArticleClick={this.handleArticleClick}
        handleClick={this.handleClick}
        articles={this.state.articles}
      />
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

export default Topic;
