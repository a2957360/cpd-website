import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import { Rate } from "antd";

const Header = ({ data }) => {
  const { CourseTitle, InstructorName, Rating,RatingCountDecimal, InstructorId, SubCategoryName, CategoryName, AuthorName, RatingCount } = data;
  const history = useHistory();

  // const tags = ["web", "front-end", "node"];

  return (
    <div className="mb-3">
      <div className="color-white fs-25 mb-2">{CourseTitle}</div>

      <div className="d-flex">
        {
          data.CourseType === 1 &&
          <>
            {
              AuthorName &&
              <span className="color-white fs-20" >BY&nbsp;</span>
            }
            <div
              className="color-light-blue fs-20 mr-5 cursor--pointer"
              onClick={() =>
                history.push({
                  pathname: `/course/instructor/${InstructorId}`,
                })
              }
            >
              {AuthorName}
            </div>
          </>
        }


        {Rating !== 0 && <>
          <Rate className="fs-20 mr-3" allowHalf disabled value={RatingCountDecimal} />
          {/* <span className="color-white fs-20">({RatingCount})</span> */}
        </>
        }
      </div>

      {/* tag */}
      <div className="d-flex mt-3 pb-2">
        {(Array.isArray(CategoryName) ? CategoryName : [CategoryName])?.map((item, index) => {
          return (
            <div
              key={index}
              className="bg-dark-theme color-white px-4 py-2 mr-5 fs-18 border-radius-8"
            >
              # {item}
            </div>
          );
        })}
        <div
          className="bg-dark-theme color-white px-4 py-2 mr-5 fs-18 border-radius-8"
        >
          # {SubCategoryName}
        </div>
      </div>
    </div>
  );
};

export default Header;
