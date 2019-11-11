import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';
import { connect } from 'react-redux';

class Job extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      intro: '',
      avatar: '',
      avatarObject: {},
      location: '',
      description: '',
      companyName: '',
      companyInfo: '',
      website: '',
      errors: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    // Map errors to state errors
    nextProps.errors && this.setState({ errors: nextProps.errors });
    // Map job fields to state
    nextProps.jobs.job &&
      this.setState({
        title: nextProps.jobs.job.title,
        intro: nextProps.jobs.job.intro,
        avatar: nextProps.jobs.job.avatar.location,
        location: nextProps.jobs.job.location,
        description: nextProps.jobs.job.description,
        companyName: nextProps.jobs.job.companyName,
        companyInfo: nextProps.jobs.job.companyInfo,
        website: nextProps.jobs.job.website
      });
  }

  render() {
    return (
      <div>
        <section id="jobHeader">
          <div className="container">
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
                  <i className="text-muted">Published on January 7, 2019</i>
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
          </div>
        </section>
        <section id="jobIntro">
          <div class="container">
            <div class="row mb-3">
              <div class="col-12">
                <p class="lead text-center">{this.state.intro}</p>
              </div>
            </div>
          </div>
        </section>
        <section id="jobIntro">
          <div class="container">
            <div class="row mb-3">
              <div class="col-12">
                <p class="lead text-center">{this.state.description}</p>
              </div>
            </div>
          </div>
        </section>
        <section id="companyInfo">
          <div class="container">
            <div class="row">
              <div class="col">
                <p class="lead text-center">{this.state.companyInfo}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

Job.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  jobs: PropTypes.object.isRequired,
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
  { deleteJob, updateJob }
)(Job);
