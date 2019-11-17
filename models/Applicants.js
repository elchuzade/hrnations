const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ApplicantSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    note: {
      type: String
    },
    linkedin: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = Applicant = mongoose.model('applicant', ApplicantSchema);
