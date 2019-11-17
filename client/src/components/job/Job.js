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

import JobHeader from './buildingBlocks/JobHeader';

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
      editJob: false,
      job: {}
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
        createdAt: nextProps.jobs.job.createdAt,
        job: nextProps.jobs.job
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
          <div>
            {this.state.editJob ? (
              <div className="container"></div>
            ) : (
              <JobHeader job={this.state.job} />
            )}
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

export default connect(mapStateToProps, { getJob, deleteJob, updateJob })(Job);
