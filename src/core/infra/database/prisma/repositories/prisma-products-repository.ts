import { Product } from '@core/domain/entities/product.entity';
import {
  ListProductsInput,
  ProductRepositoryInterface,
} from '@core/domain/repositories/product-repository.interface';
import { Product as RawProduct } from '@prisma/client';
import { PrismaService } from '../prisma.service';

export class PrismaProductRepository implements ProductRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}

  async exists(code: string): Promise<boolean> {
    const exists = await this.prisma.product.findUnique({
      where: {
        code,
      },
    });

    return !!exists;
  }

  async create(product: Product): Promise<void> {
    const rawProduct = ProductMapper.toPersistence(product);
    await this.prisma.product.create({ data: rawProduct });
  }

  async list({ page, limit }: ListProductsInput): Promise<Product[]> {
    const products = await this.prisma.product.findMany({
      skip: page * limit,
      take: limit,
    });

    return products.map(ProductMapper.toDomain);
  }

  async get(code: string): Promise<Product> {
    const product = await this.prisma.product.findUnique({
      where: { code },
    });

    return ProductMapper.toDomain(product);
  }

  async save(product: Product): Promise<void> {
    const rawProduct = ProductMapper.toPersistence(product);
    await this.prisma.product.update({
      where: { code: product.code },
      data: rawProduct,
    });
  }

  async delete(code: string): Promise<void> {
    await this.prisma.product.delete({ where: { code } });
  }
}

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
