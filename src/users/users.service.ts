import { Injectable, NotFoundException } from '@nestjs/common';
import userData from './user_data.json';
import { UserDto, CreateUserDto, UpdateUserDto } from './dto/UserDtos';

@Injectable()
export class UsersService {
  users: UserDto[];
  constructor() {
    this.users = userData.map((user) => {
      return user as UserDto;
    });
  }

  findAll(role?: string): UserDto[] {
    let roleArray: UserDto[] = this.users;
    if (role) {
      roleArray = this.users.filter((user) => user.role === role.toUpperCase());
      if (!roleArray.length) {
        throw new NotFoundException(`Users with role ${role} not found`);
      }
    }
    return roleArray as UserDto[];
  }

  findOne(id: number): UserDto {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  create(user: CreateUserDto): UserDto {
    const id = this.users.length + 1;
    const userWithId = { ...user, id } as UserDto;
    this.users.push(userWithId);
    return userWithId;
  }

  update(id: number, user: UpdateUserDto): UserDto {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    const updatedUser = { ...this.users[userIndex], ...user };
    this.users[userIndex] = updatedUser;
    return updatedUser;
  }

  delete(id: number): UserDto {
    const userIndex = this.users.findIndex((user) => user.id === id);
    const deletedUser = this.users[userIndex];
    if (userIndex === -1) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    this.users = this.users.filter((user) => user.id !== id);
    return deletedUser;
  }
}
