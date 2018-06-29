import axios from "axios";

export const fetchArticles = () => {
  return axios
    .get("https://nc-news-portfolio.herokuapp.com/api/articles")
    .then(({ data }) => data.articles);
};

export const fetchArticle = articleId => {
  return axios
    .get(`https://nc-news-portfolio.herokuapp.com/api/articles/${articleId}`)
    .then(({ data }) => data.article);
};

export const fetchArticlesByTopic = topicSlug => {
  return axios
    .get(
      `https://nc-news-portfolio.herokuapp.com/api/topics/${topicSlug}/articles`
    )
    .then(({ data }) => data.articles);
};

export const fetchCommentsByArticle = articleId => {
  return axios
    .get(
      `https://nc-news-portfolio.herokuapp.com/api/articles/${articleId}/comments`
    )
    .then(({ data }) => data.comments);
};

export const modifyVotes = (endpoint, id, voteType) => {
  console.log(endpoint, id, voteType);
  voteType === "up"
    ? axios.put(
        `https://nc-news-portfolio.herokuapp.com/api/${endpoint}/${id}?vote=up`
      )
    : axios.put(
        `https://nc-news-portfolio.herokuapp.com/api/${endpoint}/${id}?vote=down`
      );
};
