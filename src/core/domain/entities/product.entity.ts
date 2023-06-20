import { Replace } from '@core/utils/replace';
import { InvalidProductCodeError } from '../@errors/invalid-product-code-error';
import { InvalidStatusError } from '../@errors/invalid-status-error';

enum ProductStatus {
  PUBLISHED = 'published',
  DRAFT = 'draft',
  TRASH = 'trash',
}

interface ProductProps {
  code: string;
  status?: string;
  imported_t?: string;
  url: string;
  creator: string;
  created_t: string;
  last_modified_t: string;
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
  serving_quantity: string;
  nutriscore_score: string;
  nutriscore_grade: string;
  main_category: string;
  image_url: string;
}

export class Product {
  code: string;
  status: string;
  imported_t: string;
  url: string;
  creator: string;
  created_t: string;
  last_modified_t: string;
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
  serving_quantity: string;
  nutriscore_score: string;
  nutriscore_grade: string;
  main_category: string;
  image_url: string;

  private constructor(props: ProductProps) {
    const status = props.status || ProductStatus.PUBLISHED;
    const imported_t = props.imported_t || new Date().getTime().toString();
    this.validateStatus(status);

    Object.assign(this, {
      ...props,
      status,
      imported_t,
    });
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
      last_modified_t: String(new Date().getTime()),
    });
  }
}
