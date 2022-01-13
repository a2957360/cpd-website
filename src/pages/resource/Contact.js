import React, { useEffect } from "react";

import { useHistory } from "react-router-dom";

//redux
import { useDispatch, useSelector } from "react-redux";
import { submitContact } from "../../redux/actions";

//todo, 为啥不能合并呢？？？
import { resetMessage } from "../../redux/actions/message"

import { Row, Col, Form, Input } from "antd";

//components
import PageHeader from "../../components/PageHeader"

const breadcrumb = [
  {
    title: "Contact Us",
    path: "/resource/contact-us"
  }
]

const Contact = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [form] = Form.useForm();

  const sendContactMessage = useSelector(state => state.resourceData.sendContactMessage)

  useEffect(() => {
    async function handleSuccess() {
      await dispatch(resetMessage())
      await history.push({
        pathname: "/resource/congratulations",
        state: {
          breadCrumb: [
            {
              title: "Congratulations"
            }
          ],
          title: "Thanks!",
          text: "Thank your for Contacting us We will get in touch with you shortly",
          btnText: "Return Back",
          btnPath: "/resource/contact-us"
        }
      })
    }

    if (sendContactMessage === "success") {
      handleSuccess();
    }
  }, [dispatch, sendContactMessage])

  const handleSubmit = () => {
    const values = form.getFieldsValue();
    dispatch(submitContact(values));
  };

  return (
    <div className='d-flex justify-content-center'>
      <div className='content-container'>
        <PageHeader data={breadcrumb} />

        <div className='d-flex justify-content-center'>
          <div className='d-flex justify-content-center align-items-center flex-column contact-form-container'>
            <span className='color-dark-grey-2 fs-22 pl-2 py-2'>Send a Message to us</span>

            <Form
              form={form}
              name="basic"
              initialValues={{ remember: true }}
              onFinish={handleSubmit}
            >
              <Row className="py-5">
                <Col span={12} className='pr-2'>
                  <Form.Item
                    name="FirstName"
                    rules={[{ required: true }]}
                  >
                    <Input
                      className="text-input text-input--white rounded-pill px-4 py-3"
                      placeholder="First Name"
                    />
                  </Form.Item>
                </Col>

                <Col span={12} className='pl-2'>
                  <Form.Item
                    name="LastName"
                    rules={[{ required: true }]}
                  >
                    <Input
                      className="text-input text-input--white rounded-pill px-4 py-3"
                      placeholder="Last Name"
                    />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    name="EmailId"
                    rules={[{ required: true }]}
                  >
                    <Input
                      className="text-input text-input--white rounded-pill px-4 py-3"
                      placeholder="Email Address"
                    />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    name="Subject"
                    rules={[{ required: true }]}
                  >
                    <Input
                      className="text-input text-input--white rounded-pill px-4 py-3"
                      placeholder="Subject"
                    />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    name="Message"
                    rules={[{ required: true }]}
                  >
                    <Input.TextArea
                      rows={4}
                      className="text-input text-input--white px-4 py-3 border-radius-16"
                      placeholder="Your message"
                      mul
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Form>

            <div
              role="button"
              className="mb-5 py-3 px-5 rounded-pill button button--light-hover-dark button--animated"
              onClick={() => handleSubmit()}
            >
              Submit
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


export default Contact;
