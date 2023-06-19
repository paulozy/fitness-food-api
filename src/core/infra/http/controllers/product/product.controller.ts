import { DeleteProductUseCase } from '@core/app/usecases/delete-product/delete-product.usecase';
import { GetProductUseCase } from '@core/app/usecases/get-product/get-product.usecase';
import { ListProductsUseCase } from '@core/app/usecases/list-products/list-products.usecase';
import { UpdateProductUseCase } from '@core/app/usecases/update-product/update-product.usecase';
import { UpdateSingupValidatorFactory } from '@core/infra/validators/update-product-validator';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Put,
  Query,
} from '@nestjs/common';
import { UpdateProductRules } from '../../dtos/update-product.dto';

@Controller('products')
export class ProductController {
  constructor(
    private readonly listProducts: ListProductsUseCase,
    private readonly getProduct: GetProductUseCase,
    private readonly deleteProduct: DeleteProductUseCase,
    private readonly updateProduct: UpdateProductUseCase,
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

  @Delete('/:code')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('code') code: string) {
    await this.deleteProduct.execute(code);

    return;
  }

  @Put('/:code')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(@Param('code') code: string, @Body() body: UpdateProductRules) {
    const validator = UpdateSingupValidatorFactory.create();
    const isValid = validator.validate(body);

    if (!isValid) {
      throw new HttpException(
        JSON.stringify(validator.errors),
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.updateProduct.execute(code, body);
  }
}
