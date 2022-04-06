import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseResolver } from './course.resolver';
import { HttpModule } from 'src/http/http.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { StudentService } from 'src/student/student.service';
import { EnrollmentService } from 'src/enrollment/enrollment.service';

@Module({
  imports: [HttpModule, ConfigModule.forRoot()],
  providers: [
    CourseResolver,
    CourseService,
    PrismaService,
    StudentService,
    EnrollmentService,
  ],
})
export class CourseModule {}
