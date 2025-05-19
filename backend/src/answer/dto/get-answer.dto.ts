import { ApiProperty } from "@nestjs/swagger"
import { Discussion, User } from "@prisma/client"

export class GetAnswerDto {
    id: string
    content:  string
    discussion: Discussion
    user: User 
    createdAt?: Date;
    updatedAt?: Date;

    constructor(
        id: string,
        content: string, 
        discussion: Discussion, 
        user: User, 
        createdAt?: Date,
        updatedAt?: Date
    ){
        this.id=  id,
        this.content=  content,
        this.discussion= discussion,
        this.user= user
        this.createdAt = createdAt || new Date();
        this.updatedAt = updatedAt || new Date();
    }

    static fromEntity(entity: any): GetAnswerDto {
        return new GetAnswerDto(
            entity.id,
            entity.content,
            entity.discussion,
            entity.user,
            entity.createdAt,
            entity.updatedAt
        );
    }

    static fromEntities(entities: any[]): GetAnswerDto[] {
        return entities.map(entity => GetAnswerDto.fromEntity(entity));
    }
}


class AnswerDto {
    @ApiProperty({example: "1d8f9b1a-0a34-4a17-a1d6-5cfb5e2cb0a7"})
    id: string

    @ApiProperty({example: "Nice blog"})
    content: string

    @ApiProperty({example: {id: "1d8f9b1a-0a34-4a17-a1d6-5cfb5e2cb0a7", title: "What is AWS?"}})
    discussion: {id: string, title: string}

    @ApiProperty({
    example: {
        id: "1d8f9b1a-0a34-4a17-a1d6-5cfb5e2cb0a7", 
        name: "Md Rubel?", 
        profile_image: "https://user-profile.png"
    }
    })
    user: {id: string, name: string, profile_image: string}

    @ApiProperty()
    createdAt: Date;
      
    @ApiProperty()
    updatedAt: Date;

}


export class GetAnswersResponseDto {
    @ApiProperty({example: 200})
    statusCode: number
    
    @ApiProperty({example: "Answers retrieved successfully"})
    message: string

    @ApiProperty({example: true})
    success: boolean

    @ApiProperty({example: [AnswerDto]})
    data: [AnswerDto]
}

export class GetAnswerResponseDto {
    @ApiProperty({example: 200})
    statusCode: number
    
    @ApiProperty({example: "Answer retrieved successfully"})
    message: string

    @ApiProperty({example: true})
    success: boolean

    @ApiProperty({example: AnswerDto})
    data: AnswerDto
}