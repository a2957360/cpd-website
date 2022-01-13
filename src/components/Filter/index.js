import React, { useState, useEffect } from "react";

import { Collapse } from "antd";
import { PlusOutlined, TagsOutlined, MinusOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

const { Panel } = Collapse;

//components
const Filter = (props) => {
  const {
    data,
    reduxData,
    setLocalData,
    setFilterParam,
    handleApply,
    handleReset,
    selectParam,
    paramParent
  } = props;
  // console.log(props.paramParent);
  // console.log(selectParam)
  const filterLookup = {
    //course
    "Course Type": "CourseType",
    Topic: "SubCategoryName",
    Level: "Skilllevel",
    Price: "CoursePrice",

    // Feature
    Rating: "Rating",
    Duration: "CourseDuration",
    //event
    Location: "EventType",
    Category: "EventStatus",
    //blog
    BlogCategory: "BlogCategory",
    Time: "BlogCategory",
  };
  const [defaultActiveKey, setDefaultActiveKey] = useState(selectParam ? ["Topic", selectParam, paramParent ?? ''] : ["Course Type"]);
  const [clickStyle, setClickStyle] = useState(selectParam ?? '');
  // 筛选与当前选中一样的展开
  // const keys = [];
  // const formatTreeSelectData = (data) => {
  //   for (let i = 0; i < data.length; i++) {
  //     const item = data[i];
  //     if (item.children) {
  //       item.children = formatTreeSelectData(item.children);
  //     }
  //     if(item.value === selectParam) keys.push(item.value);
  //   }
  //   console.log(keys);
  //   return keys;
  // }
  // useEffect(() => {
  //   setDefaultActiveKey(formatTreeSelectData(data));
  // },[]);
  // console.log(defaultActiveKey)
  // const keyList = [...treeDataLoop(data)];
  // console.log(keyList);
  // useEffect(() => {
  //   const key = [];
  //   treeDataLoop()
  // }, [data, selectParam]);
  // console.log(defaultActiveKey)
  const renderTopic = (topicData) => {
    return (
      <div className="bg-light-grey-1 py-2 ">
        {topicData.map((item, index) => {
          return (
            <Collapse
              key={item.value}
              ghost
              bordered={false}
              defaultActiveKey={defaultActiveKey}
              expandIcon={({ isActive }) =>
                !isActive ? (
                  <PlusOutlined
                    style={{
                      color: "black",
                    }}
                  />
                ) : (
                  <MinusOutlined
                    style={{
                      color: "black",
                    }}
                  />
                )
              }
              className="align-items-center justify-content-center py-2"
            >
              <Panel
                header={
                  <div className="fs-16 color-light-theme color-light-grey-2 display-inline">
                    {item.value}
                  </div>
                }
                activeKey={index}
                key={item.value}
                style={{ backgroundColor: item.value === clickStyle ? '#2f799a' : '' }}
              >
                <div className="w-100 bg-light-grey-1 ">
                  {item.children.map((e, index) => {
                    return (
                      <div
                        onClick={() => handleClick("Topic", e.value)}
                        className={e.value === selectParam ? "ant-collapse-item-active mouse-click ml-55 fs-16 color-light-grey-2 py-2 d-flex align-items-start filter-option-wrapper" : "mouse-click ml-55 fs-16 color-light-grey-2 py-2 d-flex align-items-start filter-option-wrapper"}
                        key={e.value}
                        style={{ backgroundColor: e.value === clickStyle ? '#2f799a' : '' }}

                      >
                        <span className="filter-option-text">-{e.value}</span>
                      </div>
                    );
                  })}
                </div>
              </Panel>
            </Collapse>
          );
        })}
      </div>
    );
  };

  const handleClick = (type, name, index) => {
    setClickStyle(name);
    if (type === "Location") {
      const res = reduxData.filter((e) => e.EventType === name);
      setLocalData(res);
      setFilterParam([filterLookup[type], name]);
    } else if (type === "Rating") {
      setFilterParam([filterLookup[type], index]);
    } else if (type === "Course Type") {
      const courseTypeNum = name === "All" ? -1 : name === "Single Course" ? 0 : 1;
      setFilterParam([filterLookup[type], courseTypeNum]);
    } else {
      setFilterParam([filterLookup[type], name]);
    }
  };

  useEffect(() => {
    if (paramParent === "Course Type") {
      console.log(selectParam);
      const courseTypeNum = selectParam === "All" ? -1 : selectParam === "Single Course" ? 0 : 1;
      setFilterParam([filterLookup[paramParent], courseTypeNum]);
    } else {
      if (selectParam) {
        setFilterParam(["CategoryName", selectParam]);
      }
    }
  }, []);

  return (
    <div
      className="bg-white py-4 border-radius-4 shadow-1  "
      style={{ width: 250 }}
    >

      <div className="d-flex justify-content-between px-4">
        <span className="fs-20 color-dark-grey-2 ml-4">Filter</span>
        {/* {defaultActiveKey.length >0 &&<div
            role="button"
            className="rounded-pill button button--light-hover-dark pt-10 pb-10 pl-25 pr-25"
          >
            <div onClick={() => handleApply()} className="fs-14">
              Apply
            </div>
          </div>
        } */}
      </div>
      <Collapse
        ghost
        bordered={false}
        defaultActiveKey={defaultActiveKey}
        expandIcon={({ isActive }) => (
          <PlusOutlined
            style={{
              color: "#3DAFBE",
            }}
            rotate={isActive ? 45 : 0}
          />
        )}
        expandIconPosition="right"
        className="align-items-center justify-content-center py-2"
      >
        {data.map((item, index) => {
          return (
            <Panel
              header={
                <div className="d-flex align-items-center">
                  {item.icon}
                  <div className="fs-16 color-light-theme ml-2">
                    {item.value}
                  </div>
                </div>
              }
              key={item.value}
            >
              <div className="bg-light-grey-1 py-2">
                {item.value !== "Topic"
                  ? item.children.map((element, index) => {
                    return (
                      <div
                        key={element.value}
                        className="mouse-click fs-16 pl-35 pr-35 panel-container color-light-grey-2 py-1"
                        onClick={() => {
                          handleClick(item.value, element.value, index);
                        }}
                        style={{ backgroundColor: element.value === clickStyle ? '#2f799a' : '' }}
                      >
                        {element.value}
                      </div>
                    );
                  })
                  : renderTopic(item.children)}
              </div>
            </Panel>
          );
        })}
      </Collapse>

      {/* <div className="d-flex justify-content-between px-4 mt-5">
        <div
          role="button"
          className="rounded-pill button button--light-hover-dark pt-10 pb-10 pl-25 pr-25"
        >
          <div onClick={() => handleApply()} className="fs-14">
            Apply
          </div>
        </div>

        <div
          role="button"
          className="rounded-pill button button--light-hover-dark pt-10 pb-10 pl-25 pr-25"
        >
          <div onClick={() => {handleReset(); setClickStyle(''); setDefaultActiveKey(['Course Type'])}} className="fs-14">
            Reset
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Filter;
