import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

//components
import UnownedDetail from "./detail-unowned";
import OwnedDetail from "./detail-owned";
import PackageOwnedDetail from "./detail-package-owned";
import RouterLoading from "../../components/RouterLoading/index";

//redux
import { useDispatch, useSelector } from "react-redux";
import {
  getCourseById,
  getCourseByIdNoUser,
  getRelatedCourses,
  getAllCatSubCategories,
  getPackageCourseById
} from "../../redux/actions";

const Detail = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const type = props.location.state.type;
  const parentId = props.location.state.parentId;


  const { courseDetail } = useSelector(
    (state) => state.courseData
  );

  const owned = false;
  const userId = localStorage.getItem('CPDUserID');
  const courseId = props.location.search.split("=")[1];

  const refreshCourse = () => {
    if(type=="package"){
      setTimeout(() => {
        dispatch(getPackageCourseById(courseId, userId, parentId));
      }, 500);
    }else{
      setTimeout(() => {
        dispatch(getCourseById(courseId, userId));
      }, 500);
    }
  };

  useEffect(() => {
    //courseId, userid 获取课程详情
    dispatch(getAllCatSubCategories());
    if(type=="package"){
      dispatch(getPackageCourseById(courseId, userId, parentId));
    }else{
      dispatch(getCourseById(courseId, userId));
    }
  }, []);

  // useEffect(() => {
  //   //获取课程详情
  //   dispatch(getAllCatSubCategories());
  //   dispatch(getCourseByIdNoUser(courseId));
  // }, []);

  // const owned = props.location.state.data.UsersOrdered === 0 ? false : true;

  if (!props.location.search) {
    history.push("*");
  }

  if (!courseDetail) {
    return <RouterLoading />;
  }
  if(type==="package"){
    return <PackageOwnedDetail refreshCourse={refreshCourse} packageName={props.location.state.packageName} type={props.location.state.type} data={courseDetail}  CertificateUrl={props.location.state.CertificateUrl}  courseId={courseId} />;
  }else{
    return <OwnedDetail refreshCourse={refreshCourse} type={props.location.state.type} data={courseDetail}  CertificateUrl={props.location.state.CertificateUrl}  courseId={courseId} />;
  }

};

export default Detail;
