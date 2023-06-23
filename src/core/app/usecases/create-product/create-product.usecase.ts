import { Product } from '@core/domain/entities/product.entity';
import { ProductRepositoryInterface } from '@core/domain/repositories/product-repository.interface';
import { CreateProductDTO } from './create-product.dto';

export class CreateProductUseCase {
  constructor(private readonly productRepository: ProductRepositoryInterface) {}

  async execute(input: CreateProductDTO): Promise<void> {
    const product = Product.create(input);
    await this.productRepository.create(product);
  }
}
