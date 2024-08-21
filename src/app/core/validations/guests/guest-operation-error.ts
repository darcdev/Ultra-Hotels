export class GuestOperationError extends Error {
  constructor(
    public operation: string,
    message: string,
    public originalError: unknown
  ) {
    super(message);
    this.name = `GuestOperationError:${operation}`;
    Error.captureStackTrace(this, this.constructor);
  }
}
