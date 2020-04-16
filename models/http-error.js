class HttpError extends Error {
  constructor(message, errorCode) {
    super(message); // add a "message" propperty to the instances
    this.code = errorCode; //add a "code" propperty to the instances
  }
}

module.exports = HttpError;
