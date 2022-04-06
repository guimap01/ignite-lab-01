import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export interface AuthUser {
  sub: string;
}

export const CurrentUser = createParamDecorator(
  (data: any, context: ExecutionContext): AuthUser => {
    const request = GqlExecutionContext.create(context).getContext().req;
    return request.user;
  },
);
