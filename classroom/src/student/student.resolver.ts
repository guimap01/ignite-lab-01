import { Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';
import { StudentService } from './student.service';
import { Student } from './entities/student.entity';
import { UseGuards } from '@nestjs/common';
import { AuthorizationGuard } from 'src/http/auth/authorization.guard';
import { Enrollment } from 'src/enrollment/entities/enrollment.entity';
import { EnrollmentService } from 'src/enrollment/enrollment.service';

@Resolver(() => Student)
export class StudentResolver {
  constructor(
    private readonly studentService: StudentService,
    private readonly enrollmentService: EnrollmentService,
  ) {}

  @Query(() => [Student], { name: 'students' })
  @UseGuards(AuthorizationGuard)
  findAll() {
    return this.studentService.findAll();
  }

  @ResolveField(() => [Enrollment])
  enrollments(@Parent() student: Student) {
    return this.enrollmentService.findAllByStudentId(student.id);
  }
}
