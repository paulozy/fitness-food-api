import { Replace } from '@core/utils/replace';
import { InvalidProductCodeError } from '../@errors/invalid-product-code-error';
import { InvalidStatusError } from '../@errors/invalid-status-error';

enum ProductStatus {
  PUBLISHED = 'published',
  DRAFT = 'draft',
  TRASH = 'trash',
}

interface ProductProps {
  code: number;
  url: string;
  creator: string;
  created_t: number;
  last_modified_t: number;
  product_name: string;
  quantity: string;
  brands: string;
  categories: string;
  labels: string;
  cities: string;
  purchase_places: string;
  stores: string;
  ingredients_text: string;
  traces: string;
  serving_size: string;
  serving_quantity: number;
  nutriscore_score: number;
  nutriscore_grade: string;
  main_category: string;
  image_url: string;
}

export class Product {
  code: number;
  status: string;
  imported_t: string;
  url: string;
  creator: string;
  created_t: number;
  last_modified_t: number;
  product_name: string;
  quantity: string;
  brands: string;
  categories: string;
  labels: string;
  cities: string;
  purchase_places: string;
  stores: string;
  ingredients_text: string;
  traces: string;
  serving_size: string;
  serving_quantity: number;
  nutriscore_score: number;
  nutriscore_grade: string;
  main_category: string;
  image_url: string;

  private constructor(props: ProductProps) {
    Object.assign(this, props);

    this.status = ProductStatus.PUBLISHED;
    this.imported_t = new Date().toISOString();
  }

  public static create(props: ProductProps): Product {
    if (!Product.validate(props)) {
      throw new InvalidProductCodeError(props.code);
    }

    return new Product(props);
  }

  public static validate(props: ProductProps): boolean {
    if (!props.code) {
      return false;
    }

    return true;
  }

  private validateStatus(status: string): void {
    if (!Object.values(ProductStatus).includes(status as ProductStatus)) {
      throw new InvalidStatusError(status);
    }
  }

  public update(
    props: Partial<Replace<ProductProps, { status?: string }>>,
  ): void {
    if (props.status) {
      this.validateStatus(props.status);
    }

    Object.assign(this, {
      ...props,
      last_modified_t: new Date().getTime(),
    });
  }
}
