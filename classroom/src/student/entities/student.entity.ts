import { ObjectType, Field, ID, Directive } from '@nestjs/graphql';
import { Enrollment } from 'src/enrollment/entities/enrollment.entity';

@ObjectType('User')
@Directive('@extends')
@Directive('@key(fields: "authUserId")')
export class Student {
  id: string;

  @Field(() => ID)
  @Directive('@external')
  authUserId: string;

  @Field(() => [Enrollment])
  enrollments: Enrollment[];
}
