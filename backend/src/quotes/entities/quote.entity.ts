export class Quote {
    id: string
    quote: string
    author: string

    constructor(id: string, quote: string,author: string){
        this.id = id
        this.author = author
        this.quote = quote
    }

}
