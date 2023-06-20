export class ProductNotFoundError extends Error {
  constructor(code: string) {
    super(`Product with code "${code}" not found`);
    this.name = 'ProductNotFoundError';
  }
}
