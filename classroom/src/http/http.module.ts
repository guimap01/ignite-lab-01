import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule],
  providers: [],
})
export class HttpModule {}
