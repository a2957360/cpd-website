import React, { useEffect } from 'react';
//packages
import { useSelector, useDispatch } from 'react-redux';
//components
import LoadingSpinner from '../../components/LoadingSpinner';
import HomeBanner from './components/HomeBanner';
import HomeTopCategory from './components/HomeTopCategory';
import HomeFeatureCourses from './components/HomeFeatureCourses';
import HomeTopPackage from './components/HomeTopPackage';
import HomeTestimonials from './components/HomeTestimonials';
import HomeCustomerReviews from './components/HomeCustomerReviews';
import HomeLatestNews from './components/HomeLatestNews';
import HomeOurPartner from './components/HomeOurPartner';
import FAQ from './components/FAQ';
//redux
import { getHomeLayoutSuccess,getAllCoursesAndPackages } from '../../redux/actions';

const Home = () => {
  const dispatch = useDispatch();
  const { homeContent } = useSelector((state) => state.homeData);
  const { courseList } = useSelector((state) => state.courseData);


  useEffect(() => {
    dispatch(getHomeLayoutSuccess());
    dispatch(getAllCoursesAndPackages("0"));
  }, [dispatch]);

  if (!homeContent) {
    return (
      <div className='vh-80 d-flex justify-content-center align-items-center'>
        <LoadingSpinner />
      </div>
    );
  } else {
    return (
      <div className='home-content-wrapper'>
        <HomeBanner />
        <HomeTopCategory categories={homeContent.TopCategories} />
        <HomeFeatureCourses courseList={homeContent.TopCourses.slice(0,9)} />
        <HomeTopPackage packageList={homeContent.TopPackages.slice(0,3)} />
        <HomeTestimonials testimonialList={homeContent.Testimonials} courseList={courseList} />
        <HomeCustomerReviews reviewlList={homeContent.CustomerReviews}  />
        <HomeLatestNews newsList={homeContent.LatestBlogs} />
        <HomeOurPartner />
        <FAQ type="home"/>
      </div>
    );
  }
};

export default Home;
