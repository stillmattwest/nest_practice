import { Injectable } from '@nestjs/common';
import userData from './user_data.json';

import { UserDto,CreateUserDto,UpdateUserDto } from './dto/UserDtos';


@Injectable()
export class UsersService {
  users: UserDto[];
    constructor() {
        this.users = userData.map((user) => {
          return user as UserDto;
    });
  }

  findAll(role?:string): UserDto[] {
    if(role){
        return this.users.filter((user) => user.role === role);
    }
    return this.users;
  }

  findOne(id: number): UserDto {
    return this.users.find((user) => user.id === id);
  }

  create(user:CreateUserDto):UserDto {
    const id = this.users.length + 1;
    const userWithId = { ...user, id } as UserDto;
    this.users.push(userWithId);
    return userWithId;
  }

  update(
    id: number,
    user: UpdateUserDto
  ): UserDto {
    const userIndex = this.users.findIndex((user) => user.id === id);
    const updatedUser = { ...this.users[userIndex], ...user };
    this.users[userIndex] = updatedUser;
    return updatedUser;
  }

  delete(id: number): UserDto {
    const userIndex = this.users.findIndex((user) => user.id === id);
    const deletedUser = this.users[userIndex];
    this.users = this.users.filter((user) => user.id !== id);
    return deletedUser;
  }
}
