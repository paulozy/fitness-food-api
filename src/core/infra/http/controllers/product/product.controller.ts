import { ListProductsUseCase } from '@core/app/usecases/list-products/list-products.usecase';
import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';

@Controller('products')
export class ProductController {
  constructor(private readonly listProducts: ListProductsUseCase) {}

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
}
