import React, { useState } from "react";

import { useHistory } from "react-router-dom";

//packages
import { Rate, Divider } from "antd";

import { DeleteOutlined } from "@ant-design/icons";

//app config
import { srcURL } from "../../configs/AppConfig";

const AddCartCard = (props) => {
  const history = useHistory();

  const { data } = props;
  const {
    CourseID,
    CourseImage,
    CourseTitle,
    CourseDescription,
    AuthorName,
  } = data;

  console.log(data)
  return (
    <div
      className="d-flex add-cart-card border-radius-8 px-2"
      onClick={() =>
        history.push({
          pathname: `/cart/detail/${CourseTitle}`,
          search: `?id=${CourseID}`,
          state: { data: data },
        })
      }
    >
      <div className="cart-image-container">
        <img src={srcURL + CourseImage} className="cart-image" alt="/" />
      </div>

      <div className="d-flex flex-column px-5 cart-content-container">
        <div className="d-flex">
          <div className="mr-auto">
            <span className="color-dark-grey-3 fs-20 mr-4 cart-title">
              {CourseTitle}
            </span>
            {/* <span>
              <span className="color-light-grey-3 fs-14 mr-2">By</span>
              <span className="color-light-theme fs-14">{AuthorName}</span>
            </span> */}
          </div>
        </div>

        <div className="d-flex mt-auto align-items-end">
          {/* <span className="color-light-grey-2 fs-14 cart-text mb-auto">
            {CourseDescription}
          </span> */}
          <span className="color-light-grey-2 fs-14 cart-text mb-auto" dangerouslySetInnerHTML = {{ __html: CourseDescription }} /> 
        </div>
      </div>
    </div>
  );
};

export default AddCartCard;
