import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

//components
import MyPackage from "./myPackage";
import RouterLoading from "../../components/RouterLoading/index";

//redux
import { useDispatch, useSelector } from "react-redux";
import {
  getPackageById,
  getAllCatSubCategories,
} from "../../redux/actions";

const Detail = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { packageDetail } = useSelector(
    (state) => state.courseData
  );

  const owned = false;
  const userId = localStorage.getItem('CPDUserID');
  const courseId = props.location.search.split("=")[1];

  useEffect(() => {
    //courseId, userid 获取课程详情
    dispatch(getAllCatSubCategories());
    dispatch(getPackageById(courseId, userId));
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

  if (!packageDetail) {
    return <RouterLoading />;
  }

  return <MyPackage  data={packageDetail}  courseId={courseId} />;

};

export default Detail;
