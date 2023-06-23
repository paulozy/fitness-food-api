import { ImportUseCasesInterface } from '@core/app/factories/import-usecases.factory';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class ImportService {
  constructor(
    @Inject('ImportUseCases') private useCases: ImportUseCasesInterface,
  ) {}

  async create(data: any) {
    return this.useCases.create.execute(data);
  }

  async list({ page, limit }: { page: number; limit: number }) {
    return this.useCases.list.execute({
      page,
      limit,
    });
  }
}
