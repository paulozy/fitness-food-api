export class InvalidStatusError extends Error {
  constructor(status: string) {
    super(`Invalid status "${status}". Use one of: "published", "draft"`);
    this.name = 'InvalidStatusError';
  }
}
