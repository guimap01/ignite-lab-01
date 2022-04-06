import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Injectable()
export class EnrollmentService {
  constructor(private readonly prismaService: PrismaService) {}

  create(studentId: string, courseId: string) {
    return this.prismaService.enrollment.create({
      data: {
        studentId,
        courseId,
      },
    });
  }

  getByCourseAndStudentId(studentId: string, courseId: string) {
    return this.prismaService.enrollment.findFirst({
      where: {
        studentId,
        courseId,
        canceledAt: null,
      },
    });
  }
  findAll() {
    return this.prismaService.enrollment.findMany({
      where: {
        canceledAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
  findAllByStudentId(studentId: string) {
    return this.prismaService.enrollment.findMany({
      where: {
        studentId,
        canceledAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
