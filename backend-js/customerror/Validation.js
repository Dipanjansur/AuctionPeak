class ValidationError extends Error {
  constructor(message = "Validation Error") {
    super(message);
    this.status = 422;
  }
}
module.exports = ValidationError;