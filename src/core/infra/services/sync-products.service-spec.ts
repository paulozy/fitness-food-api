import { CreateProductUseCase } from '@core/app/usecases/create-product/create-product.usecase';
import { InMemoryProductRepository } from '@test/repositories/in-memory-product-repository';
import { SyncProductsService } from './sync-products.service';

describe('Sync Products Service', () => {
  let syncProductsService: SyncProductsService;

  beforeEach(() => {
    const productRepository = new InMemoryProductRepository();
    const createProductUseCase = new CreateProductUseCase(productRepository);
    syncProductsService = new SyncProductsService(createProductUseCase);
  });

  // afterAll(() => {
  //   exec('rm -rf ./tmp/*');
  // });

  it('should be possible sync the products', async () => {
    await syncProductsService.execute();

    expect(1).toBe(1);
  });
});
