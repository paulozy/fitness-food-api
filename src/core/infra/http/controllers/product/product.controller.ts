import { KeyGuard } from '@core/infra/auth/guards/key.guard';
import { ProductService } from '@core/infra/http/services/product.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateProductRules } from '../../dtos/update-product.dto';
import { UpdateSingupValidatorFactory } from '../../validators/update-product-validator';

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @ApiOperation({
    summary: 'List all products',
    description: 'List all products',
  })
  async list(
    @Query()
    query: any,
  ) {
    const { page, limit } = query;

    return this.productService.list({
      page,
      limit,
    });
  }

  @Get('/:code')
  @ApiOperation({
    summary: 'Get a product',
    description: 'Get a product by code',
  })
  async get(@Param('code') code: string) {
    return this.productService.get(code);
  }

  @Delete('/:code')
  @UseGuards(KeyGuard)
  @ApiOperation({
    summary: 'Delete a product',
    description: 'Delete a product by code',
  })
  async delete(@Param('code') code: string) {
    return this.productService.delete(code);
  }

  @Put('/:code')
  @UseGuards(KeyGuard)
  @ApiOperation({
    summary: 'Update a product',
    description: 'Update a product by code',
  })
  async update(@Param('code') code: string, @Body() body: UpdateProductRules) {
    const validator = UpdateSingupValidatorFactory.create();
    const isValid = validator.validate(body);

    if (!isValid) {
      throw new HttpException(
        JSON.stringify(validator.errors),
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.productService.update(code, body);
  }
}
