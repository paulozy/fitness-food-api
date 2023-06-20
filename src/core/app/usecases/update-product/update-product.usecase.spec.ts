import { Product } from '@core/domain/entities/product.entity';
import { ProductRepositoryInterface } from '@core/domain/repositories/product-repository.interface';
import { faker } from '@faker-js/faker';
import { InMemoryProductRepository } from '@test/repositories/in-memory-product-repository';
import { UpdateProductUseCase } from './update-product.usecase';

describe('Update Product UseCase', () => {
  let updateProductUseCase: UpdateProductUseCase;
  let productRepository: ProductRepositoryInterface;
  let product: Product;

  beforeEach(() => {
    productRepository = new InMemoryProductRepository();

    product = Product.create({
      code: '123456',
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
      serving_quantity: String(faker.random.numeric(2)),
      nutriscore_score: String(faker.random.numeric(2)),
      nutriscore_grade: faker.commerce.productDescription(),
      main_category: faker.commerce.productDescription(),
      image_url: faker.internet.url(),
      created_t: String(faker.date.past().getTime()),
      last_modified_t: String(faker.date.past().getTime()),
      product_name: faker.commerce.productName(),
      quantity: faker.commerce.productName(),
      creator: faker.internet.userName(),
    });

    productRepository.create(product);

    updateProductUseCase = new UpdateProductUseCase(productRepository);
  });

  it('should be possible update a product on success', async () => {
    await updateProductUseCase.execute(product.code, {
      brands: 'Coca Cola',
      categories: 'Bebidas',
    });

    const productUpdated = await productRepository.get(product.code);

    expect(productUpdated).toEqual(
      expect.objectContaining({
        ...product,
        brands: 'Coca Cola',
        categories: 'Bebidas',
      }),
    );
  });

  it('should not be possible update a product if not exists', async () => {
    await expect(
      updateProductUseCase.execute('999999', {
        brands: 'Coca Cola',
        categories: 'Bebidas',
      }),
    ).rejects.toThrowError('Product with code "999999" not found');
  });
});
