export class BookingOperationError extends Error {
  constructor(
    public operation: string,
    message: string,
    public originalError?: unknown
  ) {
    super(message);
    this.name = `BookingOperationError:${operation}`;
    Error.captureStackTrace(this, this.constructor);
  }
}
