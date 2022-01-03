class FieldError extends Error {
  constructor(message, field) {
    super(message);
    this.field = field;
  }
}

module.exports = FieldError;
