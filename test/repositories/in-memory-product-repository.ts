import { Product } from '@core/domain/entities/product.entity';
import {
  ListProductsInput,
  ProductRepositoryInterface,
} from '@core/domain/repositories/product-repository.interface';

export class InMemoryProductRepository implements ProductRepositoryInterface {
  products: Product[] = [];

  async exists(code: number): Promise<boolean> {
    return this.products.some((product) => product.code === code);
  }

  async create(product: Product): Promise<void> {
    this.products.push(product);
  }

  async list({ page, limit }: ListProductsInput): Promise<Product[]> {
    const skip = (page - 1) * limit;
    const take = skip + limit;

    const products = this.products.filter(
      (product) => product.status === 'published',
    );

    return products.slice(skip, take);
  }

  async get(code: number): Promise<Product> {
    return this.products.find((product) => product.code === code);
  }

  async save(product: Product): Promise<void> {
    const index = this.products.findIndex((p) => p.code === product.code);
    this.products[index] = product;
  }

  async delete(code: number): Promise<void> {
    const product = this.products.find((p) => p.code === code);
    product.status = 'trash';

    const index = this.products.findIndex((p) => p.code === product.code);
    this.products[index] = product;
  }
}
