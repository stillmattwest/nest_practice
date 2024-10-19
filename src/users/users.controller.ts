import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';

type Role = 'ADMIN' | 'ENGINEER' | 'INTERN';
interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
}

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get() // GET /users or /users?role=value
  findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    return this.usersService.findAll(role);
  }

  @Get(':id') // GET /users/:id
  findOne(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }

  @Post() // POST /users
  create(@Body() user: { name: string; email: string; role: Role }): User {
    return this.usersService.create(user);
  }

  @Patch(':id') // PATCH /users/:id
  update(
    @Param(':id') id: number, // Use ParseIntPipe to convert string param to number
    @Body() user: User, // Define the 'User' type properly
  ): User {
    return this.usersService.update(id, user);
  }

  @Delete(':id') // DELETE /users/:id
  remove(@Param('id') id: number): User {
    return this.usersService.delete(id);
  }
}
