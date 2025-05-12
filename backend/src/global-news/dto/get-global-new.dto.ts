import { IsOptional, IsInt, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class GetGlobalNewsDto {
  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  pageSize?: number = 10;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;
  
  @IsOptional()
  @IsString()
  country?: string
}


class GlobalNewsDto  {
  @ApiProperty({example: {id: "cnn-345", name: "CNN"}})
  source: {
    id: string;
    name: string;
  };

  @ApiProperty({example: "John Doe"})
  author: string;

  @ApiProperty({example: "What did happen in 1971"})
  title: string;

  @ApiProperty({example: "The bloody nineteen"})
  description: string;

  @ApiProperty({example: "https://cnn.com/23452"})
  url: string;

  @ApiProperty({example: "https://image.com/thumbnail.png"})
  urlToImage: string;

  @ApiProperty()
  publishedAt: Date;
};

export class GlobalNewsResponseDto {
    @ApiProperty({ example: 200 })
    statusCode: number;
  
    @ApiProperty({ example: true })
    success: boolean;
  
    @ApiProperty({ example: 'International news retrieved successfully' })
    message: string;
  
    @ApiProperty({ type: [GlobalNewsDto] })
    data: GlobalNewsDto[];
}