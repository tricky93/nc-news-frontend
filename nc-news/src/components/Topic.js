import React, { Component } from "react";
import * as api from "../api";
import ArticleList from "./ArticleList";

class Topic extends Component {
  state = {
    articles: [],
    currentArticle: ""
  };

  componentDidMount() {
    let topicSlug = this.props.match.params.topic;
    api
      .fetchArticlesByTopic(topicSlug)
      .then(articles => {
        this.setState({
          articles
        });
      })
      .catch(console.log);
  }

  componentDidUpdate(prevProps, prevState) {
    let topicSlug = this.props.match.params.topic;
    if (this.props !== prevProps)
      api
        .fetchArticlesByTopic(topicSlug)
        .then(articles => {
          this.setState({ articles });
        })
        .catch(console.log);
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

  handleClick = e => {
    const voteType = e.target.value;
    api.modifyVotes(voteType);
    let key = e.target.className;
    let voteModify = e.target.name === "up" ? 1 : -1;
    let updatedArticles = [...this.state.articles];
    updatedArticles[key].votes += voteModify;
    this.setState({
      articles: updatedArticles
    });
  };
}

export default Topic;
