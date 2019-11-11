import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const JobCard = ({ job }) => {
  return (
    <div className="row">
      <div className="d-none d-md-block col-2">
        <Link to={`/jobs/${job._id}`}>
          <img
            className="img-fluid"
            src={
              job.avatar ? job.avatar.location : 'http://picsum.photos/200/200'
            }
            alt="avatar"
          />
        </Link>
      </div>
      <div className="col-md-10 col-12">
        <Link to={`/jobs/${job._id}`}>
          <h3>{job.title}</h3>
        </Link>
        <p className="my-0">
          <i>{job.companyName}</i>
        </p>
        <p className="my-0">{job.location}</p>
        <p className="lead my-0">{job.intro}</p>
      </div>
    </div>
  );
};

JobCard.propTypes = {
  job: PropTypes.object.isRequired
};

export default JobCard;
