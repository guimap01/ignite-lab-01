import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { CreatePurchaseInput } from './dto/create-purchase.input';

@Injectable()
export class PurchasesService {
  constructor(private readonly prismaService: PrismaService) {}
  create({ productId }: CreatePurchaseInput, customerId: string) {
    return this.prismaService.purchase.create({
      data: {
        productId,
        customerId,
      },
    });
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
