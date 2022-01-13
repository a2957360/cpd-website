import React from "react";
import { Link } from "react-router-dom";

import { Avatar, Rate, Divider } from "antd";

import reviewImage from '../../../assets/img/other/review-Avatar.png';

const ReviewList = ({ data }) => {
  const { FeedBack } = data;

  if (FeedBack.length === 0) {
    return null;
  }

  return (
    <div>
      <div className="fs-30 color-dark-grey-2">Reviews</div>
      {FeedBack.map((item, index) => {
        const { UserName, ProfileImage, Rating, ReviewMessage, RatingCount } = item;
        return (
          <div key={index}>
            <Divider className="mt-4 pb-2" />

            <div className="d-flex">
              <div className="w-10">
                <Avatar size={50} src={reviewImage} />
              </div>

              <div className="w-90">
                <div className="mb-2">
                  <span className="fs-20 mr-5 color-dark-grey-2">
                    {UserName}
                  </span>

                  <Rate className="fs-20 mr-3" allowHalf disabled defaultValue={Rating} />

                  {/* <span className="fs-20 color-light-grey-3">({RatingCount})</span> */}
                </div>

                <span className="fs-16 color-light-grey-3 line-height-30">
                  {ReviewMessage}
                </span>
              </div>
            </div>
          </div>
        );
      })}

      <div className="d-flex align-items-end justify-content-center mt-40">
        <div
          role="button"
          className="pl-30 pr-30 pt-8 pb-8 rounded-pill button button--light-hover-dark"
          onClick={() => console.log("Load More")}
        >
          Load More
        </div>
      </div>
    </div>
  );
};

export default ReviewList;
