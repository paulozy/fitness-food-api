import { ProductRepositoryInterface } from '@core/domain/repositories/product-repository.interface';
import { CreateProductUseCase } from '../usecases/create-product/create-product.usecase';
import { DeleteProductUseCase } from '../usecases/delete-product/delete-product.usecase';
import { GetProductUseCase } from '../usecases/get-product/get-product.usecase';
import { ListProductsUseCase } from '../usecases/list-products/list-products.usecase';
import { UpdateProductUseCase } from '../usecases/update-product/update-product.usecase';

export interface ProductsUseCasesInterface {
  create: CreateProductUseCase;
  list: ListProductsUseCase;
  get: GetProductUseCase;
  delete: DeleteProductUseCase;
  update: UpdateProductUseCase;
}

export const ProductsUseCases = {
  provide: 'ProductUseCases',
  useFactory: (productRepository: ProductRepositoryInterface) => {
    return {
      list: new ListProductsUseCase(productRepository),
      get: new GetProductUseCase(productRepository),
      delete: new DeleteProductUseCase(productRepository),
      update: new UpdateProductUseCase(productRepository),
      create: new CreateProductUseCase(productRepository),
    };
  },
  inject: [ProductRepositoryInterface],
};
