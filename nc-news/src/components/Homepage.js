import React from "react";

const Homepage = () => {
  return (
    <div>
      <article class="message">
        <div class="message-header">
          <p>Hello World</p>
        </div>
        <div class="message-body">
          <h1>Welcome to Northcoders News</h1>
          <p>
            Northcoders News is a social news aggregation, web content rating,
            and discussion website. Northcoders News has articles which are
            divided into topics. Each article has user curated ratings and can
            be up or down voted using the API. Users can also add comments about
            an article. Comments can also be up or down voted. A user can add
            comments and remove any comments which they have added.
          </p>
        </div>
      </article>
    </div>
  );
};

export default Homepage;
