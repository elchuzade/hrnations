const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : '';
  data.name = !isEmpty(data.name) ? data.name : '';

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email is required';
  }
  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
