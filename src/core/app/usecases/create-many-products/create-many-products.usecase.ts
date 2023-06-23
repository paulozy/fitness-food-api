import { Product } from '@core/domain/entities/product.entity';
import { ProductRepositoryInterface } from '@core/domain/repositories/product-repository.interface';
import { CreateManyProductsDTO } from './create-many-products.dto';

export class CreateManyProductsUseCase {
  constructor(private readonly productRepository: ProductRepositoryInterface) {}

  async execute({
    products: importedProducts,
  }: CreateManyProductsDTO): Promise<void> {
    const products = importedProducts.map((product) => Product.create(product));

    await this.productRepository.createMany(products);
  }
}
