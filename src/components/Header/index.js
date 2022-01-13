import React, { useState, useEffect } from "react";
//packages
import { useHistory, Link } from "react-router-dom";
//components
import {
  Menu,
  Dropdown,
  Row,
  Col,
  Popover,
  Divider,
  Modal,
  Drawer,
  Badge,

} from "antd";
import {
  DollarCircleOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  DeleteOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";
//statics
import newsImg1 from "../../assets/img/img-news-1.png";
import newsImg2 from "../../assets/img/img-news-2.png";
import newsImg3 from "../../assets/img/img-news-3.png";
import avatarImg1 from "../../assets/img/avatar-man.png";
import cartImg from "../../assets/img/img-cart.png";
import dogImage from "../../assets/img/other/user-Avatar.png";
import { srcURL } from "../../configs/AppConfig";

//redux
import { useDispatch, useSelector } from "react-redux";
import { getCartList, getUserSettings } from "../../redux/actions";

const mainMenu = [
  {
    key: "Home",
    path: "/",
  },
  {
    key: "Course",
    path: "/course",
    children: []
  },
  {
    key: "Event",
    path: "/event",
  },
  {
    key: "Blog",
    path: "/blog",
  },
  {
    key: "Certificate",
    path: "/certificate",
  },
];

// const cartData = [
//   {
//     image: newsImg1,
//     name: "Graphic Designer_003",
//     price: 29.99,
//   },
//   {
//     image: newsImg1,
//     name: "Graphic Designer_003",
//     price: 29.99,
//   },
//   {
//     image: newsImg1,
//     name: "Graphic Designer_003",
//     price: 29.99,
//   },
//   {
//     image: newsImg1,
//     name: "Graphic Designer_003",
//     price: 29.99,
//   },
// ];

const Header = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const currentPath = window.location.pathname.split("/");
  const specialPath = ["certificate", "become-an-instructor"];
  const userId = localStorage.getItem('CPDUserID');
  const [coupon, setCoupon] = useState(0);
  const [couponList, setCouponList] = useState([]);
  const [price, setPrice] = useState(0);
  const [couponPrice, setCouponPrice] = useState(0);
  const [loginModal, setLoginModal] = useState({
    visible: false,
    login: true,
  });

  const [mobileMenu, setMobileMenu] = useState({
    visible: false,
    active: "",
  });

  const { cartList } = useSelector((state) => state.cartData);
  const { userSettings, userInfo } = useSelector((state) => state.authData);
  const [current, setCurrent] = useState("/");

  useEffect(() => {
    const getCart = () => {
      dispatch(getCartList());
    };

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
  const resourceMenu = [
    {
      key: "Become an Instructor",
      navigate: () => history.push("/resource/become-an-instructor"),
    },
    {
      key: "About Us",
      navigate: () => history.push("/blog/detail/about-us?id=6"),
    },
    {
      key: "Contact Us",
      navigate: () => history.push("/resource/contact-us"),
    },
    {
      key: "FAQ",
      navigate: () => history.push("/resource/help-and-support"),
    },
    // {
    //   key: "Tutorial",
    //   navigate: () => history.push("/resource/tutorial"),
    // },
    {
      key: "Privacy Policy and …",
      navigate: () =>
        window.open(
          "/Privacy.html",
          "CPD Ace Privacy Policy",
          "height=640,width=960,toolbar=no,menubar=no,scrollbars=no,location=no,status=no"
        ),
    },
    {
      key: "Terms of Use",
      navigate: () =>
        window.open(
          "/Terms.html",
          "CPD Ace Terms of use",
          "height=640,width=960,toolbar=no,menubar=no,scrollbars=no,location=no,status=no"
        ),
    },
  ];

  const courseMenu = [
    {
      key: "Individual Course",
      navigate: () => history.push({
        pathname: "/course/list",
        state: { courseParam: { category: "All", parentLabel: 'Course Type' } },
      }),
    },
    {
      key: "Recommend Package",
      navigate: () => history.push({
        pathname: "/course/list",
        state: { courseParam: { category: "Package Course", parentLabel: "Course Type" } },
      }),
    },
    {
      key: "Customized Learning",
      navigate: () => history.push("/order/credit"),
    },
  ]

  const renderResourseMenu = () => {
    return (
      <Menu className="rounded">
        {resourceMenu.map((item, index) => (
          <Menu.Item key={index}>
            <div onClick={item.navigate}>{item.key}</div>
          </Menu.Item>
        ))}
      </Menu>
    );
  };
  const renderCourseMenu = () => {
    return (
      <Menu className="rounded">
        {courseMenu.map((item, index) => (
          <Menu.Item key={index}>
            <div onClick={item.navigate}>{item.key}</div>
          </Menu.Item>
        ))}
      </Menu>
    );
  };

  const renderEmptyCart = () => {
    return (
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
    );
  };

  const renderCart = () => {
    return (
      cartList &&
      cartList.map((item, index) => {
        const { CourseImage, CourseName, CoursePrice, OriginalCoursePrice } = item;

        return (
          <div key={index} className="d-flex align-items-center mt-3 mb-3">
            <img
              src={srcURL + CourseImage}
              style={{
                width: 60,
                height: 60,
                borderRadius: 5,
                marginRight: 20,
              }}
              alt="/"
            />

            <div className="d-flex flex-column mr-auto">
              <span className="fs-16 color-light-grey-2">{CourseName}</span>

              <span className="fs-20 color-orange fw-800">CA ${CoursePrice}
                <span className="color-dark-grey-2 fs-16 line-cross">
                  {/* <del>(${props.data.OriginalCoursePrice})</del> */}
                  {OriginalCoursePrice && <del>${OriginalCoursePrice ? OriginalCoursePrice : 0.00}</del>}
                </span>
              </span>

            </div>

            <DeleteOutlined
              onClick={() => handleDelete(item.CourseID)}
              className="fs-20"
            />
          </div>
        );
      })
    );
  };
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    const onScroll = e => {
      setScrollTop(e.target.documentElement.scrollTop);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollTop]);

  const handleDelete = (c) => {
    const afterRemove = cartList.filter((e) => e.CourseID !== c);
    localStorage.setItem("cartData", JSON.stringify(afterRemove));
    dispatch(getCartList());
  };
  useEffect(() => {
    dispatch(getUserSettings());
  }, [])

  useEffect(() => {
    history.listen((event) => {
      // const test = event.pathname;
      // const thisPath = test;
      setCurrent(event.pathname);
      console.log(this)
    })

  }, [history])
  return (
    <div
      className={
        specialPath.some((e) => currentPath.includes(e) || currentPath[1] === "")
          ? currentPath[3] === 'application' ? "header-wrapper" : currentPath[1] === "" && scrollTop > 20 ? "header-wrapper" :
            "header-wrapper bg-transparent" :
          "header-wrapper"
      }
    >
      <Row align="middle" className="w-100 p-3 pt-4">
        <Col
          xs={2}
          sm={2}
          lg={0}
          className="p-3"
          role="button"
          onClick={() => setMobileMenu({ ...mobileMenu, visible: true })}
        >
          <MenuOutlined className="fs-40 fw-bold" />
        </Col>
        <Col
          xs={{
            span: 6,
            offset: 1,
          }}
          lg={{
            span: 2,
            offset: 1,
          }}
          className="d-flex flex-column justify-content-center align-items-center"
        >
          <span className="fs-22 fw-800 letter-spacing-3">
            CPD Ace
          </span>
        </Col>

        <Col lg={{ span: 11, offset: 1 }} sm={0} xs={0}>
          <Row align="middle" justify="space-between">
            {mainMenu.map((item) => {
              if (!item.children) {
                return (<Link to={item.path} key={item.key} className={(current === item.path || current === item.path + "/list") ? "header-tab border border-3" : "header-tab"}>
                  <span>
                    <span>
                      <span role="button" className="fs-18 fw-light mx-1">
                        {item.key}
                      </span>
                    </span>
                  </span>
                </Link>)
              } else {

                return (
                  <Dropdown overlay={renderCourseMenu} placement="bottomLeft">
                    <div 
                    key={item.key} className={(current === item.path || current === item.path + "/list") ? "header-tab border border-3" : "header-tab"}>
                      <span>
                        <span>
                          <span role="button" className="fs-18 fw-light mx-1">
                            {item.key}
                          </span>
                        </span>
                      </span>
                    </div>
                  </Dropdown>
                )
              }
            })}

            <Dropdown overlay={renderResourseMenu} placement="bottomLeft">
              <span className="header-tab p-0">
                <span role="button" className="fs-18 fw-light mx-1">
                  Resourse
                </span>
              </span>
            </Dropdown>
          </Row>
        </Col>

        <Col
          lg={{ span: 4, offset: 5 }}
          sm={{ span: 10, offset: 3 }}
          xs={{ span: 10, offset: 3 }}
        >
          <Row align="middle" justify="space-around" className="fs-20">
            {userInfo && <Popover
              placement="bottomRight"
              title={null}
              content={
                <div
                  className="d-flex flex-column p-3"
                  style={{ minWidth: "25vw" }}
                >
                  <span className="fs-20 color-dark-grey-2 mb-2">
                    My Credit
                  </span>

                  {
                    userInfo && <span className="fs-16 color-light-grey-2">
                      You have <span className="color-orange">{userSettings.Credits}</span> Hours Credit
                    </span>
                  }

                  <Divider className="m-0 mb-3 mt-3" />

                  <div className="d-flex justify-content-end">
                    <div
                      role="button"
                      className="rounded-pill button button--light-hover-dark button--animated"
                      onClick={() =>
                        history.push({
                          pathname: "/order/credit",
                        })
                      }
                    >
                      <span className="fs-14">Buy Credit</span>
                    </div>
                  </div>
                </div>
              }
              trigger="click"
            >
              {userSettings ? <Badge count={userSettings.Credits} overflowCount={99} offset={[2, -5]}>
                <div style={{ fontSize: '20px' }}><DollarCircleOutlined role="button" style={{ color: '#fff' }} /></div>
              </Badge> : <DollarCircleOutlined role="button" />}
            </Popover>
            }

            <Popover
              placement="bottomRight"
              title={null}
              content={
                <div
                  className="d-flex flex-column p-3"
                  style={{ minWidth: "25vw" }}
                >
                  <span className="fs-20 color-dark-grey-2 mb-2">
                    Shopping Cart
                  </span>

                  {cartList && cartList.length > 0
                    ? renderCart()
                    : renderEmptyCart()}

                  {cartList && cartList.length > 0 && (
                    <>
                      <Divider className="m-0 mb-2 mt-2" />

                      <span className="fs-16 color-light-grey-2">
                        *Subtotal does not include taxes and discounts
                      </span>

                      <div className="d-flex mt-2 mb-3">
                        <span className="fs-20 color-dark-grey-2 ml-auto mr-2">
                          Subtotal:
                        </span>
                        <span className="fs-20 color-orange ">
                          CA $
                          {Number(
                            cartList?.reduce(
                              (acc, cur) => acc + Number(cur.CoursePrice),
                              0
                            )
                          ).toFixed(2)}
                        </span>
                      </div>

                      <div className="d-flex">
                        <div
                          role="button"
                          className="rounded-pill button button--light-hover-dark button--animated mr-auto"
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
                          onClick={() =>
                            history.push({
                              pathname: "/order/checkout",
                              state: {
                                subtotal: price,
                                Discount: price - couponPrice,
                                Coupon: coupon,
                                couponList: couponList
                              }
                            })
                          }
                        >
                          <span className="fs-14">Checkout</span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              }
              trigger="click"
            >
              {userId ? <Badge count={JSON.parse(localStorage.getItem("cartData"))?.length} overflowCount={99} offset={[2, -5]}>
                <div style={{ fontSize: '20px' }}><ShoppingCartOutlined role="button" style={{ color: '#fff' }} /></div>
              </Badge> : <ShoppingCartOutlined role="button" />}
            </Popover>

            {/* 头像或者登录按钮 */}
            {userInfo ? (
              <Row onClick={() => history.push("/dashboard")} align="middle">
                <img
                  src={dogImage}
                  className="header-usericon mr-3 mouse-click"
                />
                <div className="fs-18 cursor--pointer">{userInfo.name}</div>
              </Row>
            ) : (
              <Row
                align="middle"
                onClick={() => setLoginModal({ ...loginModal, visible: true })}
              >
                <UserOutlined role="button" className="mr-3" />
                <span role="button">Login/Register</span>
              </Row>
            )}
          </Row>
        </Col>
      </Row>
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

      <Drawer
        closable={false}
        onClose={() => setMobileMenu({ ...mobileMenu, visible: false })}
        visible={mobileMenu.visible}
        placement="left"
        width="80vw"
        className="mobile-menu-drawer"
      >
        <Menu mode="inline" selectedKeys={[mobileMenu.active]}>
          {mainMenu.map((item) => (
            <Menu.Item
              key={item.key}
              onClick={() => {
                history.push(item.path);
                setMobileMenu({
                  ...mobileMenu,
                  visible: false,
                  active: item.key,
                });
              }}
            >
              {item.key}
            </Menu.Item>
          ))}
          <Menu.SubMenu title="Resources" selectedKeys={[mobileMenu.active]}>
            {resourceMenu.map((item) => (
              <Menu.Item
                key={item.key}
                role="button"
                onClick={() => {
                  item.navigate();
                  setMobileMenu({
                    ...mobileMenu,
                    visible: false,
                    active: item.key,
                  });
                }}
              >
                {item.key}
              </Menu.Item>
            ))}
          </Menu.SubMenu>
        </Menu>
      </Drawer>
    </div>
  );
};

export default Header;
