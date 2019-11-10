import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const TextareaInput = ({
  name,
  placeholder,
  value,
  label,
  error,
  info,
  onChange,
  disabled,
  rows,
  extraClass
}) => {
  return (
    <div>
      {label && <label htmlFor={name}>{label}</label>}
      <textarea
        className={classnames(`form-control ${extraClass}`, {
          'is-invalid': error
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        rows={rows}
      />
      {error && <div className="invalid-feedback">{error}</div>}
      {info && <small className="form-text text-muted">{info}</small>}
    </div>
  );
};

TextareaInput.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  rows: PropTypes.string,
  label: PropTypes.string,
  info: PropTypes.string,
  extraClass: PropTypes.string
};

TextareaInput.defaultProps = {
  rows: '3'
};

export default TextareaInput;
