import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

//redux
import { useDispatch, useSelector } from "react-redux";

import { updateUserPackageCourseProgress } from "../../redux/actions";

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
} from "antd";
import ReactPlayer from "react-player";
import {
  GlobalOutlined,
  ReadOutlined,
  ProfileOutlined,
  HistoryOutlined,
  FileProtectOutlined,
  ExportOutlined,
  PlusOutlined,
  MinusOutlined,
  PlaySquareFilled,
  FilePdfFilled,
  FileImageFilled,
  FileFilled,
  FileZipFilled,
  CheckCircleFilled,
  PlayCircleFilled
} from "@ant-design/icons";

//global components
import PageHeader from "../../components/PageHeader";
import CardGrid from "../../components/Card/CourseCardGrid";
import CourseCarousel from "../../components/Carousels/CourseCarousel";

//local components
import DetailHeader from "./components/DetailHeader";
import Overview from "./components/Overview";
import Learning from "./components/Learning";
import Certificate from "./components/Certificate";
import Attachment from "./components/Attachment";
import Assessment from "./components/Assessment";

import ReviewForm from "./components/ReviewForm";
import ReviewList from "./components/ReviewList";

//fake img
import newsImg1 from "../../assets/img/img-news-1.png";
import newsImg2 from "../../assets/img/img-news-2.png";
import newsImg3 from "../../assets/img/img-news-3.png";
import avatarImg1 from "../../assets/img/avatar-man.png";
import avatarImg2 from "../../assets/img/avatar-woman.png";



const detailData = {
  id: 1,
  image: newsImg1,
  title: "Game Design",
  text: "Looking for a 20-hours package deal to complete your 2020 CPA PD requirement? We have the perfect hybrid course bundle for CPA to learn both the Finance and the Tech. This package is recommended by leading professionals in the industry, ● Technical writing ■ Title and Content_01 ■ Title and Content_02 ■ Title and Content_03, this should be shown more ● Reference works ● Notes",
  overview:
    "Looking for a 20-hours package deal to complete your 2020 CPA PD requirement? We have the perfect hybrid course bundle for CPA to learn both the Finance and the Tech. This package is recommended by leading professionals in the industry.",
  instructor: "Tried a very long instructor",
  flowchart:
    "Looking for a 20-hours package deal to complete your 2020 CPA PD requirement? We have the perfect hybrid course bundle for CPA to learn both the Finance and the Tech. This package is recommended by leading professionals in the industry.",
  category: "Accounting",
  rating: 4.5,
  duration: 5,
  price: 99.99,
  originalPrice: 199.99,
  tags: ["web", "front-end", "node"],
  bookmark: true,
  reviews: [
    {
      name: "Bob Laza",
      avatar: avatarImg1,
      rating: 4.5,
      content:
        "I can’t believe I can study online, the course is very suit in this special period, I have already staying at home more than 3 weeks.",
    },
    {
      name: "Lucy Cris",
      avatar: avatarImg2,
      rating: 1.5,
      content:
        "I can’t believe I can study online, the course is very suit in this special period, I have already staying at home more than 3 weeks.I can’t believe I can study online, the course is very suit in this special period, I have already staying at home more than 3 weeks.I can’t believe I can study online, the course is very suit in this special period, I have already staying at home more than 3 weeks.",
    },
    {
      name: "Bob Laza",
      avatar: avatarImg1,
      rating: 3.5,
      content:
        "I can’t believe I can study online, the course is very suit in this special period, I have already staying at home more than 3 weeks.I can’t believe I can study online, the course is very suit in this special period, I have already staying at home more than 3 weeks.I can’t believe I can study online, the course is very suit in this special period, I have already staying at home more than 3 weeks.",
    },
  ],
  feature: [
    {
      icon: (
        <HistoryOutlined
          style={{
            color: "#3DAFBE",
          }}
        />
      ),
      title: "Duration",
      content: "20 Hours",
    },
    {
      icon: (
        <ProfileOutlined
          style={{
            color: "#3DAFBE",
          }}
        />
      ),
      title: "Content",
      content: "14 Courses",
    },
    {
      icon: (
        <ReadOutlined
          style={{
            color: "#3DAFBE",
          }}
        />
      ),
      title: "Skill Level",
      content: "Intermediate",
    },
    {
      icon: (
        <FileProtectOutlined
          style={{
            color: "#3DAFBE",
          }}
        />
      ),
      title: "Certification",
      content: "Yes",
    },
    {
      icon: (
        <ExportOutlined
          style={{
            color: "#3DAFBE",
          }}
        />
      ),
      title: "Available Access",
      content: "Video",
    },
    {
      icon: (
        <GlobalOutlined
          style={{
            color: "#3DAFBE",
          }}
        />
      ),
      title: "Language",
      content: "English",
    },
  ],
  content: [
    {
      title: "001 Introduce HTML5 for…",
      number: 5,
      files: [
        {
          icon: <PlaySquareFilled />,
          title: "001_HTML5 Lecture 1",
          size: "35min",
        },
        {
          icon: <FilePdfFilled />,
          title: "002_HTML5 Lecture 2",
          size: "13KB",
        },
        {
          icon: <FileImageFilled />,
          title: "003_HTML5 Lecture 3",
          size: "3.5MB",
        },
        {
          icon: <FileFilled />,
          title: "004_HTML5 Lecture 4 ZPI",
          size: "13KB",
        },
        {
          icon: <FileZipFilled />,
          title: "005_HTML5 Lecture 1234124124124",
          size: "3.5MB",
        },
      ],
    },
    {
      title: "002 Introduce HTML5 for…",
      number: 5,
      files: [
        {
          icon: <PlaySquareFilled />,
          title: "001_HTML5 LectureETERTERT",
          size: "35min",
        },
        {
          icon: <FilePdfFilled />,
          title: "002_HTML5 LectureER",
          size: "13KB",
        },
        {
          icon: <FileImageFilled />,
          title: "003_HTML5 LectureTRTRT",
          size: "3.5MB",
        },
        {
          icon: <FileFilled />,
          title: "004_HTML5 LecturEEEe",
          size: "13KB",
        },
        {
          icon: <FileZipFilled />,
          title: "005_HTML5",
          size: "3.5MB",
        },
      ],
    },
  ],
  relatedCourses: [
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
    {
      id: 5,
      image: newsImg1,
      title: "Game Design",
      text: "Game Design & A longer Name…here is a name test if the name more than 3 rows, let me try",
      instructor: "instructor",
      category: "Spacing",
      rating: 4.5,
      duration: 5,
      price: 99.99,
      originalPrice: 199.99,
    },
  ],
  attachment: [
    {
      icon: <PlaySquareFilled />,
      title: "001_HTML5 Lecture 1",
      size: "35min",
    },
    {
      icon: <PlaySquareFilled />,
      title: "001_HTML5 Lecture 1",
      size: "35min",
    },
    {
      icon: <FilePdfFilled />,
      title: "002_HTML5 Lecture 2",
      size: "13KB",
    },
    {
      icon: <FileImageFilled />,
      title: "003_HTML5 Lecture 3",
      size: "3.5MB",
    },
    {
      icon: <FileFilled />,
      title: "004_HTML5 Lecture 4 ZPI",
      size: "13KB",
    },
    {
      icon: <FileZipFilled />,
      title: "005_HTML5 Lecture 1234124124124",
      size: "3.5MB",
    },
  ],
  assessment: [{}],
  currentProgress: 2,
  totalProgress: 12,
};

const { Panel } = Collapse;

const { TabPane } = Tabs;

const Detail = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  // const { data } = props.location.state;

  //const { id, title } = data || {};

  const {
    id,
    image,
    title,
    text,
    instructor,
    category,
    rating,
    duration,
    price,
    originalPrice,
    overview,
    flowchart,
    tags,
    bookmark,
    reviews,
    feature,
    content,
    relatedCourses,
    currentProgress,
    totalProgress,
  } = detailData;
  const [bookmarkState, setBookmarkState] = useState(bookmark);
  const userId = localStorage.getItem('CPDUserID');

  const [menuKey, setMenuKey] = useState("1");
  const [ContentUrl, setContentUrl] = useState(props.data.VideoContent[0].ContentUrl);
  const [CourseContentTitle, setCourseContentTitle] = useState(props.data.VideoContent[0].CourseContentTitle);
  const [VideoContent, setVideoContent] = useState(props.data.VideoContent);
  const [viewVideo, setviewVideo] = useState(-1);
  const [videoIndex, setVideoIndex] = useState(0);
  const { relatedCourse } = useSelector((state) => state.courseData);

  const breadcrumb = [
    {
      title: "My Package",
      path: "/dashboard/packages",
    },
    {
      title: props.packageName,
      path: `/course/detail-mypackage/${props.packageName}`,
      search: `?id=${props.courseId}`,
      // state: { data: course },
    },
    {
      title: props.data.CourseName
    },
  ];

  const courseVideo = (e, ContentUrl, CourseContentTitle, Duration, index, CourseCompletedPer) => {
    if (CourseCompletedPer != 100) {
      let tmpVideoContent = VideoContent;
      tmpVideoContent[index].CourseCompletedPer = 100;
      setVideoContent(tmpVideoContent);
      let data = { "CourseContentID": e, "UserId": userId, "CompletedDuration": Duration };
      dispatch(updateUserPackageCourseProgress(data));
      props.refreshCourse();
    }
    setviewVideo(index);
    setMenuKey("2");
    setContentUrl(ContentUrl);
    setCourseContentTitle(CourseContentTitle);
  };

  const refreshCourse = () => {
    props.refreshCourse();
  };

  const handleMenuClick = (e) => {
    console.log(e)
    setMenuKey(e);
  };

  useEffect(() => {
    setVideoContent(props.data.VideoContent);
  }, [props]);

  useEffect(() => {
    setVideoContent(props.data.VideoContent);
    if(props.data.CourseID != props.courseId){
      setMenuKey("1");
      return
    }
    if (props.data.CourseCompletedPer < 100 && props.data.CourseCompletedPer > 0) {
      setMenuKey("2");
      return
    }
    if (props.data.CourseCompletedPer === 100 && viewVideo == -1) {
      setMenuKey("3");
    }
    if (props.CertificateUrl) {
      setMenuKey("6");
      return
    }
  }, [props]);
  const handleVideoIndex = (val) => {
    console.log(val)
    setVideoIndex(val)
  }

  return (
    <div className="d-flex flex-column">
      <div className="d-flex justify-content-center bg-light-theme--course-owned">
        <div className="content-container w-80 mb-50">
          <PageHeader data={breadcrumb} theme="white" />
          <Row className="pl-2 pr-2 mt-0 pt-0">
            <Col md={15} lg={15} className="pr-5">
              <DetailHeader data={props.data} />

              <Tabs defaultActiveKey={"1"} activeKey={menuKey} onChange={handleMenuClick}>
                <TabPane tab="Overview" key="1">
                  <Overview data={props.data} />
                </TabPane>

                <TabPane tab="Learning" key="2">
                  <Learning courseVideo={courseVideo} handleVideoIndex={handleVideoIndex} viewVideo={viewVideo} data={props.data.VideoContent} CourseContentTitle={CourseContentTitle} ContentUrl={ContentUrl} />
                </TabPane>

                <TabPane tab="Assessment" key="3">
                  <Assessment refreshCourse={refreshCourse} data={props.data} type={props.type} />
                </TabPane>

                <TabPane tab="Attachment" key="4">
                  <Attachment data={props.data} />
                </TabPane>

                <TabPane tab="Review" key="5">
                  {/* reviews */}
                  <ReviewList data={props.data} />

                  <ReviewForm data={props.data} />
                </TabPane>

                {
                  props.data.CertificateUrl
                  &&
                  <TabPane tab="Certificate" key="6">
                    <Certificate url={props.CertificateUrl} />
                  </TabPane>
                }
              </Tabs>
            </Col>

            <Col md={9} lg={9} className="mt-4">
              <div className="d-flex flex-column section-card border-radius-8 bg-white px-5 pt-4 pb-30">
                <div className="d-flex align-items-center">
                  <span className="fs-20 color-dark-grey-2 mr-auto">
                    Overall Progress
                  </span>

                  <span className="fs-16 color-light-grey-2">
                    {/* Valid until Jan22, 2022 */}
                  </span>
                </div>

                <span className="mr-30 fs-16 color-light-grey-2 py-1 mt-2">
                  {props.data.CourseCompletedPer ?? 0} Completed
                </span>

                <div className="d-flex mb-2">
                  <span className="fs-16 color-dark-theme mr-auto py-1">
                    {100 - props.data.CourseCompletedPer ?? 0}%
                    Remaining to Complete
                  </span>

                  <span className="d-flex align-items-center fs-16 color-light-grey-2 py-1">
                    <HistoryOutlined />
                    &nbsp;&nbsp;{props.data.CourseDuration} Hours
                  </span>
                </div>

                <Progress
                  className="w-100"
                  strokeColor="#2f799a"
                  percent={props.data.CourseCompletedPer ? props.data.CourseCompletedPer : 0}
                  showInfo={false}
                />

                <div className="d-flex align-items-end justify-content-center mt-20">
                {
                    props.data.CourseCompletedPer == 100 &&
                    props.data.MaxScore >= 70 &&
                    props.CertificateUrl == null &&
                    <div
                      role="button"
                      className="pl-30 pr-30 pt-8 pb-8 rounded-pill button button--light-hover-dark"
                      onClick={() => history.push("/dashboard/courses")}
                    >
                      Complete Course
                    </div>
                  }
                  {
                    props.data.CourseCompletedPer == 100 &&
                    props.data.MaxScore < 70 &&
                    props.CertificateUrl == null &&
                    <div
                      role="button"
                      className="pl-30 pr-30 pt-8 pb-8 rounded-pill button button--light-hover-dark"
                      onClick={() => setMenuKey("3")}
                    >
                      Take Assessment
                    </div>
                  }
                  {
                    props.data.CourseCompletedPer < 100 &&
                    props.CertificateUrl == null &&
                    <div
                      role="button"
                      className="pl-30 pr-30 pt-8 pb-8 rounded-pill button button--light-hover-dark"
                      onClick={() => setMenuKey("2")}
                    >
                      Learn Now
                    </div>
                  }
                  {
                    props.CertificateUrl &&
                    <div
                      role="button"
                      className="pl-30 pr-30 pt-8 pb-8 rounded-pill button button--light-hover-dark"
                      onClick={() => setMenuKey("6")}
                    >
                      Get Certificate
                    </div>
                  }
                </div>
              </div>

              {/* course content */}
              <div className="section-card border-radius-8 bg-white mt-4">
                <div className="pt-4 px-4 pb-0 mb-0">
                  <span className="fs-20 color-dark-grey-2 ml-4 mt-5">
                    Course Content - {props.data.VideoContent.length} Video
                  </span>

                  <Divider className="mx-0 mt-3 mb-0" />
                </div>

                <Collapse
                  ghost
                  bordered={false}
                  defaultActiveKey={[videoIndex]}
                  activeKey={[videoIndex]}
                  expandIcon={({ isActive }) => {
                    return !isActive ? (
                      <div className="d-flex fs-20 align-items-center justify-content-center">
                        <PlusOutlined className="fs-17" />
                      </div>
                    ) : (
                      <div className="d-flex fs-20 align-items-center justify-content-center">
                        <MinusOutlined className="fs-17" />
                      </div>
                    );
                  }}
                  expandIconPosition="left"
                  className="align-items-center justify-content-center py-2"
                >
                  {VideoContent.map((item, index) => {
                    return (
                      <Panel
                        header={
                          <div className="d-flex align-items-center">
                            <span className="d-flex align-items-center color-dark-grey-2 fs-20 mr-auto  ml-2">
                              {viewVideo==index?<PlayCircleFilled className="color-primary mr-3" />:""}
                              {"Module " + (index + 1)}
                            </span>
                            <span className="color-green fs-20">
                              {item.CourseCompletedPer == 100 ? <CheckCircleFilled className="color-primary" /> : ""}
                            </span>
                          </div>
                        }
                        key={index}
                      >
                        <div className="bg-light-grey-1 py-2">
                          <div
                            key={index}
                            className="d-flex align-items-center py-2  cursor--pointer"
                            onClick={() => {
                              courseVideo(item.CourseContentID, item.ContentUrl, item.CourseContentTitle, item.Duration, index, item.CourseCompletedPer)
                            }}
                          >
                            <span className="ml-55 mr-2 d-flex align-items-center fs-18 panel-container color-light-grey-2 py-1">
                              {item.icon}
                            </span>

                            <span className=" fs-16 panel-container color-light-grey-2 py-1 w-80">
                              {item.CourseContentTitle}
                            </span>

                            <div className="fs-14 color-light-theme">
                              {item.Duration + " mins"}
                            </div>
                          </div>
                        </div>
                      </Panel>
                    );
                  })}
                </Collapse>
              </div>
            </Col>

            {/* Related Course */}
            {/* <Col className="mb-100" md={24} lg={24}>
              <div className="fs-30 color-dark-grey-2 mt-40">
                Related Courses
              </div>

              <div className="rectangle rectangle--light rectangle--size-12 blog-rectangle mb-3" />

              <CourseCarousel data={relatedCourse} />
            </Col> */}
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Detail;
