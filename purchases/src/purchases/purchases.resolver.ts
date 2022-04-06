import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { PurchasesService } from './purchases.service';
import { Purchase } from './entities/purchase.entity';
import { CreatePurchaseInput } from './dto/create-purchase.input';
import { UseGuards } from '@nestjs/common';
import { AuthorizationGuard } from 'src/http/auth/authorization.guard';
import { ProductsService } from 'src/products/products.service';
import { AuthUser, CurrentUser } from 'src/http/auth/current-user';
import { CustomersService } from 'src/customers/customers.service';
import { Product } from 'src/products/entities/product.entity';

@Resolver(() => Purchase)
export class PurchasesResolver {
  constructor(
    private readonly purchasesService: PurchasesService,
    private readonly productService: ProductsService,
    private readonly customerService: CustomersService,
  ) {}

  @Mutation(() => Purchase)
  @UseGuards(AuthorizationGuard)
  async createPurchase(
    @Args('createPurchaseInput') createPurchaseInput: CreatePurchaseInput,
    @CurrentUser() user: AuthUser,
  ) {
    let customer = await this.customerService.findOneByAuthUserId(user.sub);

    if (!customer) {
      const { sub } = user;
      customer = await this.customerService.create({
        authUserId: sub,
      });
    }

    return this.purchasesService.create(createPurchaseInput, customer.id);
  }

  @UseGuards(AuthorizationGuard)
  @Query(() => [Purchase], { name: 'purchases' })
  findAll() {
    return this.purchasesService.findAll();
  }

  @ResolveField(() => Product)
  product(@Parent() purchase: Purchase) {
    return this.productService.findOne(purchase.productId);
  }
}
