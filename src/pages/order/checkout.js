import React, { useState, useEffect } from "react";

import { useHistory, useLocation } from "react-router-dom";

//package
import { Row, Col, Form, Input, Divider, message, Modal, Card } from "antd";
import { DeleteOutlined, CheckOutlined } from "@ant-design/icons";
import { loadStripe } from "@stripe/stripe-js";
//components
import PageHeader from "../../components/PageHeader";
import { checkout, getValidateCoupon, CheckoutCredit, clearCheckout, getCartList,getUserSettings } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

const breadcrumb = [
  {
    title: "Checkout",
    path: "/order/checkout",
  }
]

const conpons = [
  "Coupon_01",
  "Coupon_01",
  "Coupon_01",
  "Coupon_01",
  "Coupon_01"
]

const Checkout = () => {
  const stripePromise = loadStripe("pk_live_3bLCS3gX5HrcjOatXyZuj0Sf0061yXjjpO");

  const [form] = Form.useForm();
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();

  const [couponList, setCouponList] = useState(JSON.parse(localStorage.getItem("couponList")) ?? [])
  const [code, setCode] = useState(couponList[0]?couponList[0]:"");
  const [coupon, setCoupon] = useState(Number(localStorage.getItem("coupon")) || 0);
  const [onButton, setonButton] = useState('');
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [total, settotal] = useState({ 'CoursePrice': 0, 'OriginalCoursePrice': 0 });

  const { userSettings } = useSelector((state) => state.authData);


  // let price = (Number(location.state.subtotal) - Number(location.state.Discount)) ?? 0;v
  const { checkoutSuccess, checkoutCreditSuccess } = useSelector((state) => state.courseData);
  const { validateCoupon, cartList } = useSelector((state) => state.cartData);
  // console.log(location.state);Coupon
  const handleSubmit = (value) => {
    let data = { ...value, StreetAddress: value['address-1'] + '-' + value['address-2'] }
    let da = {
      "UserId": localStorage.getItem('CPDUserID'),
      "OrderTotal": ((Number(total.CoursePrice) - Number(coupon) * total?.CoursePrice * 0.01) * 0.13).toFixed(2),
      "Tax": (Number(total?.CoursePrice - Number(coupon) * total?.CoursePrice * 0.01) * 0.13).toFixed(2),
      "TotalAmountBeforeDiscount": (Number(total.OriginalCoursePrice) * 0.13).toFixed(2),
      "Discount": (Number(total?.OriginalCoursePrice - total?.CoursePrice + Number(coupon) * total?.CoursePrice * 0.01)).toFixed(2),
      "DiscountCode": code,
      "lstorders": JSON.parse(localStorage.getItem('cartData'))
    }
    // dispatch(checkout({...data,...da}))
    // setonButton({ ...data, ...da })
    if (value.checkoutType == "normal") {
      dispatch(checkout({ ...data, ...da }))
    } else if (value.checkoutType == "point") {
      dispatch(CheckoutCredit({ ...data, ...da }))
    }

    // history.push({
    //   pathname: "/order/congratulations",
    //   state: {
    //     breadCrumb: [
    //       {
    //         title: "Congratulations"
    //       }
    //     ],
    //     title: "Congratulations!",
    //     text: "Thanks for your payment",
    //     btnText: "My Order",
    //     btnPath: "/dashboard/orders"
    //   }
    // })
    // if(onButton==='credit') {
    //   console.log('cretid')
    //   // dispatch(checkout({...data,...da}))
    // }else {
    //   console.log('check')
    // dispatch(CheckoutCredit({...data,...da}))
    // }
    // history.push({
    //   pathname: "/order/congratulations",
    //   state: {
    //     breadCrumb: [
    //       {
    //         title: "Congratulations"
    //       }
    //     ],
    //     title: "Congratulations!",
    //     text: "Thanks for your payment",
    //     btnText: "My Order",
    //     btnPath: "/dashboard/orders"
    //   }
    // })
  };
  const changeFormCredit = () => {
    form.validateFields().then(() => {
      setConfirmVisible(true);
    });
    
  }

  const changeFormCourse = () => {
    form.setFieldsValue({ "checkoutType": "normal" })
    form.submit();
    
  }
  useEffect(() => {
    if (checkoutSuccess) {
      // 添加订单成功
      if (checkoutSuccess !== "") {
        stripePay();

      } else {
        message.error("Add order failed, please try again later!");
      }
    }
  }, [checkoutSuccess]);

  useEffect(() => {
    if (checkoutCreditSuccess) {
      // 添加订单成功
      if (checkoutCreditSuccess !== "" && checkoutCreditSuccess == "Done") {
        dispatch(clearCheckout())
        localStorage.setItem("cartData", JSON.stringify([]));
        dispatch(getCartList());
        dispatch(getUserSettings());
        // if()
        history.push({
          pathname: "/order/congratulations",
          state: {
            breadCrumb: [
              {
                title: "Congratulations"
              }
            ],
            title: "Congratulations!",
            text: "Thanks for your payment",
            btnText: "My Order",
            btnPath: "/dashboard/orders"
          }
        })
      } else if(checkoutCreditSuccess == "Invalid Purchase") {
        message.error("You cannot buy a custom package using credits. Please adjust your cart");
      } else {
        message.error("Add order failed, please try again later!");
      }
    }
  }, [checkoutCreditSuccess, dispatch, history]);

  const stripePay = async () => {
    const stripe = await stripePromise;

    stripe
      .redirectToCheckout({
        sessionId: checkoutSuccess,
      })
      .then((result) => {
        dispatch(clearCheckout())
        localStorage.setItem("cartData", JSON.stringify([]));
        dispatch(getCartList());
      })
      .catch((err) => {
        history.push({
        pathname: "/order/congratulations",
        state: {
          breadCrumb: [
            {
              title: "Fail"
            }
          ],
          title: "Payment fail!",
          text: "Sorry your payment is failed",
          btnText: "My Order",
          btnPath: "/dashboard/orders"
        }
      })});
  };

  const deleteCoupon = () => {
    setCoupon(0);
    setCouponList([]);
    localStorage.setItem("couponList", JSON.stringify([]));
    localStorage.setItem("coupon",0)
    setCode("");
  }
  console.log(code);
  const handleCoupon = () => {
    dispatch(getValidateCoupon(code));
  }
  useEffect(() => {
    if (validateCoupon) {
      if (validateCoupon != "Invalid Coupon" && validateCoupon != "Token Expired") {

        if (code != '') {
          setCouponList([code]);
        }
        if (code != "" && code != null) {
          localStorage.setItem("couponList", JSON.stringify([code]));
          setCoupon(validateCoupon);
          localStorage.setItem("coupon", validateCoupon)
        }
      } else {
        message.error(validateCoupon);
      }
    }
  }, [code, validateCoupon])

  useEffect(() => {
    if (cartList) {
      let total = cartList.reduce((pre, next) => {
        pre['CoursePrice'] = Number(pre['CoursePrice'] || 0) + Number(next['CoursePrice'] || 0)
        pre['OriginalCoursePrice'] = Number(pre['OriginalCoursePrice'] || 0) + Number(next['OriginalCoursePrice'] || next['CoursePrice'])
        pre['CourseDuration'] = Number(pre['CourseDuration'] || 0) + Number(next['CourseDuration'] || 0)
        return pre
      }, {})
      settotal(total);
    }
  }, [cartList])
  return (
    <div className='d-flex flex-column'>
      <div className='d-flex justify-content-center'>
        <div className='content-container w-80'>
          <PageHeader data={breadcrumb} />

          <div className='d-flex justify-content-center'>

            <Row>
              <Col md={15} lg={15} className='pr-100'>
                <span className='color-dark-grey-2 fs-22 pl-2 py-2 fw-600'>Billing Address</span>

                <Form
                  form={form}
                  name="basic"
                  initialValues={{ remember: true }}
                  onFinish={handleSubmit}
                >
                  <Row className="py-5">
                    <Form.Item
                      name="checkoutType"
                      hidden
                    >
                    </Form.Item>
                    <Col span={12} className='pr-2'>
                      <Form.Item
                        name="FirstName"
                        rules={[{ required: true }]}
                      >
                        <Input
                          className="text-input text-input--white rounded-pill px-4 py-3"
                          placeholder="First Name"
                        />
                      </Form.Item>
                    </Col>

                    <Col span={12} className='pl-2'>
                      <Form.Item
                        name="Lastname"
                        rules={[{ required: true }]}
                      >
                        <Input
                          className="text-input text-input--white rounded-pill px-4 py-3"
                          placeholder="Last Name"
                        />
                      </Form.Item>
                    </Col>

                    <Col span={24}>
                      <Form.Item
                        name="address-1"
                        rules={[{ required: true }]}
                      >
                        <Input
                          className="text-input text-input--white rounded-pill px-4 py-3"
                          placeholder="Address Line 1"
                        />
                      </Form.Item>
                    </Col>

                    <Col span={24}>
                      <Form.Item
                        name="address-2"
                      >
                        <Input
                          className="text-input text-input--white rounded-pill px-4 py-3"
                          placeholder="Address Line 2"
                        />
                      </Form.Item>
                    </Col>

                    <Col span={12} className='pr-2'>
                      <Form.Item
                        name="PostalCode"
                        rules={[{ required: true }]}
                      >
                        <Input
                          className="text-input text-input--white rounded-pill px-4 py-3"
                          placeholder="Postcode / Zip"
                        />
                      </Form.Item>
                    </Col>

                    <Col span={12} className='pl-2'>
                      <Form.Item
                        name="City"
                        rules={[{ required: true }]}
                      >
                        <Input
                          className="text-input text-input--white rounded-pill px-4 py-3"
                          placeholder="City"
                        />
                      </Form.Item>
                    </Col>

                    <Col span={12} className='pr-2'>
                      <Form.Item
                        name="Province"
                        rules={[{ required: true }]}
                      >
                        <Input
                          className="text-input text-input--white rounded-pill px-4 py-3"
                          placeholder="Province"
                        />
                      </Form.Item>
                    </Col>

                    <Col span={12} className='pl-2'>
                      <Form.Item
                        name="Country"
                        rules={[{ required: true }]}
                      >
                        <Input
                          className="text-input text-input--white rounded-pill px-4 py-3"
                          placeholder="Country"
                        />
                      </Form.Item>
                    </Col>

                    <Col span={12} className='pr-2'>
                      <Form.Item
                        name="Phone"
                        rules={[{ required: true }]}
                      >
                        <Input
                          className="text-input text-input--white rounded-pill px-4 py-3"
                          placeholder="Phone"
                        />
                      </Form.Item>
                    </Col>

                    <Col span={12} className='pl-2'>
                      <Form.Item
                        name="Email"
                        rules={[{ required: true }]}
                      >
                        <Input
                          className="text-input text-input--white rounded-pill px-4 py-3"
                          placeholder="E-mail"
                        />
                      </Form.Item>
                    </Col>
                  </Row>


                  <span className='color-dark-grey-2 fs-22 pl-2 py-2 fw-600'>Payment</span>

                  <div className='d-flex justify-content-between ml-40 mr-40 mt-20 mb-200'>
                    <div className='d-flex flex-column align-items-center'>
                      {/* <span className='color-light-grey-2 fs-16 pl-2 py-2'>Credit Card</span> */}
                      <button
                        type="button"
                        className="button--fs-22 rounded-pill button button--light-hover-dark button--animated"
                        style={{ border: 'none' }}
                        // onClick={setonButton('Course')}
                        onClick={changeFormCourse}
                      >
                        Pay with Credit Card
                      </button>
                    </div>

                    <div className='d-flex flex-column align-items-center'>
                      <button
                        role="button"
                        className="button--fs-22 rounded-pill button button--light-hover-dark button--animated"
                        type='button'
                        style={{ border: 'none' }}
                        // onClick={setonButton('Credit')}
                        onClick={changeFormCredit}
                      >
                        Pay with Course Credit
                      </button>
                      <span className='color-light-grey-2 fs-16 pl-2 py-2'>(You have {userSettings.Credits} Hours)</span>
                    </div>
                  </div>
                </Form>
              </Col>

              <Col md={9} lg={9} className='mt-4 mb-5'>
                <div className='d-flex flex-column section-card shadow-1 border-radius-8 bg-white px-5 pt-4 pb-30'>
                  <div className='d-flex align-items-center mt-4'>
                    <span className='fs-20 color-dark-grey-2 mr-auto'>
                      Course Title
                    </span>

                    <span className='fs-20 color-dark-grey-2'>
                      Price
                    </span>
                  </div>
                  {
                    cartList.map((item) => (
                      <div className='d-flex align-items-center mt-4'>
                        <span className='fs-16 color-dark-grey-2 mr-auto w-70'>
                          {item.CourseName}
                        </span>

                        <span className='fs-20 color-dark-grey-2'>
                          <span className="color-orange fs-20 mr-3">${item.CoursePrice}</span>

                          <span className="color-light-grey-2 fs-14 line-cross">
                            {item.OriginalCoursePrice && <del>${item.OriginalCoursePrice ? item.OriginalCoursePrice : 0.00}</del>}
                          </span>
                        </span>
                      </div>
                    ))
                  }
                  <div className='d-flex align-items-center mt-4'>
                    <span className='fs-18 color-light-theme mr-auto fw-600'>
                      Subtotal
                    </span>

                    <span className='fs-18 color-dark-grey-2'>
                      CA ${total?.CoursePrice?.toFixed(2)}
                    </span>
                  </div>

                  <div className='d-flex align-items-center mt-3'>
                    <span className='fs-18 color-light-theme mr-auto fw-600'>
                      Discount + Coupon
                    </span>
                    <span className='fs-18 color-dark-grey-2 '>
                      -CA ${(Number(total?.OriginalCoursePrice - total?.CoursePrice + Number(coupon) * total?.CoursePrice * 0.01)).toFixed(2)}
                    </span>
                  </div>

                  <div className='d-flex align-items-center mt-3'>
                    <span className='fs-18 color-light-theme mr-auto fw-600'>
                      HST (13%)
                    </span>
                    <span className='fs-18 color-dark-grey-2 '>
                      CA ${((Number(total?.CoursePrice) - Number(coupon) * total?.CoursePrice * 0.01) * 0.13).toFixed(2)}
                    </span>
                  </div>

                  <Divider className='mt-4 mb-3' />

                  <div className='d-flex align-items-center'>
                    <span className='fs-20 color-light-theme mr-auto fw-600'>
                      Total
                    </span>

                    <span className='fs-28 color-orange'>
                      CA ${
                        ((Number(total?.CoursePrice) - Number(coupon) * total?.CoursePrice * 0.01) * 1.13).toFixed(2)
                      }
                    </span>
                  </div>

                  <Divider className='mt-4 mb-2' />

                  <div className='d-flex my-3'>
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
                      <div className='fs-14'>
                        Apply
                      </div>
                    </div>
                  </div>


                  {couponList?.map((item, index) => {
                    return (
                      <div key={index} className='d-flex align-items-center mt-3 mb-3'>
                        <span className='fs-18 color-light-grey-2 mr-auto'>{item}</span>

                        <DeleteOutlined className='fs-20' onClick={() => deleteCoupon()} />
                      </div>
                    )
                  })}
                </div>
              </Col>
            </Row>

          </div>
        </div>
      </div>
      <Modal 
        onOk={() => {
          if(Number(userSettings.Credits) - total.CourseDuration < 0) {
            Modal.error({
              title: 'Something went wrong!',
              content: "You don't have enough credit to buy these. Please adjust your cart",
              okText: 'OK'
            });
            setConfirmVisible(false)
          }else {
            form.setFieldsValue({ "checkoutType": "point" })
            form.submit();
            setConfirmVisible(false)
          }
        }}
        onCancel={()=>setConfirmVisible(false)}
        visible={confirmVisible} 
        cancelButtonProps={{hidden: true}} 
        okText="Confirm" 
        title=""
        className="confirm-credit"
      >
        <div className="confirm-credit-title"><CheckOutlined /></div>
        <h1 style={{textAlign: "center"}} >Please Confirm Your Purchase</h1>
        <Card>
          <h3 style={{textAlign: 'center'}}>Your Credit Hours</h3>
          <p>Current Hours<span className="confirm-credit-right">{userSettings.Credits}</span></p>
          <p>Purchase Hours <span className="confirm-credit-right">{total.CourseDuration}</span></p>
          <p>Balance Hours <span className="confirm-credit-right confirm-credit-right-font">{Number(userSettings.Credits) - total.CourseDuration}</span></p>
        </Card>
      </Modal>
    </div>
  )
}

export default Checkout;
