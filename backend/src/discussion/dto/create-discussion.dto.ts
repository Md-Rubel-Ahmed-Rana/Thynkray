import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateDiscussionDto {
    @ApiProperty({example: "How to integrate AI",description: "Title of discussion"})
    @IsNotEmpty({ message: "Title is required" })
    @IsString({ message: "Title must be a string" })
    title: string;

   @ApiPropertyOptional({
        example: "This description explains how AI is being integrated",
        description: "Optional description text for the discussion",
    })
    @IsOptional()
    @IsString({ message: "Description must be a string" })
    description?: string;

    @IsNotEmpty({ message: "Author ID is required" })
    @IsString({ message: "Author ID must be a string" })
    userId: string;

    constructor(title: string, description: string, userId: string){
        this.title = title
        this.description = description
        this.userId = userId
    }
}

export class DiscussionCreateResponseDto {
    @ApiProperty({example: 201})
    statusCode: number
    
    @ApiProperty({example: "Discussion created successfully"})
    message: string

    @ApiProperty({example: true})
    success: boolean

    @ApiProperty({example: null})
    data: any
}