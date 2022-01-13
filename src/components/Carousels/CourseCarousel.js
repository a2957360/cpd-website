import React from "react";

//packages
import { Row, Col } from "antd";
import Carousel from "react-elastic-carousel";

//global components
import CardGrid from "../Card/CourseCardGrid";

//fake img
import newsImg1 from "../../assets/img/img-news-1.png";
import newsImg2 from "../../assets/img/img-news-2.png";
import newsImg3 from "../../assets/img/img-news-3.png";

const relatedCourses = [
  {
    id: 1,
    image: newsImg1,
    title:
      "Game Design & A longer Name…here is a name test if the name more than 3 rows, let me try",
    text: "Game Design & A longer Name…here is a name testGame Design & A longer Name…here is a name testGame Design & A longer Name…here is a name testGame Design & A longer Name…here is a name testGame Design & A longer Name…here is a name testGame Design & A longer Name…here is a name testGame Design & A longer Name…here is a name testGame Design & A longer Name…here is a name test if the name more than 3 rows, let me try",
    instructor: "Tried a very long instructor",
    category: "Accounting",
    rating: 4.5,
    duration: 5,
    price: 99.99,
    originalPrice: 199.99,
  },
  {
    id: 2,
    image: newsImg2,
    title: "Like same course but high price and longer than others",
    text: "Game Design & A longer Name…here is a name testGame Design & A longer Name…here is a name testGame Design & A longer Name…here is a name testGame Design & A longer Name…here is a name test if the name more than 3 rows, let me try",
    instructor: "instructor",
    category: "Accounting",
    rating: 4.5,
    duration: 5,
    price: 99.99,
    originalPrice: 199.99,
  },
  {
    id: 3,
    image: newsImg3,
    title:
      "Game Design & A longer Name…here is a name test if the name more than 3 rows, let me try",
    text: "Game Design & A longer Name…here is a name testGame Design & A longer Name…here is a name testGame Design & A longer Name…here is a name test if the name more than 3 rows, let me try",
    instructor: "very long instructor",
    category: "Spacing",
    rating: 4.5,
    duration: 5,
    price: 99.99,
    originalPrice: 199.99,
  },
  {
    id: 4,
    image: newsImg2,
    title: "Short Name",
    text: "Game Design & A longer Name…here is a name test if the name more than 3 rows, let me try",
    instructor: "very long instructor",
    category: "Spacing",
    rating: 4.5,
    duration: 5,
    price: 99.99,
    originalPrice: 199.99,
  },
  {
    id: 5,
    image: newsImg1,
    title: "Game Design",
    text: "Game Design & A longer Name…here is a name test if the name more than 3 rows, let me try",
    instructor: "instructor",
    category: "Spacing",
    rating: 4.5,
    duration: 5,
    price: 99.99,
    originalPrice: 199.99,
  },
];

const CourseCarousel = ({ data }) => {
  console.log(data)
  return (
    <Carousel
      breakPoints={[
        { width: 1, itemsToShow: 5, itemsToScroll: 1 },
        { width: 550, itemsToShow: 5, itemsToScroll: 1 },
        { width: 768, itemsToShow: 5, itemsToScroll: 1 },
        { width: 1200, itemsToShow: 5, itemsToScroll: 1 },
      ]}
      pagination={false}
      renderArrow={({ type, onClick }) => (
        <div className="d-flex align-items-center" onClick={onClick}>
          {type === "PREV" ? (
            <div
              role="button"
              className="button button--opacity-to-light button--chevron border-radius-8"
            >
              <i className="fas fa-chevron-left"></i>
            </div>
          ) : (
            <div
              role="button"
              className="button button--opacity-to-light button--chevron border-radius-8"
            >
              <i className="fas fa-chevron-right"></i>
            </div>
          )}
        </div>
      )}
    >
      {data?.map((item, index) => (
        <div key={index} className="p-3 w-100">
          <CardGrid data={item} />
        </div>
      ))}
    </Carousel>
  );
};

export default CourseCarousel;
