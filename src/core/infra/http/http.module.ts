import { DeleteProductUseCase } from '@core/app/usecases/delete-product/delete-product.usecase';
import { GetProductUseCase } from '@core/app/usecases/get-product/get-product.usecase';
import { ListProductsUseCase } from '@core/app/usecases/list-products/list-products.usecase';
import { UpdateProductUseCase } from '@core/app/usecases/update-product/update-product.usecase';
import { Module } from '@nestjs/common';
import { UseCasesFactory } from '../../utils/usecases-factory';
import { DatabaseModule } from '../database/database.module';
import { PrismaService } from '../database/prisma/prisma.service';
import { PrismaProductRepository } from '../database/prisma/repositories/prisma-products-repository';
import { ProductController } from './controllers/product/product.controller';

export const prismaProductRepository = new PrismaProductRepository(
  new PrismaService(),
);

const { listProducts, getProduct, deleteProduct, updateProduct } =
  UseCasesFactory.create(prismaProductRepository);

@Module({
  controllers: [ProductController],
  imports: [DatabaseModule],
  providers: [
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
    {
      provide: UpdateProductUseCase,
      useValue: updateProduct,
    },
  ],
  exports: [DatabaseModule],
})
export class HttpModule {}
