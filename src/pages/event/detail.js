import React, { useEffect } from "react";

//redux
import { useDispatch, useSelector } from "react-redux";
import { getEventByName } from "../../redux/actions";

//packages
import { Row, Col } from "antd";

//components
import PageHeader from "../../components/PageHeader";
import RouterLoading from "../../components/RouterLoading/index";
import { srcURL } from "../../configs/AppConfig";

//fake img
import newsImg1 from "../../assets/img/img-news-1.png";

const detailData = {
  id: 1,
  image: newsImg1,
  title: "News from BBC",
  subtitle: "Currently first",
  text: "Over ten years of professional experiences designer share their personal skills and method. Experience combine with creativity offers a winning solution and takes business to the next level. Over ten years of professional experiences designer share their personal skills and method. Experience combine with creativity offers a winning solution and takes business to the next level.",
  description:
    "Looking for a 20-hours package deal to complete your 2020 CPA PD requirement? We have the perfect hybrid course bundle for CPA to learn both the Finance and the Tech. This package is recommended by leading professionals in the industry, covering topics across ERP Implementation, financial statement ratio analysis, automation in Excel, business intelligence reporting using PowerBI, and much more.I don’t know if I have more information, How it space the title sitting.This package is recommended by leading professionals in the industry, covering topics across ERP Implementation, financial statement ratio analysis, automation in Excel, business This package is recommended by leading professionals in the industry, covering topics across ERP Implementation, financial statement ratio analysis, automation in Excel, business intelligence reporting using PowerBI, and much more.I don’t know if I have more information, How it space the title sitting.This package is recommended by leading professionals in the industry, covering topics across ERP Implementation, financial statement ratio analysis, automation in Excel, business intelligence reporting using PowerBI, and much more.I don’t know if I have more information, How it space the title sitting. This package is recommended by leading professionals in the industry, covering topics across ERP Implementation, financial statement ratio analysis, automation in Excel, business intelligence reporting using PowerBI, and much more.",
  time: "2021-May-22",
};

const Detail = (props) => {
  const dispatch = useDispatch();
  const eventName = props.location.state.data;

  const eventDetail = useSelector((state) => state.eventData.eventDetail);

  useEffect(() => {
    dispatch(getEventByName(eventName));
  }, [dispatch]);

  //todo need a name of event
  console.log("eventDetail", eventDetail);

  if (!eventDetail) {
    return <RouterLoading />;
  }

  const {
    EventImage,
    EventName,
    EventShortName,
    EventShortDescription,
    EventDescription,
    EventStartDate,
    EventEndDate,
  } = eventDetail;

  const breadcrumb = [
    {
      title: "Event",
      path: "/event/list",
    },
    {
      title: EventName,
    },
  ];

  return (
    <div className="d-flex flex-column">
      <div className="d-flex justify-content-center bg-light-theme--event">
        <div className="content-container event-detail-container">
          <PageHeader data={breadcrumb} theme="white" />

          <Row className="pt-4 pl-2 pr-2">
            <Col md={8} lg={8} className="detail-image-container">
              <img src={srcURL + EventImage} className="detail-image" alt="/" />
            </Col>

            <Col
              md={16}
              lg={16}
              className="d-flex flex-column pl-100 detail-content-container"
            >
              <div className="d-flex flex-column pr-30 mb-auto">
                <span className="fs-30 color-white">{EventName}</span>

                <div className="d-flex mt-2">
                  <span className="fs-20 color-white mr-auto">
                    {EventShortName}
                  </span>
                  <span className="fs-20 color-white">
                    {EventStartDate}-{EventEndDate}
                  </span>
                </div>

                <div className="rectangle rectangle--dark rectangle--large mt-1" />

                <div className="fs-20 mt-4 color-white overflow-hidden">
                  {EventShortDescription}
                </div>
              </div>

              <div
                role="button"
                className="align-self-end pl-30 pr-30 pt-10 pb-10 mb-2 rounded-pill button button--light-hover-dark button--animated"
              >
                Attend Event
              </div>
            </Col>
          </Row>
        </div>
      </div>

      <div className="d-flex justify-content-center">
        <div className="content-container event-detail-container">
          <div className="section-card section-card--animated border-radius-8 bg-white mt-5 mb-100 ml-2 mr-2">
            <div className="color-dark-grey-3 fs-20 mx-5 mt-4 mb-3">
              Event description
            </div>
            <div className="rectangle rectangle--light rectangle--small card-rectangle" />
            <div className="color-light-grey-3 fs-16 mx-5 mt-3 mb-5 line-height-30">
              <div
                dangerouslySetInnerHTML={{ __html: EventShortDescription }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
