import { Optional } from "@nestjs/common"
import { IsArray, IsBoolean, IsString } from "class-validator"

export class TestDto {
    @IsString()
    name: string
}
