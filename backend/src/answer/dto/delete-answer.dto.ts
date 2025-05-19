import { ApiProperty } from '@nestjs/swagger';


export class AnswerUpdateResponseDto {
    @ApiProperty({example: 200})
    statusCode: number
    
    @ApiProperty({example: "Answer deleted successfully"})
    message: string

    @ApiProperty({example: true})
    success: boolean

    @ApiProperty({example: null})
    data: any
}