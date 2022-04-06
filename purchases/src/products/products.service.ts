import { BadRequestException, Injectable } from '@nestjs/common';
import slugify from 'slugify';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { CreateProductInput } from './dto/create-product.input';

@Injectable()
export class ProductsService {
  constructor(private readonly prismaService: PrismaService) {}
  async create({ title }: CreateProductInput) {
    const slug = slugify(title, { lower: true, trim: true });

    const productWithSameTitle = await this.prismaService.product.findUnique({
      where: { title },
    });

    if (productWithSameTitle) {
      throw new BadRequestException('Product already exists');
    }
    return this.prismaService.product.create({ data: { title, slug } });
  }

  findAll() {
    return this.prismaService.product.findMany();
  }

  findOne(id: string) {
    return this.prismaService.product.findUnique({ where: { id } });
  }
}
