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

const Support = ({type}) => {
  return (
    <div className="d-flex justify-content-center">
      <div className="content-container w-80  mb-50">
        {!type && <PageHeader data={breadcrumb} />}

        <div className="d-flex justify-content-center pt-40 bg-image--point mb-50">
          <div className="d-flex justify-content-center align-items-center flex-column">
            <div>
              {/* <span className="color-black fs-50 pl-2 py-2">Help And </span> */}
              <span className="color-dark-theme fs-50 py-2">FAQ</span>
            </div>
          </div>
        </div>
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
      </div>
    </div>
  );
};

export default Support;
