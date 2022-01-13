import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
//components
import LoadingSpinner from '../../components/LoadingSpinner';
import PageHeader from '../../components/PageHeader';
import { Row, Input, Button, Form, message } from 'antd';

const ResetPassword = () => {
  const query = new URLSearchParams(window.location.search);
  const token = query.get('token');
  const history = useHistory();
  const breadCrumb = [{ title: 'Reset Password', path: '#' }];

  const handlePasswordReset = async (values) => {
    console.log('password reset', values);
  };

  useEffect(() => {
    if (!token) {
      message.error('Invalid URL. Returning to Home page');
      setTimeout(() => history.replace('/'), 2000);
    }
  }, [token]);

  if (!token) {
    return (
      <div className='w-70 vh-60 m-auto'>
        <PageHeader data={breadCrumb} />
        <LoadingSpinner />
      </div>
    );
  } else {
    return (
      <div className='w-80 vh-80 m-auto'>
        <PageHeader data={breadCrumb} />
        <p className='text-center fs-20 color-dark-grey-2'>Reset Password</p>
        <p className='w-50 mx-auto text-center fs-16 color-dark-grey-1'>
          Please reset the password follows the instructions. <br /> Please make
          your password easy to remember
        </p>
        <div className='w-30 mx-auto my-5'>
          <Form
            layout='vertical'
            name='resetPasswordForm'
            onFinish={handlePasswordReset}
            // initialValues={{ modifier: "public" }}
          >
            <Form.Item
              name='email'
              rules={[
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please enter your email!',
                },
              ]}
            >
              <Input
                placeholder='example@example.com'
                className='border-radius-23'
              />
            </Form.Item>
            <Form.Item
              name='password'
              rules={[
                {
                  required: true,
                  message: 'Please enter your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (value.length <= 20 && value.length >= 8) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        'Password has to be between 8 and 20 characters'
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                placeholder='Your new password'
                className='border-radius-23'
                maxLength={20}
              />
            </Form.Item>

            <Form.Item
              name='confirmPassword'
              rules={[
                {
                  required: true,
                  message: 'Please enter your new password again!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
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
                placeholder='Confirm your new password'
                className='border-radius-23'
                maxLength={20}
              />
            </Form.Item>

            <Form.Item labelCol={0} wrapperCol={{ offset: 8, span: 8 }}>
              <Button
                type='text'
                htmlType='submit'
                className='rounded-pill button button--light-hover-dark button--animated pt-8 pb-8 mb-3 mt-5 '
              >
                <span className='fs-14 color-white'>Reset Password</span>
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
};

export default ResetPassword;
