import { Product } from '../entities/product.entity';

export interface ListProductsInput {
  page: number;
  limit: number;
}

export abstract class ProductRepositoryInterface {
  abstract exists(code: number): Promise<boolean>;
  abstract create(product: Product): Promise<void>;
  abstract list(data: ListProductsInput): Promise<Product[]>;
  abstract get(code: number): Promise<Product>;
  abstract save(product: Product): Promise<void>;
}
