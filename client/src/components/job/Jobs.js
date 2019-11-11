import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getJobs, addJob } from '../../actions/jobActions';
// import JobCard from '../jobs/JobCard';

import NewJobModal from './NewJobModal';

class Jobs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      modal: false,
      id: '',
      title: ''
    };
  }
  componentDidMount() {
    this.props.getJobs();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  toggleModal = e => {
    e && e.preventDefault();
    if (this.state.modal) {
      this.setState({ modal: false, title: '' });
    }
  };
  onChange = e => {
    e.preventDefault();
    let errorsUpdate = {};
    if (this.state.errors[`${e.target.name}`]) {
      errorsUpdate = this.state.errors;
      delete errorsUpdate[`${e.target.name}`];
    }
    this.setState({ [e.target.name]: e.target.value, errors: errorsUpdate });
  };
  openModal = e => {
    e.preventDefault();
    if (!this.state.modal) {
      this.setState({ modal: true });
    }
  };
  submitModal = e => {
    e.preventDefault();
    const newJob = {
      title: this.state.title
    };
    this.props.addJob(newJob);
  };
  render() {
    const { errors } = this.state;
    const { isAuthenticated } = this.props.auth;
    const { jobs, loading } = this.props.jobs;
    let spinner = null;
    if (jobs === null || loading) {
      spinner = <div className="loader" />;
    } else {
      spinner = null;
    }
    return (
      <div>
        <section id="jobs">
          <div className="container">
            <div className="row bg-info mb-3 py-1">
              <div className="col d-flex align-items-center justify-content-center">
                <button
                  className=" btn btn-light py-1"
                  onClick={this.openModal}
                >
                  <i className="fas fa-plus"></i>
                </button>
                <span className="h4 text-white mx-4 mb-0">VACANCIES</span>
                <h3 className="m-0 p-0 d-flex align-items-center">
                  <span className="badge badge-light ml-0">7</span>
                </h3>
              </div>
            </div>
            {spinner}
            {!spinner && (
              <React.Fragment>
                <div className="row">
                  {jobs.map(job => (
                    <div key={job._id} className="col-12 col-lg-6 mb-3">
                      {/* <JobCard job={job} /> */}
                    </div>
                  ))}
                </div>
              </React.Fragment>
            )}
          </div>
        </section>
        {/* MODAL */}
        <NewJobModal
          modal={this.state.modal}
          toggleModal={this.toggleModal}
          resetModal={this.resetModal}
          submitModal={this.submitModal}
          onChange={this.onChange}
          title={this.state.title}
          errors={errors}
        />
      </div>
    );
  }
}

Jobs.propTypes = {
  auth: PropTypes.object.isRequired,
  jobs: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  getJobs: PropTypes.func.isRequired,
  addJob: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  jobs: state.jobs,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getJobs, addJob }
)(Jobs);
