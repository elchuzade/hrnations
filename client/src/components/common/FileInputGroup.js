import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const FileInputGroup = ({
  name,
  placeholder,
  label,
  error,
  info,
  prepend,
  append,
  extraClass,
  onChange,
  sendFile,
  accept,
  disabled
}) => {
  return (
    <div>
      {label && <label htmlFor={name}>{label}</label>}
      <div className="input-group">
        <div className="input-group-prepend">{prepend}</div>
        <div className={`custom-file ${extraClass}`}>
          <input
            type="file"
            className={classnames(
              'custom-file-input form-control fileInputComponent',
              {
                'is-invalid': error
              }
            )}
            onChange={onChange}
            accept={accept}
            disabled={disabled}
          />
          <label className="custom-file-label">
            {sendFile && sendFile.name ? sendFile.name : placeholder}
          </label>
        </div>
        <div className="input-group-append">{append}</div>
      </div>
      {error && <div className="isInvalidFeedback">{error}</div>}
      {info && <small className="form-text text-muted">{info}</small>}
    </div>
  );
};

FileInputGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  label: PropTypes.string,
  info: PropTypes.string,
  prepend: PropTypes.object,
  append: PropTypes.object,
  extraClass: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  sendFile: PropTypes.object,
  accept: PropTypes.string.isRequired,
  disabled: PropTypes.bool
};

FileInputGroup.defaultProps = {
  accept: '*',
  disabled: false
};

export default FileInputGroup;
