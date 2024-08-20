export class HotelOperationError extends Error {
  constructor(
    public operation: string,
    message: string,
    public originalError: unknown
  ) {
    super(message);
    this.name = `HotelOperationError:${operation}`;
    Error.captureStackTrace(this, this.constructor);
  }
}
