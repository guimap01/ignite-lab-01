import { ObjectType, Field, ID, Directive } from '@nestjs/graphql';
import { Purchase } from 'src/purchases/entities/purchase.entity';

@ObjectType('User')
@Directive('@key(fields: "authUserId")')
export class Customer {
  @Field()
  id: string;

  @Field(() => ID)
  authUserId: string;

  @Field(() => [Purchase])
  purchases: Purchase[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
