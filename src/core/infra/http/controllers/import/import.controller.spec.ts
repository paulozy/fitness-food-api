import { ListImportsUseCase } from '@core/app/usecases/list-imports/list-imports.usecase';
import { Import } from '@core/domain/entities/import.entity';
import { ImportRepositoryInterface } from '@core/domain/repositories/import-repository.interface';
import { faker } from '@faker-js/faker';
import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { InMemoryImportRepository } from '@test/repositories/in-memory-import-repository';
import { ImportController } from './import.controller';

describe('Import Controller', () => {
  let controller: ImportController;
  let importRepository: ImportRepositoryInterface;

  beforeAll(async () => {
    importRepository = new InMemoryImportRepository();

    for (let i = 0; i < 10; i++) {
      importRepository.create(
        Import.create({
          status: Math.random() >= 0.5 ? 'SUCCESS' : 'FAILED',
          file: faker.system.fileName(),
        }),
      );
    }
  });

  beforeEach(async () => {
    const listImports = new ListImportsUseCase(importRepository);

    const module = await Test.createTestingModule({
      controllers: [ImportController],
      providers: [
        InMemoryImportRepository,
        {
          provide: ListImportsUseCase,
          useValue: listImports,
        },
      ],
      imports: [ConfigModule.forRoot()],
    }).compile();

    controller = module.get<ImportController>(ImportController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be possible list all imports', async () => {
    const imports = await controller.list({});

    expect(imports).toBeDefined();
    expect(imports.data.length).toBe(10);
  });
});
