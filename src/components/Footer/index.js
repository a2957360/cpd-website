import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Row, Col, Input, Modal, Form, Button, message, Popover } from 'antd';
import axios from 'axios';
//statics
import { baseURL } from '../../configs/AppConfig';

const Footer = (props) => {
  const { history } = props;
  const [subscribeModal, setSubscribeModal] = useState(false);

  const footer_menu = [
    { key: 'Contact us', navigate: () => history.push('/resource/contact-us') },
    {
      key: 'Term of use',
      navigate: () =>
        window.open(
          '/Terms.html',
          'CPD Ace Terms of use',
          'height=640,width=960,toolbar=no,menubar=no,scrollbars=no,location=no,status=no'
        ),
    },
    {
      key: 'Privacy Policy and Cookie Policy',
      navigate: () =>
        window.open(
          '/Privacy.html',
          'CPD Ace Privacy Policy',
          'height=640,width=960,toolbar=no,menubar=no,scrollbars=no,location=no,status=no'
        ),
    },
  ];

  const onSubscribe = async (values) => {
    if (!values.email) {
      message.error('Please enter your email to subscribe');
      return;
    }
    const { status } = await axios.get(
      `${baseURL}SubScribeToNewsLetter?email=${values.email}`
    );
    if (status == 200) {
      setSubscribeModal(true);
    } else {
      message.error('Something went wrong, please try again later');
    }
  };

  const MobileFooterMenu = () => (
    <div>
      {footer_menu.map((item) => (
        <p key={item.id} role='button' onClick={item.navigate}>
          {item.key}
        </p>
      ))}
    </div>
  );

  return (
    <div className='footer-container pt-5 pb-3 w-100 bg-dark-theme'>
      <div className='color-white text-center'>
        <p className='fs-30 fw-bold'>Newsletter</p>
        <p className='fs-16 fw-light'>
          Subscribe to our newsletter for the latest course releases, updates,
          and more
        </p>
        <Row justify='center' className='w-100 py-8'>
          <div className='footer-form-container'>
            <Form
              layout='inline'
              name='subscriptionForm'
              onFinish={onSubscribe}
            >
              <Form.Item
                name='email'
                className='w-70'
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
                  // type='email'
                  placeholder='example@example.com'
                  className='border-radius-23 w-100'
                />
              </Form.Item>

              <Form.Item className='w-20'>
                <Button
                  type='text'
                  htmlType='submit'
                  className='rounded-pill button button--dark-hover-white border border-white button--animated pt-8 pb-8 mb-3 w-100'
                >
                  <span className='fs-14'>Subscribe</span>
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Row>
        <Row align='middle' className='w-100 pt-8'>
          <p className='w-50 mb-0 fs-14 text-center'>
          Copyright © 2021 CPDACE Inc.
          </p>
          <Row justify='end' className='w-50 fs-14 hide-on-mobile'>
            {footer_menu.map((item) => (
              <div
                key={item.key}
                className='footer-tab mr-5'
                onClick={item.navigate}
              >
                <span>
                  <span>
                    <span role='button' className='fw-light'>
                      {item.key}
                    </span>
                  </span>
                </span>
              </div>
            ))}
          </Row>
          <Row justify='end' className='w-50 fs-12 hide-on-pc'>
            <Popover
              content={MobileFooterMenu}
              placement='topRight'
              trigger='click'
              overlayClassName='mobile-footer-menu-wrapper'
            >
              <Button type='text' className='color-white'>
                <i className='fas fa-bars'> More Information</i>
              </Button>
            </Popover>
          </Row>
        </Row>
      </div>
      <Modal
        // title="Thanks for your subscription"
        centered
        visible={subscribeModal}
        footer={null}
        width='40vw'
        bodyStyle={{
          borderRadius: '8px',
        }}
        onCancel={() => setSubscribeModal(false)}
      >
        <Row justify='center' className='w-100 pb-3'>
          <span className='fs-30'>Thanks for your subscription</span>
        </Row>
        {/* <Row></Row> */}
        <p className='text-center px-3 fs-20 fw-light color-dark-grey-1'>
          Thanks for your subscription, you will get the powerful newsletter
          from our developer, the best designer and fiancees, lawyer, Here it
          some information let this label good looking
        </p>
        <Row justify='center' className='w-100 pt-3'>
          <div
            role='button'
            className='rounded-pill button button--light-hover-dark button--animated'
            onClick={() => setSubscribeModal(false)}
          >
            Return back
          </div>
        </Row>
      </Modal>
    </div>
  );
};

export default withRouter(Footer);
