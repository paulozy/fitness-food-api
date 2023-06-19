import { ImportUseCasesFactory } from '@core/app/factories/import-usecases.factory';
import { ProductUseCasesFactory } from '@core/app/factories/product-usecases.factory';
import { DeleteProductUseCase } from '@core/app/usecases/delete-product/delete-product.usecase';
import { GetProductUseCase } from '@core/app/usecases/get-product/get-product.usecase';
import { ListImportsUseCase } from '@core/app/usecases/list-imports/list-imports.usecase';
import { ListProductsUseCase } from '@core/app/usecases/list-products/list-products.usecase';
import { UpdateProductUseCase } from '@core/app/usecases/update-product/update-product.usecase';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { PrismaService } from '../database/prisma/prisma.service';
import { PrismaImportRepository } from '../database/prisma/repositories/prisma-imports-repository';
import { PrismaProductRepository } from '../database/prisma/repositories/prisma-products-repository';
import { ImportController } from './controllers/import/import.controller';
import { ProductController } from './controllers/product/product.controller';

const prismaService = new PrismaService();

export const prismaProductRepository = new PrismaProductRepository(
  prismaService,
);
export const prismaImportRepository = new PrismaImportRepository(prismaService);

const { listProducts, getProduct, deleteProduct, updateProduct } =
  ProductUseCasesFactory.create(prismaProductRepository);

const { listImports } = ImportUseCasesFactory.create(prismaImportRepository);

@Module({
  controllers: [ProductController, ImportController],
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
    {
      provide: ListImportsUseCase,
      useValue: listImports,
    },
  ],
  exports: [DatabaseModule],
})
export class HttpModule {}
