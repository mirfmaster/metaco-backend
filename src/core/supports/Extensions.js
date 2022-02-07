const httpResponse = require("./httpResponse");

const helper = (req, res, next) => {
  req.getLogger = () => {
    const {
      app: { logger },
    } = req;
    return logger;
  };

  next();
};

const extendedResponse = (req, res, next) => {
  const logger = req.getLogger();
  const endpoint = req.originalUrl;
  res.ext = {};

  res.ext.response = (message, statusCode) => {
    res.status(statusCode || 200);
    res.send(message);
  };

  /* eslint-disable brace-style */
  res.ext.success = (message, data = null) => {
    return res.status(httpResponse.OK).json({
      code: httpResponse.OK,
      success: true,
      message: message || null,
      data: data,
      exceptions: null,
    });
  };

  res.ext.paginate = (data, meta, message) => {
    return res.status(httpResponse.OK).json({
      code: httpResponse.OK,
      success: true,
      message: message || null,
      data: data || null,
      meta: meta || null,
      exceptions: null,
    });
  };

  res.ext.error = (message, code = 500, error = null) => {
    // if (error) console.trace(error);
    if (error) {
      logger.info(`${endpoint} | with error ${message}`, req.body);
    }
    return res.status(code).json({
      code: code,
      success: false,
      message: message || "Something went wrong, please try again!",
      error,
      exceptions: "ERROR",
    });
  };

  res.ext.notFound = (message = "Data is not found!", data = {}) => {
    return res.status(httpResponse.NOT_FOUND).json({
      code: httpResponse.NOT_FOUND,
      success: false,
      message: message,
      data,
      exceptions: "NOT FOUND",
    });
  };

  res.ext.forbidden = (message = "Forbidden", data = {}) => {
    return res.status(httpResponse.FORBIDDEN).json({
      code: httpResponse.FORBIDDEN,
      success: false,
      message: message,
      data,
      exceptions: "FORBIDDEN",
    });
  };

  res.ext.unauthorized = (message = "Unauthorized", data = {}) => {
    return res.status(httpResponse.UNAUTHORIZED).json({
      code: httpResponse.UNAUTHORIZED,
      success: false,
      message: message,
      data,
      exceptions: "UNAUTHORIZED",
    });
  };

  res.ext.badRequest = (message = "Bad Request", error = {}) => {
    if (req.body) {
      logger.info(`${endpoint} | with error ${message}`, req.body);
    }
    return res.status(httpResponse.BAD_REQUEST).send({
      code: httpResponse.BAD_REQUEST,
      success: false,
      message: message,
      error,
      exceptions: "BAD REQUEST",
    });
  };

  next();
};

const parseResponseQuery = (req, res, next) => {
  const {
    query,
    method,
  } = req;

  if (method == "GET" && query) {
    let result;
    Object.keys(query).map((key) => {
      try {
        result = { ...result, [key]: JSON.parse(query[key]) };
      } catch (error) {
        console.log(`(parseResponseQuery) query: ${JSON.stringify(
          query
        )} on key: ${key} with url: ${req.url}`);

        if (key == "where" && typeof query[key] == "string")
          return res.sendStatus(400);
      }
    });
    req.parsedRequest = result || {};
  }

  next();
};

module.exports = [helper, extendedResponse, parseResponseQuery];
