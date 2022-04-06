import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { EnrollmentService } from 'src/enrollment/enrollment.service';
import { AuthorizationGuard } from 'src/http/auth/authorization.guard';
import { AuthUser, CurrentUser } from 'src/http/auth/current-user';
import { StudentService } from 'src/student/student.service';
import { CourseService } from './course.service';
import { CreateCourseInput } from './dto/create-course.input';
import { Course } from './entities/course.entity';

@Resolver(() => Course)
export class CourseResolver {
  constructor(
    private readonly courseService: CourseService,
    private readonly studentService: StudentService,
    private readonly enrollmentService: EnrollmentService,
  ) {}

  @Query(() => [Course], { name: 'courses' })
  @UseGuards(AuthorizationGuard)
  findAll() {
    return this.courseService.findAll();
  }

  @Query(() => Course, { name: 'course' })
  @UseGuards(AuthorizationGuard)
  async findOne(@Args('id') id: string, @CurrentUser() user: AuthUser) {
    const student = await this.studentService.findByAuthUserId(user.sub);
    const enrollment = await this.enrollmentService.getByCourseAndStudentId(
      student.id,
      id,
    );

    if (!enrollment) {
      throw new UnauthorizedException('You are not enrolled in this course');
    }

    return this.courseService.findOne(id);
  }
  @Mutation(() => Course, { name: 'createCourse' })
  @UseGuards(AuthorizationGuard)
  create(@Args('createCourseInput') createCourseInput: CreateCourseInput) {
    return this.courseService.create(createCourseInput);
  }
}
