import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateAnswerDto } from './create-answer.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateAnswerDto extends PartialType(CreateAnswerDto) {
    @ApiProperty({example: "How to design database schema using mongoose"})
    @IsNotEmpty({message: "Content is required"})
    @IsString({message: "Content must be string"})
    content:  string
    constructor(content: string){
        super()
        this.content=  content
    }
}


export class AnswerUpdateResponseDto {
    @ApiProperty({example: 200})
    statusCode: number
    
    @ApiProperty({example: "Answer updated successfully"})
    message: string

    @ApiProperty({example: true})
    success: boolean

    @ApiProperty({example: null})
    data: any
}