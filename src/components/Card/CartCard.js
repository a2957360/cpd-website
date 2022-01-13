import React, { useState } from "react";

import { useHistory } from "react-router-dom";

//packages
import { Rate, Divider } from "antd";

import { DeleteOutlined } from "@ant-design/icons";

//config
import { srcURL } from "../../configs/AppConfig";

//redux
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { getCartList, addBookMark } from "../../redux/actions";
import { secondBaseURL } from "../../configs/AppConfig";

const CartCard = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { cartList } = useSelector((state) => state.cartData);

  const { data } = props;
  const {
    CourseID,
    CourseImage,
    CourseTitle,
    CourseDescription,
    AuthorName,
    OriginalCoursePrice,
    CoursePrice,
    CourseDuration,
    InstructorId
  } = data;
  const handleDelete = (e) => {
    e.stopPropagation();
    const afterRemove = cartList.filter((e) => e.CourseID !== CourseID);
    localStorage.setItem("cartData", JSON.stringify(afterRemove));
    dispatch(getCartList());
  };

  const handleBookMark = (e) => {
    const userId = localStorage.getItem('CPDUserID');
    const body = {
      UserId: userId,
      CourseId: CourseID,
    };
    dispatch(addBookMark(body));
    // axios
    //   .post(`${secondBaseURL}Course/AddBookMark`, body)
    //   .then((res) => console.log("this is res", res.data))
    //   .catch((err) => console.log(err));
  };
  
  const handleClickCard = (e) => {
    e.stopPropagation();
    if (data.CourseID === 223) {
      history.push({
        pathname: `/order/credit`
      });
    }else if (data.CourseType === 1) {
      history.push({
        pathname: `/course/detail/${CourseTitle}`,
        search: `?id=${CourseID}`,
        state: { data: data },
      })
      const recent = Array.isArray(JSON.parse(localStorage.getItem("recentView"))) ? JSON.parse(localStorage.getItem("recentView")) : []
      const resetCourse = recent.filter((item) => item.CourseID === CourseID);
      if (resetCourse.length === 0) {
        const recentList = [...recent, data];
        localStorage.setItem("recentView", JSON.stringify(recentList));
      }
    } else if (data.CourseType === 2) {
      history.push({
        pathname: `/package/detail/${CourseTitle}`,
        search: `?id=${CourseID}`,
        state: { data: data },
      });
      const recent = Array.isArray(JSON.parse(localStorage.getItem("recentView"))) ? JSON.parse(localStorage.getItem("recentView")) : []
      const resetCourse = recent.filter((item) => item.CourseID === CourseID);
      if (resetCourse.length === 0) {
        const recentList = [...recent, data];
        localStorage.setItem("recentView", JSON.stringify(recentList));
      }
    }
  };

  return (
    <div
      className="d-flex cart-card border-radius-8"
      onClick={(e) => handleClickCard(e)}
    >
      <div className="cart-image-container">
        <img src={srcURL + CourseImage} className="cart-image" alt="/" />
      </div>

      <div className="d-flex flex-column py-4 px-5 cart-content-container">
        <div className="d-flex">
          <div className="w-100 mr-auto">
            <span className="color-dark-grey-3 fs-20 mr-4 cart-title">
              {CourseTitle}
            </span>
            {
              AuthorName &&
              <span className="color-light-grey-3 fs-14"  onClick={(e) => {
                e.stopPropagation();
                history.push({
                  pathname: `/course/instructor/${InstructorId}`,
                })
              }}>
                By {AuthorName}
              </span>
            }
          </div>


          <div className="d-flex align-items-start justify-content-end  w-20">
            {/* <span
              onClick={(e) => handleBookMark(e)}
              className="fs-14 color-light-theme mr-4"
            >
              <ins>Move to bookmark</ins>
            </span> */}
            

            <DeleteOutlined
              onClick={(e) => handleDelete(e)}
              className="fs-20"
            />
            
            {/* <div>hours</div> */}
          </div>
          
        </div>
        <div className="d-flex  justify-content-end">
            <span className="color-light-theme fs-16 mb-auto">{CourseDuration} hours</span>
          </div>

        <div className="d-flex mt-auto align-items-end">
          {/* <span className="color-light-grey-2 fs-16 cart-text mb-auto">
            {CourseDescription}
          </span> */}
          <span
            className='color-light-grey-2 fs-16 cart-text mb-auto'
            dangerouslySetInnerHTML={{
              __html: CourseDescription,
            }}
          />
          

          <div className="d-flex align-items-end">
            <span className="color-orange fs-28 fw-800">${CoursePrice}</span>
            <span className="color-light-grey-2 fs-16 line-cross">
              {OriginalCoursePrice && <del>${OriginalCoursePrice ? OriginalCoursePrice : 0.00}</del>}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
