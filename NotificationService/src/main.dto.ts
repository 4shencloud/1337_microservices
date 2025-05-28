import { Optional } from "@nestjs/common"
import { IsArray, IsBoolean, IsString } from "class-validator"

export class TestDto {
    @IsString()
    name: string
}

export class QueryDto {
    @IsString()
    @Optional()
    jobDescription: string

    @IsBoolean()
    @Optional()
    isFile: boolean
}