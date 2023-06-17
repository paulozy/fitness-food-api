import { InvalidProductCodeError } from '@core/domain/@errors/invalid-product-code-error';
import { Product } from '@core/domain/entities/product.entity';
import { ProductRepositoryInterface } from '@core/domain/repositories/product-repository.interface';
import { CreateProductDTO } from './create-product.dto';

export class CreateProductUseCase {
  constructor(private readonly productRepository: ProductRepositoryInterface) {}

  async execute(input: CreateProductDTO): Promise<void> {
    try {
      const productExists = await this.productRepository.exists(input.code);

      if (productExists) {
        const product = await this.productRepository.get(input.code);

        if (input.last_modified_t > product.last_modified_t) {
          // send notification that product already exists (product "product.name" already exists on database, updating)
          const productUpdated = Product.create(input);
          await this.productRepository.save(productUpdated);
          return;
        }

        return;
      }

      const product = Product.create(input);

      await this.productRepository.create(product);
    } catch (error) {
      switch (error.constructor) {
        case InvalidProductCodeError:
          throw new Error(error.message);
        default:
          throw new Error('Unexpected error');
      }
    }
  }
}
