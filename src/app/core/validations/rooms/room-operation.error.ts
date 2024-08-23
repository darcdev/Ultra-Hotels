export class RoomOperationError extends Error {
  constructor(
    public operation: string,
    message: string,
    public originalError: unknown
  ) {
    super(message);
    this.name = `RoomOperationError:${operation}`;
    Error.captureStackTrace(this, this.constructor);
  }
}
