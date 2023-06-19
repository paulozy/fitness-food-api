import { CreateProductUseCase } from '@core/app/usecases/create-product/create-product.usecase';
import { DeleteProductUseCase } from '@core/app/usecases/delete-product/delete-product.usecase';
import { GetProductUseCase } from '@core/app/usecases/get-product/get-product.usecase';
import { ListProductsUseCase } from '@core/app/usecases/list-products/list-products.usecase';
import { UpdateProductUseCase } from '@core/app/usecases/update-product/update-product.usecase';
import { ProductRepositoryInterface } from '@core/domain/repositories/product-repository.interface';

export class ProductUseCasesFactory {
  static create(productRepository: ProductRepositoryInterface) {
    const listProducts = new ListProductsUseCase(productRepository);
    const getProduct = new GetProductUseCase(productRepository);
    const deleteProduct = new DeleteProductUseCase(productRepository);
    const updateProduct = new UpdateProductUseCase(productRepository);
    const createProduct = new CreateProductUseCase(productRepository);

    return {
      listProducts,
      getProduct,
      deleteProduct,
      updateProduct,
      createProduct,
    };
  }
}