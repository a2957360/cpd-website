import React from "react";

import { useHistory } from "react-router-dom";

//components
import PageHeader from "../../components/PageHeader";

//fake img
import congratulationsImg from "../../assets/img/img-congratulations.png";

const Congratulations = (props) => {
  const { breadCrumb, title, text, btnText, btnPath } = props.location.state || {};

  const history = useHistory();

  return (
    <div className='d-flex flex-column'>
      <div className='d-flex justify-content-center'>
        <div className='content-container'>
          <PageHeader data={breadCrumb} />

          <div className='d-flex flex-column justify-content-center align-items-center'>
            <div className='color-dark-grey-3 fs-20 mt-4'>{title}</div>

            <div className='color-light-grey-3 fs-16 mt-4'>
              {text}
            </div>

            <img className='mt-5' src={congratulationsImg} style={{ width: 200, height: 200 }} alt='/' />

            <div className="d-flex align-items-end justify-content-center mt-40 mb-100">
              <div
                role="button"
                className="rounded-pill button button--light-hover-dark"
                onClick={() => history.push(btnPath)}
              >
                {btnText}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Congratulations;
