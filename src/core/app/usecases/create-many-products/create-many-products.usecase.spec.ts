import { createManyProductsPayloadFactory } from '@core/app/factories/create-product.factory';
import { ProductRepositoryInterface } from '@core/domain/repositories/product-repository.interface';
import { InMemoryProductRepository } from '@test/repositories/in-memory-product-repository';
import { CreateManyProductsUseCase } from './create-many-products.usecase';

describe('Create Many Products UseCase', () => {
  let createManyProductsUseCase: CreateManyProductsUseCase;
  let productRepository: ProductRepositoryInterface;

  beforeEach(() => {
    productRepository = new InMemoryProductRepository();

    createManyProductsUseCase = new CreateManyProductsUseCase(
      productRepository,
    );
  });

  it('should be possible create many products', async () => {
    const payloads = createManyProductsPayloadFactory(100);

    await createManyProductsUseCase.execute({
      products: payloads,
    });

    expect(productRepository['products']).toHaveLength(100);
  });

  it('should update product if already exists', async () => {
    const payloads = createManyProductsPayloadFactory(3);

    await createManyProductsUseCase.execute({
      products: payloads,
    });
    await createManyProductsUseCase.execute({
      products: payloads,
    });

    expect(productRepository['products']).toHaveLength(3);
  });
});
