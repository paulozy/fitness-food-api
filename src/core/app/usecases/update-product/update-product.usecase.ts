import { InvalidStatusError } from '@core/domain/@errors/invalid-status-error';
import { ProductRepositoryInterface } from '@core/domain/repositories/product-repository.interface';
import { ProductNotFoundError } from '../@erros/product-not-found-error';
import { UpdateProductDTO } from './update-product.dto';

export class UpdateProductUseCase {
  constructor(private readonly productRepository: ProductRepositoryInterface) {}

  async execute(code: string, data: UpdateProductDTO): Promise<void> {
    try {
      const productExists = await this.productRepository.exists(code);

      if (!productExists) {
        throw new ProductNotFoundError(code);
      }

      const product = await this.productRepository.get(code);

      product.update(data);

      await this.productRepository.save(product);
    } catch (error) {
      console.error(error);
      switch (error.constructor) {
        case ProductNotFoundError:
          throw error;
        case InvalidStatusError:
          throw error;
        default:
          throw new Error('Unexpected error');
      }
    }
  }
}
