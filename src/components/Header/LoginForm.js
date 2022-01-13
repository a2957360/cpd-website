import React from "react";
import { useHistory } from "react-router-dom";
//components
import { Form, Input, Row, Button, message } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
//packages
import axios from "axios";
import { GoogleLogin } from "react-google-login";
// import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import FacebookLogin from "react-facebook-login";

//statics
import FB_icon from "../../assets/img/fb_icon.png";
import Google_icon from "../../assets/img/google_icon.png";
import {
  Google_client_id,
  Facebook_app_id,
  secondBaseURL,
} from "../../configs/AppConfig";
//redux
import { useDispatch, useSelector } from "react-redux";
import { saveUserInfo,getUserSettings } from "../../redux/actions";

const LoginForm = (props) => {
  const { setLoginModal, loginModal } = props;
  const history = useHistory();
  const dispatch = useDispatch();
  const { userSettings } = useSelector((state) => state.authData);
  const handleLogin = async (values) => {
    console.log("login input", values);
    try {
      const { data } = await axios.post(`${secondBaseURL}Authenticate`, values);
      //如果data 不为null，登录成功
      console.log("login response", data);
      if (data && data.id) {
        localStorage.setItem("CPDUserID", data.id);
        localStorage.setItem("token", data.token);
        localStorage.setItem("userinfo", JSON.stringify(data));
        dispatch(saveUserInfo(data));
        dispatch(getUserSettings());
        localStorage.setItem("credit", userSettings.Credits);
        //因为token没有更新 强制刷新
        window.location.reload();
      }

      // const myCourse = await axios.get(
      //   `${secondBaseURL}Course/GetMyCourses?userid=${data.id}`
      // );
    } catch (error) {
      //登录失败
      console.log("login err", error);
      message.error(
        "Your username and password may be incorrect, or you might need to activate your CPDAce account if you haven't done so."
      );
    }
    setLoginModal({ ...loginModal, visible: false });
  };

  // const handleGoogleLogin = async (response) => {
  //   console.log("google login", response);
  // };

  // const handleFacebookLogin = async (response) => {
  //   console.log("facebook login", response);
  // };

  return (
    <div className="mt-5">
      <Form
        layout="vertical"
        name="loginForm"
        onFinish={handleLogin}
        // initialValues={{ modifier: "public" }}
      >
        <Form.Item
          name="email"
          // label="Title"
          rules={[
            {
              required: true,
              message: "Please input the title of collection!",
            },
          ]}
        >
          <Input
            placeholder="example@example.com"
            type="email"
            className="border-radius-23"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password
            placeholder="Enter your password"
            className="border-radius-23"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>

        <Row justify="space-between" align="middle" className="w-100">
          <div className="pl-3 w-70">
            <span
              className="color-dark-grey-1 fs-16"
              role="button"
              onClick={() => {
                setLoginModal(false);
                history.push("/auth/password-recovery");
              }}
            >
              <u>Forgot your password?</u>
            </span>
          </div>
          <Row
            align="middle"
            justify="space-between"
            className="social-login-group w-20"
          >
            {/* <FacebookLogin
              appId={Facebook_app_id}
              callback={handleFacebookLogin}
              render={(renderProps) => (
                <button className="login-icon" onClick={renderProps.onClick}>
                  <img src={FB_icon} alt="CPD Ace" />
                </button>
              )}
            /> */}
            {/* <FacebookLogin
              appId={Facebook_app_id}
              fields="name,email,picture"
              callback={handleFacebookLogin}
              cssClass="login-icon"
              textButton=""
              responseType="json"
              icon={<img src={FB_icon} alt="CPD Ace" />}
            /> */}
            {/* <GoogleLogin
              clientId={Google_client_id}
              render={(renderProps) => (
                <button
                  className="login-icon"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <img src={Google_icon} alt="CPD Ace" />
                </button>
              )}
              onSuccess={handleGoogleLogin}
              onFailure={handleGoogleLogin}
              cookiePolicy={"single_host_origin"}
            /> */}
          </Row>
        </Row>

        <Form.Item labelCol={0} wrapperCol={{ offset: 8, span: 8 }}>
          <Button
            type="text"
            htmlType="submit"
            className="rounded-pill button button--light-hover-dark button--animated pt-8 pb-8 mb-3 mt-5"
            // onClick={handlePasswordUpdate}
          >
            <span className="fs-14 color-white">Login</span>
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
