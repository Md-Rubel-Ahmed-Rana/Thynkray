import { ApiProperty } from "@nestjs/swagger";
import { User } from "@prisma/client";

export class GetDiscussionDto {
    @ApiProperty({ example: "1d8f9b1a-0a34-4a17-a1d6-5cfb5e2cb0a7" })
    id: string;

    @ApiProperty({ example: "How to integrate AI" })
    title: string;

   @ApiProperty({ example: "This description explains how AI is being integrated"})
    description: string;

    @ApiProperty({ example: {id: "1d8f9b1a-0a34-4a17-a1d6-5cfb5e2cb0a7", name: "Md Rubel"} })
    user: Partial<User>;

    @ApiProperty()
    createdAt: Date

    @ApiProperty()
    updatedAt: Date

    constructor(
        title: string, 
        description: string, 
        user: Partial<User>, 
        createdAt: Date, 
        updatedAt:Date){
        this.title = title
        this.description = description
        this.user = user
        this.createdAt = createdAt
        this.updatedAt = updatedAt
    }
}

export class DiscussionsGetResponseDto {
    @ApiProperty({example: 200})
    statusCode: number
    
    @ApiProperty({example: "Discussions retrieved successfully"})
    message: string

    @ApiProperty({example: true})
    success: boolean

    @ApiProperty({example: [GetDiscussionDto]})
    data: GetDiscussionDto[]
}

export class DiscussionGetResponseDto {
    @ApiProperty({example: 200})
    statusCode: number
    
    @ApiProperty({example: "Discussions retrieved successfully"})
    message: string

    @ApiProperty({example: true})
    success: boolean

    @ApiProperty({example: GetDiscussionDto})
    data: GetDiscussionDto
}