import React from 'react';

const Styles = () => (
  <div>
    <h1>
      Button
    </h1>

    <div
      role="button"
      className="w-30 mb-2 rounded-pill button button--light-hover-white button--animated"
    >
      button button--light-hover-white button--animated
    </div>

    <div
      role="button"
      className="w-30 mb-2 rounded-pill button button--light-hover-dark button--animated"
    >
      button button--light-hover-dark button--animated
    </div>

    <div
      role="button"
      className="w-30 mb-2 rounded-pill button button--dark-hover-white button--animated"
    >
      button button--dark-hover-white button--animated
    </div>

    <div
      role="button"
      className="w-30 mb-2 rounded-pill button button--light-hover-white"
    >
      button button--light-hover-white
    </div>

    <div
      role="button"
      className="w-30 mb-2 rounded-pill button button--light-hover-dark"
    >
      button button--light-hover-dark
    </div>

    <div
      role="button"
      className="w-30 mb-2 rounded-pill button button--dark-hover-white"
    >
      button button--dark-hover-white
    </div>
  </div>
);

export default Styles;
