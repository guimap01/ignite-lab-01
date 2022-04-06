import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { resolve } from 'node:path';
import { DatabaseModule } from './database/database.module';
import { HttpModule } from './http/http.module';
import { ProductsModule } from './products/products.module';
import { PurchasesModule } from './purchases/purchases.module';
import { CustomersModule } from './customers/customers.module';
import { MessagingModule } from './messaging/messaging.module';

@Module({
  imports: [
    DatabaseModule,
    HttpModule,
    ProductsModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: resolve(process.cwd(), 'src/schema.gql'),
    }),
    PurchasesModule,
    CustomersModule,
    MessagingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
