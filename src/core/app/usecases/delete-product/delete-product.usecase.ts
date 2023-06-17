import { ProductRepositoryInterface } from '@core/domain/repositories/product-repository.interface';
import { ProductNotFoundError } from '../@erros/product-not-found-error';

export class DeleteProductUseCase {
  constructor(private readonly productRepository: ProductRepositoryInterface) {}

  async execute(code: number) {
    try {
      const productExists = await this.productRepository.exists(code);

      if (!productExists) {
        throw new ProductNotFoundError(code);
      }

      await this.productRepository.delete(code);
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
