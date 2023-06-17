import { ProductRepositoryInterface } from '@core/domain/repositories/product-repository.interface';
import { ListProductsUseCaseDTO } from './list-products.dto';

export class ListProductsUseCase {
  constructor(private readonly productRepository: ProductRepositoryInterface) {}

  async execute({ page = 1, limit = 10 }: ListProductsUseCaseDTO) {
    try {
      const products = await this.productRepository.list({
        page,
        limit,
      });

      return products;
    } catch (error) {
      console.log(error);
      throw new Error('Unexpected error');
    }
  }
}
