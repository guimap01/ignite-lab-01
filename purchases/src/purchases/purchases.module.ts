import { Module } from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { PurchasesResolver } from './purchases.resolver';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'src/database/database.module';
import { HttpModule } from 'src/http/http.module';
import { ProductsService } from 'src/products/products.service';
import { CustomersService } from 'src/customers/customers.service';
import { MessagingModule } from 'src/messaging/messaging.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    HttpModule,
    MessagingModule,
  ],
  providers: [
    PurchasesResolver,
    PurchasesService,
    ProductsService,
    CustomersService,
  ],
})
export class PurchasesModule {}
