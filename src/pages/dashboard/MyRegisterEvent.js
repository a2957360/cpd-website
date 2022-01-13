import React, { useState } from "react";
//components
import DashboardWrapper from "../../components/Dashboard/DashboardWrapper";
import Sort from "../../components/Sort";
import SimpleFilter from "../../components/Filter/SimpleFilter";
import EmptyListElement from "../../components/Dashboard/EmptyListElement";
import { Row, Pagination, Input } from "antd";
//statics
import newsImg1 from "../../assets/img/courses/News (1).png";
import newsImg2 from "../../assets/img/courses/News (2).png";
import newsImg3 from "../../assets/img/courses/News (3).png";

const eventData = [
  {
    id: 1,
    image: newsImg1,
    name: "This is a events name, It should be longer",
    time: "8:00PM, Feb 25, 2021",
    description:
      "Should more words to tell your something, test test test, New best course for Python, please check me if you like this course click me to add… test test test, New best course for Python, please check me if you like this.",
  },
  {
    id: 2,
    image: newsImg2,
    name: "This is a events name, It should be longer",
    time: "8:00PM, Feb 25, 2021",
    description:
      "Should more words to tell your something, test test test, New best course for Python, please check me if you like this course click me to add… test test test, New best course for Python, please check me if you like this.",
  },

  {
    id: 3,
    image: newsImg3,
    name: "This is a events name, It should be longer",
    time: "8:00PM, Feb 25, 2021",
    description:
      "Should more words to tell your something, test test test, New best course for Python, please check me if you like this course click me to add… test test test, New best course for Python, please check me if you like this.",
  },
];

const sortData = [
  {
    key: "new",
    title: "New to Old",
  },
  {
    key: "old",
    title: "Old to New",
  },
];

// const sortData = [
//   {
//     name: "new",
//     value: "New to Old",
//   },
//   {
//     name: "old",
//     value: "Old to New",
//   },
//   {
//     name: "best",
//     value: "Best rating by Customer",
//   },
// ];

const MyRegisterEvent = () => {
  const [searchQuery, setSearchQeury] = useState("");
  const [sort, setSort] = useState("new");
  const [page, setPage] = useState(1);

  const handlePageChange = () => {
    console.log("handle page change");
  };

  return (
    <DashboardWrapper>
      <div className="dashboard-content-wrapper">
        {eventData.length === 0 ? (
          <div className="vh-100 d-flex justify-content-center align-items-center">
            <EmptyListElement
              line1="It seems you have no register events"
              line2="Please browse events and attend"
              btnTitle="Browse events"
            />
          </div>
        ) : (
          <div className="w-100">
            <Row
              justify="space-between"
              align="middle"
              className="dashboard-content-header-wrapper mx-auto"
            >
              {/* <Sort /> */}
              <SimpleFilter
                data={sortData}
                current={sort}
                setCurrent={setSort}
              />
              <Input
                addonAfter={<i className="fas fa-search"></i>}
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQeury(e.target.value)}
                bordered={false}
                className="w-20 bg-light-grey-1 border-radius-24 pl-3"
              />
            </Row>
            {eventData.map((event) => (
              <div
                key={event.id}
                className="my-4 d-flex dashboard-event-wrapper mx-auto"
              >
                <img src={event.image} alt="CPD Ace" />

                <div className="event-content px-5">
                  <Row justify="space-between" align="middle" className="pt-4">
                    <p className="fs-16 color-dark-grey-2 mb-3 w-60 text-truncate">
                      {event.name}
                    </p>
                    <p className="fs-16 color-dark-grey-1 mb-3">{event.time}</p>
                  </Row>
                  <p className="line-height-25 fs-14 color-dark-grey-1">
                    {event.description}
                  </p>
                  <Row justify="end" align="middle" className="pt-3">
                    <div
                      role="button"
                      className="rounded-pill button button--light-hover-dark button--animated pt-8 pb-8 mb-3"
                    >
                      <span className="fs-14">Read More</span>
                    </div>
                  </Row>
                </div>
              </div>
            ))}
            <Row justify="center" className="w-100 mt-5">
              <Pagination
                defaultCurrent={1}
                current={page}
                hideOnSinglePage
                pageSize={3}
                onChange={handlePageChange}
                total={eventData.length}
              />
            </Row>
          </div>
        )}
      </div>
    </DashboardWrapper>
  );
};

export default MyRegisterEvent;
