import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateEnrollmentInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
