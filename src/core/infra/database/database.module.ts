import { ProductRepositoryInterface } from '@core/domain/repositories/product-repository.interface';
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaProductRepository } from './prisma/repositories/prisma-products-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: ProductRepositoryInterface,
      useClass: PrismaProductRepository,
    },
  ],
  exports: [ProductRepositoryInterface],
})
export class DatabaseModule {}
