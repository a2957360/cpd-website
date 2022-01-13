import React from 'react';
//packages
import { useHistory } from 'react-router-dom';

//components
import { Col, Row } from 'antd';

//statics
import { srcURL } from '../../../configs/AppConfig';
import newImg1 from '../../../assets/img/courses/News (1).png';
import newImg2 from '../../../assets/img/courses/News (2).png';
import newImg3 from '../../../assets/img/courses/News (3).png';

// const newsList = [
//   {
//     id: 1,
//     image: newImg1,
//     title: 'News from BBC',
//     content:
//       'Over ten years of professional experiences designer share their personal skills and method.',
//     date: '2021-May-22',
//   },
//   {
//     id: 2,
//     image: newImg2,
//     title: 'News Title',
//     content:
//       'Over ten years of professional experiences designer share their personal skills and method.',
//     date: '2021-May-22',
//   },
//   {
//     id: 3,
//     image: newImg3,
//     title: 'News Title_002_About',
//     content:
//       'Over ten years of professional experiences designer share their personal skills and method.',
//     date: '2021-May-22',
//   },
// ];

const HomeLatestNews = ({ newsList }) => {
  const history = useHistory();


  const handleClickCard = (item) => {
    history.push({
      pathname: `/blog/detail/${item.BlogShortName}`,
      search: `?id=${item.BlogId}`,
      state: { data: item },
    });
  };

  return (
    <div className='home-news-wrapper w-100 d-flex flex-column align-items-center pb-5  '>
      <div className='home-news-title-wrapper fs-50 fw-300 color-black'>
        <p className='text-center'>
          LATEST<span className='color-light-theme'> NEWS</span>
        </p>
        <p className='text-center fs-20 color-dark-grey-1 home-news-subtitle'>
          Stay Up-to-date with our latest offerings and upcoming courses.
        </p>
      </div>

      <Row className='home-news-list-wrapper'>
        {newsList.map((news) => (
          <Col
            xs={24}
            sm={12}
            lg={8}
            key={news.id}
            role='button'
            className='mb-4'
          >
            <div className='home-news-container mx-auto' style={{height: '52rem'}} onClick={() => handleClickCard(news)}>
              <div className='home-news-cover'>
                <img src={`${srcURL}${news.BlogImage}`} alt='CPD Ace' />
              </div>
              <div className='color-dark-grey-1'>
                <p className='color-dark-grey-3 home-news-title'>
                  {news.BlogName}
                </p>
                <div className='home-news-bar' />
                <p className='home-news-description fs-14'>
                  {news.BlogShortDescription}
                </p>
                <p className='pl-4 py-4'>{news.BlogDate}</p>
              </div>
            </div>
          </Col>
        ))}
      </Row>

      <div
        role='button'
        className='rounded-pill button button-white-border button--light-hover-dark button--animated'
        onClick={() => history.push('/blog/list')}
      >
        View More
      </div>
    </div>
  );
};

export default HomeLatestNews;
