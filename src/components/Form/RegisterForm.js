import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

//redux
import { useDispatch, useSelector } from 'react-redux';
import { createNewUser, resetMessage } from '../../redux/actions/user';

//packages
import { Form, Input, Button } from 'antd';

export default function RegisterForm() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [buttonLoading, setButtonLoading] = useState(false)

  const registerMessage = useSelector(state => state.userData.registerMessage);

  useEffect(() => {
    async function goToTasks() {
      await dispatch(resetMessage());
      await history.push('/task');
    }

    async function alertFailure() {
      await setButtonLoading(false);
      await dispatch(resetMessage());
      alert('Register Fail!')
    }

    switch (registerMessage) {
    case 'success':
      goToTasks()
      break;
    case 'fail':
      alertFailure()
      break;
    default:
      break;
    }
  }, [dispatch, registerMessage, history])

  const signUp = async (data) => {
    await setButtonLoading(true);
    await dispatch(createNewUser(data));
  };

  return (
    <Form
      layout="vertical"
      name="basic"
      initialValues={{ remember: true }}
      onFinish={signUp}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: 'Please input your name!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        initialValue="tony@fs.com"
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        initialValue="tony123"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <div className="text-center">
        <p>Already have an account? <a href="/login">Login</a></p>
      </div>

      <Form.Item >
        <Button
          className='w-100'
          type="primary"
          htmlType="submit"
          loading={buttonLoading}
        >
          {buttonLoading ? null : 'Submit'}
        </Button>
      </Form.Item>
    </Form>
  );
}