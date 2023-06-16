import { Product } from '@core/domain/entities/product.entity';
import { ProductRepositoryInterface } from '@core/domain/repositories/product-repository.interface';

export class InMemoryProductRepository implements ProductRepositoryInterface {
  products: Product[] = [];

  async exists(code: number): Promise<boolean> {
    return this.products.some((product) => product.code === code);
  }

  async create(product: Product): Promise<void> {
    this.products.push(product);
  }

  async list(): Promise<Product[]> {
    return this.products;
  }

  async get(code: number): Promise<Product> {
    return this.products.find((product) => product.code === code);
  }

  async save(product: Product): Promise<void> {
    const index = this.products.findIndex((p) => p.code === product.code);
    this.products[index] = product;
  }
}
