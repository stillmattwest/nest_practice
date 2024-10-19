import { Injectable } from '@nestjs/common';
import userData from './user_data.json';

type Role = 'ADMIN' | 'ENGINEER' | 'INTERN';
interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
}
@Injectable()
export class UsersService {
  users: User[];
    constructor() {
        this.users = userData.map((user) => {
            const userRole = user.role as Role;
            return { ...user, role: userRole } as User;
        });
    }

  findAll(role?: Role): User[] {
    return role ? this.users.filter((user) => user.role === role) : this.users;
  }

  findOne(id: number): {} {
    return this.users.find((user) => user.id === id);
  }

  create(user: { name: string; email: string; role: Role }): User {
    const highestUserId = this.users.reduce(
      (acc, user) => (user.id > acc ? user.id : acc),
      0,
    );
    const newUser: User = { id: highestUserId + 1, ...user };
    this.users.push(newUser);
    return newUser;
  }

  update(
    id: number,
    user: User,
  ): User {
    const userIndex = this.users.findIndex((user) => user.id === id);
    const updatedUser = { ...this.users[userIndex], ...user };
    this.users[userIndex] = updatedUser;
    const userRole = updatedUser.role as Role;
    const updatedUserWithRole = { ...updatedUser, role: userRole };
    return updatedUserWithRole;
  }

  delete(id: number): User {
    const userIndex = this.users.findIndex((user) => user.id === id);
    const deletedUser = this.users.splice(userIndex, 1)[0];
    const userRole = deletedUser.role as Role;
    const deletedUserWithRole = { ...deletedUser, role: userRole };
    return deletedUserWithRole;
  }
}
