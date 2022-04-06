import { BadRequestException, Injectable } from '@nestjs/common';
import slugify from 'slugify';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { CreateCourseInput } from './dto/create-course.input';

@Injectable()
export class CourseService {
  constructor(private readonly prismaService: PrismaService) {}

  async create({ title }: CreateCourseInput) {
    const course = await this.prismaService.course.findUnique({
      where: { title },
    });

    if (course) {
      throw new BadRequestException('Course already exists');
    }
    const slug = slugify(title, { lower: true, trim: true });
    return this.prismaService.course.create({ data: { title, slug } });
  }

  findBySlug(slug: string) {
    return this.prismaService.course.findUnique({
      where: { slug },
    });
  }

  findAll() {
    return this.prismaService.course.findMany();
  }
  findOne(id: string) {
    return this.prismaService.course.findUnique({ where: { id } });
  }
}
