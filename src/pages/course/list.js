import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

//redux
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCatSubCategories,
  getAllCoursesAndPackages,
  getCoursesAndPackagesByCategoryId
} from "../../redux/actions";

//packages
import _ from "lodash";
import { Row, Col, Pagination, Rate, Dropdown, Button, Result } from "antd";
import {
  SwitcherOutlined,
  GlobalOutlined,
  TagsOutlined,
  ReadOutlined,
  DollarOutlined,
  ProfileOutlined,
  StarOutlined,
  HistoryOutlined,
  DownOutlined,
} from "@ant-design/icons";

//components
import PageHeader from "../../components/PageHeader";
import Filter from "../../components/Filter";
import Sort from "../../components/Sort";
import ViewSwitch from "../../components/ViewSwitch";
import Search from "../../components/Search";
import CardGrid from "../../components/Card/CourseCardGrid";
import CardHorizontal from "../../components/Card/CourseCardHorizontal";
import RouterLoading from "../../components/RouterLoading";

const breadcrumb = [
  {
    title: "Course",
    path: "/course",
  },
];

const filterData = [
  {
    icon: (
      <SwitcherOutlined
        style={{
          color: "#3DAFBE",
        }}
      />
    ),
    value: "Course Type",
    children: [
      {
        value: "All",
      },
      {
        value: "Single Course",
      },
      {
        value: "Package Course",
      },
    ],
  },
  // {
  //   icon: (
  //     <GlobalOutlined
  //       style={{
  //         color: "#3DAFBE",
  //       }}
  //     />
  //   ),
  //   value: "Language",
  //   children: [
  //     {
  //       value: "Chinese",
  //     },
  //     {
  //       value: "English",
  //     },
  //   ],
  // },

  {
    icon: (
      <ReadOutlined
        style={{
          color: "#3DAFBE",
        }}
      />
    ),
    value: "Level",
    children: [
      {
        value: "Beginner",
      },
      {
        value: "Intermediate",
      },
      {
        value: "Advanced ",
      },
    ],
  },
  {
    icon: (
      <DollarOutlined
        style={{
          color: "#3DAFBE",
        }}
      />
    ),
    value: "Price",
    children: [
      {
        value: "Under $50",
      },
      {
        value: "CA $50 - CA $100",
      },
      {
        value: "CA $100 - CA $150",
      },
      {
        value: "CA $150 - CA $200",
      },
      {
        value: "CA $200 & Above",
      },
    ],
  },

  {
    icon: (
      <StarOutlined
        style={{
          color: "#3DAFBE",
        }}
      />
    ),
    value: "Rating",
    children: [
      // {
      //   value: (
      //     <>
      //       <Rate className="fs-16 mr-2" disabled value={5} />
      //       <span> & up</span>
      //     </>
      //   ),
      // },
      {
        value: (
          <>
            <Rate className="fs-16 mr-2"  disabled value={4} />
            <span> & up</span>
          </>
        ),
      },
      {
        value: (
          <>
            <Rate className="fs-16 mr-2" disabled value={3} />
            <span> & up</span>
          </>
        ),
      },
      {
        value: (
          <>
            <Rate className="fs-16 mr-2" disabled value={2} />
            <span> & up</span>
          </>
        ),
      },
      {
        value: (
          <>
            <Rate className="fs-16 mr-2" disabled value={1} />
            <span> & up</span>
          </>
        ),
      },
    ],
  },
  {
    icon: (
      <HistoryOutlined
        style={{
          color: "#3DAFBE",
        }}
      />
    ),
    value: "Duration",
    children: [
      {
        value: "Less than 1 Hour",
      },
      {
        value: "1-2 Hours",
      },
      {
        value: "2-3 Hours",
      },
      {
        value: "3-4 Hours",
      },
      {
        value: "4+ Hours",
      },
    ],
  },
];

const sortData = [
  {
    key: 1,
    name: "Default",
    value: "Most Relevant",
  },
  {
    key: 2,
    name: "Rating",
    value: "Most Popular",
  },
  {
    key: 3,
    name: "CoursePrice",
    value: "Price: Low to High",
  },
  {
    key: 4,
    name: "CoursePrice",
    value: "Price: High to Low",
  },
];

const List = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const sortLookup = {
    "Most Relevant": ["CustomSortOrder",true],
    "Most Popular": ["Rating", false],
    "Price: Low to High": ["CoursePrice", true],
    "Price: High to Low": ["CoursePrice", false],
    "New to Old": ["BlogUploadedDate", false],
    "Old to New": ["BlogUploadedDate", true],
    "Newest to Oldest": ["EventStartDate", false],
    "Oldest to Newest": ["EventStartDate", true],
  };

  const homeData = props.location.state;
  const parentLabel = props.location.state?.courseParam.parentLabel;
  const [currentPage, setCurrentPage] = useState(1);
  const [startValue, setStartValue] = useState(0);
  const [endValue, setEndValue] = useState(15);

  const [sortParam, setSortParam] = useState(
    homeData && homeData.courseParam["sort"]
      ? sortLookup[homeData.courseParam["sort"]]
      : ["CustomSortOrder",true]
  );

  const [filterParam, setFilterParam] = useState(
    homeData && homeData.courseParam["category"]
      ? ["CategoryName", homeData.courseParam["category"]]
      : []
  );
  const [searchParam, setSearchParam] = useState(
    homeData && homeData.courseParam["search"]
      ? homeData.courseParam["search"]
      : null
  );

  const [layoutState, setLayoutState] = useState(0);

  const [localCourseList, setLocalCourseList] = useState();

  const { categoryList, courseList, courseListByID } = useSelector((state) => state.courseData);

  const userId = localStorage.getItem("CPDUserID");

  useEffect(() => {
    dispatch(getAllCatSubCategories());
    
    if(!userId) {
      dispatch(getAllCoursesAndPackages("0"));
    }else {
      dispatch(getCoursesAndPackagesByCategoryId("0", userId));
    }
  }, []);

  useEffect(() => {
    if (!localCourseList) {
      if(!userId) {
        setLocalCourseList(courseList);
      }else {
        setLocalCourseList(courseListByID);
      }
      // handleApply();
    }
  }, [courseList, courseListByID, userId]);

  useEffect(() => {
    initCategoryList();
  }, [categoryList]);

  //??????sort??? search???filter????????????
  useEffect(() => {
    if (localCourseList) {
      handleApply();
    }
  }, [searchParam, sortParam]);

  useEffect(() => {
    if (localCourseList) {
      handleApply();
    }
  }, [filterParam]);

  const handleApply = () => {
    // ??????filter
    let result = [];
    if(!userId) {
      result = [...courseList];
    }else {
      result = [...courseListByID];
    }
    if (filterParam.length > 0) {
      console.log(filterParam)
      if (filterParam[0] === "CourseDuration") {
        if (filterParam[1] === "Less than 1 Hour") {
          result = result.filter((c) => {
            return c[filterParam[0]] < 1;
          });
        } else if (filterParam[1] === "1-2 Hours") {
          result = result.filter(
            (c) => 1 <= c[filterParam[0]] && c[filterParam[0]] <= 2
          );
        } else if (filterParam[1] === "2-3 Hours") {
          result = result.filter(
            (c) => 2 < c[filterParam[0]] && c[filterParam[0]] <= 3
          );
        } else if (filterParam[1] === "3-4 Hours") {
          result = result.filter(
            (c) => 3 < c[filterParam[0]] && c[filterParam[0]] <= 4
          );
        } else if (filterParam[1] === "4+ Hours") {
          result = result.filter((c) => 4 < c[filterParam[0]]);
        }
      } else if (filterParam[0] === "CoursePrice") {
        if (filterParam[1] === "Under $50") {
          result = result.filter((c) => c[filterParam[0]] < 50);
        } else if (filterParam[1] === "CA $50 - CA $100") {
          result = result.filter(
            (c) => 50 <= c[filterParam[0]] && c[filterParam[0]] < 100
          );
        } else if (filterParam[1] === "CA $100 - CA $150") {
          result = result.filter(
            (c) => 100 <= c[filterParam[0]] && c[filterParam[0]] < 150
          );
        } else if (filterParam[1] === "CA $150 - CA $200") {
          result = result.filter(
            (c) => 150 <= c[filterParam[0]] && c[filterParam[0]] < 200
          );
        } else if (filterParam[1] === "CA $200 & Above") {
          result = result.filter((c) => 200 <= c[filterParam[0]]);
        }
      } else if (filterParam[0] === "Rating") {
        if (filterParam[1] === 0) {
          result = result.filter((c) => 4 <= c[filterParam[0]]);
        } else if (filterParam[1] === 1) {
          result = result.filter((c) => 3 <= c[filterParam[0]]);
        } else if (filterParam[1] === 2) {
          result = result.filter((c) => 2 <= c[filterParam[0]]);
        } else if (filterParam[1] === 3) {
          result = result.filter((c) => 1 <= c[filterParam[0]]);
        }
      } else if (filterParam[0] === "CourseType") {
        if (filterParam[1] === 0) {
          result = result.filter((c) => 1 === c[filterParam[0]]);
        } else if (filterParam[1] === 1) {
          result = result.filter((c) => 2 === c[filterParam[0]]);
        }
      }  else if (filterParam[0] === "Skilllevel") {
        if (filterParam[1] === "Beginner") {
          result = result.filter((c) => 1 === c[filterParam[0]]);
        } else if (filterParam[1] === "Intermediate") {
          result = result.filter((c) => 2 === c[filterParam[0]]);
        } else if (filterParam[1] === "Advanced ") {
          result = result.filter((c) => 3 === c[filterParam[0]]);
        }
      }  else {
        result = result.filter((c) => c[filterParam[0]] === filterParam[1]);
      }
    }

    // ??????sorts
    if (result.length > 0) {
      result = result.sort((a, b) =>
              sortParam[1]
                ? a[sortParam[0]] - b[sortParam[0]]
                : b[sortParam[0]] - a[sortParam[0]]
            );
      // ??????search
      if (searchParam) {
        result = result?.filter((course) =>
          ["CourseTitle", "AuthorName"].some((key) =>{
            return course[key]?.toLowerCase().includes(searchParam)
          }
          
          )
        );
      }
    }

    setLocalCourseList(result);

    setStartValue(0);
    setEndValue(15);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setFilterParam([]);
    let searchedList;
    //??????sort
    searchedList =
      [...courseList].sort((a, b) =>
            sortParam[1]
              ? a[sortParam[0]] - b[sortParam[0]]
              : b[sortParam[0]] - a[sortParam[0]]
          );

    //??????search
    if (searchParam) {
      searchedList = searchedList?.filter((course) =>
        ["CourseTitle", "AuthorName"].some((key) =>
          course[key].toLowerCase().includes(searchParam)
        )
      );
    }
    setLocalCourseList(searchedList);

    setStartValue(0);
    setEndValue(15);
    setCurrentPage(1);
  };

  const initCategoryList = () => {
    if (!categoryList) {
      return;
    }
    const mainCats = _.uniqBy(categoryList, "CategoryName").map(
      (cat) => cat.CategoryName
    );
    const options = mainCats.map((mainCat) => {
      return {
        key: mainCat,
        value: mainCat,
        children: categoryList
          .filter((cat) => cat.CategoryName === mainCat)
          .map((subCat) => ({
            key: subCat.SubCategoryID,
            value: subCat.SubCategoryName,
          })),
      };
    });

    // ??????filterData index2

    const topicData = {
      icon: (
        <TagsOutlined
          style={{
            color: "#3DAFBE",
          }}
        />
      ),
      value: "Topic",
      children: options,
    };
    if (!filterData.some((e) => e.value === "Topic")) {
      filterData.splice(2, 0, topicData);
    }
  };

  const handlePageChange = (value) => {
    setStartValue((value - 1) * 15);
    setEndValue(value * 15);
    setCurrentPage(value);
  };

  if (!localCourseList) {
    return(
      <div className="vh-80 justify-content-center">
        <div className="mt-v30">
          <RouterLoading/>
        </div>
      </div>
    ) 
  }

  return (
    <div className="d-flex justify-content-center w-80" style={{margin: '0 auto'}}>
      <div className="content-container ">
        <PageHeader data={breadcrumb} />

        <Row className="d-flex ">
          <Col xs={24} lg={5} className="px-3 py-4">
            <div
              role="button"
              className="w-100 rounded-pill button button--light-hover-dark pt-8 pb-8"
            >
              <span className="fs-14" onClick={()=>history.push("/order/credit")}>Customized Learning</span>
            </div>
          </Col>

          <Col
            className="d-flex align-items-center justify-content-center my-2"
            xs={14}
            lg={6}
          >
            <Sort
              className="align-self-center"
              data={sortData}
              setSortParam={setSortParam}
              sort={homeData ? homeData.courseParam["sort"] : null}
            />
          </Col>

          <Col
            xs={0}
            lg={6}
            className="d-flex align-items-center justify-content-center my-2 "
          >
            <div className="phone-size-hide">
              <ViewSwitch setLayoutState={setLayoutState} />
            </div>
          </Col>

          <Col
            xs={10}
            lg={7}
            className="w-100 d-flex align-items-center justify-content-center my-2"
          >
            <Search
              setSearchParam={setSearchParam}
              search={homeData ? homeData.courseParam["search"] : null}
            />
          </Col>

          {/* ?????????????????? */}
          <Col xs={6} lg={0} className="mb-5">
            <Filter
              data={filterData}
              setFilterParam={setFilterParam}
              selectParam={props.location.state?.courseParam?.category}
              paramParent={parentLabel}
              handleApply={handleApply}
              handleReset={handleReset}
              // similarList={localCourseList}
            />
          </Col>
        </Row>

        <div className="d-flex">
          {/* filter  */}

          <div className="mr-5 phone-size-hide">
            <Filter
              data={filterData}
              setFilterParam={setFilterParam}
              handleApply={handleApply}
              handleReset={handleReset}
              selectParam={props.location.state?.courseParam?.category}
              paramParent={parentLabel}
            />
          </div>

          <div className="w-100">
            {/* course list  */}
            <Row>
              {layoutState
                ? localCourseList
                    .slice(startValue, endValue)
                    .map((item, index) => {
                      return (
                        <div key={index} className="pr-3 pb-3">
                          <CardHorizontal data={item} similarList={localCourseList}/>
                        </div>
                      );
                    })
                : localCourseList
                    .slice(startValue, endValue)
                    .map((item, index) => {
                      return (
                        <Col
                          key={index}
                          md={12}
                          lg={8}
                          xs={24}
                          className="pr-5 pb-5"
                        >
                          <CardGrid data={item} similarList={localCourseList}/>
                        </Col>
                      );
                    })}
            </Row>

            <Row>
              <Col
                span={24}
                className="mt-5 mb-50 d-flex justify-content-center align-items-center"
              >
                <Pagination
                  onChange={handlePageChange}
                  current={currentPage}
                  defaultPageSize={15}
                  total={localCourseList.length}
                  showSizeChanger={false}
                />
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;

// getCourseList("1");
// dispatch(getPackageById(279));
// dispatch(getCourseByInstructorId(0));
// dispatch(getCustomPackage({ courseId: 0, userId: 0 }));
// dispatch(getRelatedCourses(1)); //categoryid
// dispatch(getRelatedPackages(1)); //categoryid

// dispatch(getInstructorInfo(0));
// dispatch(getInstructorWorkDetail(0));
// dispatch(getInstructorEducationDetail(0));
// dispatch(getInstructorCertificateDetail(0));

//Code Review, handleSort and handle search have duplicate code
// const handleSort = (value) => {
//   console.log("sorting the list by", value);
//   // ????????????
//   //Code Review, could be simplified
//   if (value[0] === "Default") {
//     setLocalCourseList(courseList);
//   } else {
//     const sorted = [...localCourseList].sort((a, b) =>
//       value[1] ? a[value[0]] - b[value[0]] : b[value[0]] - a[value[0]]
//     );
//     setLocalCourseList(sorted);
//   }

//   //Code Review, could be simplified
//   setStartValue(0);
//   setEndValue(15);
//   setCurrentPage(1);
// };

// "CategoryName",
// "SubCategoryName",
// "CourseDescription",

// const handleSearch = () => {
//   let searchedList =;
//   // ??????filter
//   if (filterParam.length > 0) {
//     searchedList = localCourseList.filter(
//       (c) => c[filterParam[0]] === filterParam[1]
//     );
//   }

//   //??????sort
//   searchedList =
//     sortParam[0] === "Default"
//       ? searchedList
//       : [...searchedList].sort((a, b) =>
//           sortParam[1]
//             ? a[sortParam[0]] - b[sortParam[0]]
//             : b[sortParam[0]] - a[sortParam[0]]
//         );

//   //??????search
//   if (searchParam) {
//     searchedList = searchedList?.filter((course) =>
//       ["CourseTitle", "AuthorName"].some((key) =>
//         course[key].toLowerCase().includes(searchParam)
//       )
//     );
//   }

//   setLocalCourseList(searchedList);

//   setStartValue(0);
//   setEndValue(15);
//   setCurrentPage(1);
// };

// handleSearch();
