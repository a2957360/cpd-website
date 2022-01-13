import React, { useState,useEffect } from 'react';
//components
import DashboardWrapper from '../../components/Dashboard/DashboardWrapper';
import { Row, Input } from 'antd';
import { baseURL, secondBaseURL } from "../../configs/AppConfig";
import { useHistory } from "react-router-dom";

//statics
import placeholder_avatar from '../../assets/img/courses/Woman.png';
import FB_icon from '../../assets/img/fb_icon.png';
import LinkedIn_icon from '../../assets/img/linkedin_icon.png';
import Twitter_icon from '../../assets/img/twitter_icon.png';
import {
  updateUserDetail,
} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

const Profile = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const userId = localStorage.getItem('CPDUserID');
  const { userSettings,userInfo } = useSelector((state) => state.authData);
  const [socialLinks, setSocialLinks] = useState({
    facebook: userSettings.FacebookLink,
    linkedin: userSettings.LinkedInLink,
    twitter: userSettings.TwitterLink,
  });
  const saveChange = ()=>{
    let formData = new FormData();
    formData.append("File", undefined);
    formData.append("FirstName", userSettings["FirstName"]);
    formData.append("LastName", userSettings["LastName"]);
    formData.append("AddressLine1", userSettings["AddressLine1"]);
    formData.append("AddressLine2", userSettings["AddressLine2"]);
    formData.append("City", userSettings["City"]);
    formData.append("Province", userSettings["Province"]);
    formData.append("Country", userSettings["Country"]);
    formData.append("PostalCode", userSettings["PostalCode"]);
    formData.append("GoogleLink", userSettings["GoogleLink"]);
    formData.append("FacebookLink", socialLinks["facebook"]);
    formData.append("LinkedInLink", socialLinks["linkedin"]);
    formData.append("TwitterLink", socialLinks["twitter"]);
    formData.append("PersonalInfo", userSettings["PersonalInfo"]);
    dispatch(updateUserDetail(userId,formData));
  }
  // useEffect(() => {
  //   dispatch(getMyCourses(localStorage.getItem('CPDUserID')));
  // }, []);
  return (
    <DashboardWrapper>
      <div className='dashboard-content-wrapper pl-5'>
        <div className='dashboard-profile-wrapper '>
          {/* Avatar and Name */}
          <Row className='mt-5 mb-3'>
            <div className='dashboard-profile-avatar'>
              <img src={placeholder_avatar} alt='CPD Ace' />
            </div>
            <div className='ml-5'>
              <p className='color-dark-grey-1 fs-16 mb-2'>Name</p>
              <p className='color-dark-grey-2 fs-20'>{userInfo.name}</p>
            </div>
          </Row>
          {/* Social Media Links */}
          <div className='mt-5 mb-3'>
            <p className='color-dark-grey-2 fs-20'>Social Media Links</p>
            <Row className='mt-5'>
              <div className='social-icons'>
                <img src={FB_icon} alt='CPD Ace' />
              </div>
              <Input
                value={socialLinks.facebook}
                className='w-80 ml-3 fs-20'
                onChange={(e) =>
                  setSocialLinks({ ...socialLinks, facebook: e.target.value })
                }
              />
            </Row>
            <Row className='mt-5'>
              <div className='social-icons'>
                <img src={LinkedIn_icon} alt='CPD Ace' />
              </div>
              <Input
                value={socialLinks.linkedin}
                className='w-80 ml-3 fs-20'
                onChange={(e) =>
                  setSocialLinks({ ...socialLinks, linkedin: e.target.value })
                }
              />
            </Row>
            <Row className='mt-5'>
              <div className='social-icons'>
                <img src={Twitter_icon} alt='CPD Ace' />
              </div>
              <Input
                value={socialLinks.twitter}
                className='w-80 ml-3 fs-20'
                onChange={(e) =>
                  setSocialLinks({ ...socialLinks, twitter: e.target.value })
                }
              />
            </Row>
            <Row className='mt-5'>
              <div
                role='button'
                className='rounded-pill button button--light-hover-dark button--animated pt-8 pb-8 mb-3'
                onClick={()=>saveChange()}
              >
                <span className='fs-14'>Save Changes</span>
              </div>
            </Row>
          </div>
          {/* Course Credits */}
          <div className='mt-5 mb-3'>
            <p className='color-dark-grey-2 fs-20'>Available Course Credits</p>
            <p className='color-dark-grey-1 fs-16'>
              Currently you have{' '}
              <span className='color-light-theme'>{userSettings.Credits} Hours</span> of available
              course credits.
            </p>
            <Row>
              <div
                role='button'
                className='rounded-pill button button--light-hover-dark button--animated pt-8 pb-8 mb-3 mr-5'
              >
                <span className='fs-14' 
                onClick={() =>
                        history.push({
                          pathname: "/order/credit",
                        })
                      }>Buy More Credits</span>
              </div>
              {/* <div
                role='button'
                className='rounded-pill button button--light-hover-dark button--animated pt-8 pb-8 mb-3'
              >
                <span className='fs-14'>How to use course credits</span>
              </div> */}
            </Row>
          </div>
        </div>
      </div>
    </DashboardWrapper>
  );
};

export default Profile;
