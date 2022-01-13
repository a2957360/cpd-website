import React from "react";

import { SearchOutlined } from "@ant-design/icons";

import { Input } from "antd";

//components
const Search = ({ setSearchParam, search }) => {
  return (
    <div className="d-flex justfiy-content-center align-items-center text-input text-input--grey text-input--width-25 rounded-pill">
      <Input
        placeholder="Search"
        className="ml-2 text-input text-input--grey rounded-pill fs-16"
        defaultValue={search ? search.toLowerCase() : null}
        onChange={(e) => {
          setSearchParam(e.target.value.toLowerCase());
        }}
      />

      <SearchOutlined className="mr-3 fs-20" />
    </div>
  );
};

export default Search;
