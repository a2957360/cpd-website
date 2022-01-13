import React, { useState,useEffect } from "react";
import { useHistory } from "react-router-dom";

//components
import PageHeader from "../../components/PageHeader";
import envolope_icon from "../../assets/img/courses/email@2x.png";
import LoadingSpinner from '../../components/LoadingSpinner';

//packages
import { Button, Input, message } from "antd";
import axios from "axios";

//statics
import { secondBaseURL } from "../../configs/AppConfig";
import congratulationsImg from "../../assets/img/img-congratulations.png";
import errorIcon from '../../assets/img/courses/error-404@2x.png';

const ActivateAccount = (props) => {
  const [result, setresult] = useState("");
  const history = useHistory();
  const breadCrumb = [{ title: "Verification Account", path: "*" }];

  useEffect(() => {
    const params = Object.fromEntries(
      new URLSearchParams(window.location.search)
    );
    axios
    .get(`${secondBaseURL}ActivateAccount?token=`+params.token)
    .then((res) => {
      setresult(res.data)
      console.log(res.data);
    })
    // 逻辑为：用户输入正确code我们就跳转页面， 不正确的我们应该弹窗您输入的验证码错误，如果链接的时间过期，跳转到sorry页面
    .catch((err) => {
      // message.error("Your account has been verified!");
      console.log(err);
    });
  }, []);
  if(result==""){
    return (
      <div className='w-70 vh-80 m-auto'>
        <PageHeader data={breadCrumb} />
        <LoadingSpinner />
      </div>
    );
  }
  return (
    <div className='d-flex flex-column vh-80'>
      <div className='d-flex justify-content-center'>
        <div className='content-container'>
          <PageHeader data={breadCrumb} />

          <div className='d-flex flex-column justify-content-center align-items-center'>
            <div className='color-dark-grey-3 fs-20 mt-4'>{result=="Success"?"Active Account Success!!!":"Sorry, the token is expired"}</div>

            <div className='color-light-grey-3 fs-16 mt-4'>
            </div>

            <img className='mt-5' src={result=="Success"?congratulationsImg:errorIcon} style={{ width: 200, height: 200 }} alt='/' />

            <div className="d-flex align-items-end justify-content-center mt-40 mb-100">
              <div
                role="button"
                className="rounded-pill button button--light-hover-dark"
                onClick={() => history.push("/")}
              >
                {"Home"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivateAccount;
