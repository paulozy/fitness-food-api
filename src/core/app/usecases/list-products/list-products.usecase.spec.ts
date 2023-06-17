import { ProductRepositoryInterface } from '@core/domain/repositories/product-repository.interface';
import { faker } from '@faker-js/faker';
import { InMemoryProductRepository } from '@test/repositories/in-memory-product-repository';
import { ListProductsUseCase } from './list-products.usecase';

describe('List Products UseCase', () => {
  let listProductsUseCase: ListProductsUseCase;
  let productRepository: ProductRepositoryInterface;

  beforeEach(() => {
    productRepository = new InMemoryProductRepository();

    for (let i = 0; i < 10; i++) {
      const status =
        Number(faker.random.numeric(2)) > 0 ? 'published' : 'draft';

      productRepository.create({
        code: Number(faker.random.numeric(10)),
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
    }

    listProductsUseCase = new ListProductsUseCase(productRepository);
  });

  it('should be possible list all products', async () => {
    const products = await listProductsUseCase.execute({});

    expect(products).toHaveLength(10);
  });

  it('should be possible list all products with pagination', async () => {
    let products = await listProductsUseCase.execute({
      page: 1,
      limit: 5,
    });

    expect(products).toHaveLength(5);

    products = await listProductsUseCase.execute({
      page: 2,
      limit: 5,
    });

    expect(products).toHaveLength(5);
  });
});
