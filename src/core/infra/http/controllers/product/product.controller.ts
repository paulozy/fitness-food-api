import { GetProductUseCase } from '@core/app/usecases/get-product/get-product.usecase';
import { ListProductsUseCase } from '@core/app/usecases/list-products/list-products.usecase';
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Query,
} from '@nestjs/common';

@Controller('products')
export class ProductController {
  constructor(
    private readonly listProducts: ListProductsUseCase,
    private readonly getProduct: GetProductUseCase,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async list(@Query() query: any) {
    const { page, limit } = query;

    const products = await this.listProducts.execute({
      page,
      limit,
    });

    return products;
  }

  @Get('/:code')
  @HttpCode(HttpStatus.OK)
  async get(@Param('code') code: string) {
    const product = await this.getProduct.execute(code);

    return product;
  }
}
