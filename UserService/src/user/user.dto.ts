import { Type } from "class-transformer";
import { IsEmail, IsNumber, IsOptional, IsString } from "class-validator"

export class UserDto {
    @IsEmail()
    @IsOptional()
    email: string

    @IsString()
    @IsOptional()
    name: string
}

export class QueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  pageSize: number;
}