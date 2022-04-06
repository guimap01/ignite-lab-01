import { Module } from '@nestjs/common';
import { CourseModule } from 'src/course/course.module';
import { EnrollmentModule } from 'src/enrollment/enrollment.module';
import { StudentModule } from 'src/student/student.module';
import { PurchaseController } from './purchase/purchases.controller';

@Module({
  imports: [StudentModule, CourseModule, EnrollmentModule],
  controllers: [PurchaseController],
})
export class MessagingModule {}
