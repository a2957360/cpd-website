import React, { useEffect, useState } from "react";

import { useHistory } from "react-router-dom";

//packages
import {
  Avatar,
  Rate,
  Row,
  Col,
  Form,
  Radio,
  Input,
  Space,
  Progress,
  Divider,
  Collapse,
  Tabs,
  message,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";

//components
import PageHeader from "../../components/PageHeader";
import CartCard from "../../components/Card/CartCard";
import CourseCarousel from "../../components/Carousels/CourseCarousel";
import RouterLoading from "../../components/RouterLoading";

//fake img
import newsImg1 from "../../assets/img/img-news-1.png";
import newsImg2 from "../../assets/img/img-news-2.png";
import newsImg3 from "../../assets/img/img-news-3.png";
import cartImg from "../../assets/img/img-cart.png";

//redux
import { useDispatch, useSelector } from "react-redux";
import { getCartList, getValidateCoupon, getRelatedCourses,clearCoupon } from "../../redux/actions";

const breadcrumb = [
  {
    title: "Shopping Cart",
    path: "/order/cart",
  },
];

const conpons = [
  "Coupon_01",
  "Coupon_01",
  "Coupon_01",
  "Coupon_01",
  "Coupon_01",
];

const Cart = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { cartList } = useSelector((state) => state.cartData);
  const { validateCoupon } = useSelector((state) => state.cartData);

  const [code, setCode] = useState('');
  const [coupon, setCoupon] = useState(Number(localStorage.getItem("coupon")) || 0);
  const [couponList, setCouponList] = useState(JSON.parse(localStorage.getItem("couponList")) ?? [])
  const [price, setPrice] = useState(0);
  const [couponPrice, setCouponPrice] = useState(0);
  const { relatedCourse } = useSelector((state) => state.courseData);

  useEffect(() => {
    const getCart = () => {
      dispatch(getCartList());
    };
    if (relatedCourse == null) {
      dispatch(getRelatedCourses(1));
    }
    getCart();
  }, []);

  useEffect(() => {
    const CoursePrice = Number(
      cartList?.reduce(
        (acc, cur) => acc + Number(cur.CoursePrice),
        0
      )
    ).toFixed(2);
    const OriginalCoursePrice = Number(
      cartList?.reduce(
        (acc, cur) => acc + Number(cur.OriginalCoursePrice),
        0
      )
    ).toFixed(2);
    setPrice(OriginalCoursePrice); //原价
    setCouponPrice(Number(CoursePrice)); //优惠后不包含apply coupon
  }, [cartList])
  console.log("cartList", cartList);



  const handleClearCart = () => {
    localStorage.setItem("cartData", JSON.stringify([]));
    dispatch(getCartList());
  };

  const handleCoupon = () => {
    dispatch(getValidateCoupon(code));
  }

  const deleteCoupon = () => {
    setCoupon(0);
    setCouponList([]);
    localStorage.setItem("couponList", JSON.stringify([]));
    localStorage.setItem("coupon", 0)
  }

  useEffect(() => {
    if (validateCoupon) {
      if (validateCoupon != "Invalid Coupon" && validateCoupon != "Token Expired") {
        if (code != '') {
          setCouponList([code]);
        }
        if (code != "" && code != null) {
          setCoupon(validateCoupon);
          localStorage.setItem("coupon", validateCoupon)
          localStorage.setItem("couponList", JSON.stringify([code]));
        }
      } else {
        message.error(validateCoupon);
      }
    }
  }, [validateCoupon])

  useEffect(() => {
    if (cartList) {
      let total = cartList.reduce((pre, next) => {
        pre['CoursePrice'] = Number(pre['CoursePrice'] || 0) + Number(next['CoursePrice'] || 0)
        pre['OriginalCoursePrice'] = Number(pre['OriginalCoursePrice'] || 0) + Number(next['OriginalCoursePrice'] || next['CoursePrice'])
        return pre
      }, {})
      setPrice(total["OriginalCoursePrice"]);
      setCouponPrice(total["CoursePrice"]);
    }
  }, [cartList])
  if (!cartList) {
    return <RouterLoading />;
  }
  return (
    <div className="d-flex flex-column">
      <div className="d-flex justify-content-center">
        <div className="content-container w-80">
          <PageHeader data={breadcrumb} />

          {cartList.length === 0 ? (
            // empty cart
            <div className="d-flex flex-column justify-content-center align-items-center">
              <div className="color-dark-grey-3 fs-20 mt-4">Oops～</div>

              <div className="color-light-grey-3 fs-16 mt-4">
                Your cart is empty. Keep shopping to find a course!
              </div>

              <img
                className="mt-5"
                src={cartImg}
                style={{ width: 200, height: 200 }}
                alt="/"
              />

              <div className="d-flex align-items-end justify-content-center mt-40 mb-100">
                <div
                  role="button"
                  className="rounded-pill button button--light-hover-dark"
                  onClick={() => history.push("/course/list")}
                >
                  Find a Course
                </div>
              </div>
            </div>
          ) : (
            <div>
              <Row>
                <Col md={15} lg={15} className="pr-5">
                  <div className="d-flex flex-column justify-content-center">
                    <div className="d-flex align-items-center justify-content-center">
                      <span className="fs-20 color-dark-grey-2 mr-auto">
                        {cartList.length} items in your cart
                      </span>

                      <div
                        role="button"
                        className="rounded-pill button button--white-to-light py-2 px-4"
                        onClick={() => handleClearCart()}
                      >
                        Clear Cart
                      </div>
                    </div>
                  </div>

                  {cartList.map((item, index) => {
                    return (
                      <div key={index} className="mt-4">
                        <CartCard data={item} />
                      </div>
                    );
                  })}
                </Col>

                <Col md={9} lg={9} className="mt-4 mb-5">
                  <div className="d-flex flex-column section-card shadow-1 border-radius-8 bg-white px-5 pt-4 pb-30">
                    <div className="d-flex align-items-center mt-4">
                      <span className="fs-20 color-dark-grey-2 mr-auto">
                        Order Detail
                      </span>
                    </div>
                    <div className="d-flex align-items-center mt-4">
                      <span className="fs-20 color-dark-grey-2 mr-auto">
                        SubTotal
                      </span>

                      <span className="fs-20 color-dark-grey-2">
                        CA ${price.toFixed(2)}
                      </span>
                    </div>
                    {/* {cartList.map((item, index) => {
                      return (
                        <div className="d-flex align-items-center mt-4">
                          <span className="fs-20 color-dark-grey-2 mr-auto">
                            item{index}
                          </span>

                          <span className="fs-20 color-dark-grey-2">
                            CA ${item.OriginalCoursePrice??0}
                          </span>
                        </div>
                      )
                    })} */}

                    <div className="d-flex align-items-center mt-3">
                      <span className="fs-20 color-dark-grey-2 mr-auto">
                        Discount + Coupon
                      </span>

                      <span className="fs-20 color-dark-grey-2 ">-CA $
                        {(price - couponPrice + Number(coupon) * couponPrice * 0.01).toFixed(2)}
                      </span>
                    </div>

                    <div className="d-flex align-items-center mt-3">
                      <span className="fs-20 color-dark-grey-2 mr-auto">
                        HST (13%)
                      </span>

                      <span className="fs-20 color-dark-grey-2 ">CA $
                        {(((couponPrice - Number(coupon) * couponPrice * 0.01)) * 0.13).toFixed(2)}
                      </span>
                    </div>

                    <Divider className="mt-4 mb-3" />

                    <div className="d-flex align-items-center">
                      <span className="fs-20 color-dark-grey-2 mr-auto">
                        Total
                      </span>

                      <span className="fs-28 color-orange fw-800">
                        CA ${" "}
                        {(((couponPrice - Number(coupon) * couponPrice * 0.01)) * 1.13).toFixed(2)}
                      </span>
                    </div>

                    <div className="d-flex align-items-end justify-content-center mt-3">
                      <div
                        role="button"
                        className="w-100 pl-30 pr-30 pt-8 pb-8 rounded-pill button button--light-hover-dark button--animated"
                        onClick={() =>
                          history.push({
                            pathname: "/order/checkout",
                            // state: {
                            //   subtotal: price,
                            //   Discount: price - couponPrice,
                            //   Coupon: coupon,
                            //   couponList: couponList
                            // }
                          })
                        }
                      >
                        Checkout
                      </div>
                    </div>

                    <Divider className="mt-4 mb-2" />

                    <div className="d-flex my-3">
                      <Input
                        className="text-input text-input--white rounded-pill px-4 py-1"
                        placeholder="Enter Coupon"
                        onChange={(e) => setCode(e.target.value)}
                      />

                      <div
                        role="button"
                        className="rounded-pill button button--light-hover-dark button--animated"
                        style={{ marginLeft: -30, zIndex: 1 }}
                        onClick={handleCoupon}
                      >
                        <div className="fs-14">Apply</div>
                      </div>
                    </div>

                    {couponList?.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className="d-flex align-items-center mt-3 mb-3"
                        >
                          <span className="fs-18 color-light-grey-2 mr-auto">
                            {item}
                          </span>

                          <DeleteOutlined className="fs-20" onClick={() => deleteCoupon()} />
                        </div>
                      );
                    })}
                  </div>
                </Col>
              </Row>
            </div>
          )}

          {/* course carousel */}
          <Col className="mb-100" md={24} lg={24}>
            <div className="fs-30 color-dark-grey-2 mt-40">
              You may also like
            </div>

            <div className="rectangle rectangle--light rectangle--size-12 blog-rectangle mb-3" />

            <CourseCarousel data={relatedCourse} />
          </Col>
        </div>
      </div>
    </div>
  );
};

export default Cart;
