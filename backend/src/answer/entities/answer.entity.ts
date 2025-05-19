export class Answer {
    id: string 
    content:  string  
    discussionId: string
    discussion  : string
    userId: string 
    user: string
    createdAt:  Date 
    updatedAt: Date 

    constructor(
    id: string, 
    content:  string  ,
    discussionId: string,
    discussion  : string,
    userId: string ,
    user: string,
    createdAt:  Date ,
    updatedAt: Date 
    ){
    this.id= id, 
    this.content=  content,
    this.discussionId= discussionId,
    this.discussion  = discussion,
    this.userId= userId,
    this.user= user,
    this.createdAt=  createdAt,
    this.updatedAt= updatedAt 
    }
}
