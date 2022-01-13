import React, { useEffect, useState } from "react";

//redux
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs } from "../../redux/actions";

//packages
import { Row, Col, Pagination } from "antd";
import {
  TagsOutlined,
  ProfileOutlined,
  CarryOutOutlined,
} from "@ant-design/icons";
import moment from "moment";

//components
import PageHeader from "../../components/PageHeader";
import Filter from "../../components/Filter";
import Sort from "../../components/Sort";
import Search from "../../components/Search";
import Card from "../../components/Card/BlogCard";

//fake img
import newsImg1 from "../../assets/img/img-news-1.png";
import newsImg2 from "../../assets/img/img-news-2.png";
import newsImg3 from "../../assets/img/img-news-3.png";

const breadcrumb = [
  {
    title: "Blog",
    path: "/blog",
  },
];


const filterData = [
  {
    icon: (
      <TagsOutlined
        style={{
          color: "#3DAFBE",
        }}
      />
    ),
    value: "BlogCategory",
    children: [
      {
        value: "Newsletter",
      },
      {
        value: "Technology",
      },
      {
        value: "Featured Instructor",
      },
      {
        value: "About Us",
      },
    ],
  },
  // {
  //   icon: (
  //     <CarryOutOutlined
  //       style={{
  //         color: "#3DAFBE",
  //       }}
  //     />
  //   ),
  //   value: "Time",
  //   children: [
  //     {
  //       value: "Old",
  //     },
  //     {
  //       value: "New",
  //     },
  //   ],
  // },
];

const sortData = [
  {
    key: 1,
    name: "Default",
    value: "Most Relevant",
  },
  {
    key: 2,
    name: "BlogUploadedDate",
    value: "New to Old",
  },
  {
    key: 3,
    name: "BlogUploadedDate",
    value: "Old to New",
  },
];

const List = () => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [startValue, setStartValue] = useState(0);
  const [endValue, setEndValue] = useState(6);

  const [sortParam, setSortParam] = useState(["Default"]);
  const [searchParam, setSearchParam] = useState();

  const [localBlogList, setLocalBlogList] = useState();

  const blogListData = useSelector((state) => state.blogData.blogListData);

  useEffect(() => {
    dispatch(getAllBlogs());
  }, [dispatch]);

  useEffect(() => {
    if (blogListData) {
      setLocalBlogList(blogListData);
    }
  }, [blogListData]);

  const [filterParam, setFilterParam] = useState([]);

  //根据sort， search，filter处理数据
  useEffect(() => {
    const handleSearch = () => {
      let searchedList;
      if (filterParam.length > 0) {
        searchedList = blogListData.filter((c) => c[filterParam[0]] === filterParam[1]);
      }
  
      //处理sort
      if (sortParam[0] === "Default") {
        searchedList = searchedList;
      } else if (sortParam[0] === "BlogUploadedDate") {
        searchedList = [...searchedList].sort((a, b) =>
          sortParam[1]
            ? moment(a[sortParam[0]]) - moment(b[sortParam[0]])
            : moment(b[sortParam[0]]) - moment(a[sortParam[0]])
        );
      }

      //处理search
      if (searchParam) {
        searchedList = searchedList?.filter((blog) =>
          ["BlogName"].some((key) =>
            blog[key].toLowerCase().includes(searchParam)
          )
        );
      }

      setLocalBlogList(searchedList);

      setStartValue(0);
      setEndValue(6);
      setCurrentPage(1);
    };

    handleSearch();
  }, [searchParam, sortParam,filterParam]);

  if (localBlogList === undefined) {
    return null;
  }

  const handlePageChange = (value) => {
    setStartValue((value - 1) * 6);
    setEndValue(value * 6);
    setCurrentPage(value);
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="content-container w-80">
        <PageHeader data={breadcrumb} />

        <div className="d-flex">
          <Row className="w-100">
            <Col xs={24} lg={5} className="mr-4 mb-4">
              <Filter data={filterData} setFilterParam={setFilterParam}/>
            </Col>

            <Col xs={24} lg={18}>
              <Row>
                <Col
                  span={12}
                  className="mb-4 d-flex  align-items-center justify-content-center"
                >
                  <Sort data={sortData} setSortParam={setSortParam} />
                </Col>

                <Col
                  span={12}
                  className="mb-4 d-flex align-items-center justify-content-center"
                >
                  <Search setSearchParam={setSearchParam} />
                </Col>

                {localBlogList
                  .slice(startValue, endValue)
                  .map((item, index) => {
                    return (
                      <Col key={index} md={12} lg={8} className="pr-3 pb-3">
                        <Card data={item} />
                      </Col>
                    );
                  })}

                <Col
                  span={24}
                  className="mt-5 mb-50 d-flex justify-content-center align-items-center"
                >
                  <Pagination
                    onChange={handlePageChange}
                    current={currentPage}
                    defaultPageSize={6}
                    total={blogListData.length}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default List;
