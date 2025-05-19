import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateDiscussionDto } from './create-discussion.dto';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateDiscussionDto extends PartialType(CreateDiscussionDto) {
    @ApiProperty({example: "How to integrate AI",description: "Title of discussion"})
    @IsNotEmpty({ message: "Title is required" })
    @IsString({ message: "Title must be a string" })
    title: string;

    @ApiProperty({example: "how-to-integrate-ai",description: "Slug of discussion"})
    @IsNotEmpty({ message: "Slug is required" })
    @IsString({ message: "Slug must be a string" })
    slug: string;

    @ApiProperty({example: ["nestjs", "swagger", "api"],description: "Tags related to the post",type: [String]})
    @IsNotEmpty({ message: "Tags are required" })
    @IsArray({ message: "Tags must be an array" })
    @IsString({ each: true, message: "Tags must be an array of strings" })
    tags: string[];
    
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
        super()
        this.title = title
        this.description = description
        this.userId = userId
    }
}


export class DiscussionUpdateResponseDto {
    @ApiProperty({example: 200})
    statusCode: number
    
    @ApiProperty({example: "Discussion updated successfully"})
    message: string

    @ApiProperty({example: true})
    success: boolean

    @ApiProperty({example: null})
    data: any
}