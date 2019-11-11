const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const JobSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    intro: {
      type: String
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
      type: String
    },
    description: {
      type: String
    },
    companyName: {
      type: String
    },
    companyInfo: {
      type: String
    },
    website: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = Job = mongoose.model('job', JobSchema);
