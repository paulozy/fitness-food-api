import { Product } from '../entities/product.entity';

export abstract class ProductRepositoryInterface {
  abstract exists(code: number): Promise<boolean>;
  abstract create(product: Product): Promise<void>;
  abstract list(): Promise<Product[]>;
  abstract get(code: number): Promise<Product>;
  abstract save(product: Product): Promise<void>;
}
