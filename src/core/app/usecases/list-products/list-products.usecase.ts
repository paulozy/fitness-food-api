import { ProductRepositoryInterface } from '@core/domain/repositories/product-repository.interface';

export class ListProductsUseCase {
  constructor(private readonly productRepository: ProductRepositoryInterface) {}

  async execute() {
    try {
      const products = await this.productRepository.list();

      //TODO: paginate products

      return products;
    } catch (error) {
      console.log(error);
      throw new Error('Unexpected error');
    }
  }
}
