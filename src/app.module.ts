import { DatabaseModule } from '@core/infra/database/database.module';
import { HttpModule } from '@core/infra/http/http.module';
import { SyncProductsModule } from '@core/infra/services/sync-products.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    SyncProductsModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    HttpModule,
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
