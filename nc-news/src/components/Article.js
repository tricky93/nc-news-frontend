import React, { Component } from "react";
import axios from "axios";

class Article extends Component {
  state = { article: {} };
  componentDidMount() {
    let articleId = this.props.match.params.id;
    axios
      .get(`https://nc-news-portfolio.herokuapp.com/api/article/${articleId}`)
      .then(({ data }) => {
        console.log(data.articles);
        this.setState({
          article: data.articles
        });
      })
      .catch(console.log);
  }

  componentDidUpdate(prevProps, prevState) {
    let articleId = this.props.match.params.id;
    if (this.props !== prevProps)
      axios
        .get(`https://nc-news-portfolio.herokuapp.com/api/article/${articleId}`)
        .then(({ data }) => {
          this.setState({ article: data.articles });
        })
        .catch(console.log);
  }
  render() {
    return (
      <div>
        <p>a single article</p>
      </div>
    );
  }
}

export default Article;
