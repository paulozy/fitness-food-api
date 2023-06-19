import { Product } from '../entities/product.entity';

export interface ListProductsInput {
  page: number;
  limit: number;
}

export abstract class ProductRepositoryInterface {
  abstract exists(code: string): Promise<boolean>;
  abstract create(product: Product): Promise<void>;
  abstract list(data: ListProductsInput): Promise<Product[]>;
  abstract get(code: string): Promise<Product>;
  abstract save(product: Product): Promise<void>;
  abstract delete(code: string): Promise<void>;
}
