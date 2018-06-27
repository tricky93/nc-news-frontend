import axios from "axios";
import Articles from "./components/Articles";

export const fetchArticles = () => {
  axios
    .get("https://nc-news-portfolio.herokuapp.com/api/articles")
    .then(articles => articles)
    .catch(console.log);
};
