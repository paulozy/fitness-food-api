export class ProductNotFoundError extends Error {
  constructor(code: number) {
    super(`Product with code "${code}" not found`);
    this.name = 'ProductNotFoundError';
  }
}
