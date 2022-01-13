import React from "react";

import { Collapse, Row, Col } from "antd";

//components
import PageHeader from "../../../components/PageHeader";

const { Panel } = Collapse;

const breadcrumb = [
  {
    title: "FAQ",
    path: "/resource/help-and-support",
  },
];

const faqData1 = [
  {
    title: "What are Recommended Packages?",
    text: [
      "Recommended packages are comprised with a broad range of features in mind:",
      "1. The goal of a recommended package is to enable users to purchase courses at a remarkably lower price than buying courses individually.",
      "2. Packages are tailored towards areas of specialization designed by our subject matter experts. ",
      "3. Packages are curated with a fine balance of technical topics, leadership, and personal development.",
    ],
  },
  {
    title: "Do the 20 hours count towards my PD requirements? How can I prove my enrollment?",
    text: [
      "Absolutely. Our customizable packages are no different than buying individual courses separately, with the exception that we offer you a discounted bundle price that enables you to save more. Once you have completed a course within the package, you'll receive your 100% audit-proof & verifiable PD certificate. Your certificates are stored on our platform for life, and they can be accessed via your Dashboard at your discretion.",
    ],
  },
  {
    title: "Is it possible to preview my selected courses prior to purchase?",
    text: [
      "All CPD Ace courses provide a brief video preview (up to 5 minutes). Course content, including overview, learning objectives, video content, and any supporting documentation are all visible for customers to preview. Check out our courses now.",
    ],
  },
  {
    title: "How does a refund work?",
    text: [
      "CPD Ace offers a 10-day, no-questions-asked, money-back guarantee on all courses",
      "<a href='/resource/contact-us'>contact us</a> to request a refund",
    ],
  },
  {
    title: "Are there any additional fees?",
    text: [
      "No. Transactions are one-time payments with no hidden or recurring fees. Once payment is complete, courses will be accessible on your dashboard.",
    ],
  },
];

const Support = ({type}) => {
  return (
    <div className="justify-content-center w-100">
      <div className=" mb-5">
        {!type && <PageHeader data={breadcrumb} />}

        <div className="d-flex pt-40 bg-image--point">
          <div className="d-flex flex-column">
            <div>
              {/* <span className="color-black fs-50 pl-2 py-2">Help And </span> */}
              <span className="color-dark-theme fs-50 py-2">Frequently Asked Questions</span>
            </div>
          </div>
        </div>
        <Row className="w-100">
          <Col span={24}>
            <Collapse ghost bordered={false} defaultActiveKey={["0"]}>
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
        </Row>
      </div>
    </div>
  );
};

export default Support;
