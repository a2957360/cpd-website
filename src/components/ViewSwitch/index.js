import React, { useState } from "react";

import { SearchOutlined } from "@ant-design/icons";

import { Input } from "antd";

import List from "../../assets/img/icon-view-list.png";
import Grid from "../../assets/img/icon-view-grid.png"

//components
const ViewSwitch = (props) => {
  const { setLayoutState } = props;

  const [state, setstate] = useState(0);

  const handleChangeState = () => {
    setstate(1 - state);
    setLayoutState(1 - state);
  }

  return (
    <div className="d-flex w-40 justfiy-content-center align-items-center w-100">
      <span className='color-light-grey-3 fs-16 mx-2'>View Method</span>

      <img
        onClick={() => handleChangeState()}
        src={state ? List : Grid}
        style={{ height: 24, width: 24, cursor: "pointer" }}
        alt="/"
      />
    </div>
  );
};

export default ViewSwitch;
