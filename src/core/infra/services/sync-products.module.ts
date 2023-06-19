import { ImportUseCasesFactory } from '@core/app/factories/import-usecases.factory';
import { ProductUseCasesFactory } from '@core/app/factories/product-usecases.factory';
import { CreateImportUseCase } from '@core/app/usecases/create-import/create-import.usecase';
import { CreateProductUseCase } from '@core/app/usecases/create-product/create-product.usecase';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import {
  prismaImportRepository,
  prismaProductRepository,
} from '../http/http.module';
import { SyncProductsService } from './sync-products.service';

const { createProduct } = ProductUseCasesFactory.create(
  prismaProductRepository,
);
const { createImport } = ImportUseCasesFactory.create(prismaImportRepository);

@Module({
  imports: [DatabaseModule],
  providers: [
    SyncProductsService,
    {
      provide: CreateProductUseCase,
      useValue: createProduct,
    },
    {
      provide: CreateImportUseCase,
      useValue: createImport,
    },
  ],
})
export class SyncProductsModule {}
