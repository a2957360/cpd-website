import React, {useState, useEffect} from "react";

import { useHistory } from "react-router-dom";

//packages
import { Row, Col, Divider, Modal } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

//components
import PageHeader from "../../components/PageHeader";
import AddCartCard from "../../components/Card/AddCartCard";
import CourseCarousel from "../../components/Carousels/CourseCarousel";
import LoginForm from "../../components/Header/LoginForm";
import RegistrationForm from "../../components/Header/RegistrationForm";

//fake img
import newsImg1 from "../../assets/img/img-news-1.png";
import newsImg2 from "../../assets/img/img-news-2.png";
import newsImg3 from "../../assets/img/img-news-3.png";
import cartImg from "../../assets/img/img-cart.png";
//app config
import { srcURL } from "../../configs/AppConfig";

// const courseData = {
//   id: 1,
//   image: newsImg1,
//   title: 'Game Design & A longer Name…here is a name test if the name more than 3 rows, let me try',
//   text: 'Game Design & A longer Name…here is a name testGame Design & A longer Name…here is a name testGame Design & A longer Name…here is a name testGame Design & A longer Name…here is a name testGame Design & A longer Name…here is a name testGame Design & A longer Name…here is a name testGame Design & A longer Name…here is a name testGame Design & A longer Name…here is a name test if the name more than 3 rows, let me try',
//   instructor: 'Tried a very long instructor',
//   category: 'Accounting',
//   rating: 4.5,
//   duration: 5,
//   price: 99.99,
//   originalPrice: 199.99
// }

const similarData = [
  {
    id: 1,
    image: newsImg1,
    title:
      "Game Design & A longer Name…here is a name test if the name more than 3 rows, let me try",
    text: "Game Design & A longer Name…here is a name testGame Design & A longer Name…here is a name testGame Design & A longer Name…here is a name testGame Design & A longer Name…here is a name testGame Design & A longer Name…here is a name testGame Design & A longer Name…here is a name testGame Design & A longer Name…here is a name testGame Design & A longer Name…here is a name test if the name more than 3 rows, let me try",
    instructor: "Tried a very long instructor",
    category: "Accounting",
    rating: 4.5,
    duration: 5,
    price: 99.99,
    originalPrice: 199.99,
  },
  {
    id: 2,
    image: newsImg2,
    title: "Like same course but high price and longer than others",
    text: "Game Design & A longer Name…here is a name testGame Design & A longer Name…here is a name testGame Design & A longer Name…here is a name testGame Design & A longer Name…here is a name test if the name more than 3 rows, let me try",
    instructor: "instructor",
    category: "Accounting",
    rating: 4.5,
    duration: 5,
    price: 99.99,
    originalPrice: 199.99,
  },
  {
    id: 3,
    image: newsImg3,
    title:
      "Game Design & A longer Name…here is a name test if the name more than 3 rows, let me try",
    text: "Game Design & A longer Name…here is a name testGame Design & A longer Name…here is a name testGame Design & A longer Name…here is a name test if the name more than 3 rows, let me try",
    instructor: "very long instructor",
    category: "Spacing",
    rating: 4.5,
    duration: 5,
    price: 99.99,
    originalPrice: 199.99,
  },
  {
    id: 4,
    image: newsImg2,
    title: "Short Name",
    text: "Game Design & A longer Name…here is a name test if the name more than 3 rows, let me try",
    instructor: "very long instructor",
    category: "Spacing",
    rating: 4.5,
    duration: 5,
    price: 99.99,
    originalPrice: 199.99,
  },
];

const AddToCartModal = ({ courseData, similarList }) => {
  const history = useHistory();
  const [loginModal, setLoginModal] = useState({
    visible: false,
    login: true,
  });
  const [coupon, setCoupon] = useState(0);
  const [couponList, setCouponList] = useState([]);
  const [price, setPrice] = useState(0);
  const [couponPrice, setCouponPrice] = useState(0);
  useEffect(() => {
    const CoursePrice = courseData.CoursePrice;
    const OriginalCoursePrice = courseData.OriginalCoursePrice;
    setPrice(OriginalCoursePrice); //原价
    setCouponPrice(Number(CoursePrice)); //优惠后不包含apply coupon
  }, [courseData.CoursePrice, courseData.OriginalCoursePrice])
  // console.log(similarList)
  const filterSimilarList = () => {
    const similarDataList = [];
    similarList?.forEach((element)=> {
      if(similarDataList.length<4 && element.CourseName !== courseData.CourseName && element.IsActiveCourse === false) {
        similarDataList.push(element);
      }
    });
    return similarDataList
  }

  const handleClickCard = (item) => {
    let data = item;
    if (data.CourseType === 1) {
      history.push({
        pathname: `/course/detail/${data.CourseTitle}`,
        search: `?id=${data.CourseID}`,
        state: { data: data },
      })
      // const recent = Array.isArray(JSON.parse(localStorage.getItem("recentView"))) ? JSON.parse(localStorage.getItem("recentView")) : []
      // const resetCourse = recent.filter((item) => item.CourseID === CourseID);
      // if (resetCourse.length === 0) {
      //   const recentList = [...recent, data];
      //   localStorage.setItem("recentView", JSON.stringify(recentList));
      // }
    } else if (data.CourseType === 2) {
      history.push({
        pathname: `/package/detail/${data.CourseTitle}`,
        search: `?id=${data.CourseID}`,
        state: { data: data },
      });
      // const recent = Array.isArray(JSON.parse(localStorage.getItem("recentView"))) ? JSON.parse(localStorage.getItem("recentView")) : []
      // const resetCourse = recent.filter((item) => item.CourseID === CourseID);
      // if (resetCourse.length === 0) {
      //   const recentList = [...recent, data];
      //   localStorage.setItem("recentView", JSON.stringify(recentList));
      // }
    }
  };

  const handleCheckOut = () => {
    const userId = localStorage.getItem('CPDUserID');
    if(!userId) {
      setLoginModal({
        ...loginModal,
        visible: true,
      })
    }else {
      history.push({
        pathname: "/order/checkout",
        state:{
          subtotal: price, 
          Discount: price-couponPrice,
          Coupon: coupon,
          couponList: couponList
        }
      })
    }
  }
  return (
    <div className="d-flex flex-column">
      <div className="">
        <div className="d-flex flex-column">
          <div className="mt-4 mx-2">
            <AddCartCard data={courseData} />
          </div>

          <div className="d-flex align-items-end justify-content-end">
            <div className="d-flex mt-4">
              <div
                role="button"
                className=" rounded-pill button button--light-hover-dark button--animated  mr-4 "
                onClick={() =>
                  history.push({
                    pathname: "/order/cart",
                  })
                }
              >
                <span className="fs-14">View Cart</span>
              </div>

              <div
                role="button"
                className="rounded-pill button button--light-hover-dark button--animated"
                onClick={() => handleCheckOut()}
              >
                <span className="fs-14">Checkout</span>
              </div>
            </div>
          </div>

          <Divider className="mb-3" />

          {filterSimilarList().length>0&&
            <>
              <div className="fs-20 fw-600 color-dark-grey-2 px-2 mb-2">
                Similar Courses
              </div>
              <div className="d-flex justify-content-between" md={24} lg={24}>
                {filterSimilarList()?.map((item, index) => {
                  if(index<3) {
                    return (
                      <div key={index} className="px-2 cursor--pointer" style={{ width: 33.3+"%"}}
                        onClick={()=>handleClickCard(item)}
                      >
                        <img
                          src={srcURL + item.CourseImage}
                          style={{ width: 100+"%", height: 110 }}
                          alt="/"
                        />
                        <span className="one-line-title fs-16">{item.CourseName}</span>
                      </div>
                    );
                  }
                })}
              </div>
            </>
          }
        </div>
      </div>
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
              className={`w-30 text-center mr-2 py-2 login-tab ${
                loginModal.login ? "login-tab-active" : ""
              }`}
              onClick={() => setLoginModal({ ...loginModal, login: true })}
            >
              Login
            </div>
            <div
              role="button"
              className={`w-40 text-center py-2 login-tab ${
                loginModal.login ? "" : "login-tab-active"
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

export default AddToCartModal;
