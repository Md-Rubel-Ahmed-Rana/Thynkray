import { ApiProperty } from "@nestjs/swagger"

export class DiscussionDeleteResponseDto {
    @ApiProperty({example: 200})
    statusCode: number
    
    @ApiProperty({example: "Discussion deleted successfully"})
    message: string

    @ApiProperty({example: true})
    success: boolean

    @ApiProperty({example: null})
    data: any
}