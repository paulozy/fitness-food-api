import { ImportRepositoryInterface } from '@core/domain/repositories/import-repository.interface';
import { CreateImportUseCase } from '../usecases/create-import/create-import.usecase';
import { ListImportsUseCase } from '../usecases/list-imports/list-imports.usecase';

export class ImportUseCasesFactory {
  static create(importRepository: ImportRepositoryInterface) {
    const createImport = new CreateImportUseCase(importRepository);
    const listImports = new ListImportsUseCase(importRepository);

    return {
      createImport,
      listImports,
    };
  }
}
