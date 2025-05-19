import { ApiProperty } from "@nestjs/swagger";
import { Answer, User } from "@prisma/client";

export class GetDiscussionDto {
    @ApiProperty({ example: "1d8f9b1a-0a34-4a17-a1d6-5cfb5e2cb0a7" })
    id: string;

    @ApiProperty({ example: "How to integrate AI" })
    title: string;

    @ApiProperty({ example: "How to integrate AI" })
    slug: string;

    @ApiProperty({ example: "How to integrate AI" })
    tags: string[];

   @ApiProperty({ example: "This description explains how AI is being integrated"})
    description: string;

    @ApiProperty({ example: {id: "1d8f9b1a-0a34-4a17-a1d6-5cfb5e2cb0a7", name: "Md Rubel"} })
    user: Partial<User>;
    
    @ApiProperty({ example: 0 })
    totalAnswer: number;

    @ApiProperty({ example: 0 })
    views: number;

    @ApiProperty({ example: [] })
    answers: Answer[];

    @ApiProperty({ example: 0 })
    _count: {answers: number};

    @ApiProperty()
    createdAt: Date

    @ApiProperty()
    updatedAt: Date

    constructor(
        id: string,
        title: string, 
        slug: string, 
        tags: string[], 
        description: string, 
        user: Partial<User>, 
        totalAnswer: number, 
        answers: Answer[],
        views: number, 
        createdAt: Date, 
        updatedAt:Date
    ){
        this.id = id
        this.title = title
        this.slug = slug
        this.tags = tags
        this.description = description
        this.user = user
        this.totalAnswer = totalAnswer
        this.answers = answers,
        this.views = views, 
        this.createdAt = createdAt
        this.updatedAt = updatedAt
    }

     static sanitize(object: any) {
        return {
            id: object.id,
            title: object.title,
            slug: object.slug,
            tags: object.tags,
            description: object.description,
            user: object.user,
            totalAnswer: object._count.answers || 0,
            answers: object.answers || [],
            views: object.views || 0,
            createdAt: object.createdAt,
            updatedAt: object.updatedAt,
        };
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