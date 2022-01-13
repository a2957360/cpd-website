import React,{useState} from "react";

import { Row, Col, Modal } from "antd";

//packages
import { useHistory } from "react-router-dom";

import LoginForm from "../../components/Header/LoginForm";
import RegistrationForm from "../../components/Header/RegistrationForm";

import icon1 from "../../assets/img/icon-certificate-1.png";
import icon2 from "../../assets/img/icon-certificate-2.png";
import icon3 from "../../assets/img/icon-certificate-3.png";
import icon4 from "../../assets/img/icon-certificate-4.png";

const banner = {
  title: "CPD CERTIFICATE",
  subtitle: "EASY WAY TO GET YOUR CERTIFICATE",
  text: "CPD ACE online courses provide easy and convenient certification",
  button: "My Certificate",
  termsButton: "CPA PD Requirements"
};

const feature = [
  {
    img: icon1,
    title: "Credit & Verifiable PD Hours",
    text: "As you complete CPD courses, certificates and credit hours appear in our dashboard.",
  },
  {
    img: icon2,
    title: "Certification Process",
    text: "CPD Ace courses comply with Canadian Provincial CPA regulations and policies. Speak to our support team for more details.",
  },
  {
    img: icon3,
    title: "Accessiblity",
    text: "Your certificates are stored on our servers and accessible for life.",
  },
  {
    img: icon4,
    title: "Progress Tracking",
    text: "Set learning milestones and track your progress using the dashboard. Register today and get started.",
  },
];
const Certificate = () => {
  const domain = "/Image";

  const history = useHistory();
  const [loginModal, setLoginModal] = useState({
    visible: false,
    login: true,
  });

  const handleToMyCertificate = (e) => {
    e.stopPropagation();
    const userId = localStorage.getItem("CPDUserID");
    if(!userId) {
      setLoginModal({
        ...loginModal,
        visible: true,
      })
    }else {
      history.push('/dashboard/certificates')
    }
  }
  const handleToTerms =(e) => {
    e.stopPropagation();
    window.open(
      '/PDReq.html',
      'CPD Ace Terms of use',
      'height=640,width=960,toolbar=no,menubar=no,scrollbars=no,location=no,status=no'
    )
  }
  return (
    <div>
      <div style={{backgroundImage:"/Image/bg-certificate.png"}} className="vh-65 bg-image bg-image--certificate d-flex justify-content-center align-items-center">
        <div className="d-flex flex-column justify-content-center max-w-90 align-items-center pb-200">
          <h1 className="color-white text-center fs-80 mb-3">{banner.title}</h1>

          <h2 className="color-white text-center fs-50 mb-5">
            {banner.subtitle}
          </h2>

          <span className="color-white text-center w-50 fs-20 mb-5">
            {banner.text}
          </span>

          <div
            role="button"
            className="rounded-pill button button--light-hover-dark button--animated pl-30 pr-30 pt-10 pb-10"
            onClick={(e) => handleToMyCertificate(e)}
          >
            {banner.button}
          </div>
          <div
            role="button"
            className="rounded-pill button button--light-hover-dark button--animated pl-30 pr- mt-55 pt-10 pb-10"
            onClick={(e) => handleToTerms(e)}
          >
            {banner.termsButton}
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center certificate-feature">
        <Row className="feature-container">
          {feature.map((item, index) => {
            return (
              <Col
                xs={24}
                sm={12}
                md={12}
                lg={6}
                key={index}
                className="d-flex flex-column align-items-center feature-item"
              >
                <img className="feature-image mb-4" src={item.img} alt="/" />

                <span className="color-dark-grey-2 text-center w-80 fs-22 mb-2">
                  {item.title}
                </span>

                <span className="color-light-grey-2 text-center w-70 fs-16">
                  {item.text}
                </span>
              </Col>
            );
          })}
        </Row>
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

export default Certificate;
