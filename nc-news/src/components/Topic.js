import React, { Component } from "react";
import axios from "axios";
import * as api from "../api";

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
        console.log(data.articles);
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
      <div id="central-column">
        {this.state.articles.map(article => {
          let { title, votes, comments, created_by, body } = article;
          return (
            <div className="article" key={article._id}>
              <p>
                <span className="article-header"> {title}: </span>
                <span className="article-body"> {body}</span>
                <div className="article-footer">
                  <span> Author: {created_by}</span>
                  <span> Votes: {votes}</span>
                  <span> Comments: {comments}</span>
                </div>
              </p>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Topic;
