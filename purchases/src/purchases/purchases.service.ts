import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { KafkaService } from 'src/messaging/kafka.service';
import { CreatePurchaseInput } from './dto/create-purchase.input';

@Injectable()
export class PurchasesService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly kafkaService: KafkaService,
  ) {}
  async create({ productId }: CreatePurchaseInput, customerId: string) {
    const product = await this.prismaService.product.findUnique({
      where: { id: productId },
    });
    if (!product) {
      throw new BadRequestException('Product not found');
    }
    const customer = await this.prismaService.customer.findUnique({
      where: { id: customerId },
    });
    if (!customer) {
      throw new BadRequestException('Customer not found');
    }
    const purchase = await this.prismaService.purchase.create({
      data: {
        productId,
        customerId,
      },
    });

    this.kafkaService.emit('purchase.created', {
      customer: {
        authUserId: customer.authUserId,
      },
      product,
    });

    return purchase;
  }

  findAll() {
    return this.prismaService.purchase.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  findAllByCustomerId(customerId: string) {
    return this.prismaService.purchase.findMany({
      where: { customerId },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
