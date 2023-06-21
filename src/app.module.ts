import { DatabaseModule } from '@core/infra/database/database.module';
import { HttpModule } from '@core/infra/http/http.module';
import { SyncProductsModule } from '@core/infra/services/sync-products.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    ScheduleModule.forRoot(),
    SyncProductsModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    HttpModule,
    DatabaseModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
