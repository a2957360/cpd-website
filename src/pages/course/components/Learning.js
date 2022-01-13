import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { srcURL } from "../../../configs/AppConfig";

const Learning = (props) => {
  const [contentUrl, setContentUrl] = useState(props.ContentUrl);
  const prevClick = () => {
    props.data?.forEach((item, index) => {
      if (index === props.viewVideo && index >= 1) {
        console.log(props.data[index-1].ContentUrl)
        setContentUrl(props.data[index-1].ContentUrl)
        if(props.handleVideoIndex) {
          props.handleVideoIndex(index-1);
        }
        props.courseVideo(props.data[index - 1].CourseContentID, props.data[index - 1].ContentUrl, props.data[index - 1].CourseContentTitle, props.data[index - 1].Duration, index - 1, props.data[index - 1].CourseCompletedPer);
      }
    });
  }
  const nextClick = () => {
    props.data?.forEach((item, index) => {
      if (index === props.viewVideo && index < props.data.length) {
        console.log(item,props.data[index+1].ContentUrl)
        setContentUrl(props.data[index+1].ContentUrl)
        if(props.handleVideoIndex) {
          props.handleVideoIndex(index+1);
        }
        props.courseVideo(props.data[index + 1].CourseContentID, props.data[index + 1].ContentUrl, props.data[index + 1].CourseContentTitle, props.data[index + 1].Duration, index + 1, props.data[index + 1].CourseCompletedPer);
      }
    });
  }

  useEffect(() => {
    if(props.viewVideo === -1){
      props.courseVideo(props.data[0].CourseContentID, props.data[0].ContentUrl, props.data[0].CourseContentTitle, props.data[0].Duration, 0, props.data[0].CourseCompletedPer);
    }
    setContentUrl(props.ContentUrl);
  }, [props, props.ContentUrl])

  return (
    <div className='section-card border-radius-8 bg-white mt-4'>
      <div className='color-dark-grey-3 fs-20 mx-5 mt-4 mb-3'>{props.CourseContentTitle}</div>

      <div className='mx-5'>
        <ReactPlayer
          width='100%'
          height='100%'
          controls={true}
          playing={true}
          url={contentUrl}
          onContextMenu={e => e.preventDefault()}
          config={{ file: { 
            attributes: {
              controlsList: 'nodownload'
            }
          }}}
        />
      </div>

      <div className='d-flex justify-content-between mx-5 my-4'>
        <div
          role="button"
          className="button button--grey px-4 py-2 border-radius-8"
          onClick={prevClick}
        >
          <u className='color-light-grey-3'>Prev</u>
        </div>

        <div
          role="button"
          className="button button--grey px-4 py-2 border-radius-8"
          onClick={nextClick}
        >
          <u className='color-light-grey-3'>Next</u>
        </div>
      </div>
    </div>
  )
}

export default Learning;
