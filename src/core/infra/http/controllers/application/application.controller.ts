import { ListImportsUseCase } from '@core/app/usecases/list-imports/list-imports.usecase';
import { PrismaService } from '@core/infra/database/prisma/prisma.service';
import { checkDatabaseHealthy } from '@core/utils/check-database-helthy';
import { getMemoryUsage } from '@core/utils/get-memory-usage';
import { getUptime } from '@core/utils/get-uptime';
import { Controller, Get, Logger } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('application details')
@Controller()
export class ApplicationController {
  logger = new Logger(ApplicationController.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly listImports: ListImportsUseCase,
  ) {}

  @Get()
  async get() {
    const uptime = getUptime();
    const memoryUsage = getMemoryUsage();
    const database = await checkDatabaseHealthy(this.prisma);

    const { data } = await this.listImports.execute({ page: 1, limit: 1 });
    const lastTimeCronRan = new Date(+data[0]?.created_at).toISOString();

    return {
      uptime,
      database,
      lastTimeCronRan,
      memoryUsage,
    };
  }
}
