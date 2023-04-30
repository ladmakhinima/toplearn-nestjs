import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { User } from 'src/v1/users/users.entity';

export const CurrentUser = createParamDecorator(
  (_, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest() as Request;
    const user = User.findOneOrFail({
      where: { id: (request.user as any).id },
    });
    return user;
  },
);
