import React, { useState, useEffect } from "react";
//packages
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
//components
import { Row, Col, Input, Select, TreeSelect } from "antd";
import { SearchOutlined } from "@ant-design/icons";
//statics
import banner from "../../../assets/img/home/Home_Page_Banner.png";
//redux
import { getAllCatSubCategories } from "../../../redux/actions";

const sortByOptions = [
  { key: "1", value: "Most Relevant", title: "Most Relevant" },
  { key: "2", value: "Most Popular", title: "Most Popular" },
  { key: "3", value: "Price: Low to High", title: "Price: Low to High" },
  { key: "4", value: "Price: High to Low", title: "Price: High to Low" },
];

const HomeBanner = ({ homeBanner }) => {
  const domain = "/Image";

  const history = useHistory();
  const dispatch = useDispatch();
  const { categoryList } = useSelector((state) => state.courseData);

  const [categoryOptions, setCategoryOptions] = useState(null);
  const [courseParam, setcourseParam] = useState({
    sort: null,
    category: null,
    search: null,
    parentLabel: null
  });

  useEffect(() => {
    dispatch(getAllCatSubCategories());
  }, [dispatch]);

  useEffect(() => {
    initCategoryList();
  }, [categoryList]);

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
        label: mainCat,
        children: categoryList
          .filter((cat) => cat.CategoryName === mainCat)
          .map((subCat) => ({
            key: subCat.SubCategoryID,
            value: subCat.SubCategoryName,
          })),
      };
    });
    setCategoryOptions(options);
  };

  const handleClick = () => {
    history.push({
      pathname: "/course/list",
      // search: `?id=${CourseID}`,
      state: { courseParam: courseParam },
    });
  };

  const handleSearchChange = (e) => {
    console.log(e.target);
    setcourseParam((prev) => {
      return {
        ...prev,
        search: e.target.value.toLowerCase(),
      };
    });
  };

  const handleChange = (value, name, option) => {
    setcourseParam((prev) => {
      return {
        ...prev,
        [name]: value,
        parentLabel: option?.label
      };
    });
  };

  const handleToVideo = () => {
    // const width = document.documentElement.clientWidth;
    const offsetTop = document.getElementById('homeAboutVideo').offsetTop ;
    console.log(document.getElementById('homeAboutVideo').offsetTop );
    document.documentElement.scrollTop = offsetTop;
    
  }

  return (
    <div className="home-jumbotron-container">
      <div className="home-banner-overlay" />
      <img src={banner} alt="CPD Ace" className="home-jumbotron-image" />
      <div className="home-banner-content-container">
        <p className="text-center fw-900 w-60 home-banner-title">CPD ACE</p>
        <p className="text-center  home-banner-subtitle">
          THE BEST PLACE TO ACE YOUR CPA PDS
        </p>
        <p className="text-center fs-20 home-banner-description">
          We offer an extensive library of video courses for CPAs to build
          and main skills in accounting and finance, risk management, IT and
          development
        </p>
        {categoryOptions && (
          <Row
            justify="space-around"
            align="middle"
            className="home-banner-input-group mt-5"
          >
            <Input.Group compact bordered={false}>
              <Select
                onChange={(value, option) => {
                  handleChange(value, "sort", option);
                }}
                placeholder="Sort By"
                bordered={false}
                className="home-input-select border-right border-1"
              >
                {sortByOptions.map((opt) => (
                  <Select.Option key={opt.key} label={opt.value} value={opt.value}>
                    {opt.title}
                  </Select.Option>
                ))}
              </Select>
              <Select
                onChange={(value, option) => {
                  handleChange(value, "category", option);
                }}
                placeholder="Category"
                bordered={false}
                className="home-input-select"
              >
                {categoryOptions.map((opt) => (
                  <Select.OptGroup key={opt.key} label={opt.label}>
                    {opt.children.map((child) => (
                      <Select.Option key={child.key} label={opt.label} value={child.value}>
                        {child.value}
                      </Select.Option>
                    ))}
                  </Select.OptGroup>
                ))}
              </Select>
              <Input
                bordered={false}
                type="text"
                onChange={(e) => handleSearchChange(e)}
                className="home-search-input bg-white"
                placeholder="Enter your keyowrds"
                addonAfter={
                  <i
                    onClick={handleClick}
                    className="fas fa-search bg-white"
                  ></i>
                }
              />
            </Input.Group>
          </Row>
        )}
        <div
          role="button"
          className="rounded-pill button button--light-hover-dark button--animated pl-30 pr- mt-100 pt-10 pb-10"
          onClick={(e) => handleToVideo(e)}
        >
          Watch Tutorial 
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
