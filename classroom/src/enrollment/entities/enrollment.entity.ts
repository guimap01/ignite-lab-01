import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Course } from 'src/course/entities/course.entity';
import { Student } from 'src/student/entities/student.entity';

@ObjectType()
export class Enrollment {
  @Field(() => ID)
  id: string;

  @Field(() => Student)
  student: Student;

  studentId: string;

  @Field(() => Course)
  course: Course;

  courseId: string;

  @Field(() => Date, { nullable: true })
  canceledAt: Date;

  @Field(() => Date)
  createdAt: Date;
}
