import React, { Component } from "react";
import axios from "axios";
import * as api from "../api";
import ArticleList from "./ArticleList";

class Topic extends Component {
  state = {
    articles: []
  };

  componentDidMount() {
    let slug = this.props.match.params.topic;
    axios
      .get(
        `https://nc-news-portfolio.herokuapp.com/api/topics/${slug}/articles`
      )
      .then(({ data }) => {
        this.setState({
          articles: data.articles
        });
      })
      .catch(console.log);
  }

  componentDidUpdate(prevProps, prevState) {
    let slug = this.props.match.params.topic;
    if (this.props !== prevProps)
      axios
        .get(
          `https://nc-news-portfolio.herokuapp.com/api/topics/${slug}/articles`
        )
        .then(({ data }) => {
          this.setState({ articles: data.articles });
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

export default Topic;
