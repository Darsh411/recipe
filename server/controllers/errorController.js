const fs = require('fs');
const User = require('../models/userModel');
const AppError = require('./../utilities/appError');
const errorHelpers = require('./../utilities/errorHandlerHelpers');

const sendDevError = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    error: err,
  });
};

const sendProdError = (err, res) => {
  const { isOperational, status, statusCode, message } = err;
  console.log(statusCode);
  if (isOperational) {
    res.status(statusCode).json({
      status,
      message,
    });
  } else {
    // console.log(err);

    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!',
    });
  }
};

exports.globalErrorHandler = (err, req, res, next) => {
  // Delete created image if error occurs
  const user = User.findOne({ email: req.body.email }).then((res) => {
    if (res) return;
    if (req.file) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.log(err);
        console.log('Image file deleted');
      });
    }
  });

  // Continue with middleware
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  err.message = err.message;
  console.log(err);

  if (process.env.NODE_ENV === 'development') {
    sendDevError(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    // let error = { ...err };

    if (err.name === 'ValidationError')
      err = errorHelpers.handleValidationError(err);
    if (err.name === 'CastError')
      err = errorHelpers.handleCastError(err);
    if (err.code === 11000)
      err = errorHelpers.handleDuplicateFieldsError(err);
    if (err.name === 'JsonWebTokenError') {
      res.clearCookie('token');
      err = errorHelpers.handleJsonWebTokenError();
    }

    if (err.name === 'TokenExpiredError') {
      res.clearCookie('token');
      err = errorHelpers.handleTokenExpiredError();
    }

    sendProdError(err, res);
  }
};
