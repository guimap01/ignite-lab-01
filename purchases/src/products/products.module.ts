import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';
import { DatabaseModule } from 'src/database/database.module';
import { HttpModule } from 'src/http/http.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, HttpModule],
  providers: [ProductsResolver, ProductsService],
})
export class ProductsModule {}
