export class InvalidProductCodeError extends Error {
  constructor(code: any) {
    super(`Invalid product code "${code}"`);
    this.name = 'InvalidProductCodeError';
  }
}
