import React, { useState } from 'react';
//package
import axios from 'axios';
import { useHistory } from 'react-router-dom';
//components
import { Form, Input, Button, Checkbox, message } from 'antd';
//redux
import { getInstructorInfo } from '../../redux/actions';
//statics
import { baseURL } from '../../configs/AppConfig';
import congratIcon from '../../assets/img/img-congratulations.png';

const InstructorForm = () => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const userId = localStorage.getItem('CPDUserID');
  const history = useHistory();

  const handleSubmit = async (values) => {
    setLoading(true);
    if (!userId) {
      message.error('Please login first');
      setLoading(false);
      return;
    }
    const verifyResult = await axios.get(
      `${baseURL}GetInstructorInfoById/${userId}`
    ); //InstructorId
    if (verifyResult.status === 200) {
      message.error('You are already an instructor');
      setLoading(false);
      return;
    }
    if (verifyResult.status === 500) {
      const { status } = await axios.post(
        `${baseURL}RegisterForInstructor`,
        values
      );
      if (status === 200) {
        setSubmitted(true);
        setLoading(false);
      }
    }
  };

  return (
    <div className='w-100 py-5'>
      {submitted ? (
        <div className='w-60 mx-auto'>
          <p className='text-center fs-20 color-dark-grey-2'>
            Congratulations!
          </p>
          <p className='text-center fs-16 color-dark-grey-1'>
            Thank your for your interest in becoming an instructor Our principle
            will get in touch with you shortly
          </p>
          <div className='w-40 mx-auto my-5'>
            <img src={congratIcon} alt='CPD Ace' className='w-100' />
          </div>
          <Button
            type='text'
            className='rounded-pill button button--light-hover-dark button--animated pt-8 pb-8 mb-3 mt-50 mx-auto w-30'
            onClick={() => history.push('/')}
          >
            <span className='fs-14 color-white'>Return Home</span>
          </Button>
        </div>
      ) : (
        <div className='w-40 mx-auto'>
          <p className='text-center fs-20 color-dark-grey-2'>
            Instructor Application Form
          </p>
          <Form
            name='instructorApplication'
            layout='vertical'
            onFinish={handleSubmit}
          >
            <Form.Item
              name='FirstName'
              rules={[
                { required: true, message: 'Please input your first name!' },
              ]}
            >
              <Input placeholder='First Name' className='border-radius-23' />
            </Form.Item>
            <Form.Item
              name='LastName'
              className='mr-0'
              rules={[
                { required: true, message: 'Please input your last name!' },
              ]}
            >
              <Input placeholder='Last Name' className='border-radius-23' />
            </Form.Item>
            <Form.Item
              name='EmailId'
              rules={[
                { required: true, message: 'Please input your email' },
                { type: 'email', message: 'This is not a valid email address' },
              ]}
            >
              <Input
                placeholder='example@example.com'
                className='border-radius-23'
              />
            </Form.Item>
            <Form.Item
              name='Biography'
              rules={[
                { required: true, message: 'Please provide your biography' },
              ]}
            >
              <Input.TextArea
                placeholder='Biography'
                className='border-radius-8'
              />
            </Form.Item>

            <Form.Item
              name='policyRead'
              valuePropName='checked'
              rules={[
                {
                  required: true,
                  message:
                    'Please read and agree to our Terms of Use and Privacy Policy to register',
                },
              ]}
            >
              <Checkbox>
                I have read and agreed to the{' '}
                <span
                  role='button'
                  onClick={() =>
                    window.open(
                      '/Terms.html',
                      'CPD Ace Terms of use',
                      'height=640,width=960,toolbar=no,menubar=no,scrollbars=no,location=no,status=no'
                    )
                  }
                  className='color-light-theme'
                >
                  Terms of Use
                </span>{' '}
                and{' '}
                <span
                  role='button'
                  onClick={() =>
                    window.open(
                      '/Privacy.html',
                      'CPD Ace Privacy Policy',
                      'height=640,width=960,toolbar=no,menubar=no,scrollbars=no,location=no,status=no'
                    )
                  }
                  className='color-light-theme'
                >
                  Privacy Policy
                </span>
                .
              </Checkbox>
            </Form.Item>

            <Form.Item labelCol={0} wrapperCol={{ offset: 8, span: 8 }}>
              <Button
                type='text'
                htmlType='submit'
                loading={loading}
                //   disabled={!userId}
                className='rounded-pill button button--light-hover-dark button--animated pt-8 pb-8 mb-3 mt-5 '
              >
                <span className='fs-14 color-white'>Submit</span>
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
    </div>
  );
};

export default InstructorForm;
