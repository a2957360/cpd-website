import React, { useState, useEffect } from 'react';
import { Rate, Form, Input, message } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { AddCourseReview } from "../../../redux/actions/course";
import { values } from 'lodash';
import { stringLiteralTypeAnnotation } from '@babel/types';

const ReviewForm = ({ data }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { courseReceview } = useSelector((state) => state.courseData);
  console.log(courseReceview)
  const [rate, setRate] = useState(5);
  const handleSubmit = (values) => {
    // console.log('Success:', values);
    let obj = { ...values };
    obj.UserId = localStorage.getItem("CPDUserID");
    obj.Rating = rate;
    let courseId = data.CourseID;
    // console.log(obj)
    form.resetFields();
    dispatch(AddCourseReview(courseId, obj));
    message.success("Add Receview success!");
  };

  const handleChange = (value) => {
    setRate(value)
  }

  return (
    < div className='section-card border-radius-8 bg-white mt-50' >
      <div className='d-flex align-items-center justify-content-between mx-5'>
        <div className='color-dark-grey-3 fs-20 mt-5 mb-3'>Write Your Review</div>

        <Rate
          className='fs-20 mr-3'
          defaultValue={5}
          allowHalf
          onChange={handleChange}
        />
      </div>

      <div className='rectangle rectangle--light rectangle--small card-rectangle' />

      <Form
        form={form}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={handleSubmit}
      >
        <div span={12} className='mx-5 mt-4'>
          <Form.Item
            name="ReviewTitle"
            // rules={[{ required: true }]}
          >
            <Input
              className="text-input text-input--white px-4 py-3"
              placeholder="Enter the name you would like to show as the reviewer~"
            />
          </Form.Item>
        </div>

        <div span={12} className='mx-5'>
          <Form.Item
            name="ReviewMessage"
            // rules={[{ required: true }]}
          >
            <Input.TextArea
              rows={4}
              className="text-input text-input--white px-4 py-3"
              placeholder="Leave a review that helps others know more about this course"
              mul
            />
          </Form.Item>
        </div>
        <div className="d-flex align-items-end justify-content-end pr-5 pb-5">
          <button
            role="button"
            className="pl-30 pr-30 pt-8 pb-8 rounded-pill button button--light-hover-dark"
            type="submit"
          // onClick={() => handleSubmit()}
          >
            Submit Course Review
          </button>
        </div>
      </Form>


    </div >
  )
}

export default ReviewForm;
