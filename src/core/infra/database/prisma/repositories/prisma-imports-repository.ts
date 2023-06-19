import { Import } from '@core/domain/entities/import.entity';
import {
  ImportRepositoryInterface,
  ListImportsInput,
  ListImportsOutput,
} from '@core/domain/repositories/import-repository.interface';
import { paginate } from 'paginate-arrays-js';
import { ImportMapper } from '../mappers/import.mappert';
import { PrismaService } from '../prisma.service';

export class PrismaImportRepository implements ImportRepositoryInterface {
  constructor(private prisma: PrismaService) {}

  async create(data: Import): Promise<void> {
    const rawImport = ImportMapper.toPersistence(data);

    await this.prisma.import.create({
      data: rawImport,
    });
  }

  async list(input: ListImportsInput): Promise<ListImportsOutput> {
    const imports = await this.prisma.import.findMany({});

    const { data, pagination } = paginate({
      url: '',
      page: input.page,
      data: imports,
      perPage: input.limit,
    });

    return {
      data: data.map(ImportMapper.toDomain),
      pagination: {
        page: pagination.currentPage,
        total: pagination.total,
        totalPages: pagination.totalPage,
        hasNextPage: pagination.hasNextPage,
        hasPreviousPage: pagination.hasPrevPage,
      },
    };
  }
}
