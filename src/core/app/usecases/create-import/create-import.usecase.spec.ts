import { ImportRepositoryInterface } from '@core/domain/repositories/import-repository.interface';
import { InMemoryImportRepository } from '@test/repositories/in-memory-import-repository';
import { CreateImportUseCase } from './create-import.usecase';

describe('Create Import UseCase', () => {
  let createImportUseCase: CreateImportUseCase;
  let importRepository: ImportRepositoryInterface;
  const payload = {
    status: 'SUCCESS',
    file: 'https://www.google.com',
  };

  beforeEach(() => {
    importRepository = new InMemoryImportRepository();
    createImportUseCase = new CreateImportUseCase(importRepository);
  });

  it('should be possible create a new import', async () => {
    await createImportUseCase.execute(payload);

    const imports = await importRepository.list({
      page: 1,
      limit: 10,
    });

    expect(imports.data.length).toBe(1);
  });
});
