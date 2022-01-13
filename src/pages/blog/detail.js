import React, { useEffect, useState } from "react";

import { Button } from 'antd';

//redux
import { useDispatch, useSelector } from "react-redux";
import { getBlogById, getAllBlogs } from "../../redux/actions";

//components
import PageHeader from "../../components/PageHeader";
import RouterLoading from "../../components/RouterLoading";



const Detail = (props) => {
  const dispatch = useDispatch();
  const blogId = props.location.search.split("=")[1];
  const [thisID, setThisID] = useState(blogId);

  const blogDetailData = useSelector((state) => state.blogData.blogDetailData);
  const localListData = useSelector((state) => state.blogData).blogListData;

  // console.log(props.location.state.data.BlogName)
  const breadcrumb = [
    {
      title: "Blog",
      path: "/blog",
    },
    {
      title: props.location?.state?.data?.BlogName??'',
      path: "/blog/:id",
    },
  ];
  useEffect(() => {
    dispatch(getAllBlogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getBlogById(blogId));
  }, [blogId, dispatch]);
  // useEffect
  const handleClick = (state) => {
    console.log(state)
    let currentID = thisID;
    console.log(thisID)
    localListData.forEach((item, index) => {
      if(item.BlogId.toString() === thisID && index >=1 && state === 'Previous') {
        console.log(index)
        console.log(localListData[index-1].BlogId)
        currentID = localListData[index-1].BlogId;
      }
      if(item.BlogId.toString() === thisID && index<localListData.length && state === 'Next') {
        currentID = localListData[index+1].BlogId;
      }
      if(item.BlogId.toString() === thisID && state === 'Home') {
        currentID = blogId;
      }
    })
    setThisID(currentID);
    console.log(thisID)
    console.log(currentID)
    // if(state === 'Previous') {
    //   dispatch(getBlogById(blogId));
    // }else if(state==='Home') {
    //   dispatch(getBlogById(blogId));
    // }else {
    dispatch(getBlogById(currentID));
    // }
  }

  if (!blogDetailData) {
    return <RouterLoading />;
  }
  return (
    <>
      <div className="d-flex justify-content-center">
        <div className="content-container mb-20">
          <PageHeader data={breadcrumb} />

          <div dangerouslySetInnerHTML={{ __html: blogDetailData.BlogContent }} />
        </div>
      </div>
      <div className="d-flex justify-content-between pl-60 pr-60 fs-20 mb-20">
        <Button type="primary" onClick={() => handleClick('Previous')}>Previous</Button>
        <Button type="primary" onClick={() => handleClick('Home')}>Blog Home</Button>
        <Button type="primary" onClick={() => handleClick('Next')}>Next</Button>
      </div>
    </>
  );
};

export default Detail;
