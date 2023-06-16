import { ProductRepositoryInterface } from '@core/domain/repositories/product-repository.interface';
import { CreateProductDTO } from './create-product.dto';

export class CreateProductUseCase {
  constructor(private readonly productRepository: ProductRepositoryInterface) {}

  async execute(product: CreateProductDTO): Promise<void> {
    try {
      const productExists = await this.productRepository.exists(product.code);

      if (productExists) {
        // send notification that product already exists
        return;
      }

      await this.productRepository.create(product);
    } catch (error) {
      console.error(error);
    }
  }
}
