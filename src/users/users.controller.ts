import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ParseIntPipe
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto,UpdateUserDto } from './dto/UserDtos';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get() // GET /users or /users?role=value
  findAll(@Query('role') role?: string) {
    return this.usersService.findAll(role);
  }

  @Get(':id') // GET /users/:id
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Post() // POST /users
  create(@Body(){
    name,
    email,
    role
  }: CreateUserDto) {
    return this.usersService.create({ name, email, role });
  }

  @Patch(':id') // PATCH /users/:id
  update(
    @Param('id', ParseIntPipe) id: number, 
    @Body() user: UpdateUserDto
  ) {
    return this.usersService.update(id, user);
  }

  @Delete(':id') // DELETE /users/:id
  remove(@Param('id', ParseIntPipe) id: number): {} {
    return this.usersService.delete(id);
  }
}
