import { Import } from '../entities/import.entity';

export interface ListImportsInput {
  page: number;
  limit: number;
}

export interface ListImportsOutput {
  data: Import[];
  pagination: {
    page: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export abstract class ImportRepositoryInterface {
  abstract create(data: Import): Promise<void>;
  abstract list(input: ListImportsInput): Promise<ListImportsOutput>;
}
