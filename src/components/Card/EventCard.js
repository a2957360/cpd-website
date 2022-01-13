import React, { useState } from "react";

import { useHistory } from "react-router-dom";

import { srcURL } from "../../configs/AppConfig";

//components
const EventCard = (props) => {
  const history = useHistory();

  const { data } = props;

  const {
    EventId,
    EventImage,
    EventName,
    EventShortName,
    EventShortDescription,
    EventStartDate,
    EventEndDate,
  } = data;
console.log(data);
  return (
    <div className="d-flex event-card">
      <div className="event-image-container">
        <img src={srcURL + EventImage} className="event-image" alt="/" />
      </div>

      <div className="d-flex flex-column event-content-container pl-25 pr-25 pt-25 pb-25 w-100">
        <div className="d-flex justify-content-between">
          <h2 className="color-dark-grey-3 fs-18">{EventName}</h2>

          <span className="color-light-grey-3 fs-16">
            {EventStartDate} {EventEndDate}
          </span>
        </div>

        <span className="color-dark-grey-1 fs-14 mt-4 event-text mb-auto">
          {EventShortDescription}
        </span>

        <div className="d-flex align-items-end justify-content-end">
          <div
            role="button"
            className="pl-30 pr-30 pt-8 pb-8 rounded-pill button button--light-hover-dark button--animated"
            onClick={() =>
              history.push({
                pathname: `/event/detail/${EventShortName}`,
                // search: `?id=${EventId}`,
                state: { data: EventShortName },
              })
            }
          >
            Read More
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
