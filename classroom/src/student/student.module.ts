import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentResolver } from './student.resolver';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { HttpModule } from 'src/http/http.module';
import { ConfigModule } from '@nestjs/config';
import { EnrollmentService } from 'src/enrollment/enrollment.service';

@Module({
  imports: [HttpModule, ConfigModule.forRoot()],
  providers: [
    StudentResolver,
    StudentService,
    PrismaService,
    EnrollmentService,
  ],
  exports: [StudentService],
})
export class StudentModule {}
