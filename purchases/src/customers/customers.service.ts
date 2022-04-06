import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { CreateCustomerInput } from './dto/create-customer.input';

@Injectable()
export class CustomersService {
  constructor(private readonly prismaService: PrismaService) {}

  create({ authUserId }: CreateCustomerInput) {
    return this.prismaService.customer.create({
      data: {
        authUserId,
      },
    });
  }
  async findOne(id: string) {
    const customer = await this.prismaService.customer.findUnique({
      where: { id },
    });
    if (!customer) {
      throw new BadRequestException(`Customer with id ${id} not found`);
    }
    return customer;
  }
  findOneByAuthUserId(authUserId: string) {
    return this.prismaService.customer.findUnique({
      where: { authUserId },
    });
  }
}
