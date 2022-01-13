import React, { useState } from "react";

import { Select } from "antd";

const { Option } = Select;

//object
//sortLookUp object key should be the sortData element[value],
//sortLookUp object value index 0 should be the sortData element[name], which is the property backend return,
//sortLookUp object value index 1, false means high to low, true means low to high,
//["Default"] return the default of the data fetched from api
const sortLookup = {
  "Most Relevant": ["CustomSortOrder",true],
  "Most Popular": ["Rating", false],
  "Price: Low to High": ["CoursePrice", true],
  "Price: High to Low": ["CoursePrice", false],
  "New to Old": ["BlogUploadedDate", false],
  "Old to New": ["BlogUploadedDate", true],
  "Newest to Oldest": ["EventId", false],
  "Oldest to Newest": ["EventId", true],
};

//components
const Sort = ({ data, setSortParam, sort }) => {
  const handleChange = (value) => {
    setSortParam(sortLookup[value]);
  };

  return (
    <div className="d-flex justfiy-content-center align-items-center w-100">
      <span className="color-light-grey-3 fs-16 pr-3 ml-20">Sort by</span>

      <Select
        className="w-60 color-light-grey-3 fs-16"
        defaultValue={sort ? sort : data[0]["value"]}
        options={data}
        onChange={handleChange}
      >
        {data.map((item, index) => {
          <Option value={item.value} index={index}>
            {item.value}
          </Option>;
        })}
      </Select>
    </div>
  );
};

export default Sort;
