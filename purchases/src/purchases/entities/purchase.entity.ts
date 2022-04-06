import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Product } from 'src/products/entities/product.entity';
import { PurchaseStatus } from './purchase-status.enum';

@ObjectType()
export class Purchase {
  @Field(() => ID)
  id: string;

  @Field(() => PurchaseStatus)
  status: string;

  productId: string;
  customerId: string;

  @Field(() => Product)
  product: Product;

  @Field()
  createdAt: Date;
  @Field()
  updatedAt: Date;
}
