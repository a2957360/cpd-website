import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

//components
import UnownedDetail from "./detail-unowned";
import OwnedDetail from "./detail-owned";
import RouterLoading from "../../components/RouterLoading/index";

//redux
import { useDispatch, useSelector } from "react-redux";
import {
  getCourseById,
  getCourseByIdNoUser,
  getRelatedCourses,
  getAllCatSubCategories,
} from "../../redux/actions";

const Detail = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { courseDetailNoUser } = useSelector(
    (state) => state.courseData
  );

  const owned = false;
  const userId = localStorage.getItem('CPDUserID');
  const courseId = props.location.search.split("=")[1];

  useEffect(() => {
    //courseId, userid 获取课程详情
    
    // dispatch(getCourseById(props.location.search.split("=")[1], userId));
  }, []);

  useEffect(() => {
    //获取课程详情
    dispatch(getAllCatSubCategories());
    dispatch(getCourseByIdNoUser(courseId));
  }, []);

  // const owned = props.location.state.data.UsersOrdered === 0 ? false : true;

  if (!props.location.search) {
    history.push("*");
  }

  if (!courseDetailNoUser) {
    return <RouterLoading />;
  }

  // console.log(1111, courseDetailNoUser.courseId.Fivestar);

  // if (!userId) {
    return <UnownedDetail data={courseDetailNoUser} courseId={courseId} />;
  // } else {
    // return <OwnedDetail  data={courseDetailNoUser}  courseId={courseId} />;
  // }
};

export default Detail;
