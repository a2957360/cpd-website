import React, { useState } from "react";

import { useHistory } from "react-router-dom";

//packages
import { Modal, Rate, Divider, Row, message } from "antd";

import { HistoryOutlined } from "@ant-design/icons";

// redux
import axios from "axios";
import { secondBaseURL } from "../../configs/AppConfig";
import { getCartList } from "../../redux/actions";
import { useDispatch } from "react-redux";

//components
import AddToCartModal from "../../components/Modal/AddToCartModal";
import LoginForm from "../../components/Header/LoginForm";
import RegistrationForm from "../../components/Header/RegistrationForm";

//app config
import { srcURL } from "../../configs/AppConfig";

//real img
import bookmarkStar from "../../assets/img/img-bookmark-star.png";

const { confirm } = Modal;
const InstructorCourseHorizontal = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [bookmarkState, setBookmarkState] = useState(props.data.IsActiveCourse);
  const [loginModal, setLoginModal] = useState({
    visible: false,
    login: true,
  });
  const { data, similarList } = props;
  const {
    CourseID,
    CourseImage,
    CourseTitle,
    CourseDescription,
    AuthorName,
    Rating,
    RatingCountDecimal,
    CoursePrice,
    OriginalCoursePrice,
    CourseDuration,
    RatingCount,
    InstructorId
  } = data;
  console.log(InstructorId)
  const handleClickCard = (e) => {
    e.stopPropagation();
    if (data.CourseType === 1) {
      history.push({
        pathname: `/course/detail/${CourseTitle}`,
        search: `?id=${CourseID}`,
        state: { data: data, type: "package" },
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
    if (!userId) {
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
            // dispatch(removeBookMark(body));
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
      <div className="d-flex course-card" style={{width: '65vw'}} onClick={(e) => handleClickCard(e)}>
        <div className="course-image-container--horizontal">
          <img src={srcURL + CourseImage} className="course-image" alt="/" />
          <div className="bookmark-container course-image-container--bookmark d-flex justify-content-center">
            <div
              onClick={(e) => handleBookMark(e)}
              className={
                bookmarkState
                  ? "bookmark bookmark--gold"
                  : "bookmark bookmark--grey"
              }
            >
              <img
                src={bookmarkStar}
                className={
                  bookmarkState
                    ? "bookmark-star bookmark-star--big"
                    : "bookmark-star bookmark-star--small"
                }
                alt="/"
              />
            </div>
          </div>
        </div>

        <div className="d-flex flex-column pt-4 px-4 course-content-container--horizontal ml-30">
          <h2 className="color-dark-grey-3 fs-18 line-height-20">
            {CourseTitle}
          </h2>

          <div className="d-flex align-items-center" >
            {/* {
              AuthorName &&
              <div onClick={() =>
                history.push({
                  pathname: `/course/instructor/${InstructorId}`,
                })
              }>
                <span className="color-light-grey-2 mr-2 fs-16">By </span>
                <span className="color-light-theme mr-auto fs-16" 
                >
                  {AuthorName}
                </span>
              </div>
            } */}

            {/* <HistoryOutlined className="fs-16 color-light-theme mr-2 fs-16" /> */}
            {/* <span className="color-light-grey-2 mr-2 fs-14">
              {CourseDuration}h
            </span> */}

            <span>
              {
                RatingCount !== 0 &&
                <>
                  <Rate className="fs-16 mr-2" allowHalf disabled value={RatingCountDecimal} />

                  {/* <span className="color-light-grey-2 fs-14">({RatingCount})</span> */}
                </>
              }

            </span>
          </div>

          <Divider dashed className="mx-0 my-1" />

          {/* <span className="color-light-grey-2 fs-13 course-text mb-auto">
            {CourseDescription}
          </span> */}
          <span className="color-light-grey-2 fs-16 course-text mb-auto" dangerouslySetInnerHTML={{ __html: CourseDescription }} />

          <div className="d-flex justify-content-between align-items-center pb-3">
            <div>
              <span className="color-orange fs-22 mr-3 fw-800">${CoursePrice}</span>

              <span className="color-light-grey-2 fs-18 line-cross">
                {OriginalCoursePrice && <del>${OriginalCoursePrice ? OriginalCoursePrice : 0.00}</del>}
              </span>
            </div>

            <div
              role="button"
              className="pl-30 pr-30 pt-8 pb-8 rounded-pill button button--light-hover-dark"
              onClick={(e) => handleAddCart(e)}
            >
              <span className="fs-14">Add to Cart</span>
            </div>
          </div>
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

export default InstructorCourseHorizontal;
