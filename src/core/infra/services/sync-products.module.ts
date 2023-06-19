import { CreateProductUseCase } from '@core/app/usecases/create-product/create-product.usecase';
import { UseCasesFactory } from '@core/utils/usecases-factory';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { prismaProductRepository } from '../http/http.module';
import { SyncProductsService } from './sync-products.service';

const { createProduct } = UseCasesFactory.create(prismaProductRepository);

@Module({
  imports: [DatabaseModule],
  providers: [
    SyncProductsService,
    {
      provide: CreateProductUseCase,
      useValue: createProduct,
    },
  ],
})
export class SyncProductsModule {}
