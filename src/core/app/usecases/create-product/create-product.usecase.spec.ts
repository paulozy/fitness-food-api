import { ProductRepositoryInterface } from '@core/domain/repositories/product-repository.interface';
import { InMemoryProductRepository } from '@test/repositories/in-memory-product-repository';
import { CreateProductUseCase } from './create-product.usecase';

describe('Create Product UseCase', () => {
  let createProductUseCase: CreateProductUseCase;
  let productRepository: ProductRepositoryInterface;
  const payload = {
    code: 123,
    status: 'published',
    imported_t: '2020-01-01',
    url: 'https://www.google.com',
    brands: 'Coca Cola',
    categories: 'Bebidas',
    labels: 'Sem açucar',
    cities: 'São Paulo',
    purchase_places: 'Supermercado',
    stores: 'Supermercado',
    ingredients_text: 'Açucar, agua, gas',
    traces: 'Açucar',
    serving_size: '200ml',
    serving_quantity: 1,
    nutriscore_score: 10,
    nutriscore_grade: 'A',
    main_category: 'Bebidas',
    image_url: 'https://www.google.com',
    created_t: new Date().getTime(),
    last_modified_t: new Date().getTime(),
    product_name: 'Coca Cola',
    quantity: '200ml',
    creator: 'admin',
  };

  beforeEach(() => {
    productRepository = new InMemoryProductRepository();
    createProductUseCase = new CreateProductUseCase(productRepository);
  });

  it('should be possible create a new product', async () => {
    await createProductUseCase.execute(payload);

    const products = productRepository['products'];

    expect(products).toHaveLength(1);
    expect(products[0]).toEqual(payload);
  });

  it('should not be possible create a product with same code', async () => {
    await createProductUseCase.execute(payload);
    await createProductUseCase.execute(payload);

    expect(productRepository['products']).toHaveLength(1);
  });

  it('should not be possible create a product with empty code', async () => {
    await expect(
      createProductUseCase.execute({ ...payload, code: undefined }),
    ).rejects.toThrow('Invalid product code "undefined"');
  });

  // should update product if product already exists
  it('should update product if product already exists', async () => {
    await createProductUseCase.execute(payload);

    const productUpdated = {
      ...payload,
      last_modified_t: new Date().getTime() + 1000,
    };

    await createProductUseCase.execute(productUpdated);

    const products = productRepository['products'];

    expect(products).toHaveLength(1);
    expect(products[0]).toEqual(productUpdated);
  });
});
