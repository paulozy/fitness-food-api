import { ImportRepositoryInterface } from '@core/domain/repositories/import-repository.interface';
import { ProductRepositoryInterface } from '@core/domain/repositories/product-repository.interface';
import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaImportRepository } from './prisma/repositories/prisma-imports-repository';
import { PrismaProductRepository } from './prisma/repositories/prisma-products-repository';

@Global()
@Module({
  providers: [
    PrismaService,
    {
      provide: ProductRepositoryInterface,
      useClass: PrismaProductRepository,
    },
    {
      provide: ImportRepositoryInterface,
      useClass: PrismaImportRepository,
    },
  ],
  exports: [
    PrismaService,
    ProductRepositoryInterface,
    ImportRepositoryInterface,
  ],
})
export class DatabaseModule {}
