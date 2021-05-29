class ApiError extends Error {
  constructor(readonly code: number, readonly message: string, readonly raisedBy: any) {
    super(Array.isArray(message) ? message.join('\n') : message);
    this.code = code;
    this.message = message;
    this.raisedBy = raisedBy;
  }
}

export default ApiError;
