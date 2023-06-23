import { ImportUseCases } from '@core/app/factories/import-usecases.factory';
import { ProductsUseCases } from '@core/app/factories/product-usecases.factory';
import { Module } from '@nestjs/common';
import { ImportController } from './controllers/import/import.controller';
import { ProductController } from './controllers/product/product.controller';
import { ImportService } from './services/import.service';
import { ProductService } from './services/product.service';
import { SyncProductsService } from './services/sync-products.service';

// TODO: readd ApplicationController

@Module({
  controllers: [ProductController, ImportController],
  providers: [
    ProductService,
    ImportService,
    SyncProductsService,
    ProductsUseCases,
    ImportUseCases,
  ],
})
export class HttpModule {}
