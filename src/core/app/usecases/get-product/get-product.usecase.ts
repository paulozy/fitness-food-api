import { ProductRepositoryInterface } from '@core/domain/repositories/product-repository.interface';
import { ProductNotFoundError } from '../@erros/product-not-found-error';

export class GetProductUseCase {
  constructor(private readonly productRepository: ProductRepositoryInterface) {}

  async execute(code: number) {
    try {
      const product = await this.productRepository.get(code);

      if (!product) {
        throw new ProductNotFoundError(code);
      }

      return product;
    } catch (error) {
      console.error(error);
      switch (error.constructor) {
        case ProductNotFoundError:
          throw error;
        default:
          throw new Error('Unexpected error');
      }
    }
  }
}
