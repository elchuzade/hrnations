import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FileInputGroup from '../../common/FileInputGroup';
import TextInput from '../../common/TextInput';
import TextareaInput from '../../common/TextareaInput';

class JobDetailsEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <img
              src={
                this.props.job.avatar
                  ? this.props.job.avatar.location
                  : 'https://picsum.photos/200/200'
              }
              alt="image"
              className="img-fluid"
            />
            <form
              onSubmit={e =>
                this.props.onSubmitJobAvatar(e, this.props.job._id)
              }
            >
              <FileInputGroup
                name="jobAvatar"
                placeholder="Job Image"
                onChange={this.props.onChangeJobAvatar}
                sendFile={this.props.avatarObject}
                error={this.props.errors.image}
                accept="image/png, image/jpg, image/jpeg"
              />
              <div className="row mt-2 mb-5">
                <div className="col text-center">
                  <button
                    className="btn btn-danger mx-2"
                    onClick={e =>
                      this.props.onDeleteJobAvatar(e, this.props.job._id)
                    }
                  >
                    Delete
                  </button>
                  <button className="btn btn-success mx-2" type="submit">
                    Upload
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <small className="text-muted">Title</small>
            <TextInput
              value={this.props.title}
              onChange={this.props.onChange}
              name="title"
              placeholder="Job Title"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <small className="text-muted">Company Name</small>
            <TextInput
              value={this.props.companyName}
              onChange={this.props.onChange}
              name="companyName"
              placeholder="Job Company Name"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <small className="text-muted">Location</small>
            <TextInput
              value={this.props.location}
              onChange={this.props.onChange}
              name="location"
              placeholder="Job Location"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <small className="text-muted">Introduction</small>
            <TextareaInput
              value={this.props.intro || ''}
              onChange={this.props.onChange}
              name="intro"
              placeholder="Job Introduction"
            />
          </div>
        </div>
        <div className="row mt-2 mb-5">
          <div className="col text-center">
            <button
              className="btn btn-success mx-2"
              onClick={this.props.onSubmitHeader}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    );
  }
}

JobDetailsEdit.propTypes = {
  job: PropTypes.object.isRequired,
  onSubmitJobAvatar: PropTypes.func.isRequired,
  onChangeJobAvatar: PropTypes.func.isRequired,
  avatarObject: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  onDeleteJobAvatar: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmitHeader: PropTypes.func.isRequired,
  onChangeQuill: PropTypes.func.isRequired
};

export default JobDetailsEdit;
