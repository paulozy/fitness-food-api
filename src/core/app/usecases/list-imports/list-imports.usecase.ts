import { ImportRepositoryInterface } from '@core/domain/repositories/import-repository.interface';
import { ListImportsUseCaseDTO } from './list-imports.dto';

export class ListImportsUseCase {
  constructor(private readonly importRepository: ImportRepositoryInterface) {}

  async execute({ page = 1, limit = 10 }: ListImportsUseCaseDTO) {
    try {
      const { data, pagination } = await this.importRepository.list({
        page,
        limit,
      });

      return { data, pagination };
    } catch (error) {
      console.log(error);
      throw new Error('Unexpected error');
    }
  }
}
