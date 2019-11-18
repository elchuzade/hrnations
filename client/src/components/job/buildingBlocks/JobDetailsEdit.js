import React from 'react';
import PropTypes from 'prop-types';

import FileInputGroup from '../../common/FileInputGroup';
import TextInput from '../../common/TextInput';
import TextareaInput from '../../common/TextareaInput';

import ReactQuill from 'react-quill';

import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';

import modules from '../../common/exports/QuillModules';
import formats from '../../common/exports/QuillFormats';

const JobDetailsEdit = ({
  onSubmitJobAvatar,
  job,
  onChangeJobAvatar,
  avatarObject,
  errors,
  onDeleteJobAvatar,
  title,
  onChange,
  companyName,
  location,
  intro,
  description,
  companyInfo,
  onSubmitHeader,
  onChangeQuill
}) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <img
            src={
              job.avatar ? job.avatar.location : 'https://picsum.photos/200/200'
            }
            alt="image"
            className="img-fluid"
          />
          <form onSubmit={e => onSubmitJobAvatar(e, job._id)}>
            <FileInputGroup
              name="jobAvatar"
              placeholder="Job Image"
              onChange={onChangeJobAvatar}
              sendFile={avatarObject}
              error={errors.image}
              accept="image/png, image/jpg, image/jpeg"
            />
            <div className="row mt-2 mb-5">
              <div className="col text-center">
                <button
                  className="btn btn-danger mx-2"
                  onClick={e =>
                    onDeleteJobAvatar(e, job._id)
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
            value={title}
            onChange={onChange}
            name="title"
            placeholder="Job Title"
          />
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <small className="text-muted">Company Name</small>
          <TextInput
            value={companyName}
            onChange={onChange}
            name="companyName"
            placeholder="Job Company Name"
          />
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <small className="text-muted">Location</small>
          <TextInput
            value={location}
            onChange={onChange}
            name="location"
            placeholder="Job Location"
          />
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <small className="text-muted">Introduction</small>
          <TextareaInput
            value={intro || ''}
            onChange={onChange}
            name="intro"
            placeholder="Job Introduction"
          />
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <small className="text-muted">Description</small>
          <ReactQuill
            value={description}
            onChange={onChangeQuill}
            theme="snow"
            modules={modules}
            formats={formats}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <small className="text-muted">Company Info</small>
          <TextareaInput
            value={companyInfo || ''}
            onChange={onChange}
            name="companyInfo"
            placeholder="Job Company Info"
          />
        </div>
      </div>
      <div className="row mt-2 mb-5">
        <div className="col text-center">
          <button
            className="btn btn-success mx-2"
            onClick={onSubmitHeader}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

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
