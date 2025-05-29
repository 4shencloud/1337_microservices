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
    @IsOptional()
    page: number

    @IsNumber()
    @IsOptional()
    pageSize: number
}