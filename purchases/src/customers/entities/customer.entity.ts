import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Purchase } from 'src/purchases/entities/purchase.entity';

@ObjectType()
export class Customer {
  @Field(() => ID)
  id: string;

  @Field()
  authUserId: string;

  @Field(() => [Purchase])
  purchases: Purchase[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
