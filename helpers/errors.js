class ApiErrors extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class ValidationError extends ApiErrors {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class BadRequestError extends ApiErrors {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class EmailDuplicateError extends ApiErrors {
  constructor(message) {
    super(message);
    this.status = 409;
  }
}

class NotAuthorizedError extends ApiErrors {
  constructor(message) {
    super(message);
    this.status = 401;
  }
}

class NotFoundError extends ApiErrors {
  constructor(message) {
    super(message);
    this.status = 404;
  }
}

module.exports = {
  ApiErrors,
  ValidationError,
  BadRequestError,
  EmailDuplicateError,
  NotAuthorizedError,
  NotFoundError,
};
