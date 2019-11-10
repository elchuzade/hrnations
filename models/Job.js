const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const JobSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    avatar: {
      location: {
        type: String
      },
      key: {
        type: String
      },
      bucket: {
        type: String
      },
      originalname: {
        type: String
      },
      mimetype: {
        type: String
      },
      size: {
        type: Number
      },
      fieldName: {
        type: String
      }
    },
    location: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    companyName: {
      type: String
    },
    companyDescription: {
      type: String
    },
    website: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = Job = mongoose.model('job', JobSchema);
