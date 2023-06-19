import { Import } from '@core/domain/entities/import.entity';
import {
  ImportRepositoryInterface,
  ListImportsInput,
  ListImportsOutput,
} from '@core/domain/repositories/import-repository.interface';
import { paginate } from 'paginate-arrays-js';

export class InMemoryImportRepository extends ImportRepositoryInterface {
  imports: Import[] = [];

  async create(data: Import): Promise<void> {
    this.imports.push(data);
  }

  async list({ page, limit }: ListImportsInput): Promise<ListImportsOutput> {
    const { data, pagination } = paginate({
      page,
      data: this.imports,
      perPage: limit,
      url: 'http://localhost:3000/imports',
    });

    return {
      data: data as Import[],
      pagination: {
        page,
        total: pagination.total,
        totalPages: pagination.totalPage,
        hasNextPage: pagination.hasNextPage,
        hasPreviousPage: pagination.hasPrevPage,
      },
    };
  }
}
