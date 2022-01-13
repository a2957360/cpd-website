import React from "react";
import { Rate, Form, Button, Input } from "antd";

const ReviewForm = ({ type, targetId }) => {
  const handleSubmit = (values) => {
    console.log("Success:", values);
  };

  return (
    <div className='section-card border-radius-8 bg-white mt-50 mb-50'>
      <div className='d-flex align-items-center justify-content-between mx-5'>
        <div className='color-dark-grey-3 fs-20 mt-5 mb-3'>
          Write Your Review
        </div>

        <Rate className='fs-20 mr-3' allowHalf defaultValue={0} />
      </div>

      <div className='rectangle rectangle--light rectangle--small card-rectangle' />

      <Form
        name={`${type}_reviewForm`}
        initialValues={{ remember: true }}
        onFinish={handleSubmit}
      >

        <Form.Item className='w-50 mx-5 mt-4' name='alias' rules={[{ required: true }]}>
          <Input
            className='text-input text-input--white px-4 py-3'
            placeholder='Enter the name you would like to show as the reviewer~'
          />
        </Form.Item>


        <Form.Item className='mx-5' name='content' rules={[{ required: true }]}>
          <Input.TextArea
            rows={4}
            className='text-input text-input--white px-4 py-3'
            placeholder='Leave a review that helps others know more about this course'
            mul
          />
        </Form.Item>
      </Form>

      <div className='d-flex align-items-center justify-content-center mb-5'>
        <div
          role='button'
          className='pl-30 pr-30 rounded-pill button button--light-hover-dark'
          onClick={() => console.log("submit reviuew")}
        >
          <span className='fs-14'>Submit Review</span>
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;
