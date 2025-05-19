import { Answer, User } from "@prisma/client"

export class Discussion {
    id: string
    title: string
    slug: string
    tags: string[]
    description: string
    userId: string
    user: User
    answers: Answer[]
    createdAt: Date;
    updatedAt: Date;

    constructor(
        id: string,
        title: string,
        slug: string,
        tags: string[],
        description: string,
        userId: string,
        user: User,
        answers: Answer[],
        createdAt: Date,
        updatedAt: Date){
            this.id = id
            this.title = title
            this.slug = slug
            this.tags = tags
            this.description = description
            this.userId = userId
            this.user = user
            this.answers = answers
            this.createdAt = createdAt
            this.updatedAt = updatedAt
        }
}
