import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Enrollment } from 'src/enrollment/entities/enrollment.entity';

@ObjectType()
export class Student {
  @Field(() => ID)
  id: string;

  @Field(() => [Enrollment])
  enrollments: Enrollment[];
}
