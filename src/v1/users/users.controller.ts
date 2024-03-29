import { JwtAuthGuard } from 'src/common/modules/jwt-auth/guards/jwt-auth.guard';
import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDTO, UpdateUserDTO } from './dtos';
import { UsersService } from './users.service';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { User } from './users.entity';

@Controller({ version: '1', path: 'users' })
export class UsersController {
  @Inject(UsersService)
  private readonly usersService: UsersService;

  @Get('/profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@CurrentUser() user: User) {
    return this.usersService.selectById(user.id);
  }

  @Post()
  createUser(@Body() body: CreateUserDTO) {
    return this.usersService.create(body);
  }

  @Get()
  getAllUsers() {
    return this.usersService.selectAll();
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.selectById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  updateUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUserDTO,
  ) {
    return this.usersService.update(id, body);
  }
}
