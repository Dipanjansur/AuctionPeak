class ForbiddenError extends Error {
  constructor(message = "Forbidden") {
    super(message);
    this.status = 403;
  }
}
module.exports = ForbiddenError;