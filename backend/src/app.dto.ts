import { ApiProperty } from "@nestjs/swagger";

export class AppResponseDto {
    @ApiProperty({ example: 200 })
    statusCode: number;
  
    @ApiProperty({ example: true })
    success: boolean;
  
    @ApiProperty({ example: 'Thynkray server is up and running...' })
    message: string;
  
    @ApiProperty({example: null})
    data: any
}

