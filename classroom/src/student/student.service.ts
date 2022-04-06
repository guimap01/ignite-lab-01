import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Injectable()
export class StudentService {
  constructor(private readonly prismaService: PrismaService) {}

  findAll() {
    return this.prismaService.student.findMany();
  }
  findOne(id: string) {
    return this.prismaService.student.findUnique({ where: { id } });
  }
  async findByAuthUserId(authUserId: string) {
    let user = await this.prismaService.student.findUnique({
      where: { authUserId },
    });

    if (!user) {
      user = await this.prismaService.student.create({
        data: {
          authUserId,
        },
      });
    }
    return user;
  }
}
