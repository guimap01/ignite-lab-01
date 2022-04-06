import { Module } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { EnrollmentResolver } from './enrollment.resolver';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from 'src/http/http.module';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { CourseService } from 'src/course/course.service';
import { StudentService } from 'src/student/student.service';

@Module({
  imports: [ConfigModule.forRoot(), HttpModule],
  providers: [
    EnrollmentResolver,
    EnrollmentService,
    PrismaService,
    CourseService,
    StudentService,
  ],
})
export class EnrollmentModule {}
