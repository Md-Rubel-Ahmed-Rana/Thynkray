import { ApiProperty } from "@nestjs/swagger"

export class GetQuoteDto {
    id: string
    quote: string
    author: string
    constructor(id: string, quote: string,author: string){
        this.id = id
        this.author = author
        this.quote = quote
    }

}


class QuoteDto {
    @ApiProperty({ example: "1d8f9b1a-0a34-4a17-a1d6-5cfb5e2cb0a7" })
    id: string;

    @ApiProperty({example: "Success is not final, failure is not fatal: it is the courage to continue that counts."})
    quote: string

    @ApiProperty({example: "Winston Churchill"})
    author: string
}

export class QuotesResponseDto {
    @ApiProperty({ example: 200 })
    statusCode: number;
  
    @ApiProperty({ example: true })
    success: boolean;
  
    @ApiProperty({ example: 'Quotes retrieved successfully' })
    message: string;
  
    @ApiProperty({ type: [QuoteDto] })
    data: [QuoteDto]
}
