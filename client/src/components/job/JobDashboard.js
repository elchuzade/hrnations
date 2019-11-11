import React from 'react';
import PropTypes from 'prop-types';

const JobDashboard = ({ editJob, deleteJob, toggleEdit, updateJob }) => {
  return (
    <div className="dashboard">
      {editJob ? (
        <div>
          <button
            className="btn btn-secondary m-2 py-3 text-white dashboardBtn"
            onClick={toggleEdit}
          >
            <i className="fas fa-eye" />
          </button>
          <br />
          <button
            className="btn btn-success m-2 py-3 text-white dashboardBtn"
            onClick={updateJob}
          >
            <i className="fas fa-save" />
          </button>
          <br />
          <button
            className="btn btn-danger m-2 py-3 text-white dashboardBtn"
            onClick={deleteJob}
          >
            <i className="fas fa-trash" />
          </button>
        </div>
      ) : (
        <div>
          <button
            className="btn btn-secondary m-2 py-3 text-white dashboardBtn"
            onClick={toggleEdit}
          >
            <i className="fas fa-pen" />
          </button>
        </div>
      )}
    </div>
  );
};

JobDashboard.propTypes = {
  editJob: PropTypes.bool.isRequired,
  deleteJob: PropTypes.func.isRequired,
  toggleEdit: PropTypes.func.isRequired,
  updateJob: PropTypes.func.isRequired
};

export default JobDashboard;
