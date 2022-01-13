import React from "react";

//packages
import { useHistory } from "react-router-dom";
//components
import { Row, Col } from "antd";
import TopPackagePreview from "../../../components/Home/TopPackagePreview.js";
import HowItWorks from "./HowItWorks";

const HomeTopPackage = ({ packageList }) => {
  const history = useHistory();

  return (
    <div className="w-100 bg-light-theme home-top-package-wrapper">
      <div className="home-top-package-title-container">
        <p className="fs-50 fw-400 color-white">
          <span className="color-dark-theme">TOP</span> PACKAGES
        </p>
        <p className="color-white fs-20 fw-400 home-top-package-subtitle">
          Looking for 20 hours PD bundle?<br/> Browse our CPA Instructors recommended packages and save $500 today!
        </p>
      </div>
      <Row className="home-top-package-list-wrapper">
        {packageList.map((coursePackage,index) => (
          <Col key={coursePackage.CourseID} xs={24} lg={8} className="mb-5">
            <TopPackagePreview coursePackage={coursePackage} index={index} />
          </Col>
        ))}
      </Row>

      <Row
        justify="center"
        align="middle"
        className="w-100 py-5 mb-3 bg-light-theme"
      >
        <div
          role="button"
          className="rounded-pill button button-white-border button--light-hover-white button--animated"
          onClick={() => history.push({
            pathname: "/course/list",
            state: { courseParam: { category: "Package Course", parentLabel: 'Course Type' } },
          })}
        >
          Explore Packages
        </div>
      </Row>

      <div className="d-flex flex-column justify-content-center align-items-end my-5 w-60 hide-on-mobile">
        <p className="fs-50 fw-300 py-2 color-white">
          HOW IT <span className="color-dark-theme">WORKS</span>
        </p>
        <p className="w-100 text-right color-white fs-20">
          Complete courses by watching educational CPD videos. Evaluate your progress with quizzes and exams. <br/>
        Use the interactive dashboard to track course completion. <br/>
         Upon completion, CPD certificates appear on your dashboard. <br/>
        Certificates are fully audit-proof and stored for life.
        </p>
      </div>
      <HowItWorks className="bg-light-theme"/>
    </div>
  );
};

export default HomeTopPackage;
