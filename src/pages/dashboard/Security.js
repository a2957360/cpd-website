import React, { useState } from 'react';
//components
import DashboardWrapper from '../../components/Dashboard/DashboardWrapper';
import { Row, Form, Input, Button, message } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import {
  resetPassword,
} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Security = () => {
  const dispatch = useDispatch();
  const { userSettings,userInfo } = useSelector((state) => state.authData);
  const userId = localStorage.getItem('CPDUserID');

  const [pwdReset, setPwdReset] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handlePasswordUpdate = (values) => {
    values["id"]=userId;
    values["usertype"]="User";
    dispatch(resetPassword(values));
    message.success("Password Change Success!");
  };

  return (
    <DashboardWrapper>
      <div className='dashboard-content-wrapper'>
        <div className='mt-5 mb-3 mx-auto dashboard-security-wrapper'>
          <p className='color-dark-grey-2 fs-20 mb-5'>Change Password</p>
          <Form
            labelCol={{
              span: 5,
              offset: 0,
            }}
            wrapperCol={{
              span: 16,
              offset: 0,
            }}
            colon={false}
            labelAlign='left'
            // {...layout}
            // name='basic'
            initialValues={{ remember: true }}
            onFinish={handlePasswordUpdate}
            onFinishFailed={onFinishFailed}
          >
            {/* <Form.Item
              label='Current Password'
              name='currentPassword'
              rules={[
                {
                  required: true,
                  message: 'Please input your current password!',
                },
              ]}
            >
              <Input.Password
                placeholder='Enter your current password'
                className='dashboard-security-input'
                value={pwdReset.currentPassword}
                onChange={(e) =>
                  setPwdReset({ ...pwdReset, currentPassword: e.target.value })
                }
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item> */}

            <Form.Item
              label='New Password'
              name='newPassword'
              rules={[
                { required: true, message: 'Please input your new password!' },
              ]}
            >
              <Input.Password
                placeholder='Enter your new password'
                className='dashboard-security-input'
                value={pwdReset.newPassword}
                onChange={(e) =>
                  setPwdReset({ ...pwdReset, newPassword: e.target.value })
                }
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>

            <Form.Item
              label='Confirm New Password'
              name='confirmPassword'
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('newPassword') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        'The two passwords that you entered do not match!'
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                placeholder='Enter your new password again'
                className='dashboard-security-input'
                value={pwdReset.newPassword}
                onChange={(e) =>
                  setPwdReset({ ...pwdReset, newPassword: e.target.value })
                }
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>

            <Form.Item labelCol={0} wrapperCol={{ offset: 0, span: 8 }}>
              <Button
                type='text'
                htmlType='submit'
                className='rounded-pill button button--light-hover-dark button--animated pt-8 pb-8 mb-3'
                // onClick={handlePasswordUpdate}
              >
                <span className='fs-14 color-white'>Save Changes</span>
              </Button>
            </Form.Item>
          </Form>

          {/* Old */}
          {/* <Row align='middle' justify='space-between' className='mt-5 w-60'>
            <p className='mb-1 mr-3 fs-16 color-dark-grey-1'>
              Current Password
            </p>
            <Input.Password
              placeholder='Enter your current password'
              className='w-60'
              value={pwdReset.currentPassword}
              onChange={(e) =>
                setPwdReset({ ...pwdReset, currentPassword: e.target.value })
              }
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Row>
          <Row align='middle' justify='space-between' className='mt-5 w-60'>
            <p className='mb-1 mr-3 fs-16 color-dark-grey-1'>New Password</p>
            <Input.Password
              placeholder='Enter your new password'
              className='w-60'
              value={pwdReset.currentPassword}
              onChange={(e) =>
                setPwdReset({ ...pwdReset, newPassword: e.target.value })
              }
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Row>
          <Row align='middle' justify='space-between' className='mt-5 w-60'>
            <p className='mb-1 mr-3 fs-16 color-dark-grey-1'>
              Confirm New Password
            </p>
            <Input.Password
              placeholder='Enter your new password again'
              className='w-60'
              value={pwdReset.currentPassword}
              onChange={(e) =>
                setPwdReset({ ...pwdReset, confirmNewPassword: e.target.value })
              }
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Row>

          <Row className='mt-5'>
            <div
              role='button'
              className='rounded-pill button button--light-hover-dark button--animated pt-8 pb-8 mb-3'
            >
              <span className='fs-14'>Save Changes</span>
            </div>
          </Row> */}
        </div>
      </div>
    </DashboardWrapper>
  );
};

export default Security;
