import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import axios from "axios";

//components
import PageHeader from '../../components/PageHeader';
import { Input, Button, message } from 'antd';
import { secondBaseURL } from "../../configs/AppConfig";

const ResetPasswordEmailSent = () => {
  const history = useHistory();
  const breadCrumb = [
    { title: 'Forgot Password', path: '/auth/password-recovery' },
  ];
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    const params = Object.fromEntries(
      new URLSearchParams(window.location.search)
    );
    let data = {Email:email,code: "0000",codeType: "email"}
    axios
    .post(`${secondBaseURL}ValidateEmailAndSendCode`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
        message.success("Email Sent");
        history.push("/auth/password-reset");
    })
    .catch((e) => console.log(e));
  };

  return (
    <div className='w-80 vh-80 m-auto'>
      <PageHeader data={breadCrumb} />
      <p className='text-center fs-20 color-dark-grey-2'>Password Recovery</p>
      <p className='text-center fs-16 color-dark-grey-1'>
        Please enter the e-mail which you linked to your account You will
        receive a link to reset your password
      </p>
      <div className='w-30 mx-auto'>
        <Input
          type='email'
          value={email}
          placeholder='Enter your email'
          onChange={(e) => setEmail(e.target.value)}
          className='border-radius-23 mt-3 mb-5'
        />
      </div>

      <Button
        type='text'
        className='rounded-pill button button--light-hover-dark button--animated pt-8 pb-8 mb-3 mt-5 mx-auto'
        onClick={handleSubmit}
      >
        <span className='fs-14 color-white'>Send Recovery Email</span>
      </Button>
    </div>
  );
};

export default ResetPasswordEmailSent;
