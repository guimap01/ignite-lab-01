import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CourseService } from 'src/course/course.service';
import { EnrollmentService } from 'src/enrollment/enrollment.service';
import { StudentService } from 'src/student/student.service';
import { PurchaseCreatedPayload } from './dtos/purchase-created.payload';

@Controller()
export class PurchaseController {
  constructor(
    private readonly studentService: StudentService,
    private readonly courseService: CourseService,
    private readonly enrollmentService: EnrollmentService,
  ) {}
  @EventPattern('purchase.created')
  async purchaseCreated(
    @Payload('value') { customer, product }: PurchaseCreatedPayload,
  ) {
    const student = await this.studentService.findByAuthUserId(
      customer.authUserId,
    );
    let course = await this.courseService.findBySlug(product.slug);

    if (!course) {
      course = await this.courseService.create({ title: product.title });
    }

    await this.enrollmentService.create(student.id, course.id);
  }
}
