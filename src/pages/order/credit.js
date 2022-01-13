import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getRelatedCourses, getCustomPackage, getCartList } from "../../redux/actions";
import RouterLoading from "../../components/RouterLoading/index";

import { Modal, Row, Col, Collapse, message } from 'antd';

//components
import PageHeader from '../../components/PageHeader';
import CourseCarousel from '../../components/Carousels/CourseCarousel';
import AddToCartModal from '../../components/Modal/AddToCartModal';
import LoginForm from "../../components/Header/LoginForm";
import RegistrationForm from "../../components/Header/RegistrationForm";

const { Panel } = Collapse;

const breadcrumb = [
  {
    title: 'Customized Learning',
    path: '/resource/help-and-support'
  }
]

const faqData1 = [
  {
    title: "What is CPD?",
    text: [
      "CPD stands for Continuing Professional Development. It includes various aspects of learning and improvement for professional CPAs.",
      "CPAs are constantly faced with new technologies and processes. CPD helps professionals adapt to the changing demands of today’s professional landscape.",
      "CPD Ace offers over 100 video courses for CPAs to build and maintain skills in accounting and finance, risk management, IT, and development.",
    ],
  },
  {
    title: "Why is CPD so important?",
    text: [
      "CPD is imperative because it strengthens existing skills and builds news ones. It improves the knowledge required to deliver high-quality, professional services to your community. It also enables individuals to be more effective in the workplace as they stay relevant and up-to-date on the ever-changing trends and standards in their respective fields.",
      "CPD also helps professionals advance their careers. New skills and knowledge often lead directly to new professional opportunities.",
    ],
  },
  {
    title: "What qualifies as CPD?",
    text: [
      "In order to qualify as CPD, an educational experience must:",
      "1.	Be relevant to your professional responsibilities as a CPA.",
      "2.	Be quantifiable—specifically identifiable and capable of being expressed in terms of a specific time requirement.",
      "3.	Contain significant intellectual or practical content.",
      "See <a href='/PDReq.html' target='_blank'>&nbsp; CPA PD Requirements&nbsp;&nbsp; </a> for more information",
    ],
  },
  {
    title: "Why choose us?",
    text: [
      "CPD Ace is committed to your professional growth and excellence. We offer a wide selection of competitively priced courses designed to enhance your skills and ensure that you stay proficient as a CPA.",
      "CPD Ace courses comply with Canadian Provincial CPA Regulations & Policies based on intellectual and circumstance-specific requirements ",
      "<a href='/resource/contact-us'>contact us</a> for more detail",
    ],
  },
]
const faqData2 = [
  {
    title: "How does it work?",
    text: [
      "1. Choose courses relevant to your work as a CPA.",
      "2. Complete courses by watching educational CPD videos. Evaluate your progress with quizzes and exams. Use the interactive dashboard to track course completion.",
      "3. Upon completion, CPD certificates appear on your dashboard. Certificates are fully audit-proof and stored for life.",
    ],
  },
  {
    title: "Can I preview courses before I buy them?",
    text: [
      "Yes. All CPD Ace courses include a video preview of up to five minutes. Courses descriptions also provide an overview, learning objectives, and supporting documentation.",
    ],
  },
  {
    title: "Are there any additional fees?",
    text: [
      "No. Transactions are one-time payments with no hidden or recurring fees. Once payment is complete, courses will be accessible on your dashboard.",
    ],
  },
  {
    title: "How do I pay for video courses?",
    text: ["We use Stripe and accept Visa and Mastercard."],
  },
];
// const faqData = [
//   {
//     title: 'How do the custom packages work?',
//     text: 'You get 20 credit hours to use in the CPD Ace course library. By bundling course hours, you get freedom and flexibility at a reduced cost.',
//   },
//   {
//     title: 'Do the 20 hours count towards my PD requirements? How can I prove my enrollment?',
//     text: 'Absolutely. Like individual courses, our custom packages come with fully audit-proof and verifiable PD certificates that are stored for life on your dashboard.',
//   },
//   {
//     title: 'Can I preview custom package courses before I buy them?',
//     text: 'Yes. All CPD Ace courses include a video preview of up to five minutes. Courses descriptions also provide an overview, learning objectives, and supporting documentation.',
//   },
//   {
//     title: 'How does a refund work?',
//     text: 'To request for a refund, please <a href="/contact" style="color:blue;">&nbsp; Contact Us </a>.',
//   },
//   {
//     title: 'Are there any additional fees?',
//     text: 'No. Transactions are one-time payments with no hidden or recurring fees. Once payment is complete, courses will be accessible on your dashboard.',
//   }
// ]
const feature = [
  {
    img: "fa fa-wifi fa-6x color-light-theme",
    title: "Expand Your Reach",
    text: "Get 20 course-hours at a reduced cost for use across our entire CPD Ace library. Cancel within 10 days for a full refund. No questions asked.    ",
  },
  {
    img: "fa fa-handshake-o fa-6x color-light-theme",
    title: "Inspire Other Professionals",
    text: "Complete courses by watching educational CPD videos. Evaluate your progress with quizzes and exams. Use the interactive dashboard to track course completion.    ",
  },
  {
    img: "fa fa-btc fa-6x color-light-theme",
    title: "Earn Money",
    text: "Your CPD certificates appear on your dashboard. Certificates are fully audit-proof and stored for life    ",
  },
];

const creditData = [
  {
    price: 169.99,
    hours: 10
  },
  {
    price: 269.99,
    hours: 20
  },
  {
    price: 369.99,
    hours: 30
  },
]

const Credit = () => {
  const userId = localStorage.getItem('CPDUserID');
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [loginModal, setLoginModal] = useState({
    visible: false,
    login: true,
  });
  const { relatedCourse, customePackage } = useSelector((state) => state.courseData);

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
        if (cartData.some((c) => c["CourseID"] === customePackage[0].CourseID)) {
          message.warn("this course is already in the cart");
        } else {
          await localStorage.setItem(
            "cartData",
            JSON.stringify([...cartData, customePackage[0]])
          );
        }
      } else {
        await localStorage.setItem("cartData", JSON.stringify([customePackage[0]]));
      }
      dispatch(getCartList());
      setVisible(true);
    }
  };

  useEffect(() => {
    dispatch(getRelatedCourses(1));
    dispatch(getCustomPackage());
  }, []);
  if (customePackage == null) {
    return <RouterLoading />;
  }
  return (
    <div className='d-flex justify-content-center'>
      <div className='content-container w-80'>
        <PageHeader data={breadcrumb} />

        <div className='d-flex flex-column justify-content-center'>
          <div className='d-flex justify-content-center align-items-center flex-column'>
            <div>
              <span className='color-black fs-50 pl-2 py-2'>Build Your Own Course</span>
              <span className='color-light-theme fs-50 pl-2 py-2'> Bundle</span>
            </div>
          </div>

          <div className='d-flex mt-20 pt-20 pb-40 w-100 ml-40 mr-40 justify-content-center'>
            <Col span={8} className='d-flex flex-column align-items-center'>
              <div className='d-flex bg-image bg-image--card justify-content-center pt-12'>
                <span className='color-light-theme fs-20 pl-2 py-2'>20 Hours</span>
              </div>

              <span className='color-orange fs-28 pl-2 py-2 fw-800'>${customePackage[0].CoursePrice}</span>
              <span className="color-light-grey-2 fs-16 line-cross">
                {customePackage[0].OriginalCoursePrice && <del>${customePackage[0].OriginalCoursePrice}</del>}
              </span>
              <div
                role="button"
                className="rounded-pill button button--light-hover-dark button--animated"
                onClick={(e) => handleAddCart(e)}
              >
                Add to cart
              </div>
            </Col>
          </div>
        </div>

        {/* overview */}
        <div className='section-card section-card--animated border-radius-8 bg-white mt-4'>
          <div className='color-dark-grey-3 fs-20 mx-5 mt-4 mb-3'>Overview</div>
          <div className='rectangle rectangle--light rectangle--small card-rectangle' />
          <div className='color-light-grey-3 fs-16 mx-5 mt-3 mb-5 line-height-30'>
            Get a package tailored to your professional development needs.	<br />
            Enroll now and you will receive 20 hours worth of credit to purchase any of the offerings across the CPD Ace course library. Courses are fully audit-proof, and we store your certifications for life.
          </div>
        </div>

        <div className='section-card section-card--animated border-radius-8 bg-white mt-4'>
          <div className='color-dark-grey-3 fs-20 mx-5 mt-4 mb-3'>How does it work?</div>
          {/* <div className='color-light-grey-3 fs-16 mx-5 mt-3 mb-5 line-height-30'>You have 35 Hours CreditYou have 35You have 35 Hours CreditYou have 35You have 35 Hours CreditYou have 35You have 35 Hours CreditYou have 35</div> */}
          <div className="d-flex justify-content-center certificate-feature">
            <Row className="feature-container">
              {feature.map((item, index) => {
                return (
                  <Col
                    xs={24}
                    sm={12}
                    md={12}
                    lg={8}
                    key={index}
                    className="d-flex flex-column align-items-center feature-item"
                  >
                    <i className={item.img} />

                    <span className="color-dark-grey-2 text-center w-80 fs-22 mb-2">
                      {item.title}
                    </span>

                    <span className="color-light-grey-2 text-center w-70 fs-18">
                      {item.text}
                    </span>
                  </Col>
                );
              })}
            </Row>
          </div>
        </div>

        {/* <Collapse
          ghost
          bordered={false}
          defaultActiveKey={['0']}
        >
          {faqData.map((item, index) => {
            return (
              <Panel
                key={index}
                header={item.title}
                showArrow={false}
                className='d-flex flex-column border border-radius-8 my-4 py-2'
              >
                <div className='rectangle rectangle--light rectangle--large' />
                <p className='color-light-grey-3 fs-16 mx-5 mt-3 line-height-30'>{item.text}</p>
              </Panel>
            )
          })}
        </Collapse> */}
        <Row>
          <Col span={11} offset={1}>
            <Collapse ghost bordered={false}>
              {faqData1.map((item, index) => {
                return (
                  <Panel
                    key={index}
                    header={item.title}
                    showArrow={false}
                    className="d-flex flex-column border border-radius-8 my-4 py-2"
                  >
                    <div className="rectangle rectangle--light rectangle--large" />
                    <div className="pl-5 color-light-grey-3 fs-16 mx-5 mt-3 line-height-30">
                      {item.text.map((e, index) => {
                        return <p
                          key={index}
                          className='color-light-grey-2 fs-16 cart-text mb-auto'
                          dangerouslySetInnerHTML={{
                            __html: e,
                          }}
                        />
                      })}
                    </div>
                  </Panel>
                );
              })}
            </Collapse>
          </Col>
          <Col span={11} offset={1}>
            <Collapse ghost bordered={false} >
              {faqData2.map((item, index) => {
                return (
                  <Panel
                    key={index}
                    header={item.title}
                    showArrow={false}
                    className="d-flex flex-column border border-radius-8 my-4 py-2"
                  >
                    <div className="rectangle rectangle--light rectangle--large" />
                    <div className="pl-5 color-light-grey-3 fs-16 mx-5 mt-3 line-height-30">
                      {item.text.map((e, index) => {
                        return <p
                          key={index}
                          className='color-light-grey-2 fs-16 cart-text mb-auto'
                          dangerouslySetInnerHTML={{
                            __html: e,
                          }}
                        />
                      })}
                    </div>
                  </Panel>
                );
              })}
            </Collapse>
          </Col>
        </Row>
        {/* Related Course */}
        <Col className="mb-100" md={24} lg={24}>
          <div className="fs-30 color-dark-grey-2 mt-40">
            Recommend Courses
          </div>

          <div className="rectangle rectangle--light rectangle--size-12 blog-rectangle mb-3" />

          <CourseCarousel data={relatedCourse} />
        </Col>
        {/* <CourseCarousel /> */}
      </div>

      <Modal
        title="Item has been added to your Cart"
        centered
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <AddToCartModal courseData={customePackage[0]} />
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
    </div >
  )
}


export default Credit;
