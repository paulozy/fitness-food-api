import { Product } from '@core/domain/entities/product.entity';
import {
  ListProductsInput,
  ListProductsOutput,
  ProductRepositoryInterface,
} from '@core/domain/repositories/product-repository.interface';
import { paginate } from 'paginate-arrays-js';

export class InMemoryProductRepository implements ProductRepositoryInterface {
  products: Product[] = [];

  async exists(code: string): Promise<boolean> {
    return this.products.some((product) => product.code === code);
  }

  async create(product: Product): Promise<void> {
    const exists = await this.exists(product.code);

    if (exists) {
      this.save(product);
    } else {
      this.products.push(product);
    }
  }

  async createMany(products: Product[]): Promise<void> {
    products.forEach(async (product) => {
      const exists = await this.exists(product.code);

      if (exists) {
        await this.save(product);
      } else {
        await this.create(product);
      }
    });
  }

  async list({ page, limit }: ListProductsInput): Promise<ListProductsOutput> {
    const products = this.products.filter(
      (product) => product.status === 'published',
    );

    const { data, pagination } = paginate({
      page,
      url: 'http://localhost:3000/products',
      data: products,
      perPage: limit,
    });

    return {
      data: data as Product[],
      pagination: {
        page,
        total: pagination.total,
        totalPages: pagination.totalPage,
        hasNextPage: pagination.hasNextPage,
        hasPreviousPage: pagination.hasPrevPage,
      },
    };
  }

  async get(code: string): Promise<Product> {
    return this.products.find((product) => product.code === code);
  }

  async save(product: Product): Promise<void> {
    const index = this.products.findIndex((p) => p.code === product.code);
    this.products[index] = product;
  }

  async delete(code: string): Promise<void> {
    const product = this.products.find((p) => p.code === code);
    product.status = 'trash';

    const index = this.products.findIndex((p) => p.code === product.code);
    this.products[index] = product;
  }
}
