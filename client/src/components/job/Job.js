import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import JobDashboard from './JobDashboard';

import { getJob, updateJob, deleteJob } from '../../actions/jobActions';

import Moment from 'react-moment';
import ReactQuill from 'react-quill';

import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';

import modules from '../common/exports/QuillModules';
import formats from '../common/exports/QuillFormats';

class Job extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: '',
      title: '',
      intro: '',
      avatar: '',
      avatarObject: {},
      location: '',
      description: '',
      companyName: '',
      companyInfo: '',
      website: '',
      createdAt: '',
      errors: {},
      editJob: false
    };
  }

  componentDidMount() {
    this.props.match.params.id && this.props.getJob(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    // Map errors to state errors
    nextProps.errors && this.setState({ errors: nextProps.errors });
    // Map job fields to state
    nextProps.jobs.job &&
      this.setState({
        _id: nextProps.jobs.job._id,
        title: nextProps.jobs.job.title,
        intro: nextProps.jobs.job.intro,
        avatar: nextProps.jobs.job.avatar
          ? nextProps.jobs.job.avatar.location
          : '',
        location: nextProps.jobs.job.location,
        description: nextProps.jobs.job.description,
        companyName: nextProps.jobs.job.companyName,
        companyInfo: nextProps.jobs.job.companyInfo,
        website: nextProps.jobs.job.website,
        createdAt: nextProps.jobs.job.createdAt
      });
  }

  toggleEdit = e => {
    e.preventDefault();
    this.setState({ editJob: !this.state.editJob });
  };

  updateJob = e => {
    e.preventDefault();
    const editJob = {
      title: this.state.title,
      intro: this.state.intro,
      location: this.state.location,
      description: this.state.description,
      companyName: this.state.companyName,
      companyInfo: this.state.companyInfo,
      website: this.state.website
    };
    this.props.updateJob(this.state._id, editJob);
  };

  deleteJob = e => {
    e.preventDefault();
    this.props.deleteJob(this.state._id);
  };

  render() {
    const { errors } = this.state;
    const { isAuthenticated } = this.props.auth;
    const { job, loading } = this.props.jobs;
    let spinner = null;
    if (job === null || loading) {
      spinner = <div className="loader" />;
    } else {
      spinner = null;
    }
    return (
      <div>
        {isAuthenticated && (
          <section id="jobDashboard">
            <JobDashboard
              editJob={this.state.editJob}
              toggleEdit={this.toggleEdit}
              deleteJob={this.deleteJob}
              updateJob={this.updateJob}
            />
          </section>
        )}
        {spinner}
        {!spinner && (
          <div className="container">
            <section id="jobHeader">
              <div className="row mb-3">
                <div className="d-none d-md-block col-md-3 col-lg-2">
                  <img
                    src={this.state.avatar || 'https://picsum.photos/200/200'}
                    alt="avatar"
                    className="img-fluid"
                  />
                </div>
                <div className="col-9 col-md-6 col-lg-8">
                  <h3>{this.state.title}</h3>
                  <p className="lead">{this.state.companyName}</p>
                  <p>
                    <i>{this.state.location}</i>
                  </p>
                  <p>
                    <i className="text-muted">
                      Published on{' '}
                      <Moment format="MMM D YYYY" withTitle>
                        {this.state.createdAt}
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
                  <p className="lead text-center">{this.state.intro}</p>
                </div>
              </div>
            </section>
            <section id="jobIntro">
              <div className="row mb-3">
                <div className="col-12">
                  <p className="lead text-center">{this.state.description}</p>
                </div>
              </div>
            </section>
            <section id="companyInfo">
              <div className="row">
                <div className="col">
                  <p className="lead text-center">{this.state.companyInfo}</p>
                </div>
              </div>
            </section>
          </div>
        )}
      </div>
    );
  }
}

Job.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  jobs: PropTypes.object.isRequired,
  getJob: PropTypes.func.isRequired,
  deleteJob: PropTypes.func.isRequired,
  updateJob: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  jobs: state.jobs,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getJob, deleteJob, updateJob }
)(Job);
