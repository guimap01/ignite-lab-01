import { UseGuards } from '@nestjs/common';
import { Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';
import { CourseService } from 'src/course/course.service';
import { Course } from 'src/course/entities/course.entity';
import { AuthorizationGuard } from 'src/http/auth/authorization.guard';
import { Student } from 'src/student/entities/student.entity';
import { StudentService } from 'src/student/student.service';
import { EnrollmentService } from './enrollment.service';
import { Enrollment } from './entities/enrollment.entity';

@Resolver(() => Enrollment)
export class EnrollmentResolver {
  constructor(
    private readonly enrollmentService: EnrollmentService,
    private readonly courseService: CourseService,
    private readonly studentService: StudentService,
  ) {}

  @Query(() => [Enrollment], { name: 'enrollments' })
  @UseGuards(AuthorizationGuard)
  findAll() {
    return this.enrollmentService.findAll();
  }

  @ResolveField(() => Course)
  course(@Parent() enrollment: Enrollment) {
    return this.courseService.findOne(enrollment.courseId);
  }
  @ResolveField(() => Student)
  student(@Parent() enrollment: Enrollment) {
    return this.studentService.findOne(enrollment.studentId);
  }
}
