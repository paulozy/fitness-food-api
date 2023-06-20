import { InvalidStatusError } from '@core/domain/@errors/invalid-status-error';
import { Import } from '@core/domain/entities/import.entity';
import { ImportRepositoryInterface } from '@core/domain/repositories/import-repository.interface';
import { CreateImportDTO } from './create-import.dto';

export class CreateImportUseCase {
  constructor(private readonly importRepository: ImportRepositoryInterface) {}

  async execute(input: CreateImportDTO): Promise<void> {
    try {
      const cimport = Import.create(input);

      await this.importRepository.create(cimport);
    } catch (error) {
      switch (error.constructor) {
        case InvalidStatusError:
          throw new Error(error.message);
        default:
          throw new Error('Unexpected error');
      }
    }
  }
}
