import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { CustomersService } from './customers.service';
import { CustomersResolver } from './customers.resolver';
import { DatabaseModule } from 'src/database/database.module';
import { HttpModule } from 'src/http/http.module';
import { PurchasesService } from 'src/purchases/purchases.service';

@Module({
  imports: [DatabaseModule, HttpModule, ConfigModule.forRoot()],
  providers: [CustomersResolver, CustomersService, PurchasesService],
})
export class CustomersModule {}
