import { ImportUseCasesFactory } from '@core/app/factories/import-usecases.factory';
import { CreateImportUseCase } from '@core/app/usecases/create-import/create-import.usecase';
import { CreateProductUseCase } from '@core/app/usecases/create-product/create-product.usecase';
import { UseCasesFactory } from '@core/utils/usecases-factory';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { PrismaService } from '../database/prisma/prisma.service';
import { PrismaImportRepository } from '../database/prisma/repositories/prisma-imports-repository';
import { prismaProductRepository } from '../http/http.module';
import { SyncProductsService } from './sync-products.service';

const { createProduct } = UseCasesFactory.create(prismaProductRepository);

const prismaImportRepository = new PrismaImportRepository(new PrismaService());
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
