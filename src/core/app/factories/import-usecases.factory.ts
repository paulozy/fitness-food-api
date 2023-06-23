import { ImportRepositoryInterface } from '@core/domain/repositories/import-repository.interface';
import { CreateImportUseCase } from '../usecases/create-import/create-import.usecase';
import { ListImportsUseCase } from '../usecases/list-imports/list-imports.usecase';

export interface ImportUseCasesInterface {
  create: CreateImportUseCase;
  list: ListImportsUseCase;
}

export const ImportUseCases = {
  provide: 'ImportUseCases',
  useFactory: (importRepository: ImportRepositoryInterface) => {
    return {
      create: new CreateImportUseCase(importRepository),
      list: new ListImportsUseCase(importRepository),
    };
  },
  inject: [ImportRepositoryInterface],
};
