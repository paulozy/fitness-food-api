import { ProductsUseCasesInterface } from '@core/app/factories/product-usecases.factory';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
  constructor(
    @Inject('ProductUseCases') private useCases: ProductsUseCasesInterface,
  ) {}

  async list({ page, limit }: { page: number; limit: number }) {
    const products = await this.useCases.list.execute({
      page,
      limit,
    });

    return products;
  }

  async get(code: string) {
    return this.useCases.get.execute(code);
  }

  async delete(code: string) {
    return this.useCases.delete.execute(code);
  }

  async update(code: string, data: any) {
    return this.useCases.update.execute(code, data);
  }
}
