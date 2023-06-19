import { Product } from '@core/domain/entities/product.entity';
import {
  ListProductsInput,
  ProductRepositoryInterface,
} from '@core/domain/repositories/product-repository.interface';
import { ProductMapper } from '../mappers/product.mapper';
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
