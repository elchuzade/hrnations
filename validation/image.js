const path = require('path');

// checking if the user is uploading the right format images
const checkFileType = (file, cb) => {
  // allowed extensions
  let fileTypes = /jpeg|jpg|png/;
  // check the extension
  let extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  // check mimetype
  let mimeType = fileTypes.test(file.mimetype);
  if (mimeType && extName) {
    return cb(null, true);
  } else {
    cb('Error: Images only (jpeg, jpg, png)');
  }
};

module.exports = checkFileType;
