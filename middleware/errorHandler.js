const { constants } = require("../constants");

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  switch (statusCode) {
    case constants.FORBIDDEN:
      res.json({
        title: "Forbidden Access",
        msg: err.message,
        stackTrace: err.stack,
      });

      break;
    case constants.NOT_FOUND:
      res.json({
        title: "Not Found",
        msg: err.message,
        stackTrace: err.stack,
      });

      break;
    case constants.SERVER_ERROR:
      res.json({
        title: "Server error",
        msg: err.message,
        stackTrace: err.stack,
      });

      break;
    case constants.UNAUTHORIZED:
      res.json({
        title: "Unauthorized",
        msg: err.message,
        stackTrace: err.stack,
      });

      break;
    case constants.VALIDATION_ERROR:
      res.json({
        title: "Validation error",
        msg: err.message,
        stackTrace: err.stack,
      });

      break;

    default:
      break;
  }
};

module.exports = errorHandler;
