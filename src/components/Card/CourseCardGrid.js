import React, { useState } from "react";

import { useHistory } from "react-router-dom";

//packages
import { Modal, Popover, Rate, Divider, Row, message } from "antd";

import { HistoryOutlined } from "@ant-design/icons";

//components
import AddToCartModal from "../Modal/AddToCartModal";
import LoginForm from "../../components/Header/LoginForm";
import RegistrationForm from "../../components/Header/RegistrationForm";

//app config
import { srcURL } from "../../configs/AppConfig";

//redux
import { useDispatch, useSelector } from "react-redux";
import { getCartList, addBookMark, removeBookMark } from "../../redux/actions";
import axios from "axios";
import { secondBaseURL } from "../../configs/AppConfig";

//real img
import bookmarkStar from "../../assets/img/img-bookmark-star.png";

const { confirm } = Modal;
const CourseCard = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);
  const [bookmarkState, setBookmarkState] = useState(props.data.BookMarked);
  const [loginModal, setLoginModal] = useState({
    visible: false,
    login: true,
  });

  const { data, btnTitle, similarList, type } = props;
  const {
    CourseID,
    CourseImage,
    CourseTitle,
    CourseDescription,
    CategoryName,
    AuthorName,
    Rating,
    RatingCountDecimal,
    CoursePrice,
    OriginalCoursePrice,
    CourseDuration,
    RatingCount,
    InstructorId,
  } = data;
  // console.log(Rating)
  // console.log(data)
  const handleClickCard = (e) => {
    e.stopPropagation();
    if (data.CourseType === 1) {
      history.push({
        pathname: `/course/detail/${CourseTitle}`,
        search: `?id=${CourseID}`,
        state: { data: data, type: type },
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

  const handleAddCart = async (e) => {
    e.stopPropagation();
    const userId = localStorage.getItem('CPDUserID');
    // console.log(userId)
    if (!userId) {
      // message.warn("您还未登录，请先登录");
      setLoginModal({
        ...loginModal,
        visible: true,
      })
    } else {
      const cartData = JSON.parse(localStorage.getItem("cartData"));
      if (cartData) {
        if (cartData.some((c) => c["CourseID"] === CourseID)) {
          message.warn("this course is already in the cart");
        } else {
          await localStorage.setItem(
            "cartData",
            JSON.stringify([...cartData, data])
          );
        }
      } else {
        await localStorage.setItem("cartData", JSON.stringify([data]));
      }
      dispatch(getCartList());

      setVisible(true);
    }
  };

  const handleBookMark = (e) => {
    e.stopPropagation();
    const userId = localStorage.getItem('CPDUserID');
    if (!userId) {
      setLoginModal({
        ...loginModal,
        visible: true,
      })
    } else {
      const body = {
        UserId: userId,
        CourseId: CourseID,
      };
      console.log(bookmarkState)
      if (bookmarkState === 0) {
        // dispatch(addBookMark(body));
        axios
          .post(secondBaseURL + "Course/AddBookMark", body, {
            headers: {
              "Content-Type": "application/json",
              'Authorization': "Bearer " + localStorage.getItem("token")
            },
          })
          .then((res) => {
            console.log(res);
            setBookmarkState(1)
          })
          .catch((e) => console.log(e));
      } else {
        // OK to cancel bookmark
        confirm({
          title: 'OK to cancel bookmark?',
          // content: 'Some descriptions',
          onOk() {
            dispatch(removeBookMark(body));
            axios
              .post(secondBaseURL + "Course/RemoveBookMark", body, {
                headers: {
                  "Content-Type": "application/json",
                  'Authorization': "Bearer " + localStorage.getItem("token")
                },
              })
              .then((res) => {
                console.log(res);
                setBookmarkState(0)
              })
              .catch((e) => console.log(e));
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      }
    }
  };

  return (
    <>
      <div
        className="d-flex flex-column course-card"
        onClick={(e) => handleClickCard(e)}
      >
        <Popover
          placement="rightTop"
          title={null}
          overlayClassName="w-20"
          mouseEnterDelay={1}
          content={
            <div className="">
              <span className="d-flex">
                <p className="color-light-grey-2">Category:&nbsp;&nbsp;</p>
                <p className="color-light-theme">{CategoryName}</p>
              </span>
              <p className="color-dark-grey-2">{CourseTitle}</p>
              <Divider dashed className="mx-0 my-3" />
              <p className="color-light-grey-2 fs-13 course-card-description" dangerouslySetInnerHTML={{ __html: CourseDescription }} />
            </div>
          }
          trigger="hover"
        >
          <div className="course-image-container--grid">
            <img src={srcURL + CourseImage} className="course-image" alt="/" />
            <div className="bookmark-container course-image-container--bookmark d-flex justify-content-center">
              <div
                onClick={(e) => handleBookMark(e)}
                className={
                  bookmarkState !== 0
                    ? "bookmark bookmark--gold"
                    : "bookmark bookmark--grey"
                }
              >
                <img
                  src={bookmarkStar}
                  className={
                    bookmarkState !== 0
                      ? "bookmark-star bookmark-star--big"
                      : "bookmark-star bookmark-star--small"
                  }
                  alt="/"
                />
              </div>
            </div>
          </div>

          <div className="d-flex flex-column pt-4 px-4 course-content-container--grid">
            <h2 className="color-dark-grey-3 fs-14 course-title line-height-25">
              {CourseTitle}
            </h2>
            {
              AuthorName &&
              <div onClick={(e) => {
                  e.stopPropagation();
                  history.push({
                    pathname: `/course/instructor/${InstructorId}`,
                  })
                }}
              >
                <span className="color-light-grey-2">By </span>
                <span className="color-light-theme" 
                  >{AuthorName}</span>
              </div>
            }

            <div className="d-flex justify-content-between">
              {Rating && Rating !== 0 ? (<span>
                <Rate className="fs-16 mr-2" allowHalf disabled value={RatingCountDecimal} />
                {/* <span className="color-light-grey-2">({RatingCount})</span> */}
              </span>) : <span />
              }

              <span className="d-flex align-items-center">
                <HistoryOutlined className="fs-16 color-light-theme mr-2" />
                <span className="color-light-grey-2">{CourseDuration}h</span>
              </span>
            </div>

            <Divider dashed className="mx-0 my-3" />
          </div>
        </Popover>
        <div className="px-4 pb-4">
          <div className="mb-3">
            <span className="color-orange fs-20 mr-3 fw-800">${CoursePrice}</span>

            <span className="color-light-grey-2 fs-16 line-cross">
              {OriginalCoursePrice && <del>${OriginalCoursePrice ? OriginalCoursePrice : 0.00}</del>}
            </span>
          </div>
          {
            props.unavaiable != true &&
            <div
              role="button"
              className="rounded-pill button button--light-hover-dark pt-8 pb-8"
              onClick={(e) => handleAddCart(e)}
            >
              {!props.package ? <span className="fs-14">{btnTitle ? btnTitle : "Add to Cart"}</span> : <span className="fs-14">{"begin Learning"}</span>}
            </div>
          }

        </div>
      </div>

      <Modal
        title="Item has been added to your Cart"
        centered
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <AddToCartModal courseData={data} similarList={similarList} />
      </Modal>
      <Modal
        visible={loginModal.visible}
        width="400px"
        footer={null}
        wrapClassName="border-radius-8"
        onCancel={() => setLoginModal({ ...loginModal, visible: false })}
      >
        <div className="w-60 m-auto login-modal-wrapper">
          <Row justify="center" align="middle" className="w-100 m-auto mb-3">
            <div
              role="button"
              className={`w-30 text-center mr-2 py-2 login-tab ${loginModal.login ? "login-tab-active" : ""
                }`}
              onClick={() => setLoginModal({ ...loginModal, login: true })}
            >
              Login
            </div>
            <div
              role="button"
              className={`w-40 text-center py-2 login-tab ${loginModal.login ? "" : "login-tab-active"
                }`}
              onClick={() => setLoginModal({ ...loginModal, login: false })}
            >
              Register
            </div>
          </Row>
        </div>
        {loginModal.login ? (
          <LoginForm setLoginModal={setLoginModal} loginModal={loginModal} />
        ) : (
          <RegistrationForm setLoginModal={setLoginModal} />
        )}
      </Modal>
    </>
  );
};

export default CourseCard;
