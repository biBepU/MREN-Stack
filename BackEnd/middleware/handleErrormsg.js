const { validationResult } = require('express-validator');
const fs = require('fs');

const handleErrormsg = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Delete the file if validation fails
    if (req.file && req.file.path) {
      fs.unlink(req.file.path, (err) => {
        if (err) {
          console.error('Error deleting file:', err);
        }
      });
    }
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = handleErrormsg;
