import { IsEmail, IsOptional, IsString } from "class-validator"

export class UserDto {

    @IsString()
    @IsOptional()
    email: string

    @IsEmail()
    @IsOptional()
    name: string
}