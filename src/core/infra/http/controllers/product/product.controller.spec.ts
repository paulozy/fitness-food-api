import { DeleteProductUseCase } from '@core/app/usecases/delete-product/delete-product.usecase';
import { GetProductUseCase } from '@core/app/usecases/get-product/get-product.usecase';
import { ListProductsUseCase } from '@core/app/usecases/list-products/list-products.usecase';
import { Product } from '@core/domain/entities/product.entity';
import { ProductRepositoryInterface } from '@core/domain/repositories/product-repository.interface';
import { faker } from '@faker-js/faker';
import { Test } from '@nestjs/testing';
import { InMemoryProductRepository } from '@test/repositories/in-memory-product-repository';
import { ProductController } from './product.controller';

describe('Product Controller', () => {
  let controller: ProductController;
  let productRepository: ProductRepositoryInterface;

  beforeAll(async () => {
    productRepository = new InMemoryProductRepository();

    for (let i = 0; i < 10; i++) {
      const code = i === 0 ? '123456' : String(faker.random.numeric(10));

      productRepository.create(
        Product.create({
          code,
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
    }
  });

  beforeEach(async () => {
    const listProducts = new ListProductsUseCase(productRepository);
    const getProduct = new GetProductUseCase(productRepository);
    const deleteProduct = new DeleteProductUseCase(productRepository);

    const module = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        InMemoryProductRepository,
        {
          provide: ListProductsUseCase,
          useValue: listProducts,
        },
        {
          provide: GetProductUseCase,
          useValue: getProduct,
        },
        {
          provide: DeleteProductUseCase,
          useValue: deleteProduct,
        },
      ],
    }).compile();

    controller = module.get<ProductController>(ProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should list products without query params', async () => {
    const { data, pagination } = await controller.list({});
    expect(data).toHaveLength(10);
    expect(pagination).toEqual({
      page: 1,
      total: 10,
      totalPages: 1,
      hasNextPage: false,
      hasPreviousPage: false,
    });
  });

  it('should list products with query params pagination', async () => {
    const { data, pagination } = await controller.list({ page: 2, limit: 5 });
    expect(data).toHaveLength(5);
    expect(pagination).toEqual({
      page: 2,
      total: 10,
      totalPages: 2,
      hasNextPage: false,
      hasPreviousPage: true,
    });
  });

  it('should get product by code', async () => {
    const product = await controller.get('123456');
    expect(product).toBeDefined();
  });

  it('should throw error if product not found', async () => {
    await expect(controller.get('123')).rejects.toThrow();
  });

  it('should delete product by code', async () => {
    await expect(controller.delete('123456')).resolves.toBeUndefined();
  });
});
