import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import JobDashboard from './JobDashboard';

import {
  getJob,
  updateJob,
  deleteJob,
  uploadJobAvatar,
  deleteJobAvatar,
  addApplicant
} from '../../actions/jobActions';

import JobDetails from './buildingBlocks/JobDetails';
import JobDetailsEdit from './buildingBlocks/JobDetailsEdit';
import NewApplicantModal from './buildingBlocks/NewApplicantModal';

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
      modal: false,
      applicantName: '',
      applicantEmail: '',
      applicantNote: '',
      applicantLinkedin: ''
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

  toggleModal = e => {
    e && e.preventDefault();
    if (this.state.modal) {
      this.setState({
        modal: false,
        applicantName: '',
        applicantEmail: '',
        applicantLinkedin: '',
        applicantNote: ''
      });
    }
  };
  openModal = e => {
    e.preventDefault();
    if (!this.state.modal) {
      this.setState({ modal: true });
    }
  };
  submitModal = e => {
    e.preventDefault();
    const newApplicant = {
      job: this.state._id,
      name: this.state.applicantName,
      email: this.state.applicantEmail,
      linkedin: this.state.applicantLinkedin,
      note: this.state.applicantNote
    };
    if (
      newApplicant.job &&
      newApplicant.name &&
      newApplicant.email &&
      this.state.modal
    ) {
      this.props.addApplicant(newApplicant);
      this.setState({ modal: false });
    } else {
      let errors = this.state.errors;
      if (!newApplicant.name) {
        errors.name = 'Name is required';
      }
      if (!newApplicant.email) {
        errors.email = 'Email is required';
      }
      this.setState({ errors: errors });
    }
  };

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

  onChangeJobAvatar = e => {
    e.preventDefault();
    this.setState({ avatarObject: e.target.files[0] });
    if (this.state.errors && this.state.errors.avatar) {
      let updatedErrors = this.state.errors;
      delete updatedErrors.avatar;
      this.setState({ errors: updatedErrors });
    }
  };

  onSubmitJobAvatar = e => {
    e.preventDefault();
    if (this.state.avatarObject.name) {
      const formData = new FormData();
      formData.append('jobAvatar', this.state.avatarObject);
      let configData = {
        headers: {
          'content-type': 'multipart/form/data'
        }
      };
      this.props.uploadJobAvatar(formData, configData, this.state._id);
    } else {
      let updatedErrors = this.state.errors;
      updatedErrors.avatar = 'Choose image to upload';
      this.setState({ errors: updatedErrors });
    }
  };

  onDeleteJobAvatar = e => {
    e.preventDefault();
    if (this.state.avatarObject.name || this.props.jobs.job.avatar) {
      this.props.deleteJobAvatar(this.state._id);
      this.setState({ avatarObject: {}, avatar: '' });
    } else {
      let updatedErrors = this.state.errors;
      updatedErrors.avatar = 'No image to delete';
      this.setState({ errors: updatedErrors });
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

  onSubmitHeader = e => {
    e.preventDefault();
    const jobHeaderData = {
      title: this.state.title,
      companyName: this.state.companyName,
      location: this.state.location,
      intro: this.state.intro,
      companyInfo: this.state.companyInfo,
      description: this.state.description
    };
    this.props.updateJob(this.state._id, jobHeaderData);
  };

  onChangeQuill = (content, delta, source, value) => {
    this.setState({ description: value.getHTML() });
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
              <JobDetailsEdit
                job={this.props.jobs.job}
                onSubmitJobAvatar={this.onSubmitJobAvatar}
                onChangeJobAvatar={this.onChangeJobAvatar}
                onDeleteJobAvatar={this.onDeleteJobAvatar}
                errors={errors}
                avatarObject={this.state.avatarObject}
                onChange={this.onChange}
                onSubmitHeader={this.onSubmitHeader}
                title={this.state.title || ''}
                companyName={this.state.companyName || ''}
                location={this.state.location || ''}
                intro={this.state.intro || ''}
                description={this.state.description || ''}
                companyInfo={this.state.companyInfo || ''}
                onChangeQuill={this.onChangeQuill}
              />
            ) : (
              <JobDetails
                job={this.props.jobs.job}
                openModal={this.openModal}
              />
            )}
          </div>
        )}
        {/* MODAL */}
        <NewApplicantModal
          modal={this.state.modal}
          toggleModal={this.toggleModal}
          submitModal={this.submitModal}
          onChange={this.onChange}
          applicantName={this.state.applicantName}
          applicantEmail={this.state.applicantEmail}
          applicantLinkedin={this.state.applicantLinkedin}
          applicantNote={this.state.applicantNote}
          errors={errors}
        />
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
  updateJob: PropTypes.func.isRequired,
  uploadJobAvatar: PropTypes.func.isRequired,
  deleteJobAvatar: PropTypes.func.isRequired,
  addApplicant: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  jobs: state.jobs,
  errors: state.errors
});

export default connect(mapStateToProps, {
  getJob,
  deleteJob,
  updateJob,
  deleteJobAvatar,
  uploadJobAvatar,
  addApplicant
})(Job);
