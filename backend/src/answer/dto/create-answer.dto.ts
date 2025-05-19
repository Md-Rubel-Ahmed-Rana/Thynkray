import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class CreateAnswerDto {
    @ApiProperty({example: "How to design database schema using mongoose"})
    @IsNotEmpty({message: "Content is required"})
    @IsString({message: "Content must be string"})
    content:  string

    @ApiProperty({example: "1d8f9b1a-0a34-4a17-a1d6-5cfb5e2cb0a7"})
    @IsNotEmpty({message: "Discussion id is required"})
    @IsString({message: "Discussion id  must be string"})
    discussionId: string

    @ApiProperty({example: "1d8f9b1a-0a34-4a17-a1d6-5cfb5e2cb0a7"})
    @IsNotEmpty({message: "User id is required"})
    @IsString({message: "User id  must be string"})
    userId: string 

    constructor(content: string, discussionId: string, userId: string){
        this.content=  content,
        this.discussionId= discussionId,
        this.userId= userId
    }
}


export class AnswerCreateResponseDto {
    @ApiProperty({example: 201})
    statusCode: number
    
    @ApiProperty({example: "Answer added successfully"})
    message: string

    @ApiProperty({example: true})
    success: boolean

    @ApiProperty({example: null})
    data: any
}