import React, { useEffect, useState } from "react";

//redux
import { useDispatch, useSelector } from "react-redux";
import { getAllEvents } from "../../redux/actions";

//packages
import { Row, Col, Pagination } from "antd";
import {
  TagsOutlined,
  ProfileOutlined,
  CarryOutOutlined,
} from "@ant-design/icons";

//components
import PageHeader from "../../components/PageHeader";
import Filter from "../../components/Filter";
import Sort from "../../components/Sort";
import Search from "../../components/Search";
import Card from "../../components/Card/EventCard";
import RouterLoading from "../../components/RouterLoading/index";

//fake img
import newsImg1 from "../../assets/img/img-news-1.png";
import newsImg2 from "../../assets/img/img-news-2.png";
import newsImg3 from "../../assets/img/img-news-3.png";

const breadcrumb = [
  {
    title: "Event",
    path: "/event",
  },
];

const events = [
  {
    id: 1,
    image: newsImg1,
    title: "News from BBC",
    text: "Over ten years of professional experiences designer share their personal skills and method.",
    time: "2021-May-22",
  },
  {
    id: 2,
    image: newsImg2,
    title: "News from BBC",
    text: "Over ten years of professional experiences designer share their, Over ten years of professional experiences designer share their, Over ten years of professional experiences designer share their personal skills and method.",
    time: "2021-May-22",
  },
  {
    id: 3,
    image: newsImg3,
    title: "News from BBC",
    text: "Over ten years of professional experiences designer share their, Over ten years of professional experiences designer share their personal skills and method.",
    time: "2021-May-22",
  },
  {
    id: 4,
    image: newsImg2,
    title: "News from BBC",
    text: "Over ten years of professional experiences designer share their, Over ten years of professional experiences designer share their personal skills and method.",
    time: "2021-May-22",
  },
  {
    id: 5,
    image: newsImg1,
    title: "News from BBC",
    text: "Designer share their personal skills and method.",
    time: "2021-May-22",
  },
  {
    id: 4,
    image: newsImg2,
    title: "News from BBC",
    text: "Over ten years of professional experiences designer share their, Over ten years of professional experiences designer share their personal skills and method.",
    time: "2021-May-22",
  },
  {
    id: 5,
    image: newsImg1,
    title: "News from BBC",
    text: "Designer share their personal skills and method.",
    time: "2021-May-22",
  },
  {
    id: 4,
    image: newsImg2,
    title: "News from BBC",
    text: "Over ten years of professional experiences designer share their, Over ten years of professional experiences designer share their personal skills and method.",
    time: "2021-May-22",
  },
  {
    id: 5,
    image: newsImg1,
    title: "News from BBC",
    text: "Designer share their personal skills and method.",
    time: "2021-May-22",
  },
  {
    id: 4,
    image: newsImg2,
    title: "News from BBC",
    text: "Over ten years of professional experiences designer share their, Over ten years of professional experiences designer share their personal skills and method.",
    time: "2021-May-22",
  },
  {
    id: 5,
    image: newsImg1,
    title: "News from BBC",
    text: "Designer share their personal skills and method.",
    time: "2021-May-22",
  },
];

const filterData = [
  // {
  //   icon: (
  //     <TagsOutlined
  //       style={{
  //         color: "#3DAFBE",
  //       }}
  //     />
  //   ),
  //   header: "CourseType",
  //   children: [
  //     {
  //       name: "All",
  //     },
  //     {
  //       name: "Single Course",
  //     },
  //     {
  //       name: "Package Course",
  //     },
  //   ],
  // },
  // {
  //   icon: (
  //     <ProfileOutlined
  //       style={{
  //         color: "#3DAFBE",
  //       }}
  //     />
  //   ),
  //   header: "Location",
  //   children: [
  //     {
  //       name: "online",
  //     },
  //     {
  //       name: "offline",
  //     },
  //   ],
  // },
  {
    icon: (
      <CarryOutOutlined
        style={{
          color: "#3DAFBE",
        }}
      />
    ),
    value: "Category",
    children: [
      {
        value: "Past Event",
      },
      {
        value: "Upcoming Event",
      },
    ],
  },
];

const sortData = [
  {
    name: "new",
    value: "Newest to Oldest",
  },
  {
    name: "old",
    value: "Oldest to Newest",
  },
];

const Event = () => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [startValue, setStartValue] = useState(0);
  const [endValue, setEndValue] = useState(6);
  const [filterParam, setFilterParam] = useState([]);
  const [sortParam, setSortParam] = useState(["Default"]);
  const [searchParam, setSearchParam] = useState();
  const [localData, setLocalData] = useState();

  const eventListData = useSelector((state) => state.eventData.eventListData);
  useEffect(() => {
    dispatch(getAllEvents());
  }, [dispatch]);

  useEffect(() => {
    if (eventListData) {
      setLocalData(eventListData);
    }
  }, [eventListData]);

  //根据sort， search，filter处理数据
  useEffect(() => {
    const handleSearch = () => {
      if(!eventListData){
        return
      }
      let searchedList = eventListData;
      // 处理filter
      if (filterParam.length > 0) {
        searchedList = searchedList.filter(
          (c) => c[filterParam[0]] === filterParam[1]
        );
      }
      if(searchedList.length>0){
        //处理sort
        searchedList = searchedList.sort((a, b) =>
                sortParam[1]
                  ? a[sortParam[0]] - b[sortParam[0]]
                  : b[sortParam[0]] - a[sortParam[0]]
              );
        console.log("after sort",searchedList);

        // 处理search
        if (searchParam) {
          searchedList = searchedList?.filter((course) =>
            ["EventName"].some((key) =>
              course[key].toLowerCase().includes(searchParam)
            )
          );
        }
      }
        setLocalData(searchedList);

        setStartValue(0);
        setEndValue(15);
        setCurrentPage(1);
    };
    handleSearch();
  }, [searchParam, sortParam,filterParam]);

  const handleApply = () => {
    // 处理filter
    let result = eventListData.filter(
      (c) => c[filterParam[0]] === filterParam[1]
    );
    console.log(1, filterParam);
    console.log(2, result);

    // 处理sort
    if (result.length > 0) {
      result =
        sortParam[0] === "Default"
          ? result
          : result.sort((a, b) =>
              sortParam[1]
                ? a[sortParam[0]] - b[sortParam[0]]
                : b[sortParam[0]] - a[sortParam[0]]
            );

      // 处理search
      if (searchParam) {
        result = result?.filter((course) =>
          ["CourseTitle", "AuthorName"].some((key) =>
            course[key].toLowerCase().includes(searchParam)
          )
        );
      }
    }

    setLocalData(result);

    setStartValue(0);
    setEndValue(15);
    setCurrentPage(1);
  };

  const handleReset = () => {
    let searchedList;
    //处理sort
    searchedList =
      sortParam[0] === "Default"
        ? eventListData
        : [...eventListData].sort((a, b) =>
            sortParam[1]
              ? a[sortParam[0]] - b[sortParam[0]]
              : b[sortParam[0]] - a[sortParam[0]]
          );

    //处理search
    if (searchParam) {
      searchedList = searchedList?.filter((course) =>
        ["CourseTitle", "AuthorName"].some((key) =>
          course[key].toLowerCase().includes(searchParam)
        )
      );
    }
    setLocalData(searchedList);

    setStartValue(0);
    setEndValue(15);
    setCurrentPage(1);
  };

  const handlePageChange = (value) => {
    setStartValue((value - 1) * 6);
    setEndValue(value * 6);
    setCurrentPage(value);
  };

  if (!eventListData) {
    return <RouterLoading />;
  }

  return (
    <div className="d-flex justify-content-center ">
      <div className="content-container w-80">
        <PageHeader data={breadcrumb} />

        {/* <div className="d-flex"> */}
        <Row>
          <Col xs={24} lg={5} className="mr-4 mb-4">
            <Filter
              data={filterData}
              reduxData={eventListData}
              setLocalData={setLocalData}
              setFilterParam={setFilterParam}
              handleApply={handleApply}
              handleReset={handleReset}
            />
          </Col>

          <Col xs={24} lg={18}>
            <Row>
              <Col
                span={12}
                className="mb-4 d-flex align-items-center justify-content-center"
              >
                <Sort
                  className="align-self-center"
                  data={sortData}
                  setSortParam={setSortParam}
                />
              </Col>

              <Col
                span={12}
                className="mb-4 d-flex align-items-center justify-content-center"
              >
                <Search setSearchParam={setSearchParam} />
              </Col>

              <div>
                {localData?.slice(startValue, endValue).map((item, index) => {
                  return (
                    <div key={index} className="pr-3 pb-3">
                      <Card data={item} />
                    </div>
                  );
                })}
              </div>

              <Col
                span={24}
                className="mt-5 mb-50 d-flex justify-content-center align-items-center"
              >
                {/* <Pagination
                  onChange={handlePageChange}
                  current={currentPage}
                  defaultPageSize={6}
                  total={events.length}
                /> */}
              </Col>
            </Row>
          </Col>
        </Row>
        {/* </div> */}
      </div>
    </div>
  );
};

export default Event;
