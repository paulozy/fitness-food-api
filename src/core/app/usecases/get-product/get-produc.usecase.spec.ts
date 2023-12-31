import { Product } from '@core/domain/entities/product.entity';
import { ProductRepositoryInterface } from '@core/domain/repositories/product-repository.interface';
import { faker } from '@faker-js/faker';
import { InMemoryProductRepository } from '@test/repositories/in-memory-product-repository';
import { GetProductUseCase } from './get-product.usecase';

describe('Get Product UseCase', () => {
  let getProductUseCase: GetProductUseCase;
  let productRepository: ProductRepositoryInterface;

  beforeEach(() => {
    productRepository = new InMemoryProductRepository();

    productRepository.create(
      Product.create({
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
      }),
    );

    getProductUseCase = new GetProductUseCase(productRepository);
  });

  it('should be possible get a product by code', async () => {
    const product = await getProductUseCase.execute('123456');

    expect(product).toBeTruthy();
  });

  it('should be throw an error when product not found', async () => {
    await expect(getProductUseCase.execute('999999')).rejects.toThrow(
      'Product with code "999999" not found',
    );
  });
});
