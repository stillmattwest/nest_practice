import { PartialType, OmitType } from '@nestjs/mapped-types';
import {
  IsEmail,
  IsString,
  IsNumber,
  IsNotEmpty,
  IsEnum,
} from 'class-validator';

export class UserDto {
  @IsNumber()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsEnum(['Intern', 'Engineer', 'Admin'], {
    message: 'Valid role required',
  })
  role: 'Intern' | 'Engineer' | 'Admin';
}

export class CreateUserDto extends OmitType(UserDto, ['id'] as const) {}

export class UpdateUserDto extends PartialType(UserDto) {}
