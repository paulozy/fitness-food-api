import { Import } from '@core/domain/entities/import.entity';
import { ImportRepositoryInterface } from '@core/domain/repositories/import-repository.interface';
import { InMemoryImportRepository } from '@test/repositories/in-memory-import-repository';
import { ListImportsUseCase } from './list-imports.usecase';

describe('', () => {
  let listImportsUseCase: ListImportsUseCase;
  let importRepository: ImportRepositoryInterface;

  beforeEach(() => {
    importRepository = new InMemoryImportRepository();

    for (let i = 0; i < 10; i++) {
      importRepository.create(
        Import.create({
          status: Math.random() > 0.5 ? 'SUCCESS' : 'FAILED',
          file: 'https://www.google.com',
        }),
      );
    }

    listImportsUseCase = new ListImportsUseCase(importRepository);
  });

  it('shlukd be possible list all imports without params', async () => {
    const { data } = await listImportsUseCase.execute({});

    expect(data).toHaveLength(10);
  });
});
