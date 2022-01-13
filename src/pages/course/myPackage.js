import React, { useEffect, useState } from "react";

//redux
import { useDispatch, useSelector } from "react-redux";
import { GetCoursesMyFromPackage } from "../../redux/actions";
import { updateUserCourseProgress } from "../../redux/actions";

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
  Menu,
  Dropdown,
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
  CheckCircleTwoTone,
  MinusOutlined,
  PlaySquareFilled,
  FilePdfFilled,
  FileImageFilled,
  FileFilled,
  FileZipFilled,
  DownOutlined
} from "@ant-design/icons";

//global components
import PageHeader from "../../components/PageHeader";
import CardGrid from "../../components/Dashboard/PackageCourseWithProgress";
import CourseCarousel from "../../components/Carousels/CourseCarousel";
import PackageFAQ from "../package/component/PackageFAQ";
import HowToWords from "../course/components/HowToWords";

//local components
import DetailHeader from "./components/DetailHeader";
import PackageOverview from "./components/packageOverview";
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

import { srcURL } from '../../configs/AppConfig';

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

const MyPackage = (props) => {
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
  console.log(props)
  const userId = localStorage.getItem('CPDUserID');
  const [menuKey, setMenuKey] = useState("mail");
  const [ContentUrl, setContentUrl] = useState(props.data.VideoContent[0].ContentUrl);
  const [CourseContentTitle, setCourseContentTitle] = useState(props.data.VideoContent[0].CourseContentTitle);

  const { relatedCourse, CoursePackage } = useSelector((state) => state.courseData);

  const breadcrumb = [
    {
      title: "My Package",
      path: "/dashboard/packages",
    },
    {
      title: props.data.CourseName,
    },
  ];
  const [courseList, setcourseList] = useState();

  // console.log(packageDetail)
  useEffect(() => {
    //courseId, userid 获取课程详情
    dispatch(GetCoursesMyFromPackage(props.courseId, userId));
  }, []);
  const courseVideo = (e, ContentUrl, CourseContentTitle) => {
    let data = { "CourseContentID": e, "UserId": userId, "CompletedDuration": 0 };
    dispatch(updateUserCourseProgress(data));
    setContentUrl(ContentUrl);
    setCourseContentTitle(CourseContentTitle);
  };

  const handleMenuClick = (e) => {
    setMenuKey(e.key);
  };
  useEffect(() => {
    setcourseList(CoursePackage);
  }, [CoursePackage]);
  const onClick = (e) => {
    console.log(e)
    const learn = [];
    const progress =[];
    const computed = [];
    setcourseList([])
    CoursePackage.forEach((item) => {
      if(item.CourseCompletedPer===0) {
        learn.push(item)
      }
      else if(item.CourseCompletedPer===100) {
        computed.push(item);
      }else {
        progress.push(item);
      }
    });
    if(e.key === "Learn Now") {
      setcourseList(learn);
    }
    if(e.key === "In Progress") {
      setcourseList(progress)
    }
    if(e.key === "Completed") {
      setcourseList(computed)
    }else if(e.key === "ALL") {
      console.log(CoursePackage)
      setcourseList(CoursePackage);
    }
  }
  const menu = (
    <Menu onClick={onClick}>
      <Menu.Item key="ALL">ALL</Menu.Item>
      <Menu.Item key="Learn Now">Learn Now</Menu.Item>
      <Menu.Item key="In Progress">In Progress</Menu.Item>
      <Menu.Item key="Completed">Completed</Menu.Item>
    </Menu>
  );
  return (
    <div className="d-flex flex-column">
      <div className="d-flex justify-content-center bg-light-theme--course-owned mb-50">
        <div className="content-container w-80">
          <PageHeader data={breadcrumb} theme="white" />

          <Row className="pl-2 pr-2 mt-0 pt-0 my-package">
            <Col  md={16} lg={16} className="pr-5">
              <DetailHeader data={props.data} />

              <Tabs defaultActiveKey="1" onChange={handleMenuClick}>
                <TabPane tab="Package Overview" key="1">
                  <PackageOverview data={props.data} />
                </TabPane>
                <TabPane
                  tab={
                    <span>
                      <CheckCircleTwoTone />
                      <Dropdown overlay={menu}>
                        <span className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                        Package Content <DownOutlined />
                        </span>
                      </Dropdown>
                    </span>
                  }
                  key="2">
                  <Row>
                    {
                      courseList?.map((item, index) => {
                        return (
                          <Col
                            key={index}
                            md={12}
                            lg={8}
                            xs={24}
                            className="pr-3 pb-5"
                          >
                            <CardGrid key={item.CourseID} CourseName={item.CourseName} course={item} parentId={props.data.CourseID} packageName={props.data.CourseName} similarList={[]} type="package" />
                          </Col>
                        )
                      })
                    }
                  </Row>
                </TabPane>
                <TabPane tab="How does it work" key="3">
                  {/* FAQ */}
                  <HowToWords Enrollment={props.data.Enrollment} />

                </TabPane>
                <TabPane tab="FAQ" key="4">
                  {/* FAQ */}
                  <PackageFAQ  type="home"/>

                </TabPane>
                <TabPane tab="Reviews" key="5">
                  {/* reviews */}
                  <ReviewList data={props.data} />

                  <ReviewForm data={props.data} />
                </TabPane>
              </Tabs>
            </Col>

            <Col md={8} lg={8} className="mt-4">
              <div className="section-card border-radius-8 bg-white mt-4">
                <div className="text-center">
                  <img className="w-80 mt-5" src={srcURL + props.data.CourseImage} />
                </div>

                <div className="d-flex justify-content-between mx-5">
                  {/* <div className="mt-3">
                    <span className="color-orange fs-28 mr-3">
                      CA ${props.data.CoursePrice}
                    </span>

                    <span className="color-dark-grey-2 fs-20 line-cross">
                      {props.data.OriginalCoursePrice && <del>${props.data.OriginalCoursePrice ? props.data.OriginalCoursePrice : 0.00}</del>}
                    </span>
                  </div> */}

                  {/* <div className="bookmark-container d-flex justify-content-center">
                    <div
                      onClick={(e) => handleBookMark(e)}
                      className={
                        bookmarkState !== 0
                          ? "bookmark bookmark--gold"
                          : "bookmark bookmark--grey"
                      }
                    >
                      <img
                        src={bookmarkStar}
                        className={
                          bookmarkState !== 0
                            ? "bookmark-star bookmark-star--big"
                            : "bookmark-star bookmark-star--small"
                        }
                        alt="/"
                      />
                    </div>
                  </div> */}
                </div>

                {/* course features */}
                <div className="">
                  <div className="p-5">
                    <span className="fs-22 color-dark-grey-2">
                      Course Features
                    </span>
                    <div
                      className="mt-3 d-flex justify-content-between align-items-center"
                    >
                      <div className="d-flex align-items-center fs-20">
                        <HistoryOutlined style={{ color: "#3DAFBE" }} />
                        <div className="fs-20 color-dark-grey-2 ml-3">Duration</div>
                      </div>
                      <div className="fs-20 color-light-grey-2">
                        {props.data.CourseDuration} Hours
                      </div>
                    </div>
                    <div
                      className="mt-3 d-flex justify-content-between align-items-center"
                    >
                      <div className="d-flex align-items-center fs-20">
                        <ProfileOutlined style={{ color: "#3DAFBE" }} />
                        <div className="fs-20 color-dark-grey-2 ml-3">Contents</div>
                      </div>
                      <div className="fs-20 color-light-grey-2">
                        {props.data.VideoContent.length} Courses
                      </div>
                    </div>
                    <div
                      className="mt-3 d-flex justify-content-between align-items-center"
                    >
                      <div className="d-flex align-items-center fs-20">
                        <ReadOutlined style={{ color: "#3DAFBE" }} />
                        <div className="fs-20 color-dark-grey-2 ml-3">Skill Level</div>
                      </div>
                      <div className="fs-20 color-light-grey-2">
                        {props.data.SkilllevelName}
                      </div>
                    </div>
                    <div
                      className="mt-3 d-flex justify-content-between align-items-center"
                    >
                      <div className="d-flex align-items-center fs-20">
                        <FileProtectOutlined style={{ color: "#3DAFBE" }} />
                        <div className="fs-20 color-dark-grey-2 ml-3">Certification</div>
                      </div>
                      <div className="fs-20 color-light-grey-2">
                        Yes
                      </div>
                    </div>
                    <div
                      className="mt-3 d-flex justify-content-between align-items-center"
                    >
                      <div className="d-flex align-items-center fs-20">
                        <ExportOutlined style={{ color: "#3DAFBE" }} />
                        <div className="fs-20 color-dark-grey-2 ml-3">Available Access</div>
                      </div>
                      <div className="fs-20 color-light-grey-2">
                        Video
                      </div>
                    </div>
                    <div
                      className="mt-3 d-flex justify-content-between align-items-center"
                    >
                      <div className="d-flex align-items-center fs-20">
                        <GlobalOutlined style={{ color: "#3DAFBE" }} />
                        <div className="fs-20 color-dark-grey-2 ml-3">Language</div>
                      </div>
                      <div className="fs-20 color-light-grey-2">
                        English
                      </div>
                    </div>
                  </div>
                </div>
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

export default MyPackage;
