const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const config = require('../config/keys');
const checkFileType = require('../validation/image');

aws.config.update({
  secretAccessKey: config.secretAccessKey,
  accessKeyId: config.accessKeyId,
  region: 'eu-central-1'
});

const s3 = new aws.S3();

const uploadJobAvatar = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'hrnations',
    acl: 'public-read',
    metadata: function(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function(req, file, cb) {
      var newFileName = Date.now() + '-' + file.originalname;
      var fullPath = 'jobAvatar/' + newFileName;
      cb(null, fullPath);
    }
  }),
  limits: { fileSize: 2000000 },
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
});

module.exports.uploadJobAvatar = uploadJobAvatar;
