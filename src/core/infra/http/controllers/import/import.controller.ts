import { ListImportsUseCase } from '@core/app/usecases/list-imports/list-imports.usecase';
import { KeyGuard } from '@core/infra/auth/guards/key.guard';
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  UseGuards,
} from '@nestjs/common';

@Controller('imports')
export class ImportController {
  constructor(private readonly listImports: ListImportsUseCase) {}

  @Get()
  @UseGuards(KeyGuard)
  @HttpCode(HttpStatus.OK)
  async list(@Query() query: any) {
    const { page, limit } = query;

    const imports = await this.listImports.execute({
      page,
      limit,
    });

    return imports;
  }
}
