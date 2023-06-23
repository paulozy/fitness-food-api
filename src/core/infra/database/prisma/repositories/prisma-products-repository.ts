import { Product } from '@core/domain/entities/product.entity';
import {
  ListProductsInput,
  ListProductsOutput,
  ProductRepositoryInterface,
} from '@core/domain/repositories/product-repository.interface';
import { Injectable } from '@nestjs/common';
import { paginate } from 'paginate-arrays-js';
import { ProductMapper } from '../mappers/product.mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
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

    await this.prisma.product.upsert({
      where: { code: product.code },
      update: rawProduct,
      create: rawProduct,
    });
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
    const products = await this.prisma.product.findMany({
      where: {
        status: 'published',
      },
    });

    const { data, pagination } = paginate({
      page,
      url: '',
      data: products,
      perPage: limit,
    });

    return {
      data: data.map(ProductMapper.toDomain),
      pagination: {
        page: pagination.currentPage,
        total: pagination.total,
        totalPages: pagination.totalPage,
        hasNextPage: pagination.hasNextPage,
        hasPreviousPage: pagination.hasPrevPage,
      },
    };
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
    await this.prisma.product.update({
      where: { code },
      data: { status: 'trash' },
    });
  }
}
