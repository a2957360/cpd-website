import React from 'react';
//components
import { Select } from 'antd';

const SimpleFilter = (props) => {
  const { data, current, setCurrent } = props;

  const handleChange = (value, option) => {
    setCurrent(value);
  };

  return (
    <div className='hide-on-pc'>
      <Select value={current} style={{ width: 120 }} onChange={handleChange}>
        {data?.map((tab) => (
          <Select.Option key={tab.key} value={tab.key}>
            {tab.title}
          </Select.Option>
        ))}
      </Select>
    </div>
  );
};

export default SimpleFilter;
