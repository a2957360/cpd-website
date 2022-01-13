import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

//redux
import { useDispatch, useSelector } from "react-redux";
import { loginUser, resetMessage } from "../redux/actions/user";

//packages
import { Form, Input, Button } from "antd";

export default function LoginForm() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [buttonLoading, setButtonLoading] = useState(false);

  const loginMessage = useSelector((state) => state.userData.loginMessage);

  useEffect(() => {
    async function goToTasks() {
      await dispatch(resetMessage());
      await history.push("/task");
    }

    async function alertFailure() {
      await setButtonLoading(false);
      await dispatch(resetMessage());
      await alert("Login Fail!");
    }

    switch (loginMessage) {
      case "success":
        goToTasks();
        break;
      case "fail":
        alertFailure();
        break;
      default:
        break;
    }
  }, [dispatch, loginMessage, history]);

  const login = async (data) => {
    await setButtonLoading(true);
    await dispatch(loginUser(data));
  };

  return (
    <Form
      layout="vertical"
      name="basic"
      initialValues={{ remember: true }}
      onFinish={login}
    >
      <Form.Item
        label="Email"
        name="email"
        initialValue="tony@fs.com"
        rules={[{ required: true, message: "Please input your email!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        initialValue="tony123"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <div className="text-center">
        <p>
          Dont have an account yet? <a href="/register">Sign Up</a>
        </p>
      </div>

      <Form.Item>
        <Button
          className="w-100"
          type="primary"
          htmlType="submit"
          loading={buttonLoading}
        >
          {buttonLoading ? null : "Submit"}
        </Button>
      </Form.Item>
    </Form>
  );
}
