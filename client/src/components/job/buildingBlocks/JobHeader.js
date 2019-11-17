import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const JobHeader = ({ job }) => {
  return (
    <div className="container">
      <section id="jobHeader">
        <div className="row mb-3">
          <div className="d-none d-md-block col-md-3 col-lg-2">
            <img
              src={
                job.avatar
                  ? job.avatar.location
                  : 'https://picsum.photos/200/200'
              }
              alt="avatar"
              className="img-fluid"
            />
          </div>
          <div className="col-9 col-md-6 col-lg-8">
            <h3>{job.title}</h3>
            <p className="lead">{job.companyName}</p>
            <p>
              <i>{job.location}</i>
            </p>
            <p>
              <i className="text-muted">
                Published on{' '}
                <Moment format="MMM D YYYY" withTitle>
                  {job.createdAt}
                </Moment>
              </i>
            </p>
          </div>
          <div className="col-3 col-md-3 col-lg-2 text-right">
            <button
              className="btn btn-info"
              data-toggle="modal"
              data-target="#applyModal"
            >
              Apply
            </button>
          </div>
        </div>
      </section>
      <section id="jobIntro">
        <div className="row mb-3">
          <div className="col-12">
            <p className="lead text-center">{job.intro}</p>
          </div>
        </div>
      </section>
      <section id="jobIntro">
        <div className="row mb-3">
          <div className="col-12">
            <div
              dangerouslySetInnerHTML={{
                __html: job.description
              }}
            ></div>
          </div>
        </div>
      </section>
      <section id="companyInfo">
        <div className="row">
          <div className="col">
            <p className="lead text-center">{job.companyInfo}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

JobHeader.propTypes = {
  job: PropTypes.object.isRequired
};

export default JobHeader;
