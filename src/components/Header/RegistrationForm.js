import React from "react";
import { useHistory } from "react-router-dom";
//components
import { Form, Input, Button, Checkbox, message } from "antd";
import axios from "axios";
//statics
import { secondBaseURL } from "../../configs/AppConfig";

const RegistrationForm = (props) => {
  const { setLoginModal } = props;
  const history = useHistory();

  const handleRegister = async (values) => {
    // const { data } = await axios.post(`${secondBaseURL}/Register`, {
    //   name: `${values.firstName} ${values.lastName}`,
    //   email: values.email,
    //   password: values.password,
    //   confirmpassword: values.confirmPassword,
    // });

    axios
      .post(secondBaseURL + "register", {
        Name: `${values.firstName} ${values.lastName}`,
        Email: values.email,
        Password: values.password,
        confirmpassword: values.confirmPassword,
        Location: "",
        mobilenumber: "undefined",
        url: "https://web.cpdace.live/home/dashboard",
      })
      .then((res) => {
        console.log("handle registration", res);

        if (res.data.token) {
          console.log("register succeeded", res.data.name);
          // localStorage.setItem("userId", data.id);
          localStorage.setItem("userToken", res.data.token);
          setLoginModal(false);
          // history.push("/auth/activate-account", {
          //   userMail: values.email,
          // });
          message.success("Thank you, you Successfully signup. Please check your email to active account!");
        } else {
          setLoginModal(false);
          message.error("Something went wrong, please try again later");
        }
      })
      .catch((error) => {
        // setLoginModal(false);
        message.error(error.response.data.Message);
      });
  };

  return (
    <div className="mt-5">
      <Form
        layout="vertical"
        name="registrationForm"
        onFinish={handleRegister}
        // initialValues={{ modifier: "public" }}
      >
        <Form.Item
          name="firstName"
          rules={[
            {
              required: true,
              message: "Please enter your first name!",
            },
          ]}
        >
          <Input
            type="text"
            placeholder="First Name"
            className="border-radius-23"
          />
        </Form.Item>
        <Form.Item
          name="lastName"
          rules={[
            {
              required: true,
              message: "Please enter your last name!",
            },
          ]}
        >
          <Input
            type="text"
            placeholder="Last Name"
            className="border-radius-23"
          />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please enter your email!",
            },
          ]}
        >
          <Input
            type="email"
            placeholder="example@example.com"
            className="border-radius-23"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please enter your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (value.length <= 20 && value.length >= 8) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Password has to be between 8 and 20 characters")
                );
              },
            }),
          ]}
        >
          <Input.Password
            placeholder="Your password"
            className="border-radius-23"
            maxLength={20}
          />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: "Please enter your password again!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password
            placeholder="Confirm your password"
            className="border-radius-23"
            maxLength={20}
          />
        </Form.Item>
        <Form.Item
          name="policyRead"
          valuePropName="checked"
          rules={[
            {
              required: true,
              message:
                "Please read and agree to our Terms of Use and Privacy Policy to register",
            },
          ]}
        >
          <Checkbox>
            I have read and agreed to the{" "}
            <span
              role="button"
              onClick={() =>
                window.open(
                  "/Terms.html",
                  "CPD Ace Terms of use",
                  "height=640,width=960,toolbar=no,menubar=no,scrollbars=no,location=no,status=no"
                )
              }
              className="color-light-theme"
            >
              Terms of Use
            </span>{" "}
            and{" "}
            <span
              role="button"
              onClick={() =>
                window.open(
                  "/Privacy.html",
                  "CPD Ace Privacy Policy",
                  "height=640,width=960,toolbar=no,menubar=no,scrollbars=no,location=no,status=no"
                )
              }
              className="color-light-theme"
            >
              Privacy Policy
            </span>
            .
          </Checkbox>
        </Form.Item>

        <Form.Item labelCol={0} wrapperCol={{ offset: 8, span: 8 }}>
          <Button
            type="text"
            htmlType="submit"
            className="rounded-pill button button--light-hover-dark button--animated pt-8 pb-8 mb-3 mt-5 "

            // onClick={handlePasswordUpdate}
          >
            <span className="fs-14 color-white">Register</span>
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegistrationForm;
