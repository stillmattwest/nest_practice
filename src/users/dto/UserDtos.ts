import { PartialType, OmitType } from "@nestjs/mapped-types";

export class UserDto{
    id:number;
    name:string;
    email:string;
    role:"Intern"|"Engineer"|"Admin";
}

export class CreateUserDto extends OmitType(UserDto,["id"] as const){}

export class UpdateUserDto extends PartialType(UserDto){}