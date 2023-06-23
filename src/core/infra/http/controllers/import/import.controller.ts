import { KeyGuard } from '@core/infra/auth/guards/key.guard';
import { ImportService } from '@core/infra/http/services/import.service';
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('imports')
@Controller('imports')
export class ImportController {
  constructor(private readonly importService: ImportService) {}

  @Get()
  @UseGuards(KeyGuard)
  @ApiOperation({
    summary: 'List all imports',
    description: 'List all imports',
  })
  async list(@Query() query: any) {
    const { page, limit } = query;

    return this.importService.list({
      page,
      limit,
    });
  }
}
