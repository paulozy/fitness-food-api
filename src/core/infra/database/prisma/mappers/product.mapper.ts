import { Product } from '@core/domain/entities/product.entity';
import { Product as RawProduct } from '@prisma/client';

export class ProductMapper {
  static toPersistence(product: Product): RawProduct {
    return {
      code: product.code,
      brands: product.brands,
      categories: product.categories,
      cities: product.cities,
      creator: product.creator,
      created_t: product.created_t,
      last_modified_t: product.last_modified_t,
      product_name: product.product_name,
      image_url: product.image_url,
      quantity: product.quantity,
      imported_t: product.imported_t,
      ingredients_text: product.ingredients_text,
      labels: product.labels,
      main_category: product.main_category,
      nutriscore_grade: product.nutriscore_grade,
      nutriscore_score: product.nutriscore_score,
      purchase_places: product.purchase_places,
      serving_quantity: product.serving_quantity,
      serving_size: product.serving_size,
      status: product.status,
      traces: product.traces,
      url: product.url,
      stores: product.stores,
    };
  }

  static toDomain(rawProduct: RawProduct): Product {
    return Product.create(rawProduct);
  }
}
