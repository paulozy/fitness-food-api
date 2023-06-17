import { ProductRepositoryInterface } from '@core/domain/repositories/product-repository.interface';
import { faker } from '@faker-js/faker';
import { InMemoryProductRepository } from '@test/repositories/in-memory-product-repository';
import { DeleteProductUseCase } from './delete-product.usecase';

describe('Delete Product UseCase', () => {
  let deleteProductUseCase: DeleteProductUseCase;
  let productRepository: ProductRepositoryInterface;

  beforeEach(() => {
    productRepository = new InMemoryProductRepository();

    const status = Number(faker.random.numeric(2)) > 0 ? 'published' : 'draft';
    productRepository.create({
      code: 123456,
      status,
      imported_t: faker.date.past().toISOString(),
      url: faker.internet.url(),
      brands: faker.commerce.productName(),
      categories: faker.commerce.productName(),
      labels: faker.commerce.productName(),
      cities: faker.address.city(),
      purchase_places: faker.address.city(),
      stores: faker.address.city(),
      ingredients_text: faker.commerce.productDescription(),
      traces: faker.commerce.productDescription(),
      serving_size: faker.commerce.productDescription(),
      serving_quantity: Number(faker.random.numeric(2)),
      nutriscore_score: Number(faker.random.numeric(2)),
      nutriscore_grade: faker.commerce.productDescription(),
      main_category: faker.commerce.productDescription(),
      image_url: faker.internet.url(),
      created_t: faker.date.past().getTime(),
      last_modified_t: faker.date.past().getTime(),
      product_name: faker.commerce.productName(),
      quantity: faker.commerce.productName(),
      creator: faker.internet.userName(),
    });

    deleteProductUseCase = new DeleteProductUseCase(productRepository);
  });

  it('should be possible delete a product on success', async () => {
    await expect(deleteProductUseCase.execute(123456)).resolves.not.toThrow();

    const product = await productRepository.get(123456);

    expect(product.status).toBe('trash');
  });

  it('should be throw an error when product not found', async () => {
    await expect(deleteProductUseCase.execute(123)).rejects.toThrow(
      'Product with code "123" not found',
    );
  });
});
