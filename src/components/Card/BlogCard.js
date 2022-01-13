import React, { useState } from "react";

import { useHistory } from "react-router-dom";

import { srcURL } from "../../configs/AppConfig";

//components
const BlogCard = (props) => {
  const { data } = props;
  const {
    BlogId,
    BlogImage,
    BlogName,
    BlogShortName,
    BlogShortDescription,
    BlogDate,
  } = data;

  const history = useHistory();

  const handleClickCard = (e) => {
    e.stopPropagation();
    history.push({
      pathname: `/blog/detail/${BlogShortName}`,
      search: `?id=${BlogId}`,
      state: { data: data },
    });
  };

  return (
    <div
      className="d-flex flex-column blog-card"
      onClick={(e) => handleClickCard(e)}
    >
      <div className="blog-image-container">
        <img src={srcURL + BlogImage} className="blog-image" alt="/" />
      </div>

      <div className="d-flex flex-column blog-content-container">
        <h2 className="color-dark-grey-3 fs-18 px-4 pt-3 pb-2 blog-title">
          {BlogName}
        </h2>

        <div className="rectangle rectangle--light rectangle--small blog-rectangle" />

        <span className="color-dark-grey-1 fs-14 px-4 pt-3 blog-text">
          {BlogShortDescription}
        </span>

        <span className="color-light-grey-3 fs-16 pl-4 pt-3 pb-3 mt-auto">
          {BlogDate}
        </span>
      </div>
    </div>
  );
};

export default BlogCard;
