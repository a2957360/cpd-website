import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import {
  GlobalOutlined,
  ReadOutlined,
  ProfileOutlined,
  HistoryOutlined,
  FileProtectOutlined,
  ExportOutlined,
} from "@ant-design/icons";

// getRelatedPackages
import { useDispatch, useSelector } from "react-redux";
import { getRelatedPackages } from "../../redux/actions";
import { getCartList, getPackageById } from "../../redux/actions";
//packages
import { Modal, Row, Col, message } from "antd";
import ReactPlayer from "react-player";

import axios from "axios";
import { secondBaseURL } from "../../configs/AppConfig";

//components
import PageHeader from "../../components/PageHeader";
import CourseCarousel from "../../components/Carousels/CourseCarousel";
import DetailHeader from "../course/components/DetailHeader";
import AddToCartModal from "../../components/Modal/AddToCartModal";
import HowToWords from "../course/components/HowToWords";
import CardGrid from "../../components/Card/CourseCardGrid";
import RouterLoading from "../../components/RouterLoading";
import LoginForm from "../../components/Header/LoginForm";
import RegistrationForm from "../../components/Header/RegistrationForm";
import PackageFAQ from "./component/PackageFAQ";

import { srcURL } from '../../configs/AppConfig';

//real img
import bookmarkStar from "../../assets/img/img-bookmark-star.png";

const { confirm } = Modal;
const feature = [
  {
    icon: (
      <HistoryOutlined
        style={{
          color: "#3DAFBE",
        }}
      />
    ),
    title: "Duration",
    content: "20 Hours",
  },
  {
    icon: (
      <ProfileOutlined
        style={{
          color: "#3DAFBE",
        }}
      />
    ),
    title: "Content",
    content: "14 Courses",
  },
  {
    icon: (
      <ReadOutlined
        style={{
          color: "#3DAFBE",
        }}
      />
    ),
    title: "Skill Level",
    content: "Intermediate",
  },
  {
    icon: (
      <FileProtectOutlined
        style={{
          color: "#3DAFBE",
        }}
      />
    ),
    title: "Certification",
    content: "Yes",
  },
  {
    icon: (
      <ExportOutlined
        style={{
          color: "#3DAFBE",
        }}
      />
    ),
    title: "Available Access",
    content: "Video",
  },
  {
    icon: (
      <GlobalOutlined
        style={{
          color: "#3DAFBE",
        }}
      />
    ),
    title: "Language",
    content: "English",
  },
]
const DetailInfo = (props) => {
  const { data, courseId } = props;
  // console.log(123, props);
  const history = useHistory();

  const dispatch = useDispatch();
  const { relatedPackage, packageDetail } = useSelector((state) => state.courseData);
  const [bookmarkState, setBookmarkState] = useState(packageDetail.BookMarked);

  const [loginModal, setLoginModal] = useState({
    visible: false,
    login: true,
  });
  const userId = localStorage.getItem("CPDUserID");
  // console.log(packageDetail)
  useEffect(() => {
    //courseId, userid 获取课程详情
    dispatch(getPackageById(courseId, userId));
  }, [courseId]);

  useEffect(() => {
    dispatch(getRelatedPackages(data.Categoryid));
  }, []);
  const [visible, setVisible] = useState(false);

  const breadcrumb = [
    {
      title: "Package",
      path: "/package/list",
    },
    {
      title: data.CourseName,
    },
    // {
    //   title: data.CourseName,
    // },
  ];

  const handleAddCart = async (e) => {
    if (!userId) {
      // message.error('Please login first');
      setLoginModal({
        ...loginModal,
        visible: true,
      })
      return;
    } else {
      const cartData = JSON.parse(localStorage.getItem("cartData"));
      if (cartData) {
        if (cartData.some((c) => c["CourseID"] === props.data.CourseID)) {
          message.warn("this course is already in the cart");
        } else {
          await localStorage.setItem(
            "cartData",
            JSON.stringify([...cartData, props.data])
          );
        }
      } else {
        await localStorage.setItem("cartData", JSON.stringify([props.data]));
      }
      dispatch(getCartList());
      // setVisible(true);
    }
  };

  const handleCheckout = async (e) => {
    if (!userId) {
      // message.error('Please login first');
      setLoginModal({
        ...loginModal,
        visible: true,
      })
      return;
    } else {
      const cartData = JSON.parse(localStorage.getItem("cartData"));
      if (cartData) {
        if (cartData.some((c) => c["CourseID"] === props.data.CourseID)) {
          message.warn("this course is already in the cart");
        } else {
          await localStorage.setItem(
            "cartData",
            JSON.stringify([...cartData, props.data])
          );
        }
        dispatch(getCartList());
        history.push({
          pathname: "/order/cart",
        })
      } else {
        await localStorage.setItem("cartData", JSON.stringify([props.data]));
        dispatch(getCartList());
        history.push({
          pathname: "/order/cart",
        })
      }

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
        CourseId: data.CourseID,
      };
      // console.log(bookmarkState)
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

  if (!relatedPackage) {
    return <RouterLoading />;
  }
  return (
    <div className="d-flex flex-column">
      <div className="d-flex justify-content-center bg-light-theme--course-unowned">
        <div className="content-container w-80">
          <PageHeader data={breadcrumb} theme="white" />

          <Row className="pl-2 pr-2 mt-0 pt-0">
            <Col md={16} lg={16} className="pr-5">
              <DetailHeader data={data} />

              {/* what you will learn */}
              {data.LearnPoints &&
                <div className="section-card section-card--animated border-radius-8 bg-white mt-4">
                  <div className="color-dark-grey-3 fs-20 mx-5 mt-4 mb-3">
                    What you will learn from this course?
                  </div>
                  <div className="rectangle rectangle--light rectangle--small card-rectangle" />
                  <div className="color-light-grey-3 fs-16 mx-5 mt-3 mb-5 line-height-30" dangerouslySetInnerHTML={{ __html: data.LearnPoints }} />
                </div>
              }

              {/* overview */}
              <div className="section-card section-card--animated border-radius-8 bg-white mt-4">
                <div className="color-dark-grey-3 fs-20 mx-5 mt-4 mb-3">
                  Overview
                </div>
                <div className="rectangle rectangle--light rectangle--small card-rectangle" />
                <div className="color-light-grey-3 fs-16 mx-5 mt-3 mb-5 line-height-30" dangerouslySetInnerHTML={{ __html: data.CourseDescription }} />
              </div>

              {/* how does it works //todo */}
              <div className="section-card section-card--animated border-radius-8 bg-white mt-4 mb-100">
                <div className="color-dark-grey-3 fs-20 mx-5 mt-4 mb-3">
                  How does it work?
                </div>
                <HowToWords Enrollment={data.Enrollment} />
              </div>

              {/* reviews */}
              {/* <div>
                <ReviewList data={data} />
              </div> */}
            </Col>

            <Col md={8} lg={8} className="mt-4">
              <div className="section-card border-radius-8 bg-white mt-4">
                <div className="text-center">
                  <img className="w-90 mt-5" src={srcURL + data.CourseImage} />
                </div>

                <div className="d-flex justify-content-between mx-5">
                  <div className="mt-3">
                    <span className="color-orange fs-28 mr-3 fw-800">
                      CA ${data.CoursePrice}
                    </span>

                    <span className="color-dark-grey-2 fs-20 line-cross">
                      {data.OriginalCoursePrice && <del>${data.OriginalCoursePrice ? data.OriginalCoursePrice : 0.00}</del>}
                    </span>
                  </div>

                  <div className="bookmark-container d-flex justify-content-center">
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

                <div className="d-flex justify-content-around px-5 pb-5 pt-4">
                  <div
                    role="button"
                    className="mb-2 rounded-pill button button--white-hover-white button--animated"
                    onClick={(e) => handleAddCart(e)}
                  >
                    Add to Cart
                  </div>

                  <div
                    role="button"
                    className="mb-2 rounded-pill button button--light-hover-dark button--animated"
                    onClick={(e) => handleCheckout(e)}
                  >
                    Buy Now
                  </div>
                </div>

                {/* course features */}
                <div className="">
                  <div className="p-5">
                    <span className="fs-22 color-dark-grey-2">
                      Course Features
                    </span>
                    <div
                      className="mt-3 d-flex justify-content-between align-items-center"
                    >
                      <div className="d-flex align-items-center fs-20">
                        <HistoryOutlined style={{ color: "#3DAFBE" }} />
                        <div className="fs-20 color-dark-grey-2 ml-3">Duration</div>
                      </div>
                      <div className="fs-20 color-light-grey-2">
                        {data.CourseDuration} Hours
                      </div>
                    </div>
                    <div
                      className="mt-3 d-flex justify-content-between align-items-center"
                    >
                      <div className="d-flex align-items-center fs-20">
                        <ProfileOutlined style={{ color: "#3DAFBE" }} />
                        <div className="fs-20 color-dark-grey-2 ml-3">Contents</div>
                      </div>
                      <div className="fs-20 color-light-grey-2">
                        {data.VideoContent.length} Courses
                      </div>
                    </div>
                    <div
                      className="mt-3 d-flex justify-content-between align-items-center"
                    >
                      <div className="d-flex align-items-center fs-20">
                        <ReadOutlined style={{ color: "#3DAFBE" }} />
                        <div className="fs-20 color-dark-grey-2 ml-3">Skill Level</div>
                      </div>
                      <div className="fs-20 color-light-grey-2">
                        {data.SkilllevelName}
                      </div>
                    </div>
                    <div
                      className="mt-3 d-flex justify-content-between align-items-center"
                    >
                      <div className="d-flex align-items-center fs-20">
                        <FileProtectOutlined style={{ color: "#3DAFBE" }} />
                        <div className="fs-20 color-dark-grey-2 ml-3">Certification</div>
                      </div>
                      <div className="fs-20 color-light-grey-2">
                        Yes
                      </div>
                    </div>
                    <div
                      className="mt-3 d-flex justify-content-between align-items-center"
                    >
                      <div className="d-flex align-items-center fs-20">
                        <ExportOutlined style={{ color: "#3DAFBE" }} />
                        <div className="fs-20 color-dark-grey-2 ml-3">Available Access</div>
                      </div>
                      <div className="fs-20 color-light-grey-2">
                        Video
                      </div>
                    </div>
                    <div
                      className="mt-3 d-flex justify-content-between align-items-center"
                    >
                      <div className="d-flex align-items-center fs-20">
                        <GlobalOutlined style={{ color: "#3DAFBE" }} />
                        <div className="fs-20 color-dark-grey-2 ml-3">Language</div>
                      </div>
                      <div className="fs-20 color-light-grey-2">
                        English
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>

            {/* Package Content */}
            <Col className="mb-100 w-100" md={24} lg={24}>
              <div className="fs-30 color-dark-grey-2 mt-40">
                Package Content
              </div>
              <div className="rectangle rectangle--light rectangle--size-12 blog-rectangle mb-3" />
              {/* <CourseCarousel data={data.ChildCourse??[]} />
               */}
              <div className="d-flex flex-wrap justify-content-start">
                {
                  data.ChildCourse?.map((item, index) => (
                    <div key={index} className="p-3 w-20">
                      <CardGrid  data={item} unavaiable={true} />
                    </div>
                  ))
                }
              </div>
            </Col>
            <Col className="w-100" md={24} lg={24}>
              <PackageFAQ  type="home"></PackageFAQ>
            </Col>

            {/* Related packages */}
            <Col className="mb-100 w-100" md={24} lg={24}>
              <div className="fs-30 color-dark-grey-2 mt-40">
                Related Packages
              </div>
              <div className="rectangle rectangle--light rectangle--size-12 blog-rectangle mb-3" />
              {relatedPackage.length > 0 && <><CourseCarousel data={relatedPackage ?? []} /></>}
            </Col>
          </Row>
        </div>
      </div>

      <Modal
        title="Item has been added to your Cart"
        centered
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <AddToCartModal courseData={data} />
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
    </div>

  );
};

export default DetailInfo;
