import axios from "axios";

const url = "https://nc-news-portfolio.herokuapp.com/api";

export const fetchArticles = () => {
  return axios.get(`${url}/articles`).then(({ data }) => data.articles);
};

export const fetchArticle = articleId => {
  return axios
    .get(`${url}/articles/${articleId}`)
    .then(({ data }) => data.article);
};

export const fetchArticlesByTopic = topicSlug => {
  return axios
    .get(`${url}/topics/${topicSlug}/articles`)
    .then(({ data }) => data.articles);
};

export const fetchCommentsByArticle = articleId => {
  return axios
    .get(`${url}/articles/${articleId}/comments`)
    .then(({ data }) => data.comments);
};

export const modifyVotes = (collection, id, voteType) => {
  return axios.put(`${url}/${collection}/${id}?vote=${voteType}`);
};

export const fetchUser = username => {
  return axios.get(`${url}/users/${username}`);
};

export const postAComment = (articleId, newComment) => {
  return axios.post(`${url}/articles/${articleId}/comments`, newComment);
};
