import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const Icon = <LoadingOutlined style={{ fontSize: 35 }} spin />

const RouterLoading = () => {
  return (
    <div className={'loading text-center cover-content'}>
      <Spin indicator={Icon} />
    </div>
  )
}

export default RouterLoading