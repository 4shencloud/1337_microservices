import { IsEmail, IsNumber, IsOptional, IsString } from "class-validator"

export class UserDto {
    @IsString()
    @IsOptional()
    email: string

    @IsEmail()
    @IsOptional()
    name: string
}

export class QueryDto {
    @IsNumber()
    page: number

    @IsNumber()
    pageSize: number
}