import { Product } from '../entities/product.entity';

export interface ListProductsInput {
  page: number;
  limit: number;
}

export interface ListProductsOutput {
  data: Product[];
  pagination: {
    page: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export abstract class ProductRepositoryInterface {
  abstract exists(code: string): Promise<boolean>;
  abstract create(product: Product): Promise<void>;
  abstract createMany(products: Product[]): Promise<void>;
  abstract list(data: ListProductsInput): Promise<ListProductsOutput>;
  abstract get(code: string): Promise<Product>;
  abstract save(product: Product): Promise<void>;
  abstract delete(code: string): Promise<void>;
}
