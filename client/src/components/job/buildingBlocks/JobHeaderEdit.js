import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FileInputGroup from '../../common/FileInputGroup';

class JobHeaderEdit extends Component {
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
            <form onSubmit={e => this.props.onSubmitJobAvatar(e, this.props.job._id)}>
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
                    onClick={e => this.props.onDeleteJobAvatar(e, this.props.job._id)}
                  >
                    Delete
                  </button>
                  <button className="btn btn-secondary mx-2" type="submit">
                    Upload
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

JobHeaderEdit.propTypes = {
  job: PropTypes.object.isRequired,
  onSubmitJobAvatar: PropTypes.func.isRequired,
  onChangeJobAvatar: PropTypes.func.isRequired,
  avatarObject: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  onDeleteJobAvatar: PropTypes.func.isRequired, 
};

export default JobHeaderEdit;
