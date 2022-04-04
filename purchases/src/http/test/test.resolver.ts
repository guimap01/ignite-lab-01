import { Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Resolver()
export class TestResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => String)
  async test() {
    return '123';
  }
}
