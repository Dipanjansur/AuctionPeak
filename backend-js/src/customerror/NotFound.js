class NotFoundError extends Error {
    constructor(message = "Not Found") {
        super(message);
        this.status = 404;
    }
}
module.exports = NotFoundError;
