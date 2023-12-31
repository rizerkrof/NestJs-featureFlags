import { RolesGuard } from '@auth/role.guard';
import { UseUser } from '@auth/user.decorator';
import { Controller } from '@decorators/controller';
import { Get, Patch, Post } from '@decorators/httpDecorators';
import { Body, Param, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminUpdateUserDto, CreateUserDto, GetUserDto, UpdateUserDto } from '@test/interfaces';
import { Repository } from 'typeorm';

import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    public readonly service: UserService,
  ) {}

  @Post({ isPublic: true })
  createOne(@Body() userDto: CreateUserDto): Promise<GetUserDto> {
    return this.service.createUser(userDto);
  }

  @Get('/me')
  getMe(@UseUser() user: User): Promise<GetUserDto> {
    return this.service.getUser(user.id);
  }

  @Patch()
  async updateMe(@UseUser() user: User, @Body() userDto: UpdateUserDto): Promise<GetUserDto> {
    return await this.service.updateUser(user.id, userDto);
  }

  @Patch('/:id')
  @UseGuards(new RolesGuard(['admin']))
  updateOne(@Param('id') userId: string, @Body() userDto: AdminUpdateUserDto): Promise<GetUserDto> {
    return this.service.updateUser(userId, userDto);
  }
}
