import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const LoadingSpinner = () => {
  const Icon = <LoadingOutlined style={{ fontSize: 65 }} spin />;

  return (
    <div className='loading text-center d-flex align-items-center cover-content'>
      <Spin indicator={Icon} />
    </div>
  );
};

export default LoadingSpinner;
